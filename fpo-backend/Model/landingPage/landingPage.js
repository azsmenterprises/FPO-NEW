const { ObjectID } = require('mongodb')
var mongo = require('../mongo/mongo')
var newMongo = require('../mongo/newMongo')


exports.figRegCheck = function (data, callback) {

    let aggregate = [
        {
            '$match': {
                '$or': [
                    {
                        'figName': data.figName
                    }, {
                        'leaderMobNo': data.mobileNo
                    }
                ]
            }
        }
    ]
    mongo.queryWithAggregator(aggregate, 'figRegistrationMaster', function (response) {
        // ////////console.log(99999, response);
        if (response.length > 0) {
            callback({ regExists: true })
        } else {
            // mongo.autoIncrement({figName:data.figName,mobileNo:data.mobileNo},'figRegistrationMaster',function(response2){
            //     data.refNo=response2
            //     mongo.insertDocument(data, 'figRegistrationMaster', function (response1) {
            //         callback({ regStatus: response1.insertedCount })
            //     })
            // })
            callback({ regExists: false })

        }
    })
}

exports.submitFigReg = function (data, callback) {
    data.status = 'pending'
    data.fpo = JSON.parse(data.fpo)
    mongo.autoIncrement({ figName: data.figName, mobileNo: data.mobileNo }, 'figRegistrationMaster', function (response2) {
        let refNo = "ODFIG" + response2
        data.refNo = refNo
        mongo.insertDocument(data, 'figRegistrationMaster', function (response) {
            if (response.insertedCount == 1) {
                callback({ status: response.insertedCount, data, randomNo: response2 })
            }
        })
    })
}

exports.figIdPassStoreOnApprove = function (data, callback) {
    data.userType = 'FIG'
    data.creationDate = new Date()
    mongo.insertDocument(data, 'userAuth', function (response) {
        callback({ status: response.insertedCount })
    })
}

exports.getVlgForFrmrReg = function (data, callback) {
    ////////console.log(data);
    //data=379717
    mongo.findOne('villageMaster', { villageCode: data.toString() }, function (response) {
        if (response) {
            mongo.findOne('gpMaster', { gpCode: response.gpCode }, function (response1) {
                if (response1) {
                    mongo.findOne('blockMaster', { blockCode: response.blockCode }, function (response2) {
                        if (response2) {
                            mongo.findOne('districtMaster', { districtCode: response.districtCode }, function (response3) {
                                callback({ village: response.villageName, gp: response1.gpName, block: response2.blockName, district: response3.districtName })
                            })
                        }
                    })
                }
            })
        }
    })
}

exports.getVlgForFrmrRegFromArray = async (data, callback) => {
    try {
        let db = await newMongo.mongoConnection()
        let count = 0
        data.forEach(async element => {
            count++
            let response = await newMongo.findOne('villageMaster', { villageCode: element.farmerData.LGDVillageCode.toString() }, db)
            if (response) {
                let response1 = await newMongo.findOne('gpMaster', { gpCode: response.gpCode }, db)
                if (response1) {
                    let response2 = await newMongo.findOne('blockMaster', { blockCode: response.blockCode }, db)
                    if (response2) {
                        let response3 = await newMongo.findOne('districtMaster', { districtCode: response.districtCode }, db)
                        data[count - 1].address = { village: response.villageName, gp: response1.gpName, block: response2.blockName, district: response3.districtName }

                        if (data.length == count) {
                            callback(data)
                            db.close()
                        }
                    }
                }
            }

        })

    } catch (e) {

    }
}

exports.getCropData = function (req, res) {
    mongo.findAll('cropMaster', function (response) {
        res.send(response)
    })
}

exports.submitFarmerReg = function (req, res) {
    mongo.queryFindAll({ farmerId: req.body.farmerId, farmerName: req.body.farmerName }, 'membersCorner', function (response1) {
        if (response1.length == 0) {
            req.body.status = 'pending'
            req.body.regDate = new Date()
            ////////console.log(req.body,3333333);
            mongo.insertDocument(req.body, 'membersCorner', function (response) {
                res.send({ status: response.insertedCount })
            })
        } else {
            res.send({ status: 'exists' })
        }
    })

}

exports.getAllFigs = function (req, res) {
    let aggregate = [
        {
            '$match': {
                'status': 'approved'
            }
        }, {
            '$project': {
                '_id': 0,
                'figName': 1,
                'refNo': 1
            }
        }
    ]
    mongo.queryWithAggregator(aggregate, 'figRegistrationMaster', function (response) {
        res.send(response)
    })
}

