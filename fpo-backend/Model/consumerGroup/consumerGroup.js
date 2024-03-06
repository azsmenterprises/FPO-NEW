const { ObjectId } = require('mongodb')
var mongo = require('../mongo/newMongo')

exports.getDashboardData=async(req,res)=>{
  try{
    ////////console.log(req.params.cgRefNo);
    let db=await mongo.mongoConnection()
    let cgProduct=await mongo.queryFindAll({cgRefNo:req.params.cgRefNo},'consumerGroupProductMaster',db)
    // let consumerData=await mongo.queryFindAll({cgRefNo:req.params.cgRefNo},'consumerRegistration',db)
    let consumerData = await mongo.findOne('consumerGroup', { "refNo":req.params.cgRefNo }, db)


    let fpoData=await getFpoDataForCg(req.params.cgRefNo)
    ////////console.log(consumerData,"consumerData");
    res.send({cgProduct:cgProduct,consumerData:consumerData,fpoData:fpoData})
    db.close()
  }catch(e){
    ////////console.log(e.message);
  }
}


exports.getDashboardChart=async(req,res)=>{
  ////console.log(req.params,"dashboardchart");
  try{
    let db=await mongo.mongoConnection()
    
    let aggregate = [
      {'$match': { 'cgRefNo': req.params.cgRefNo} }, 
      {'$project': {  _id:0,Crop_Name:"$itemName.Crop_Name",Unit:1,minQuantity:1} } ]
    let response = await mongo.queryWithAggregator(aggregate, 'consumerGroupProductMaster', db)
    res.send(response)
    db.close()
  }catch(e){
  }
}
exports.getPieChart=async(req,res)=>{
  try{
    ////////console.log(req.params.cgRefNo);
    let db=await mongo.mongoConnection()
    let cgProduct=await mongo.queryFindAll({cgRefNo:req.params.cgRefNo},'consumerGroupProductMaster',db)
    // let consumerData=await mongo.queryFindAll({cgRefNo:req.params.cgRefNo},'consumerRegistration',db)
    let consumerData = await mongo.findOne('consumerGroup', { "refNo":req.params.cgRefNo }, db)


    let fpoData=await getFpoDataForCg(req.params.cgRefNo)
    ////////console.log(consumerData,"consumerData");
    res.send({cgProduct:cgProduct,consumerData:consumerData,fpoData:fpoData})
    db.close()
  }catch(e){
    ////////console.log(e.message);
  }
}


var getFpoDataForCg=async(cgRefNo)=>{
  return new Promise(async(callback)=>{
    try {
      let db = await mongo.mongoConnection()
      let aggregate = [
        {
          '$match': {
            'cgRefNo': cgRefNo
          }
        }, {
          '$group': {
            '_id': '$itemName.Crop_Code',
            'itemName': {
              '$first': '$itemName'
            }
          }
        }, {
          '$group': {
            '_id': null,
            'items': {
              '$push': '$itemName.Crop_Code'
            }
          }
        }
      ]
      let response = await mongo.queryWithAggregator(aggregate, 'consumerGroupProductMaster', db)
  
      if (response.length > 0) {
        let aggregate2 = [
          {
            '$match': {
              'crop.Crop_Code': {
                '$in': response[0].items
              },
              fpoApproved: true
            }
          }, {
            '$group': {
              '_id': '$fpo.fpoId'
            }
          }, {
            '$group': {
              '_id': null,
              'fpos': {
                '$push': '$_id'
              }
            }
          }
        ]
        let response2 = await mongo.queryWithAggregator(aggregate2, 'figProducedAggreMaster', db)
        if (response2.length > 0) {
          let aggregate3 = [
            {
              '$match': {
                'fpoId': {
                  '$in': response2[0].fpos
                }
              }
            }
          ]
          let response3 = await mongo.queryWithAggregator(aggregate3, 'FPOmaster', db)
          callback(response3)
          db.close()
        } else {
          callback([])
          db.close()
        }
      } else {
        callback([])
        db.close()
      }
    } catch (e) {
      ////////console.log('error in consumer group model 1', e.message);
    }
  })
}

