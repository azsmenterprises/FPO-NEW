var mongo = require('../mongo/mongo')
var newMongo = require('../mongo/newMongo')
const moment = require('moment')
const { ObjectId } = require('mongodb')

exports.searchFarmer = function (data, callback) {
  ////////console.log(data,"shreemayee");
  mongo.queryFindAll({"additionalData.fpoId": data.fpoId,  status: { $ne: 'deleted' } ,status:"Approved"}, 'membersCorner', function (response) {
    callback(response)
  })
}

exports.updateFarmer = function (data, callback) {
  // ////////console.log(data,88888888888888888888);
  mongo.updateOne({ $or: [  {"additionalData.fpoId": data.fpoId, },  { 'farmerForwardToFpoOrFig.fpoId' : data.fpoId }], 'fullFarmerData.NICFARMERID': data.NICFARMERID }, {'fullFarmerData.VCHMOBILENO1':data.VCHMOBILENO1,'additionalData.bankName':data.bankName,'additionalData.bankAccNo':data.bankAccNo,'additionalData.VCHIFSCCODE':data.VCHIFSCCODE,'additionalData.altMobNo':data.altMobNo,'cropData':data.cropData}, 'membersCorner', function (response) {
    callback(response)
  })
}

exports.deleteFarmer = function (data, callback) {

  mongo.updateOne({ farmerId: data.farmerId }, { status: 'deleted' }, 'membersCorner', function (response) {
    callback(response)
  })
}

// exports.getAllForwardedFarmer = function (req, res) {
//     // ,approvedByFpo:{$ne:true} put in condition
//     let fpoId = req.params.fpoId
//     mongo.queryFindAll({ $or: [{ forwardToFpoByFig: true }, { farmerForwardsTo: "FPO" }], 'farmerForwardToFpoOrFig.fpoId': fpoId,approvedByFpo:{$ne:true} }, 'farmerRegistrationMaster', function (response) {
//         res.send(response)
//     })
// }

exports.getAllForwardedFarmer = async (req, res) => {
  try {
    ////////console.log(req.params,"2 b approved");
    let db = await newMongo.mongoConnection()
    let aggregate1 = [
      {
        '$match': {"additionalData.fpoId":req.params.fpoId,status:"pending"}
      }
    ]
    let response1 = await newMongo.queryWithAggregator(aggregate1, 'membersCorner', db)
    res.send(response1)
    newMongo.mongoClose(db);
  } catch (e) {
    ////////console.log(e.message);
  }

 
}

exports.approveForwardedFarmer = function (data, callback) {
  ////////console.log(data,"approve farmervvvvvvvvvvvvvvvvvv");
  if (data) {
    mongo.updateOne({ "farmerId": data.farmerId }, { approvedByFpo: true, approveByFpoDate: new Date(), status: 'Approved' }, 'membersCorner', function (response) {
     
        callback(response)
     
    })
  }
}


