
var mongo = require('../mongo/mongo')
var newMongo = require('../mongo/newMongo')


exports.getAllAppliedFarmer = function (sessionRefNo, callback) {
    // forwardToFpo:{$ne:true} put in condition 

    mongo.queryFindAll({ farmerForwardsTo: "FIG", 'farmerForwardToFpoOrFig.refNo': sessionRefNo }, 'farmerRegistrationMaster', (response) => {
        if (response) {
            callback(response)
        }
    })
}

exports.fetchAllProducedDataForForwardToFpo = async (req, res) => {
    try {
        let aggregation = [
            {
                '$match': {
                    'rejectedByFpo': {
                        '$ne': true
                    },
                    'fpoApproved': {
                        '$ne': true
                    },
                    'producedSale': true,
                    'forwardToFpo': false,
                    'figRefNo':req.params.figRefNo
                }
            }, {
                '$group': {
                    '_id': {
                        'crop': '$crop',
                        'variety': '$variety',
                        'cropCatagory': '$cropCatagory'
                    },
                    'count': {
                        '$sum': '$quantity'
                    }
                }
            }, {
                '$project': {
                    '_id': 0,
                    'crop': '$_id.crop',
                    'variety': '$_id.variety',
                    'cropCatagory': '$_id.cropCatagory',
                    'count': 1
                }
            }
        ];
        let db = await newMongo.mongoConnection()
        let response = await newMongo.queryWithAggregator(aggregation, 'figProducedAggreMaster', db)
        if (response.length == 0) {
            res.send([]);
        } else {
            res.send(response);
        }
    } catch (e) {
        ////////console.log(e.message);
    }
}


exports.getAvailableCropType = async (req, res) => {
    try {
        let data=req.params
////////console.log(data,req.params,123455);
        let db = await newMongo.mongoConnection()
        let aggregate = [
          {'$match': {'destinationGodownId': data.godownId,  status: 'Received' } }, 
          {'$group': { _id:'$cropCatagory'}},
          {'$project':{ _id:0,cropCatagory:'$_id'}}
        ]
    let availableCropType = await newMongo.queryWithAggregator(aggregate, 'fpoGodownDataManagement', db)    
    res.send(availableCropType)
        
    // callback(availableCropType)
        db.close()
    } catch (e) {
        ////////console.log(e.message);
    }
}

exports.forwardProducedDataToFpo=async(req,res)=>{
    try{
        let data=req.body
        let db=await newMongo.mongoConnection()
        let response=await newMongo.updateMany(
            {'producedSale': true,'forwardToFpo': false,figRefNo:data.figRefNo,'crop.Crop_Code':data.crop.Crop_Code,cropCatagory:data.cropCatagory,'variety.Variety_Code':data.variety.Variety_Code},
            {forwardToFpo:true,forwardToFpoDate:new Date()},'figProducedAggreMaster',db)
        res.send({status:response.modifiedCount})
        newMongo.mongoClose(db)
    }catch(e){
        ////////console.log(e.message);
    }
}

exports.approve = function (data, callback) {
    mongo.updateOne({ farmerId: data.farmerId, farmerName: data.farmerName }, { status: 'approved', approveByFigDate: new Date() }, 'farmerRegistrationMaster', function (response) {
        if (response.modifiedCount == 1) {
            mongo.findOne('farmerRegistrationMaster', { farmerId: data.farmerId, farmerName: data.farmerName }, function (response1) {
                callback({ status: response.modifiedCount, mobNo: response1.fullFarmerData.VCHMOBILENO })
            })
        }
    })
}

exports.forwardToFpo = function (req, res) {
    let data = req.body
    mongo.updateOne({ farmerId: data.farmerId, farmerName: data.farmerName }, { forwardToFpoByFig: true, forwardToFpoByFigDate: new Date() }, 'farmerRegistrationMaster', function (response) {
        res.send({ status: response.modifiedCount })
    })
}