exports.getAllFpos = function (req, res) {
    let aggregate = [
        {
            '$match': {
            }
        }, {
            '$project': {
                '_id': 0,
                'fpoName': 1,
                'fpoId': 1,
                'refNo': 1
            }
        }
    ]
    mongo.queryWithAggregator(aggregate, 'FPOmaster', function (response) {
        if (response) {
            res.send(response)
        }
    })
}

exports.getAllFposFromDist = function (req, res) {
    ////////console.log(req.params,"BAL");
    let aggregate = [
        {
            '$match': {  "FPOData.district_id": req.distCode}
        }, {
            '$project': {
                '_id': 0,
                'fpoName': 1,
                'fpoId': 1,
                'refNo': 1
            }
        }
    ]
    mongo.queryWithAggregator(aggregate, 'FPOmaster', function (response) {
        if (response) {
            res(response)
        }
    })
}






exports.TestCheck = async (data,data1,callback) => {
    //console.log("bal");
    try {
        //console.log(data);
        callback(true)
       
    } catch (e) {
        //console.log(e.message);
    }
}
exports.titleEdit = function (req, res) {

    let aggregate=[
        {
          '$match': {
            'type': 'fpoUpdate'
          }
        }, {
          '$sort': {
            '_id': -1
          }
        }
      ]

    mongo.queryWithAggregator(aggregate, 'Info-Box', function (response) {
        // //////console.log(response,"infobox");

        res.send(response)
    })
}

exports.location = function (req, res) {
    let aggregation = [{ $match: { lat: { $exists: true }, long: { $exists: true } } },
    { $project: { _id: 0 } }]
    mongo.queryWithAggregator(aggregation, 'fpoLocation', function (response) {
        if (response) {
            res.send(response)
        }
    })
}

exports.getStateWiseFPO = function (req, res) {
    let aggregation = [
        {
            '$group': {
                '_id': '$FPOData.district',
                'fpoCount': {
                    '$sum': 1
                }
            }
        }
    ]

    mongo.queryWithAggregator(aggregation, 'FPOmaster', function (response) {
        if (response) {
            res.send(response)
        }
    })

}

exports.getStateWiseFPOData = function (req, res) {
    let aggregation = [
        {
            '$match': {
                'FPOData.district': req.params.distname
            }
        }, {
            '$project': {
                '_id': 0,
                'fpoId': 1,
                'FPOData.district': 1,
                'FPOData.village': 1,
                'FPOData.fpoContactNo': 1
            }
        }
    ]
    mongo.queryWithAggregator(aggregation, 'FPOmaster', function (response) {
        res.send(response)
    })
}

exports.getDistricts = function (req, res) {
    mongo.findAll('districtMaster', function (response) {
        res.send(response)
    })
}

exports.getCrops = function (req, res) {
    ////////console.log(req.query,77777);
    mongo.queryFindAll({Crop_category:req.query.ctg},'cropMaster' , function (response) {
        ////////console.log(response,88888);
        res.send(response)
    })
}

exports.getBlocksOfDistrict = async function (req, res) {
    try {
        let aggregate = [ { '$match': { districtCode: req.params.distCode}  },
         { '$project': {_id:0,districtCode:1,blockCode:1, blockName:{ '$toUpper': '$blockName' } }}, 
        ]
        const db = await newMongo.mongoConnection();
        let response = await newMongo.queryWithAggregator(aggregate, 'blockMaster', db)
        res.send(response)
        newMongo.mongoClose(db)
    } catch (e) { } 
}

exports.getGP = function (req, res) {
    mongo.queryFindAll({ blockCode: req.params.blockCode }, 'gpMaster', function (response) {
        res.send(response)
    })
}

exports.getVillage = function (req, res) {
    mongo.queryFindAll({ gpCode: req.params.gpCode }, 'villageMaster', function (response) {
        res.send(response)
    })
}

exports.media = async function (req, res) {
    try {
        let db = await newMongo.mongoConnection()
        let aggregate = [ { '$match': { status:"Active"}  },
        { '$project': {_id:0}}
       ]
       let response = await newMongo.queryWithAggregator(aggregate, 'media', db)
        res.send(response)
        newMongo.mongoClose(db)
    } catch (e) {

    }
}