exports.getCGListForFpo = async (fpoId, callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let aggregate = [
      {
        '$match': {
          'fpo.fpoId': fpoId
        }
      }, {
        '$group': {
          '_id': '$crop.Crop_Code'
        }
      }, {
        '$group': {
          '_id': null,
          'cropCodes': {
            '$push': '$_id'
          }
        }
      }
    ]
    let response = await newMongo.queryWithAggregator(aggregate, 'figProducedAggreMaster', db)
    if (response.length > 0) {
      let aggregate1 = [
        {
          '$match': {
            'itemName.Crop_Code': {
              '$in': response[0].cropCodes
            }
          }
        }, {
          '$group': {
            '_id': '$cgRefNo'
          }
        }, {
          '$group': {
            '_id': null,
            'allCgRefNo': {
              '$push': '$_id'
            }
          }
        }
      ]
      let response1 = await newMongo.queryWithAggregator(aggregate1, 'consumerGroupProductMaster', db)
      if (response1.length > 0) {
        let aggregate2 = [
          {
            '$match': {
              'refNo': {
                '$in': response1[0].allCgRefNo
              },
              groupRegType: "ConsumerGroup"
            }
          }
        ]
        let response2 = await newMongo.queryWithAggregator(aggregate2, 'consumerGroup', db)
        callback(response2)
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
    ////////console.log('error', e.message);
  }
}

exports.getRelevantTrader = async function (fpoId, callback) {

  let aggregate = [{ '$match': { 'additionalData.fpoId': fpoId } },
  { '$project': { '_id': 0, 'cropData': 1 } },
  { '$unwind': '$cropData' },
  { '$project': { 'crop': '$cropData.crop' } },
  { '$group': { '_id': '$crop' } }];
  let db = await newMongo.mongoConnection()
  let response = await newMongo.queryWithAggregator(aggregate, 'membersCorner', db)
  //////console.log(response,"before map");
  let cropList = response.map(({ _id }) => _id)
  //////console.log(cropList);
  aggregation1 = [{ '$match': { 'itemName.Crop_Name': { '$in': cropList } } },
  { '$project': { 'cgRefNo': 1, '_id': 0 } },
  { '$lookup': { 'from': 'consumerGroup', 'localField': 'cgRefNo', 'foreignField': 'refNo', 'as': 'data' } },
  { '$project': { 'cgRefNo': 1, 'traderName': { '$arrayElemAt': ['$data.traderName', 0] },'districtName': { '$arrayElemAt': ['$data.districtName', 0] },'cgMobNo': { '$arrayElemAt': ['$data.cgMobNo', 0] }, } }]
  let response1 = await newMongo.queryWithAggregator(aggregation1, 'consumerGroupProductMaster', db)
  
  callback(response1)
  newMongo.mongoClose(db);
}



exports.getSoldProductsOfFpo = async (fpoId, callback) => {
  try {
    const db = await newMongo.mongoConnection()
    let response = await newMongo.queryFindAll({ fpoId: fpoId }, 'fpoSaleMaster', db)
    callback(response)
  } catch (e) {

  }
}
exports.getLikes=async(fpoId,callback)=>{
  try{
   
  let aggregator=[
    {
      '$match': {
        'type': 'Like', 
        'fpoId': fpoId
      }
    }, {
      '$count': 'type'
    }, {
      '$project': {
        'type': 1
      }
    }
  ]
    
    let db=await newMongo.mongoConnection()
    let response=await newMongo.queryWithAggregator(aggregator,'userDataFromFpoProfile',db)
// //console.log(response,"in model");
    callback(response)
    newMongo.mongoClose(db)
  }catch(e){
    //console.log(e)

  }
}

exports.getDataForDashboard = async (req, res) => {
  try {
    const db = await newMongo.mongoConnection()

    var cropProduction_count_aggregate = ([
      { $match: { 'fpo.fpoId': req.params.fpoId } },
      { $group: { _id: null, myCount: { $sum: 1 } } },
      { $project: { _id: 0 } }
    ]);
    var directors_count_aggregate = [
      {
        '$match': {'fpoId': req.params.fpoId}
      }, {
        '$project': {'_id': null,'numberOfDirectors': {'$size': '$boardDirectorsDetails'},'noOfFarmerMember': '$FPOData.noOfFarmerMember',
          'totalBusinessDone': 1}
      }
    ]
    var turnOver_amount_aggregate =[
      {
        '$match': {'fpoId': req.params.fpoId}
      }, {
        '$project': {'_id': 0,'addedOn': 1,'turnoverAmount': 1}
      }, {
        '$sort': {'addedOn': -1}
      }, {
        '$limit': 1
      },{
        '$project': {'turnoverAmount': 1}
      }
    ]
    const cropProduction_count = await newMongo.queryWithAggregator(cropProduction_count_aggregate, 'figProducedAggreMaster', db)
    const directors_count = await newMongo.queryWithAggregator(directors_count_aggregate, 'FPOmaster', db)
    const turnOver_amount = await newMongo.queryWithAggregator(turnOver_amount_aggregate, 'fpoFinYearData', db)


    // const cropProduction_count = await dbo.collection(collection.CROP_PRODUCTION).aggregate( cropProduction_count_aggregate ).toArray();
    // const directors_count = await dbo.collection(collection.FPO_MASTER).aggregate( directors_count_aggregate ).toArray();
    var result = ({
      cropProduction_count, directors_count,turnOver_amount
    })
    res.send(result);
    db.close();

  }
  catch (e) {
    //console.error(e);
    // res.status(500).send('Unexpected error');
  }
}


exports.getNotifications = async (req, res) => {
  try {
    let db = await newMongo.mongoConnection()
    let aggregate=[
      {
        '$match': {
          'fpoId': req.params.fpoId, 
          'type': {  '$in': [
              'callMeBack', 'Interested'
            ]
          },status: {'$in': [ '', 'Acknowledge Later']}
        }
      }, {
        '$project': {
          'type': 1, 
          'fpoId': 1, 
          'name': 1,
          'mobNo':1,
          'message': 1,
          'typeCat':1
        }
      },{$sort:{status:-1}}
    ]
    let response = await newMongo.queryWithAggregator(aggregate, 'userDataFromFpoProfile', db)


  
    res.send(response);
    db.close();

  }
  catch (e) {
    ////////console.log(e.message)
    // res.status(500).send('Unexpected error');
  }
}

exports.updateNotificationsStatus = async (req, res) => {
  //console.log(req.params,"33333");
  try {
    let db = await newMongo.mongoConnection()    
    let response = await newMongo.updateOne({ _id: ObjectId(req.params.id) }, { status: req.params.status }, 'userDataFromFpoProfile', db)
    callback(response.modifiedCount)
    res.send(response);
    db.close();

  }
  catch (e) {
    ////////console.log(e.message)
    // res.status(500).send('Unexpected error');
  }
}

exports.getNotificationByStatus = async (req, res) => {
  try {
    let db = await newMongo.mongoConnection()
    let aggregate=[
      {
        '$match': {'fpoId': req.params.fpoId, 'type': {  '$in': [ 'callMeBack', 'Interested' ] },'status':req.params.status }
      }, {
        '$project': {
          'type': 1, 
          'fpoId': 1, 
          'name': 1,
          'mobNo':1,
          'message': 1,
          'typeCat':1
        }
      },{$sort:{status:-1}}
    ]
    let response = await newMongo.queryWithAggregator(aggregate, 'userDataFromFpoProfile', db)

//console.log(response,"error wala function");
  
    res.send(response);
    db.close();

  }
  catch (e) {
    ////////console.log(e.message)
    // res.status(500).send('Unexpected error');
  }
}

exports.dateForDashboard = async (req, res) => {
  try {
    let db = await newMongo.mongoConnection()
    var today = moment(new Date()).format('YYYY-MM-DD');
    // let date=new Date(today)
    // ////////console.log(date);
    let meeting_scheduled = await newMongo.queryFindAll({ fpoId: req.params.fpoId, "meetingDate": { "$gt": today } }, 'meetingsDetails', db)
    let meeting_conducted = await newMongo.queryFindAll({ fpoId: req.params.fpoId, "meetingDate": { "$lte": today } }, 'meetingsDetails', db)

    var result = ({
      meeting_scheduled, meeting_conducted
    })
    res.send(result);
    db.close();

  }
  catch (e) {
    ////////console.log(e.message)
    // res.status(500).send('Unexpected error');
  }
}


exports.getFigPendingApproveListForFpo = async (req, res) => {
  try {
    let db = await newMongo.mongoConnection()
    let response = await newMongo.queryFindAll({ status: 'pending', 'fpo.refNo': req.params.fpoRefNo }, 'figRegistrationMaster', db)
    res.send(response)
    db.close()
  } catch (e) {

  }
}

exports.ApproveFig = async (data, callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let response = await newMongo.updateOne({ refNo: data.refNo, _id: ObjectId(data._id) }, { status: 'approved' }, 'figRegistrationMaster', db)
    callback(response.modifiedCount)
    db.close()
  } catch (e) {

  }
}