exports.getFPOs=async(req,res)=>{
    try{
        let figRefNo = req.params.figRefNo
        let aggrigation = [
            {
                '$match': {
                    'refNo': figRefNo,
                    'fpo': {
                        '$ne': 'select Later'
                    }
                }
            }, {
                '$group': {
                    '_id': {
                        'fpo': '$fpo'
                    },
                    'fpos': {
                        '$push': '$fpo'
                    }
                }
            }
        ]
        
        let db=await newMongo.mongoConnection()
        let response=await newMongo.queryWithAggregator(aggrigation,'figRegistrationMaster',db)
        if(response.length>0){
            response[0].fpos.fpoId
            let aggri = [
                {
                    '$match': {
                        'fpoId':  response[0].fpos[0].fpoId
                    }
                }, {
                    '$project': {
                        'fpoId': 1,
                        'fpoName': 1
                    }
                }, {
                    '$group': {
                        '_id': null,
                        'fpos': {
                            '$push': {
                                'fpoId': '$fpoId',
                                'fpoName': '$fpoName'
                            }
                        }
                    }
                }
            ]
            let response1=await newMongo.queryWithAggregator(aggri,'FPOmaster',db)
            res.send(response1[0].fpos)
            newMongo.mongoClose(db)
        }else{
            res.send([])
            newMongo.mongoClose(db)
        }
    }catch(e){
        ////////console.log('fig model',e.message);
    }
}

exports.getCropCata = function (req, res) {
    let aggregate = [
        {
            '$group': {
                '_id': {
                    'cropCatagory': '$Crop_category'
                },
                'cropCatagory': {
                    '$first': '$Crop_category'
                }
            }
        }
    ]

    mongo.queryWithAggregator(aggregate, 'cropMaster', function (response) {
        if (response) {
            res.send(response)
        }
    })
}