exports.fpoDetailsForScroll = async (req, res) => {
    try {
        let aggregate = [
            {
                '$project': {
                    'fpoName': 1,
                    'FPOData.fpoContactNo': 1,
                    'FPOData.village': 1,
                    'FPOData.district': 1
                }
            }
        ]
        let db = await newMongo.mongoConnection()
        let response = await newMongo.queryWithAggregator(aggregate, 'FPOmaster', db)
        res.send(response)
        newMongo.mongoClose(db);
    } catch (e) {

    }
}

exports.getAllSchemes = async (callback) => {
    try {
      let aggregate = [
        {
          '$match': {
            'status': 'active', 
            'type': 'new'
          }
        }, {
          '$sort': {
            '_id': -1
          }
        }
      ]
        let db = await newMongo.mongoConnection()
        let response = await newMongo.queryWithAggregator(aggregate, 'schemesMaster', db)
        callback(response)
        newMongo.mongoClose(db)
    } catch (e) {
        ////////console.log('landing page model' + e.message);
    }
}

exports.getAllSchemesOdia = async (callback) => {
    try {
        let db = await newMongo.mongoConnection()
        let response = await newMongo.queryFindAll({ status: 'active', type: "new" }, 'schemesMasterOdia', db)
        callback(response)
        newMongo.mongoClose(db)
    } catch (e) {
        ////////console.log('landing page model' + e.message);
    }
}

exports.schemeDetails = async (id, callback) => {
    try {
        let db = await newMongo.mongoConnection()
        let response = await newMongo.findOne('schemesMaster', { _id: ObjectID(id) }, db)
        callback(response)
        newMongo.mongoClose(db)

    } catch (e) {
        ////////console.log(e.message);
    }
}
exports.getAllDepartmentsForSchemes = async (req, res) => {
    try {
        let aggregate = [
            {
                '$group': {
                    '_id': {
                        'concernedDepartment': '$concernedDepartment'
                    }
                }
            }, {
                '$group': {
                    '_id': null,
                    'departments': {
                        '$push': '$_id.concernedDepartment'
                    }
                }
            }
        ]

        let db = await newMongo.mongoConnection()
        let response = await newMongo.queryWithAggregator(aggregate, 'schemesMaster', db)
        res.send(response)
        newMongo.mongoClose(db);
    } catch (e) {
        ////////console.log(e.message);
    }
}

exports.getAllBeneficiaryTypes = async (req, res) => {
    try {
        let aggregate = [
            {
                '$group': {
                    '_id': {
                        'beneficiaryType': '$beneficiaryType'
                    }
                }
            }, {
                '$group': {
                    '_id': null,
                    'beneficiaryType': {
                        '$push': '$_id.beneficiaryType'
                    }
                }
            }
        ]

        let db = await newMongo.mongoConnection()
        let response = await newMongo.queryWithAggregator(aggregate, 'schemesMaster', db)
        res.send(response)
        newMongo.mongoClose(db);
    } catch (e) {
        ////////console.log(e.message);
    }
}

exports.getSchemeAccToDepartment = async (data, callback) => {
    try {
        // ////////console.log(data);
        let db = await newMongo.mongoConnection()
        let response = await newMongo.queryFindAll({ concernedDepartment: data.selectedDepartment, beneficiaryType: data.selectedBeneficiary }, 'schemesMaster', db)
        //////console.log(response,"444");
        callback(response)
        newMongo.mongoClose(db)
    } catch (e) {
        ////////console.log(e.message);
    }
}

exports.schemedetailView = async (data, callback) => {
    // console.log(data,"datadatadata");
    try {
        let db = await newMongo.mongoConnection()
        let response = await newMongo.queryFindAll({ concernedDepartment: data.concernedDepartment }, 'schemesMaster', db)
        // console.log(response,'response  from');
        callback(response)
        newMongo.mongoClose(db)
    } catch (e) {
        console.log(e.message);
    }
}


// =========================CG Registration start========================================


exports.cgFormSubmit = async (data, callback) => {
    try {
        let db = await newMongo.mongoConnection()
        let randomValue = await newMongo.autoIncrement({}, 'consumerGroup', db)
        let refNo = 'ODCG' + randomValue
        data.refNo = refNo
        data.status = 'Pending'
        data.insertionDate = new Date()
        let response = await newMongo.insertDocument(data, 'consumerGroup', db)
        if (response.insertedCount > 0) {
            let dataForAuth = {
                refNo: refNo,
                userId: refNo,
                mobileNo: data.cgMobNo,
                password: data.password,
                userType: data.groupRegType,
                creationDate: new Date()
            }
            let response2 = await newMongo.insertDocument(dataForAuth, 'userAuth', db)
            callback({ status: response2.insertedCount, userId: refNo })
            newMongo.mongoClose(db);

        }

    } catch (e) {
        ////////console.log(e.message);
    }
}