exports.getFigApprovedListForFpo = async (req, res) => {
  try {
    let db = await newMongo.mongoConnection()
    let response = await newMongo.queryFindAll({ status: 'approved', 'fpo.refNo': req.params.fpoRefNo }, 'figRegistrationMaster', db)
    res.send(response)
    db.close()
  } catch (e) {

  }
}



exports.getDistricts = async (req, res) => {
  try {

    let db = await newMongo.mongoConnection()
    let response = await newMongo.findAll('districtMaster', db)
    // ////////console.log(response);
    res.send(response);
    db.close();

  }
  catch (e) {
    //console.error(e);
    res.status(500).send('Unexpected error');
  }
}
exports.getBlocksOfDistrict = async (req, res) => {
  try {
    ////////console.log(req.params.districtCode);
    let db = await newMongo.mongoConnection()
    let response = await newMongo.queryFindAll({ districtCode: req.params.districtCode }, 'blockMaster', db)
    // ////////console.log(response);
    res.send(response);
    db.close();

  }
  catch (e) {
    //console.error(e);
    res.status(500).send('Unexpected error');
  }
}
exports.getGP = async (req, res) => {
  try {
    let db = await newMongo.mongoConnection()
    let response = await newMongo.queryFindAll({ blockCode: req.params.blockCode }, 'gpMaster', db)
    res.send(response);
    db.close();

  }
  catch (e) {
    //console.error(e);
    res.status(500).send('Unexpected error');
  }
}
exports.getVillage = async (req, res) => {
  try {
    let db = await newMongo.mongoConnection()
    let response = await newMongo.queryFindAll({ gpCode: req.params.gpCode }, 'villageMaster', db)
    res.send(response);
    db.close();

  }
  catch (e) {
    //console.error(e);
    res.status(500).send('Unexpected error');
  }
}