exports.getCropAccToCatagory = function (req, res) {
    let cropCat = req.params.cropCat
    let aggrigation = [
        {
            '$match': {
                'Crop_category': cropCat
            }
        }, {
            '$project': {
                '_id': 0,
                'Crop_Code': 1,
                'Crop_Name': 1
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, 'cropMaster', function (response) {
        res.send(response)
    })
}

// exports.getAllAvailableCropAccToCatagory = function (req, res) {
//     let data = req.params.godownId
//        let aggrigation = [
//         {'$match': {'destinationGodownId': data.godownId,  status: 'Received',cropCatagory:data.cropCatagory } }, 
//         {'$group': { _id:{Crop_Name:'$Crop_Name',cropCode:'$cropCode'}}},
//         {'$project':{ _id:0,Crop_Name:'$_id.Crop_Name',cropCode:'$_id.cropCode'}}
       
//     ]
//     mongo.queryWithAggregator(aggrigation, 'cropMaster', function (response) {
//         res.send(response)
//     })
// }

exports.getAppliedSaleIndents1 = async (req, res) => {
    try {
        
        let fpoId = req.params.fpoId
        let itemType = req.params.itemType
        let year = req.params.year
        let season = req.params.season
        //console.log(itemType,year,season);
        let db = await newMongo.mongoConnection()
        let aggregate = [
            {
              '$match': {
                'fpoId': fpoId, 
                'itemType': itemType, 
                'season': season, 
                'year': year
              }
            }, {
              '$project': {
                'farmer': 1, 
                'itemType': 1, 
                'technicalName': 1, 
                'cropCatagory': 1, 
                'crop': 1, 
                'variety': 1, 
                'class': 1, 
                'quantity': 1, 
                'brandName': 1, 
                'memtype': 1
              }
            }, {
              '$group': {
                '_id': {
                  'itemType': '$itemType', 
                  'technicalName': '$technicalName'
                }, 
                'count': {
                  '$sum': '$quantity'
                }
              }
            }, {
              '$project': {
                '_id': 0, 
                'itemType': '$_id.itemType', 
                'technicalName': '$_id.technicalName', 
                'count': 1
              }
            }
          ]
    let response = await newMongo.queryWithAggregator(aggregate, 'figIndentMaster', db)    
    // //console.log(response,"SEED");
        res.send(response)
        newMongo.mongoClose(db);
    } catch (e) {
 








































































































































        
    }

} 
exports.getAppliedSaleIndents = async (req, res) => {
    try {
        
        let fpoId = req.params.fpoId
        let itemType = req.params.itemType
        let year = req.params.year
        let season = req.params.season
        //console.log(itemType,year,season);
        let db = await newMongo.mongoConnection()
        let aggregate = [
            {
              '$match': {
                'fpoId': fpoId, 
                'itemType': itemType, 
                'season': season, 
                'year': year
              }
            }, {
              '$project': {
                'farmer': 1, 
                'itemType': 1, 
                'technicalName': 1, 
                'cropCatagory': 1, 
                'crop.Crop_Name': 1, 
                'variety': 1, 
                'class': 1, 
                'quantity': 1, 
                'brandName': 1, 
                'memtype': 1
              }
            }, {
              '$group': {
                '_id': {
                  'itemType': '$itemType', 
                  'cropCatagory': '$cropCatagory', 
                  'Crop_Name': '$crop.Crop_Name',
                  'technicalName': '$technicalName'
                }, 
                'count': {
                  '$sum': '$quantity'
                }
              }
            }, {
              '$project': {
                '_id': 0, 
                'itemType': '$_id.itemType', 
                'cropCatagory': '$_id.cropCatagory', 
                'Crop_Name': '$_id.Crop_Name', 
                'technicalName': '$_id.technicalName', 
                'count': 1
              }
            },
            {
                '$sort': {
                  'count': 1
                }}
          ]
    let response = await newMongo.queryWithAggregator(aggregate, 'figIndentMaster', db)    
    // //console.log(response,"SEED");
        res.send(response)
        newMongo.mongoClose(db);
    } catch (e) {
}

} 



exports.getAllVarieties = function (req, res) {
    let cropCode = req.params.cropCode
    let aggrigation = [
        {
            '$match': {
                'Crop_Code': cropCode
            }
        }, {
            '$project': {
                '_id': 0,
                'Variety_Code': 1,
                'Variety_Name': 1
            }
        }
    ]

    mongo.queryWithAggregator(aggrigation, 'varietyMaster', function (response) {
        res.send(response)
    })
}





exports.getAllVarieties = function (req, res) {
    let cropCode = req.params.cropCode
    let aggrigation = [
        {
            '$match': {
                'Crop_Code': cropCode
            }
        }, {
            '$project': {
                '_id': 0,
                'Variety_Code': 1,
                'Variety_Name': 1
            }
        }
    ]

    mongo.queryWithAggregator(aggrigation, 'varietyMaster', function (response) {
        res.send(response)
    })
}

exports.getItemTypeData = async (req, res) => {
    try {
        let db = await newMongo.mongoConnection()
        if (req.params.itemType == 'Fertilizer') {
            let aggregate = [
                {
                    '$group': {
                        '_id': {
                            'fertTypeName': '$fertTypeName',
                            'fertTypeId': '$fertTypeId'
                        }
                    }
                }
            ]
            let response = await newMongo.queryWithAggregator(aggregate, 'fertilizerMaster', db)
            res.send(response)
            newMongo.mongoClose(db)

        }
        if (req.params.itemType == 'Insecticides') {
            let aggregate1 = [
                {
                    '$group': {
                        '_id': {
                            'technicalName': '$technicalName'
                        }
                    }
                }
            ]
            let response = await newMongo.queryWithAggregator(aggregate1, 'insectisideMaster', db);
            res.send(response)
            newMongo.mongoClose(db)

        }
        if (req.params.itemType == 'Custome Hiring') {
            let aggregate5 = [
                {
                  '$match': {
                    'Status': 'A'
                  }
                }, {
                  '$group': {
                    '_id': '$Implement', 
                    'Impl_id': {
                      '$first': '$Impl_id'
                    }
                  }
                }, {
                  '$sort': {
                    '_id': 1
                  }
                }
              ]
            let response = await newMongo.queryWithAggregator(aggregate5, 'customeHiringImplementMaster', db);
            res.send(response)
            newMongo.mongoClose(db)

        }
    } catch (e) {

    }
}

exports.getFertBrand = async (req, res) => {
    try {
        let aggregate = [
            {
                '$match': {
                    'fertTypeName': req.params.fertTypeName
                }
            }, {
                '$group': {
                    '_id': {
                        'fertiliserName': '$fertiliserName'
                    }
                }
            }
        ]

        let db = await newMongo.mongoConnection()
        let response = await newMongo.queryWithAggregator(aggregate, 'fertilizerMaster', db)
        res.send(response)
        newMongo.mongoClose(db);
    } catch (e) {

    }
}

exports.onSubmitProducedForm = async function (data, callback) {
    try {
        let db = await newMongo.mongoConnection()
        let figData = await newMongo.findOne('figRegistrationMaster', { refNo: data.figRefNo }, db)
        data.figName = figData.figName
        data.forwardToFpo = false
        data.figProducedRegDate = new Date()
        let response = await newMongo.insertDocument(data, 'figProducedAggreMaster', db)
        callback(response)
        newMongo.mongoClose(db);
        // mongo.insertDocument(data, 'figProducedAggreMaster', function (response) {
        //     callback(response)
        // })
    } catch (e) {
        ////////console.log(e);
    }
}

exports.onSubmitIndentForm = async function (data, callback) {
    // //console.log(data,"in model indent");
    // try {
    //     Object.keys(data).forEach((key) => (data[key] == null && delete data[key]))
    //     let db = await newMongo.mongoConnection()
    //     let FPOData = await newMongo.findOne('FPOmaster', { fpoId: data.fpoId }, db)
    //     data.fpoName = FPOData.fpoName
    //     //console.log(FPOData,"model indent");
    //     let response = await newMongo.insertDocument(data, 'figIndentMaster', db)
    //     callback(response)
    //     newMongo.mongoClose(db);
    // } 
     try {
         //console.log(1);
        Object.keys(data).forEach((key) => (data[key] == null && delete data[key]))
      
        let db = await newMongo.mongoConnection()
        let aggregate=[ {'$match': {'fpoId': data.fpoId}}, {
            '$project': { '_id': 0, 'fpoId': 1,  'fpoName': 1,  'refNo': 1}}]
        let FPOData = await newMongo.queryWithAggregator(aggregate, 'FPOmaster', db)
       
        data.fpo = {
            refNo: FPOData.refNo,
            fpoId: FPOData.fpoId,
            fpoName: FPOData.fpoName
        }
        let response = await newMongo.insertDocument(data, 'figIndentMaster', db)
        callback(response)
        newMongo.mongoClose(db);
    }
    
    
    catch (e) {
       

    }
}

// exports.getAppliedSaleIndents=function(req,res){
//     let data=req.params.figRefNo
//     mongo.queryFindAll({indentSale:true,figRefNo:data},'figProducedAggreMaster',function(response){
//         if(response){
//             res.send(response)
//         }
//     })
// }
exports.getAppliedProducedAggregator = async (req, res) => {
    try {
        let data = req.params.figRefNo
        let db = await newMongo.mongoConnection()
        let response = await newMongo.queryFindAll({ producedSale: true, figRefNo: data }, 'figProducedAggreMaster', db)
        res.send(response)
        newMongo.mongoClose(db);
    } catch (e) {

    }

}




exports.getApprovedIndents = async (req, res) => {
    try {
        let data = req.params.figRefNo
        let db = await newMongo.mongoConnection()
        let response = await newMongo.queryFindAll({ producedSale: true, figRefNo: data, fpoApproved: true }, 'figProducedAggreMaster', db)
        res.send(response)
        newMongo.mongoClose(db);
    } catch (e) {

    }
}

exports.getRejectedIndents = async (req, res) => {
    try {
        let data = req.params.figRefNo
        let db = await newMongo.mongoConnection()
        let response = await newMongo.queryFindAll({ producedSale: true, figRefNo: data, rejectedByFpo: true }, 'figProducedAggreMaster', db)
        res.send(response)
        newMongo.mongoClose(db);
    } catch (e) {

    }
}

exports.getFarmers = async (req, res) => {
    try {
        let data = req.params.figRefNo
        let db = await newMongo.mongoConnection()
        // let response = await newMongo.queryFindAll({ status: 'approved', 'farmerForwardToFpoOrFig.refNo': data }, 'farmerRegistrationMaster', db)
        let aggregate = [
            {
                '$match': {
                    'status': 'approved',
                    'farmerForwardToFpoOrFig.refNo': data

                }
            }, {
                '$project': {
                    _id: 0,
                    'farmerId': 1,
                    'farmerName': 1,
                    'fullFarmerData.VCHMOBILENO': 1
                }
            }
        ]
        let response = await newMongo.queryWithAggregator(aggregate, 'farmerRegistrationMaster', db)
        res.send(response)
        newMongo.mongoClose(db);

    } catch (e) {

    }
}

exports.getApprovedDemandData = async (req, res) => {
    try {
        
        let db = await newMongo.mongoConnection()
        let response = await newMongo.queryFindAll({fpoApproved:true,figRefNo:req.params.figRefNo},'figIndentMaster',db)
        res.send(response);
        db.close();

    }
    catch (e) {
        //console.error(e);
        res.status(500).send('Unexpected error');
    }
}

exports.getRejectedDemandData = async (req, res) => {
    try {
        
        let db = await newMongo.mongoConnection()
        let response = await newMongo.queryFindAll({rejectedByFpo:true,figRefNo:req.params.figRefNo},'figIndentMaster',db)
        res.send(response);
        db.close();

    }
    catch (e) {
        //console.error(e);
        res.status(500).send('Unexpected error');
    }
}