exports.getAllCropCat = async (req, res) => {
  try {
    let db = await mongo.mongoConnection()
    let aggregate = [
      {
        '$group': {
          '_id': '$Crop_category'
        }
      }, {
        '$group': {
          '_id': null,
          'cat': {
            '$push': '$_id'
          }
        }
      }
    ]
   
    let response = await mongo.queryWithAggregator(aggregate, 'cropMaster', db)
  
//////console.log(response1);



    res.send(response)
    mongo.mongoClose(db)
  } catch (e) {

  }
}

exports.loadCrops = async (req, res) => {
  try {
    let cropCat = req.params.cropCat
    let db = await mongo.mongoConnection()
    let aggregate = [
      {
        '$match': {
          'Crop_category': cropCat
        }
      }, {
        '$group': {
          '_id': '$Crop_Code',
          'Crop_Code': {
            '$first': '$Crop_Code'
          },
          'Crop_Name': {
            '$first': '$Crop_Name'
          }
        }
      }
    ]
    let response = await mongo.queryWithAggregator(aggregate, 'cropMaster', db)
    res.send(response)
    db.close()
  } catch (e) {

  }
}

exports.addProductSubmit = async (data, callback) => {
  try {
   if(data.Metrics=="TONNES")
  {
    data.Unit=data.Unit*1000
    data.Metric="KG"
  }
    //////console.log(data,"changed");
    
    let db = await mongo.mongoConnection()
    let response = await mongo.insertDocument(data, 'consumerGroupProductMaster', db)
    callback(response.insertedCount)
    db.close()
  } catch (e) {

  }
}

exports.getConsumerListToApprove = async (cgRefNo, callback) => {
  try {
    let db = await mongo.mongoConnection()
    let response = await mongo.queryFindAll({ 'consumerGroup.refNo': cgRefNo, status: 'pending' }, 'consumerRegistration', db)
    
    callback(response)
    db.close()
  } catch (e) {

  }
}

exports.approveConsumer = async (csData, callback) => {
  try {
    let db = await mongo.mongoConnection()
    if (csData.buttonType == 'approve') {
      let response = await mongo.updateOne({ 'consumerGroup.refNo': csData.consumerGroup.refNo, status: 'pending', consumerName: csData.consumerName, consumerRefNo: csData.consumerRefNo }, { status: 'approved', approveByCGDate: new Date() }, 'consumerRegistration', db)
      if (response.modifiedCount > 0) {
        let response1 = await mongo.findOne('consumerRegistration', { consumerRefNo: csData.consumerRefNo }, db)
        let response2 = await mongo.insertDocument({ refNo: response1.consumerRefNo, userId: response1.consumerRefNo, mobileNo: response1.consumerMobilenumber, password: response1.password, userType: 'Consumer', creationDate: new Date() }, 'userAuth', db)
        callback({ status: 'approved', userId: response1.consumerRefNo, password: response1.password })
        db.close()
      } else {
        callback({ status: 'notModified' })
        db.close()
      }
    } else {
      let response = await mongo.updateOne({ 'consumerGroup.refNo': csData.consumerGroup.refNo, status: 'pending', consumerName: csData.consumerName, consumerRefNo: csData.consumerRefNo }, { status: 'rejected', rejectedByCGDate: new Date() }, 'consumerRegistration', db)
      if (response.modifiedCount > 0) {
        let response1 = await mongo.findOne('consumerRegistration', { consumerRefNo: csData.consumerRefNo }, db)
        callback({ status: 'rejected', userId: response1.consumerRefNo, password: response1.password })
        db.close()
      } else {
        callback({ status: 'notModified' })
        db.close()
      }
    }

  } catch (e) {

  }
}



exports.getFpoListForCg = async (cgRefNo, callback) => {
  try {
    let db = await mongo.mongoConnection()
    let aggregate = [
      {
        '$match': {
          'cgRefNo': cgRefNo
        }
      }, {
        '$group': {
          '_id': '$itemName.Crop_Code',
          'itemName': {
            '$first': '$itemName'
          }
        }
      }, {
        '$group': {
          '_id': null,
          'items': {
            '$push': '$itemName.Crop_Code'
          }
        }
      }
    ]
    let response = await mongo.queryWithAggregator(aggregate, 'consumerGroupProductMaster', db)

    if (response.length > 0) {
      let aggregate2 = [
        {
          '$match': {
            'crop.Crop_Code': {
              '$in': response[0].items
            },
            fpoApproved: true
          }
        }, {
          '$group': {
            '_id': '$fpo.fpoId'
          }
        }, {
          '$group': {
            '_id': null,
            'fpos': {
              '$push': '$_id'
            }
          }
        }
      ]
      let response2 = await mongo.queryWithAggregator(aggregate2, 'figProducedAggreMaster', db)
      if (response2.length > 0) {
        let aggregate3 = [
          {
            '$match': {
              'fpoId': {
                '$in': response2[0].fpos
              }
            }
          }
        ]
        let response3 = await mongo.queryWithAggregator(aggregate3, 'FPOmaster', db)
        callback(response3)
        db.close()
      } else {
        callback([])
        db.close()
      }
    } else {
      callback([])
      db.close()
    }
  } catch (e) {
    ////////console.log('error in consumer group model 1', e.message);
  }
}