exports.getAllVillage = async (req, res) => {
  try {
    let db = await newMongo.mongoConnection()
    let aggregate1=[
      {
        '$match': {
          'blockCode':req.params.district
        }
      }, {
        '$project': {
          '_id': 0, 
          'villageCode': 1, 
          'villageName': 1
        }
      }
    ]
    let response = await newMongo.queryWithAggregator(aggregate1, 'villageMaster', db)
   //console.log();
    res.send(response);
    db.close();

  }
  catch (e) {
    //console.error(e);
    res.status(500).send('Unexpected error');
  }
}


exports.loadTrader = async (req, res) => {
  try {
    let db = await newMongo.mongoConnection()
    let aggregate1=[
      {
        '$match': {
          'groupRegType': 'Trader'
        }
      }, {
        '$project': {
          '_id': 0, 
          'traderName': 1, 
          'refNo': 1,
          "districtCode":1
        }
      }, {
        '$sort': {
          'traderName': 1
        }
      }
    ]
    let response = await newMongo.queryWithAggregator(aggregate1, 'consumerGroup', db)
   //console.log();
    res.send(response);
    db.close();

  }
  catch (e) {
    //console.error(e);
    res.status(500).send('Unexpected error');
  }
}

exports.traderData = async (req, res) => {
  //console.log(req.params.refId);
  try {
    let db = await newMongo.mongoConnection()
    let aggregate1=[
      {
        '$match': {
          'groupRegType': 'Trader', 
          'refNo': req.params.refId
        }
      }, {
        '$project': {
          '_id': 0
        }
      }
    ]
    let response = await newMongo.queryWithAggregator(aggregate1, 'consumerGroup', db)
    // //console.log(response,"Agrregation");
    res.send(response);
    db.close();

  }
  catch (e) {
    //console.error(e);
    res.status(500).send('Unexpected error');
  }
}
exports.statusForElicenseRegisterButton = async (fpoId, callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let aggregate = [
      {
        '$match': {
          'fpoId': fpoId,
          '$or': [
            {
              'updateForElicensing': {
                '$ne': true
              }
            }, {
              'eLicensingResponse': {
                '$exists': false
              }
            }
          ]
        }
      }
    ]
    let response = await newMongo.queryWithAggregator(aggregate, 'FPOmaster', db)
    if (response.length > 0) {
      callback({ status: false })
      db.close()
    } else {
      callback({ status: true })
      db.close()
    }
  } catch (e) {
    ////////console.log(e.message);
  }
}