// exports.consumerRegistrationSubmit = async (data, callback) => {
//     try {
//         let db = await newMongo.mongoConnection()
//         let response = await newMongo.insertDocument(data, 'consumerRegistration', db)
//         callback(response)
//         newMongo.mongoClose(db);

//     } catch (e) {
//         ////////console.log(e.message);
//     }
// }


// =========================CG Registration end========================================

// ============================Consumer Registration Start=============================

exports.getallConsumerdata = function (req, res) {
    mongo.queryFindAll({ cgDistCode: req.params.distCode }, 'consumerGroup', function (response) {
        res.send(response)
    })
}
exports.getConsumerdata = async (req, res) => {
    let data = JSON.parse(req.params.csData)
    try {
        let db = await newMongo.mongoConnection()
        const response = await newMongo.findOne('consumerGroup', { cgDistName: data.cgDistName, cgName: data.cgName, refNo: data.refNo }, db)
        res.send(response)
        newMongo.mongoClose(db);
    } catch (e) {
        ////////console.log(e.message);

    }
}

exports.consumerRegistrationSubmit = async (data, callback) => {
    try {
        data.consumerGroup = JSON.parse(data.consumerGroup)
        let cgData = {
            cgName: data.consumerGroup.cgName,
            cgMobNo: data.consumerGroup.cgMobNo,
            refNo: data.consumerGroup.refNo
        }
        delete data.consumerGroup
        delete data.confirmPassword
        data.consumerGroup = cgData
        data.status = 'pending'
        let db = await newMongo.mongoConnection()
        let refNo = await newMongo.autoIncrement({}, 'consumerRegistration', db)
        data.consumerRefNo = "OD" + data.csDistCode + "CS" + refNo
        let response = await newMongo.insertDocument(data, 'consumerRegistration', db)
        callback({ status: response.insertedCount, consumerId: data.consumerRefNo })
        newMongo.mongoClose(db);

    } catch (e) {
        ////////console.log(e.message);
    }
}

// ============================Consumer Registration End=============================

// ============================Trader Registration start=============================
exports.traderFormSubmit = async (data, callback) => {
    try {
        let db = await newMongo.mongoConnection()
        let randomValue = await newMongo.autoIncrement({}, 'consumerGroup', db)
        let refNo = 'ODTRADER' + randomValue
        data.refNo = refNo
        data.status = 'Pending'
        data.insertionDate = new Date()
        let response = await newMongo.insertDocument(data, 'consumerGroup', db)
        if (response.insertedCount > 0) {
            let dataForAuth = {
                refNo: refNo,
                userId: refNo,
                mobileNo: data.cgMobNo,
                password: data.password,
                userType: data.groupRegType,
                creationDate: new Date()
            }
            let response2 = await newMongo.insertDocument(dataForAuth, 'userAuth', db)
            callback({ status: response2.insertedCount, userId: refNo })
            newMongo.mongoClose(db);

        }

    } catch (e) {
        ////////console.log(e.message);
    }
}
// ============================Trader Registration end=============================


exports.getAllFpoLocations = async (callback) => {
    try {
        let db = await newMongo.mongoConnection()
        let aggregate = [
            {
                '$project': {
                    'fpoId': 1,
                    'fpoName': 1,
                    'refNo': 1,
                    'FPOData.village': 1,
                    'FPOData.fpoContactNo': 1,
                    'FPOData.district': 1,
                    'FPOData.address': 1,
                    'FPOData.fpoLatitude': 1,
                    'FPOData.fpoLongitude': 1,_id:0
                }
            }
        ]
        let response = await newMongo.queryWithAggregator(aggregate, 'FPOmaster', db)
        callback(response)
        db.close()
    } catch (e) {

    }
}


exports.getAllFaqTypes = async (req, res) => {
    try {
        let aggregate = [
            {
                '$group': {
                    '_id': '$typeAs',
                    'others': { '$push': { 'answer': '$answer', 'question': '$question' } }
                }
            },
            { '$project': { '_id': 0, 'typeAs': '$_id', 'others': 1 } }];
        let db = await newMongo.mongoConnection()
        let response = await newMongo.queryWithAggregator(aggregate, 'FAQ', db)
        res.send(response)
        newMongo.mongoClose(db);
    } catch (e) {
        ////////console.log(e.message);
        res.send(e)
    }
}