exports.getApprovedConsumerList = async (cgRefNo, callback) => {
  try {
    let db = await mongo.mongoConnection()
    let response = await mongo.queryFindAll({ 'consumerGroup.refNo': cgRefNo, status: 'approved' }, 'consumerRegistration', db)
    callback(response)
    db.close()
  } catch (e) {

  }
}

exports.blockUnblockConsumer=async(req,res)=>{
  try{
    let data=req.body
    let db=await mongo.mongoConnection()
    let response=await mongo.updateOne({csDistCode:data.csDistCode,consumerRefNo:data.consumerRefNo},{blockStatus:data.blockStatus},'consumerRegistration',db)
    res.send({status:response.modifiedCount})
    db.close()
  }catch(e){

  }
}

exports.getProductsAddedList = async (req,res) => {
  try {
    let db = await mongo.mongoConnection()
    let response = await mongo.queryFindAll({ 'cgRefNo': req.params.cgRefNo}, 'consumerGroupProductMaster', db)
    res.send(response)
    db.close()
  } catch (e) {

  }
}

exports.blockUnblockProduct=async(req,res)=>{
  try{
    let data=req.body
    let db=await mongo.mongoConnection()
    let response=await mongo.updateOne({_id:ObjectId(data._id),'cgRefNo': data.cgRefNo},{blockStatus:data.blockStatus},'consumerGroupProductMaster',db)
    res.send({status:response.modifiedCount})
    db.close()
  }catch(e){

  }
}

exports.consumerRegisterSubmit=async(req,res)=>{
  try{
    let data=req.body
    data.csDistName=data.csDist.districtName
    data.csDistCode=data.csDist.districtCode
    data.status='approved'
    delete data.csDist
    let db=await mongo.mongoConnection()
    let aggregate=[
      {
        '$match': {
          'refNo': data.cgRefNo
        }
      }, {
        '$project': {
          _id:0,
          'cgName': 1, 
          'cgMobNo': 1, 
          'refNo': 1
        }
      }
    ]
    let response=await mongo.queryWithAggregator(aggregate,'consumerGroup',db)
    data.consumerGroup=response[0]
    data.password='b42458de550ef94801e7df33778c436d93bb78d3962f1020f3659db75b72cb8e3a4bb75f972c500d5a3626f74f6b69436d515b55a0344c4b29f28ad0cba56c3b'
    let response1=await mongo.autoIncrement({},'consumerRegistration',db)
    let consumerRefNo='OD'+data.csDistCode+'CS'+response1
    data.consumerRefNo=consumerRefNo
    delete data.cgRefNo
    let response2=await mongo.insertDocument(data,'consumerRegistration',db)
    res.send({status:response2.insertedCount})
    db.close()
  }catch(e){

  }
}
exports.getTrader=async(req,res)=>{
  try{
    let cgRefNo=req.params.cgRefNo
    let db=await mongo.mongoConnection()
    let response1 = await mongo.findOne('consumerGroup', { refNo: cgRefNo }, db)
    
    res.send(response1)
    db.close()
  }catch(e){
    ////////console.log(e,10101010);

  }
}
exports.updateTrader=async(req,res)=>{
  try{
    // ////////console.log(req.body,"Trader updateee");
    let cgRefNo=req.params.cgRefNo
    let data=req.body
    let db=await mongo.mongoConnection()
    let response1 = await mongo.updateOne({ refNo: cgRefNo },data,'consumerGroup',  db)
    ////////console.log({response1});
    if(response1.modifiedCount == 1){
      res.send({msg:'Updated Successfully'})
    }else{
      res.send({msg:'Update Failed'})
    }
    db.close()
  }catch(e){
    ////////console.log(e,10101010);

  }
}