exports.registerToElicensing = async (fpoId, callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let aggregate = [
      {
        '$match': {
          'fpoId': fpoId
        }
      }, {
        '$project': {
          'fpoMailId': '$FPOData.fpoMailId',
          'name': '$fpoName',
          'aadhar': '$FPOData.aadhar',
          'gender': '$FPOData.gender',
          'fpoContactNo': '$FPOData.fpoContactNo',
          'district': '$FPOData.district',
          'district_id': '$FPOData.district_id',
          'block': '$FPOData.block',
          'block_id': '$FPOData.block_id',
          'village': '$FPOData.village',
          'address': '$FPOData.address',
          'pincode': '$FPOData.pincode'
        }
      }
    ]
    let response = await newMongo.queryWithAggregator(aggregate, 'FPOmaster', db)
    let password = await newMongo.findOne('userAuth', { userType: 'FPO', userId: fpoId }, db)
    let finalData = response[0]
    finalData.password = password.password
    finalData.fpoId = fpoId
    callback(finalData)
    db.close()
  } catch (e) {
    ////////console.log(e.message);
  }
}

exports.eLicensingStatus = async (data, callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let response = await newMongo.updateOne({ fpoId: data.fpoId, 'FPOData.aadhar': data.aadhar }, { eLicensingResponse: data.response, updateForElicensing: true }, 'FPOmaster', db)
    callback(response.modifiedCount)
    db.close()
  } catch (e) {

  }
}

exports.submitFormForElicensing = async (data, callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let response = await newMongo.updateOne({ fpoId: data.fpoId }, {
      'FPOData.district': data.district,
      'FPOData.district_id': data.district_id,
      'FPOData.block_id': data.block_id,
      'FPOData.block': data.block,
      'FPOData.gramPanchayat': data.gramPanchayat,
      'FPOData.gramPanchayatCode': data.gramPanchayatCode,
      'FPOData.village': data.village,
      'FPOData.gender': data.gender,
      'FPOData.aadhar': data.aadhar,
      'FPOData.fpoMailId': data.fpoMailId,
      'FPOData.fpoContactNo': data.fpoContactNo,
      'FPOData.address': data.address,
      'FPOData.pincode': data.pincode,
      'FPOData.masterVillageCode': data.villageCode,
      'updateForElicensing': true

    }, 'FPOmaster', db)
    callback(response)
    db.close()
  } catch (e) {
    ////////console.log(e.message);
  }
}

exports.loginToElicensing = async (fpoId, callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let response = await newMongo.queryFindAll({ fpoId: fpoId }, 'FPOmaster', db)
    callback(response[0].FPOData.fpoMailId)
    db.close()
  } catch (e) {
    ////////console.log('loginToElicensing errror', e.message);
  }
}

exports.addGodownSubmit = async (addGodownData, callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let districtName = await newMongo.findOne('districtMaster', { districtCode: addGodownData.districtCode }, db)
    addGodownData.districtName = districtName.districtName
    let fpoRefNo = await newMongo.findOne('FPOmaster', { fpoId: addGodownData.fpoId }, db)
    addGodownData.fpoRefNo = fpoRefNo.refNo
    let incrementValue = await newMongo.autoIncrement({}, 'fpoGodownMaster', db)
    let godownId = addGodownData.districtCode + '' + incrementValue
    addGodownData.godownId = godownId
    let response = await newMongo.insertDocument(addGodownData, 'fpoGodownMaster', db)
    callback(response.insertedCount)
    db.close()
  } catch (e) {

  }
}