exports.feedbackformsubmit = async (data, callback) => {
    try {
        let db = await newMongo.mongoConnection()
        data.date = new Date()
        let response = await newMongo.insertDocument(data, 'feedBack', db)
        callback({ status: response.insertedCount, feedbackType: data.feedbackType })
        newMongo.mongoClose(db);

    } catch (e) {
        ////////console.log(e.message);
    }
}

exports.getlandingpagetopmenuData = async (req, res) => {
    // ////////console.log(req.params.id);
    let data = req.params.id
    try {
        let db = await newMongo.mongoConnection()
        let response = await newMongo.findOne('landingPageTopBarData', { id: data }, db)
        // ////////console.log(response);
        res.send(response);
        db.close();

    }
    catch (e) {
        //console.error(e);
        res.status(500).send('Unexpected error');
    }
}

exports.fpoRegformSubmit = async (data, callback) => {
    try {
        //console.log(data,"hhere model");
        let finalData = {
            fpoName: data.fpoName,
            fpoId: '',
            refNo: '',
            FPOData: {
                district: data.districtName,
                district_id: data.districtCode,
                block: data.blockName,
                block_id: data.blockCode,
                state: 'Odisha',
                gramPanchayat: data.gpName,
                gramPanchayatCode: data.gpCode,
                village: data.villageName,
                villageCode: data.villageCode,
                fpoContactNo: data.fpoContactNo,
                fpoMailId: data.fpoMail,
                regNoOfFPO: data.cinNo,
            },
            insertionDate: new Date(),
            insertionType: 'systemFpoRegistration',
            status: 'Pending'

        }
        //console.log();
        let db = await newMongo.mongoConnection()
        let idAutoIncrement = await newMongo.autoIncrement({}, 'FPOmaster', db)
        finalData.fpoId = 'OD' + data.districtCode + 'FPO' + idAutoIncrement
        finalData.refNo = 'OD' + data.blockName.substring(0, 3).toUpperCase() + 'FPO' + idAutoIncrement
        let response = await newMongo.insertDocument(finalData, 'FPOmaster', db)
        callback({response:response.insertedCount,response2:finalData.refNo})
        newMongo.mongoClose(db);

    } catch (e) {
        //console.log(e.message);
    }
}

exports.searchFAQ = async (searchFAQ, callback) => {
    try {
        let aggregate =
            [{
                '$project': {
                    'answerU': { '$toUpper': '$answer' }, 'questionU': { '$toUpper': '$question' },
                    'typeAsU': { '$toUpper': '$typeAs' }, answer: 1, question: 1, typeAs: 1
                }
            },
            {
                '$match': {
                    '$or': [{ 'answerU': { '$regex': searchFAQ.toUpperCase() } },
                    { 'questionU': { '$regex': searchFAQ.toUpperCase() } },
                    { 'typeAsU': { '$regex': searchFAQ.toUpperCase() } }]
                }
            },
            {
                '$group': {
                    '_id': '$typeAs',
                    'others': { '$push': { 'answer': '$answer', 'question': '$question' } }
                }
            },
            { '$project': { '_id': 0, 'typeAs': '$_id', 'others': 1 } }
            ]

        const db = await newMongo.mongoConnection();
        let response = await newMongo.queryWithAggregator(aggregate, 'FAQ', db)
        ////////console.log(response);
        callback(response)
        newMongo.mongoClose(db)
    } catch (e) {

    }
}