exports.stockTransferForm = async (data, callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let aggregate = [
      {
        '$match': {
          'destinationGodownId': data.godownId,
          'cropCatagory': data.cropCatagory,
          'crop': data.crop,
          'variety': data.variety,
          status: 'Received'
        }
      }, {
        '$group': {
          '_id': null,
          'quantity': {
            '$sum': '$quantity'
          }
        }
      }
    ]
    let receivedStock = await newMongo.queryWithAggregator(aggregate, 'fpoGodownDataManagement', db)
    let aggregate1 = [
      {
        '$match': {
          'sourceGodownId': data.godownId,
          'cropCatagory': data.cropCatagory,
          'crop': data.crop,
          'variety': data.variety
        }
      }, {
        '$group': {
          '_id': null,
          'quantity': {
            '$sum': '$quantity'
          }
        }
      }
    ]
    let dispatchedStock = await newMongo.queryWithAggregator(aggregate1, 'fpoGodownDataManagement', db)
    let availableQuant = (receivedStock[0] ? receivedStock[0].quantity : 0) - (dispatchedStock[0] ? dispatchedStock[0].quantity : 0)
    callback(availableQuant)
    db.close()
  } catch (e) {
    ////////console.log(e.message);
  }
}
exports.getAvailableCropType = async (data, callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let aggregate = [
      { '$match': { 'destinationGodownId': data.godownId, status: 'Received' } },
      { '$group': { _id: '$cropCatagory' } },
      { '$project': { _id: 0, cropCatagory: '$_id' } }
    ]
    let availableCropType = await newMongo.queryWithAggregator(aggregate, 'fpoGodownDataManagement', db)
    callback(availableCropType)
    db.close()

  } catch (e) {
    ////////console.log(e.message);
  }
}

exports.getAllGodowns = async (callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let godowns = await newMongo.queryFindAll({}, 'fpoGodownMaster', db)
    callback(godowns)
    db.close()
  } catch (e) {
    ////////console.log(e.message);
  }
}

exports.loadDestGodown = async (destinationDistrictCode, callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let godowns = await newMongo.queryFindAll({ districtCode: destinationDistrictCode }, 'fpoGodownMaster', db)
    callback(godowns)
    db.close()
  } catch (e) {
    ////////console.log(e.message);
  }
}

exports.stockTransferSubmit = async (data, callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let cropName = await newMongo.findOne('cropMaster', { Crop_Code: data.crop }, db)
    let varietyName = await newMongo.findOne('varietyMaster', { Variety_Code: data.variety }, db)
    let destiGodownDetails = await newMongo.findOne('fpoGodownMaster', { godownId: data.destinationGodownId }, db)
    let sourceGodownDetails = await newMongo.findOne('fpoGodownMaster', { godownId: data.godownId }, db)
    let fpoName = await newMongo.findOne('FPOmaster', { fpoId: data.fpoId }, db)

    let stockTransferData = {
      quantity: data.quantity,
      cropCatagory: data.cropCatagory,
      crop: data.crop,
      cropName: cropName.Crop_Name,
      variety: data.variety,
      varietyName: varietyName.Variety_Name,
      fpoId: data.fpoId,
      destinationFpoId: destiGodownDetails.fpoId,
      destinationFpoName: fpoName.fpoName,
      info: 'stockTransferByFPO',
      destinationDistrictCode: data.destinationDistrictCode,
      destinationDistrictName: destiGodownDetails.districtName,
      destinationGodownId: data.destinationGodownId,
      destinationGodownName: destiGodownDetails.godownName,
      sourceDistrictCode: sourceGodownDetails.districtCode,
      sourceDistrictName: sourceGodownDetails.districtName,
      sourceGodownId: data.godownId,
      sourceGodownName: sourceGodownDetails.godownName,
      status: 'In Transit'
    }

    let response = await newMongo.insertDocument(stockTransferData, 'fpoGodownDataManagement', db)
    callback(response.insertedCount)
    db.close()
  } catch (e) {
    ////////console.log(e.message);
  }
}

exports.getAllStockForReceiptData = async (fpoId, callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let response = await newMongo.queryFindAll({ destinationFpoId: fpoId, status: 'In Transit' }, 'fpoGodownDataManagement', db)
    callback(response)
    db.close()
  } catch (e) {
    ////////console.log(e.message);
  }
}

exports.getAllStockInTransitData = async (fpoId, callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let response = await newMongo.queryFindAll({ fpoId: fpoId, status: 'In Transit' }, 'fpoGodownDataManagement', db)
    callback(response)
    db.close()
  } catch (e) {
    ////////console.log(e.message);
  }
}

exports.receiveStock = async (_id, callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let response = await newMongo.updateOne({ _id: ObjectId(_id), status: 'In Transit' }, { status: 'Received' }, 'fpoGodownDataManagement', db)
    callback(response.modifiedCount)
    db.close()
  } catch (e) {
    ////////console.log(e.message);
  }
}

exports.searchGodownReport = async (data, callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let aggregate = [
      {
        '$match': {
          'fpoId': data.fpoId,
          destinationGodownId: data.godownId
        }
      }, {
        '$group': {
          '_id': {
            'destinationGodownId': data.godownId,
            'crop': data.crop,
            'variety': data.variety,
            'cropCatagory': data.cropCatagory
          },
          'receivedStock': {
            '$sum': '$quantity'
          }
        }
      }
    ]
    let response = await newMongo.queryWithAggregator(aggregate, 'fpoGodownDataManagement', db)
    let aggregate1 = [
      {
        '$match': {
          'fpoId': data.fpoId,
          sourceGodownId: data.fpoId
        }
      }, {
        '$group': {
          '_id': {
            'sourceGodownId': data.godownId,
            'crop': data.crop,
            'variety': data.variety,
            'cropCatagory': data.cropCatagory
          },
          'dispatchedStock': {
            '$sum': '$quantity'
          }
        }
      }
    ]
    let response1 = await newMongo.queryWithAggregator(aggregate1, 'fpoGodownDataManagement', db)

    db.close()

  } catch (e) {
    ////////console.log(e.message);
  }
}

exports.godownSaleDataSubmit = async (data, callback) => {
  // //console.log(data,"godownSaleDataSubmit");
  try {
    let db = await newMongo.mongoConnection()
    data.sourceGodownId = data.godownId

    let godownName = await newMongo.findOne('fpoGodownMaster', { godownId: data.godownId }, db)
    data.sourceGodownName = godownName.godownName

    let cropName = await newMongo.findOne('cropMaster', { Crop_Code: data.crop }, db)
    data.cropName = cropName.Crop_Name

    let varietyName = await newMongo.findOne('varietyMaster', { Variety_Code: data.variety }, db)
    data.varietyName = varietyName.Variety_Name

    let destinationDistrictName = await newMongo.findOne('districtMaster', { districtCode: data.destinationDistrictCode }, db)
    data.destinationDistrictName = destinationDistrictName.districtName

    let sourceDistrictCode = await newMongo.findOne('fpoGodownMaster', { godownId: data.godownId }, db)
    data.sourceDistrictCode = sourceDistrictCode.districtCode

    let sourceDistrictName = await newMongo.findOne('districtMaster', { districtCode: sourceDistrictCode.districtCode }, db)

    data.sourceDistrictName = sourceDistrictName.districtName

    delete data.godownId
    data.info = 'godownStockSale'
    let response = await newMongo.insertDocument(data, 'fpoGodownDataManagement', db)
    callback(response.insertedCount)
  } catch (e) {
   //console.log(e);
  }
}