exports.getcircularNotice = async function (callback) {
    var aggregate = [
        {
          '$project': {
            'id': 0, 
            'visibility': 0, 
            'type': 0, 
            'img': 0
          }
        }, {
          '$sort': {
            '_id': -1
          }
        }, {
          '$project': {
            '_id': 0
          }
        }
      ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "Info-Box",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };




  exports.getFpoDetailsIndex = async function (callback) {
    var aggregate = [
        {
          '$project': {
            'fpoName': 1, 
            'address': '$FPOData.address'
          }
        }
      ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };

exports.updateParameter = function (req, res) {
    mongo.updateMany({updated:true}, {InfrastructureDetail:[],storageDetails:[],primaryBusinessDetails:[],equityGrant:[],creditGrant:[],otherScheme:[],License:[]}, "FPOmaster", function (response) {       
        res.send(true)
    })
}



  exports.getDetatilsForOdisha = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpo': {
            '$sum': 1
          }, 
          'totalFarmer': {
            '$sum': '$totalFarmer'
          }
        }
      }, {
        '$project': {
          '_id': 0
        }
      }
    ]
      
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      // console.log(response,"4444");
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };


  exports.getDetatilsForMayurbhanj = async function (callback) {
    var aggregate =[
      {
        '$match': {
          'FPOData.district_id': '365', 
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksMayurbhanj': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoMayurbhanj': {
            '$sum': 1
          }, 
          'totalFarmerMayurbhanj': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredMayurbhanj': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksMayurbhanj'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoMayurbhanj': 1, 
          'totalFarmerMayurbhanj': 1, 
          'totalVillageCoveredMayurbhanj': 1, 
          'totalBlocksMayurbhanj': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };

  exports.getDetatilsForSundargarh = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '373',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksSundargarh': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoSundargarh': {
            '$sum': 1
          }, 
          'totalFarmerSundargarh': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredSundargarh': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksSundargarh'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoSundargarh': 1, 
          'totalFarmerSundargarh': 1, 
          'totalVillageCoveredSundargarh': 1, 
          'totalBlocksSundargarh': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };

 
  exports.getDetatilsForKeonjhar = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '361',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksKeonjhar': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoKeonjhar': {
            '$sum': 1
          }, 
          'totalFarmerKeonjhar': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredKeonjhar': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksKeonjhar'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoKeonjhar': 1, 
          'totalFarmerKeonjhar': 1, 
          'totalVillageCoveredKeonjhar': 1, 
          'totalBlocksKeonjhar': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };


  exports.getDetatilsForKandhamal = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '359',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksKandhamal': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoKandhamal': {
            '$sum': 1
          }, 
          'totalFarmerKandhamal': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredKandhamal': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksKandhamal'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoKandhamal': 1, 
          'totalFarmerKandhamal': 1, 
          'totalVillageCoveredKandhamal': 1, 
          'totalBlocksKandhamal': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };

  exports.getDetatilsForGanjam = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '354',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksGanjam': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoGanjam': {
            '$sum': 1
          }, 
          'totalFarmerGanjam': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredGanjam': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksGanjam'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoGanjam': 1, 
          'totalFarmerGanjam': 1, 
          'totalVillageCoveredGanjam': 1, 
          'totalBlocksGanjam': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };

  exports.getDetatilsForKalahandi = async function (callback) {
    var aggregate =[
      {
        '$match': {
          'FPOData.district_id': '358',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksKalahandi': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoKalahandi': {
            '$sum': 1
          }, 
          'totalFarmerKalahandi': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredKalahandi': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksKalahandi'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoKalahandi': 1, 
          'totalFarmerKalahandi': 1, 
          'totalVillageCoveredKalahandi': 1, 
          'totalBlocksKalahandi': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };

  exports.getDetatilsForKoraput = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '363',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksKoraput': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoKoraput': {
            '$sum': 1
          }, 
          'totalFarmerKoraput': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredKoraput': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksKoraput'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoKoraput': 1, 
          'totalFarmerKoraput': 1, 
          'totalVillageCoveredKoraput': 1, 
          'totalBlocksKoraput': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };

  exports.getDetatilsForAnugul = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '344',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksAnugul': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoAnugul': {
            '$sum': 1
          }, 
          'totalFarmerAnugul': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredAnugul': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksAnugul'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoAnugul': 1, 
          'totalFarmerAnugul': 1, 
          'totalVillageCoveredAnugul': 1, 
          'totalBlocksAnugul': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForSambalpur = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '371',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksSambalpur': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoSambalpur': {
            '$sum': 1
          }, 
          'totalFarmerSambalpur': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredSambalpur': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksSambalpur'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoSambalpur': 1, 
          'totalFarmerSambalpur': 1, 
          'totalVillageCoveredSambalpur': 1, 
          'totalBlocksSambalpur': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };

  exports.getDetatilsForNabarangpur = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '366',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksNabarangpur': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoNabarangpur': {
            '$sum': 1
          }, 
          'totalFarmerNabarangpur': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredNabarangpur': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksNabarangpur'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoNabarangpur': 1, 
          'totalFarmerNabarangpur': 1, 
          'totalVillageCoveredNabarangpur': 1, 
          'totalBlocksNabarangpur': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForRayagada = async function (callback) {
    var aggregate =  [
      {
        '$match': {
          'FPOData.district_id': '370',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksRayagada': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoRayagada': {
            '$sum': 1
          }, 
          'totalFarmerRayagada': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredRayagada': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksRayagada'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoRayagada': 1, 
          'totalFarmerRayagada': 1, 
          'totalVillageCoveredRayagada': 1, 
          'totalBlocksRayagada': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForBargarh = async function (callback) {
    var aggregate =  [
      {
        '$match': {
          'FPOData.district_id': '347',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksBargarh': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoBargarh': {
            '$sum': 1
          }, 
          'totalFarmerBargarh': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredBargarh': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksBargarh'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoBargarh': 1, 
          'totalFarmerBargarh': 1, 
          'totalVillageCoveredBargarh': 1, 
          'totalBlocksBargarh': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForBalangir = async function (callback) {
    var aggregate =  [
      {
        '$match': {
          'FPOData.district_id': '345',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksBalangir': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoBalangir': {
            '$sum': 1
          }, 
          'totalFarmerBalangir': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredBalangir': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksBalangir'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoBalangir': 1, 
          'totalFarmerBalangir': 1, 
          'totalVillageCoveredBalangir': 1, 
          'totalBlocksBalangir': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForDhenkanal = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '352',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksDhenkanal': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoDhenkanal': {
            '$sum': 1
          }, 
          'totalFarmerDhenkanal': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredDhenkanal': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksDhenkanal'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoDhenkanal': 1, 
          'totalFarmerDhenkanal': 1, 
          'totalVillageCoveredDhenkanal': 1, 
          'totalBlocksDhenkanal': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForBalasore = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '346',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksBalasore': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoBalasore': {
            '$sum': 1
          }, 
          'totalFarmerBalasore': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredBalasore': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksBalasore'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoBalasore': 1, 
          'totalFarmerBalasore': 1, 
          'totalVillageCoveredBalasore': 1, 
          'totalBlocksBalasore': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForKhordha = async function (callback) {
    var aggregate =  [
      {
        '$match': {
          'FPOData.district_id': '362',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksKhordha': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoKhordha': {
            '$sum': 1
          }, 
          'totalFarmerKhordha': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredKhordha': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksKhordha'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoKhordha': 1, 
          'totalFarmerKhordha': 1, 
          'totalVillageCoveredKhordha': 1, 
          'totalBlocksKhordha': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForGajapati = async function (callback) {
    var aggregate =[
      {
        '$match': {
          'FPOData.district_id': '353',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksGajapati': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoGajapati': {
            '$sum': 1
          }, 
          'totalFarmerGajapati': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredGajapati': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksGajapati'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoGajapati': 1, 
          'totalFarmerGajapati': 1, 
          'totalVillageCoveredGajapati': 1, 
          'totalBlocksGajapati': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForNayagarh = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '367',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksNayagarh': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoNayagarh': {
            '$sum': 1
          }, 
          'totalFarmerNayagarh': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredNayagarh': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksNayagarh'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoNayagarh': 1, 
          'totalFarmerNayagarh': 1, 
          'totalVillageCoveredNayagarh': 1, 
          'totalBlocksNayagarh': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForCuttack = async function (callback) {
    var aggregate =[
      {
        '$match': {
          'FPOData.district_id': '350',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksCuttack': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoCuttack': {
            '$sum': 1
          }, 
          'totalFarmerCuttack': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredCuttack': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksCuttack'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoCuttack': 1, 
          'totalFarmerCuttack': 1, 
          'totalVillageCoveredCuttack': 1, 
          'totalBlocksCuttack': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForBoudh = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '349',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksBoudh': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoBoudh': {
            '$sum': 1
          }, 
          'totalFarmerBoudh': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredBoudh': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksBoudh'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoBoudh': 1, 
          'totalFarmerBoudh': 1, 
          'totalVillageCoveredBoudh': 1, 
          'totalBlocksBoudh': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForMalkangiri = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '364',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksMalkangiri': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoMalkangiri': {
            '$sum': 1
          }, 
          'totalFarmerMalkangiri': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredMalkangiri': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksMalkangiri'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoMalkangiri': 1, 
          'totalFarmerMalkangiri': 1, 
          'totalVillageCoveredMalkangiri': 1, 
          'totalBlocksMalkangiri': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForDeogarh = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '351',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksDeogarh': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoDeogarh': {
            '$sum': 1
          }, 
          'totalFarmerDeogarh': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredDeogarh': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksDeogarh'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoDeogarh': 1, 
          'totalFarmerDeogarh': 1, 
          'totalVillageCoveredDeogarh': 1, 
          'totalBlocksDeogarh': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForKendrapada = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '360',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksKendrapada': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoKendrapada': {
            '$sum': 1
          }, 
          'totalFarmerKendrapada': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredKendrapada': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksKendrapada'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoKendrapada': 1, 
          'totalFarmerKendrapada': 1, 
          'totalVillageCoveredKendrapada': 1, 
          'totalBlocksKendrapada': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForJajpur = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '356',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksJajpur': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoJajpur': {
            '$sum': 1
          }, 
          'totalFarmerJajpur': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredJajpur': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksJajpur'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoJajpur': 1, 
          'totalFarmerJajpur': 1, 
          'totalVillageCoveredJajpur': 1, 
          'totalBlocksJajpur': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForNuapada = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '368',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksNuapada': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoNuapada': {
            '$sum': 1
          }, 
          'totalFarmerNuapada': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredNuapada': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksNuapada'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoNuapada': 1, 
          'totalFarmerNuapada': 1, 
          'totalVillageCoveredNuapada': 1, 
          'totalBlocksNuapada': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForBhadrak = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '348',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksBhadrak': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoBhadrak': {
            '$sum': 1
          }, 
          'totalFarmerBhadrak': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredBhadrak': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksBhadrak'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoBhadrak': 1, 
          'totalFarmerBhadrak': 1, 
          'totalVillageCoveredBhadrak': 1, 
          'totalBlocksBhadrak': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForPuri = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '369',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksPuri': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoPuri': {
            '$sum': 1
          }, 
          'totalFarmerPuri': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredPuri': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksPuri'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoPuri': 1, 
          'totalFarmerPuri': 1, 
          'totalVillageCoveredPuri': 1, 
          'totalBlocksPuri': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForSonepur = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '372',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksSonepur': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoSonepur': {
            '$sum': 1
          }, 
          'totalFarmerSonepur': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredSonepur': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksSonepur'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoSonepur': 1, 
          'totalFarmerSonepur': 1, 
          'totalVillageCoveredSonepur': 1, 
          'totalBlocksSonepur': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForJagatsinghpur = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '355',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksJagatsinghpur': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoJagatsinghpur': {
            '$sum': 1
          }, 
          'totalFarmerJagatsinghpur': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredJagatsinghpur': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksJagatsinghpur'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoJagatsinghpur': 1, 
          'totalFarmerJagatsinghpur': 1, 
          'totalVillageCoveredJagatsinghpur': 1, 
          'totalBlocksJagatsinghpur': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };
  exports.getDetatilsForJharsuguda = async function (callback) {
    var aggregate = [
      {
        '$match': {
          'FPOData.district_id': '357',
          'status': 'Approved'
        }
      }, {
        '$project': {
          'totalFarmer': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfFarmerMember', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfFarmerMember'
              }
            }
          }, 
          'totalBlocksJharsuguda': '$FPOData.block_id', 
          'totalVillage': {
            '$cond': {
              'if': {
                '$eq': [
                  '$FPOData.noOfVillageCovered', ''
                ]
              }, 
              'then': 0, 
              'else': {
                '$toInt': '$FPOData.noOfVillageCovered'
              }
            }
          }
        }
      }, {
        '$group': {
          '_id': null, 
          'totalFpoJharsuguda': {
            '$sum': 1
          }, 
          'totalFarmerJharsuguda': {
            '$sum': '$totalFarmer'
          }, 
          'totalVillageCoveredJharsuguda': {
            '$sum': '$totalVillage'
          }, 
          'uniqueBlockIds': {
            '$addToSet': '$totalBlocksJharsuguda'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'totalFpoJharsuguda': 1, 
          'totalFarmerJharsuguda': 1, 
          'totalVillageCoveredJharsuguda': 1, 
          'totalBlocksJharsuguda': {
            '$size': '$uniqueBlockIds'
          }
        }
      }
    ]
    try {
        const db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregate, "FPOmaster",db);
      callback(response)
    } catch (err) {
      console.log(err);
    }
  
  };

  exports.submitGrievance =async (data, callback) => {
    data.submitedOn = new Date();
    data.petitioner_name = data.petitioner_name;
    data.email = data.email;
    data.mobile_no = data.mobile_no;
    data.district = data.district;
    data.block = data.block;
    data.address = data.address;
    data.sender_identity = data.sender_identity;
    data.to_whom = data.to_whom;
    data.grievance_receive_date =new Date(data.grievance_receive_date);
    data.upload = data.uploadUrl;
    
   
    mongo.insertDocument(data, "GrievanceSubmit", db,function (response) {
        callback(true);
    })
}
