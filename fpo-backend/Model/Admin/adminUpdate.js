var mongo = require('../mongo/mongo')
var newmongo = require('../mongo/newMongo')
const moment = require('moment')

exports.getAllData = function (callback) {
  mongo.findAll('Info-Box', function (response) {
    if (response) {
      callback(response)
    }
  })
}

exports.addData = function (data, callback) {
  mongo.autoIncrement({}, 'Info-Box', function (response) {
    if (response) {
      data.id = response
      // data.type="A"
      data.visivility = true
      mongo.insertDocument(data, 'Info-Box', function (response1) {
        callback(response1)
      })
    }
  })

}

exports.delete = function (data, callback) {
  mongo.removeDocument({ id: parseInt(data) }, 'Info-Box', function (response) {
    callback(response)
  })
}

exports.update = function (data, callback) {
  mongo.updateOne({ id: parseInt(data.id) }, { text: data.menu.text, url: data.menu.url, fromdate: data.menu.fromdate, todate: data.menu.todate }, 'Info-Box', function (response) {
    callback(response)
  })
}

exports.getFigRegisterData = function (req, res) {
  mongo.queryFindAll({ status: 'pending' }, 'figRegistrationMaster', function (response) {
    res.send(response)
  })
}

exports.approveFig = function (data, callback) {
  mongo.updateOne({ figName: data.figName, mobileNo: data.mobileNo, noOfFarmers: data.noOfFarmers }, { status: 'approved', approveDate: new Date(), approvedBy: 'admin' }, 'figRegistrationMaster', function (response) {
    mongo.findOne('figRegistrationMaster', { figName: data.figName, mobileNo: data.mobileNo, noOfFarmers: data.noOfFarmers }, function (response1) {
      if (response1) {
        let randomNo = response1.refNo.substring(5)
        callback({ status: response.modifiedCount, response1, randomNo: randomNo })
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

exports.rejectFig = function (data, callback) {
  mongo.updateOne({ figName: data.figName, mobileNo: data.mobileNo, noOfFarmers: data.noOfFarmers }, { status: 'rejected' }, 'figRegistrationMaster', function (response) {
    callback({ status: response.modifiedCount, mobNo: data.mobileNo })
  })
}

exports.schemeMasterForm = async (data, callback) => {
  try {
    data.status = "active";
    let db = await newmongo.mongoConnection()
    let response = await newmongo.insertDocument(data, 'schemesMaster', db)
    callback(response.insertedCount)
    newmongo.mongoClose(db)
  } catch (e) {
  }
}

exports.getDataForDashboard = async (req, res) => {
  try {
    const db = await newmongo.mongoConnection()
    var cropProduction_count_aggregate = ([
      { $match: { 'fpo.fpoId': "fpo1" } },
      { $group: { _id: null, myCount: { $sum: 1 } } },
      { $project: { _id: 0 } }
    ]);
    var directors_count_aggregate = ([
      { $match: { fpoId: "fpo1" } },
      { $project: { _id: 0 } },
      {
        $project:
          { numberOfDirectors: { $size: "$boardDirectorsDetails" } }
      }
    ])
    const cropProduction_count = await newmongo.queryWithAggregator(cropProduction_count_aggregate, 'figProducedAggreMaster', db)
    const directors_count = await newmongo.queryWithAggregator(directors_count_aggregate, 'FPOmaster', db)
    // const cropProduction_count = await dbo.collection(collection.CROP_PRODUCTION).aggregate( cropProduction_count_aggregate ).toArray();
    // const directors_count = await dbo.collection(collection.FPO_MASTER).aggregate( directors_count_aggregate ).toArray();
    var result = ({
      cropProduction_count, directors_count
    })
    res.send(result);
    db.close();
  }
  catch (e) {
    console.error(e);
    res.status(500).send('Unexpected error');
  }
}

exports.dateForDashboard = async (req, res) => {
  try {
    let db = await newmongo.mongoConnection()
    var today = moment(new Date()).format('YYYY-MM-DD');
    let meeting_scheduled = await newmongo.queryFindAll({ fpoId: "fpo1", "meetingDate": { "$gt": today } }, 'meetingsDetails', db)
    let meeting_conducted = await newmongo.queryFindAll({ fpoId: "fpo1", "meetingDate": { "$lte": today } }, 'meetingsDetails', db)

    var result = ({
      meeting_scheduled, meeting_conducted
    })
    res.send(result);
    db.close();
  }
  catch (e) {
    console.log(e.message)
    res.status(500).send('Unexpected error');
  }
}

exports.getFpoData = function (callback) {
  let aggregation = [
    {
      '$project': {
        '_id': 0, 'fpoName': 1, 'refNo': 1, 'fpoId': 1, 'approveDate': 1, 'district': '$FPOData.district', 'regNoOfFPO': '$FPOData.regNoOfFPO',
        'block': '$FPOData.block', 'village': '$FPOData.village', 'fpoContactNo': '$FPOData.fpoContactNo', 'status': 1, 'updatedOn': 1,
        'creationScheme': 1, 'ngoName': 1, 'blockStatus': 1
      }
    }, {
      '$lookup': { 'from': 'userAuth', 'localField': 'fpoId', 'foreignField': 'fpoId', 'as': 'd' }
    }, {
      '$project': {
        'fpoName': 1, 'refNo': 1, 'fpoId': 1, 'approveDate': { '$dateToString': { 'format': '%d-%m-%Y', 'date': '$approveDate' } },
        'district': 1, 'block': 1, 'regNoOfFPO': 1, 'village': 1, 'fpoContactNo': 1, 'status': 1, 'creationScheme': 1, 'ngoName': 1,
        'blockStatus': 1, 'updatedOn': { '$dateToString': { 'format': '%d-%m-%Y', 'date': '$updatedOn' } },
        'applyDate': { '$arrayElemAt': ['$d.creationDate', 0] }
      }
    }, {
      '$sort': { 'fpoName': 1 }
    }
  ]
  mongo.queryWithAggregator(aggregation, "FPOmaster", function (response1) {
    callback(response1)
  })
}

exports.blockUnblockFpo = async (req, res) => {
  try {
    let data = req.body
    var isActive;
    if (data.blockStatus == true) {
      isActive = false;
    } else {
      isActive = true;
    }
    let db = await newmongo.mongoConnection()
    let response = await newmongo.updateOne({ 'refNo': data.refNo }, { blockStatus: data.blockStatus }, 'FPOmaster', db)
    if (response) {
      let response2 = newmongo.updateOne({ 'refNo': data.refNo }, { 'isActive': isActive }, 'userAuth', db)
      if (response2) {
        let aggregation = [
          {
            '$match': { 'refNo': data.refNo }
          }, {
            '$project': { '_id': 0, 'blockStatus': 1 }
          }
        ]
        mongo.queryWithAggregator(aggregation, 'FPOmaster', function (response1) {
          res.send({ status: response1[0]?.blockStatus })
          db.close()
        })
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).send('Unexpected error');
  }
}

exports.approveFpo = async (data, callback) => {
  try {
    let db = await newmongo.mongoConnection()
    let response = await newmongo.updateOne({ 'refNo': data.refNo }, {
      status: 'Approved', approveDate: new Date(), boardDirectorsDetails: [], staffDetails: [], secondaryBusinessDetails: [], FPOAward: [], storageDetails: [], InfrastructureDetail: [], primaryBusinessDetails: [], equityGrant: [], creditGrant: [], otherScheme: [], License: [],
      totalBusinessDone: { "tbd1920": 0 }
    }, 'FPOmaster', db)
    if (response.modifiedCount > 0) {
      let dataForAuth = {
        refNo: data.refNo,
        fpoId: data.fpoId,
        userId: data.fpoId,
        password: 'b42458de550ef94801e7df33778c436d93bb78d3962f1020f3659db75b72cb8e3a4bb75f972c500d5a3626f74f6b69436d515b55a0344c4b29f28ad0cba56c3b',
        mobileNo: data.fpoContactNo,
        userType: 'FPO',
        creationDate: new Date(),
        isActive: true
      }
      let response1 = await newmongo.insertDocument(dataForAuth, 'userAuth', db)
      callback({ status: response1.insertedCount, fpoData: dataForAuth })
      db.close()
    }
  } catch (e) {
    console.error(e);
    callback(e)
  }
}

exports.getIa = function (callback) {
  mongo.findAll('IAmaster', function (response1) {
    callback(response1)
  })
}

exports.getCbbo = function (callback) {
  mongo.findAll('cbbo', function (response1) {
    callback(response1)
  })
}

exports.submit = async (data, callback) => {
  try {
    let db = await newmongo.mongoConnection()
    let response = await newmongo.insertDocument(data, 'IA-CbboMaster', db)
    callback(response);
    newmongo.mongoClose(db);
  } catch (e) {
    console.log(e);
  }
}

exports.getIaCbbo = function (callback) {
  mongo.findAll('IA-CbboMaster', function (response1) {
    callback(response1)
  })
}

exports.getFpo = function (callback) {
  let aggregation = [
    {
      '$match': { 'cbboName': { '$exists': false } }
    }, {
      '$sort': { 'fpoName': 1 }
    }
  ]
  mongo.queryWithAggregator(aggregation, 'FPOmaster', function (response1) {
    callback(response1)
  })
}

exports.assign = async (data, callback) => {
  try {
    let db = await newmongo.mongoConnection()
    let response = await newmongo.insertDocument(data, 'ia-Cbbo-FpoMaster', db)
    var mquery = { fpoName: data.fpoName }
    var mvalue = { cbboName: data.cbboName }
    let response1 = await newmongo.updateOne(mquery, mvalue, 'FPOmaster', db)
    if (response1) {
      callback(response);
      newmongo.mongoClose(db);
    }
  } catch (e) {
    console.log(e);
  }
}

exports.getIaCbboFpo = function (callback) {
  mongo.findAll('ia-Cbbo-FpoMaster', function (response1) {
    callback(response1)
  })
}

exports.getCbboMaster = function (iaName, callback) {
  let IaCbboMaster = [
    {
      '$match': { 'iaName': iaName, }
    }, {
      '$project': { '_id': 0, 'cbboName': 1, 'cbboCode': 1, }
    }
  ]
  mongo.queryWithAggregator(IaCbboMaster, "IA-CbboMaster", function (response1) {
    let getCbbo = [
      {
        '$project': { 'cbboName': 1, 'cbboCode': 1, '_id': 0 }
      }, {
        '$sort': { 'cbboName': 1 }
      }
    ]
    mongo.queryWithAggregator(getCbbo, "cbbo", function (response2) {
      if (response1.length > 0) {
        let result = response2.filter(a => !response1.some(b => a.cbboName === b.cbboName));
        callback(result)
      } else {
        callback(response2)
      }
    })
  })
}

exports.gettingCbbo = function (iaName, callback) {
  let aggregation = [
    {
      '$match': { 'iaName': iaName }
    }, {
      '$project': { '_id': 0, 'iaName': 0 }
    }
  ]
  mongo.queryWithAggregator(aggregation, "IA-CbboMaster", function (response1) {
    callback(response1)
  })
}

exports.missingFpo = function (callback) {
  let aggregation = [
    {
      '$match': { 'status': "pending" }
    }, {
      '$project': { '_id': 0 }
    }
  ]
  mongo.queryWithAggregator(aggregation, "missingFpo", function (response) {
    callback(response)
  })
}

exports.mappingofmissingData = async (data, callback) => {
  try {
    let db = await newmongo.mongoConnection()
    let response = await newmongo.insertDocument(data, 'ia-Cbbo-FpoMaster', db)
    var mquery = { fpoName: data.fpoName }
    var mvalue = { cbboName: data.cbboName }
    var mquery2 = { cbboName: data.cbboName, fpoName: data.fpoName, year: data.year, iaName: data.iaName }
    var mvalue2 = { status: "assigned" }
    let response1 = await newmongo.updateOne(mquery, mvalue, 'FPOmaster', db)
    let response2 = await newmongo.updateOne(mquery2, mvalue2, 'missingFpo', db)
    if (response && response1 && response2) {
      callback({ status: true, message: "Assigned successfully" });
      newmongo.mongoClose(db);
    }
  } catch (e) {
    console.log(e);
  }
}

exports.rejectMissingFpo = async (data, callback) => {
  try {
    let db = await newmongo.mongoConnection()
    var mquery = { cbboName: data.cbboName, fpoName: data.fpoName, year: data.year, iaName: data.iaName }
    var mvalue = { status: "rejected" }
    let response = await newmongo.updateOne(mquery, mvalue, 'missingFpo', db)
    if (response) {
      callback({ status: true, message: "Rejected successfully" });
      newmongo.mongoClose(db);
    } else {
      callback({ status: false, message: "Reject unsuccessfully" });
      newmongo.mongoClose(db);
    }
  } catch (e) {
    console.log(e);
  }
}

exports.gettotalIa = function (callback) {
  let aggregation = [
    {
      '$project': { '_id': 0, 'iaName': 1 }
    }
  ]
  mongo.queryWithAggregator(aggregation, "IAmaster", function (response1) {
    callback(response1)
  })
}

exports.gettotalCbbo = function (callback) {
  let aggregation = [
    {
      '$project': { 'cbboName': 1, '_id': 0 }
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbbo", function (response1) {
    callback(response1)
  })
}

exports.gettotalFpo = function (callback) {
  let aggregation = [
    {
      '$project': { 'fpoName': 1, '_id': 0 }
    }
  ]
  mongo.queryWithAggregator(aggregation, "ia-Cbbo-FpoMaster", function (response1) {
    callback(response1)
  })
}

exports.getwomenBod = function (callback) {
  let aggregation = [
    {
      '$match': { 'status': 'published' }
    }, {
      '$group': {
        '_id': 'iaName', 'male': { '$sum': { '$cond': [{ '$eq': ['$Min1WomenBod', 'no'] }, 1, 0] } },
        'female': { '$sum': { '$cond': [{ '$eq': ['$Min1WomenBod', 'yes'] }, 1, 0] } }, 'total': { '$sum': 1 }
      }
    }, {
      '$project': { '_id': 0 }
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    callback(response1)
  })
}

exports.getwomenBodyearwise = function (year, callback) {
  let aggregation = [
    {
      '$match': { 'year': year, 'status': 'published' }
    }, {
      '$group': {
        '_id': 'iaName', 'male': { '$sum': { '$cond': [{ '$eq': ['$Min1WomenBod', 'no'] }, 1, 0] } },
        'female': { '$sum': { '$cond': [{ '$eq': ['$Min1WomenBod', 'yes'] }, 1, 0] } }, 'total': { '$sum': 1 }
      }
    }, {
      '$project': { '_id': 0 }
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    callback(response1)
  })
}

exports.getwomenBodagencywise = function (callback) {
  let aggregation = [
    {
      '$match': { 'status': 'published' }
    }, {
      '$group': {
        '_id': '$iaName', 'male': { '$sum': { '$cond': [{ '$eq': ['$Min1WomenBod', 'no'] }, 1, 0] } },
        'female': { '$sum': { '$cond': [{ '$eq': ['$Min1WomenBod', 'yes'] }, 1, 0] } }, 'total': { '$sum': 1 }
      }
    }, {
      '$project': { '_id': 0, 'iaName': '$_id', 'male': 1, 'female': 1, 'total': 1 }
    }, {
      '$sort': { 'iaName': 1 }
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    callback(response1)
  })
}


exports.getshareHolder = function (callback) {
  var aggregation = [
    {
      '$match': { 'status': 'published' }
    }, {
      '$group': { '_id': null, 'total': { '$sum': { '$toInt': '$NoOfFarmerMobilizedAsShareholders' } } }
    }, {
      '$project': { '_id': 0, 'total': 1 }
    }
  ]
  backlogAggregation = [
    {
      '$match': { 'oldData': true }
    }, {
      '$group': { '_id': null, 'total': { '$sum': '$NoOfFarmerMobilizedAsShareholders' } }
    }, {
      '$project': { '_id': 0, 'total': 1 }
    }
  ]
  mongo.queryWithAggregator(backlogAggregation, "backlogData", function (response1) {
    mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response2) {
      var backlogTotal = response1.length === 0 ? 0 : response1[0].total;
      var currentTotal = response2.length === 0 ? 0 : response2[0].total;
      var final = parseInt(currentTotal + backlogTotal)
      var share = final.toLocaleString();
      let response = [{ total: share }]
      callback(response)
    })
  })
}

exports.getshareHolderyearwise = function (year, callback) {
  var aggregation
  var backlogAggregation
  if (year == "CUMULATIVE") {
    aggregation = [
      {
        '$match': { 'status': 'published' }
      }, {
        '$group': { '_id': null, 'total': { '$sum': { '$toInt': '$NoOfFarmerMobilizedAsShareholders' } } }
      }, {
        '$project': { '_id': 0, 'total': 1 }
      }
    ]
    backlogAggregation = [
      {
        '$match': { 'oldData': true }
      }, {
        '$group': { '_id': null, 'total': { '$sum': { '$toInt': '$NoOfFarmerMobilizedAsShareholders' } } }
      }, {
        '$project': { '_id': 0, 'total': 1 }
      }
    ]
  } else {
    aggregation = [
      {
        '$match': { 'year': year, 'status': 'published' }
      }, {
        '$group': { '_id': null, 'total': { '$sum': { '$toInt': '$NoOfFarmerMobilizedAsShareholders' } } }
      }, {
        '$project': { '_id': 0, 'total': 1 }
      }
    ]
    backlogAggregation = [
      {
        '$match': { 'year': year, 'oldData': true }
      }, {
        '$group': { '_id': null, 'total': { '$sum': { '$toInt': '$NoOfFarmerMobilizedAsShareholders' } } }
      }, {
        '$project': { '_id': 0, 'total': 1 }
      }
    ]
  }
  if (year == "2017-2018" || year == "2018-2019" || year == "2019-2020" || year == "2020-2021" || year == "2021-2022") {
    mongo.queryWithAggregator(backlogAggregation, "backlogData", function (response) {
      callback(response)
    })
  } else if (year == "CUMULATIVE") {
    mongo.queryWithAggregator(backlogAggregation, "backlogData", function (response1) {
      mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response2) {
        var backlogTotal = response1.length === 0 ? 0 : response1[0].total;
        var currentTotal = response2.length === 0 ? 0 : response2[0].total;
        var final = parseInt(currentTotal + backlogTotal)
        var pandu = final.toLocaleString();
        let response = [{ total: pandu }]
        callback(response)
      })
    })
  } else {
    mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response3) {
      callback(response3)
    })
  }
}

exports.getshareCapital = function (callback) {
  var aggregation = [
    {
      '$match': { 'status': 'published' }
    }, {
      '$group': { '_id': null, 'total': { '$sum': { '$toInt': '$ShareCapitalMobilizedInInr' } } }
    }, {
      '$project': { '_id': 0, 'total': 1 }
    }
  ]
  var backlogAggregation = [
    {
      '$match': { 'oldData': true }
    }, {
      '$group': { '_id': null, 'total': { '$sum': '$ShareCapitalMobilizedInInr' } }
    }, {
      '$project': { '_id': 0, 'total': 1 }
    }
  ]
  mongo.queryWithAggregator(backlogAggregation, "backlogData", function (response1) {
    mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response2) {
      var backlogTotal = response1.length === 0 ? 0 : response1[0].total;
      var currentTotal = response2.length === 0 ? 0 : response2[0].total;
      var final = parseInt(currentTotal + backlogTotal)
      var pandu = final.toLocaleString();
      let response = [{ total: pandu }]
      callback(response)
    })
  })
}

exports.getshareCapitalyearwise = function (year, callback) {
  var aggregation;
  var backlogAggregation;
  if (year == "CUMULATIVE") {
    aggregation = [
      {
        '$match': { 'status': 'published' }
      }, {
        '$group': { '_id': null, 'total': { '$sum': { '$toInt': '$ShareCapitalMobilizedInInr' } } }
      }, {
        '$project': { '_id': 0, 'total': 1 }
      }
    ]
    backlogAggregation = [
      {
        '$match': { 'oldData': true }
      }, {
        '$group': { '_id': null, 'total': { '$sum': { '$toInt': '$ShareCapitalMobilizedInInr' } } }
      }, {
        '$project': { '_id': 0, 'total': 1 }
      }
    ]
  }
  else {
    aggregation = [
      {
        '$match': { 'year': year, 'status': 'published' }
      }, {
        '$group': { '_id': null, 'total': { '$sum': { '$toInt': '$ShareCapitalMobilizedInInr' } } }
      }, {
        '$project': { '_id': 0, 'total': 1 }
      }
    ]
    backlogAggregation = [
      {
        '$match': { 'year': year, 'oldData': true }
      }, {
        '$group': { '_id': null, 'total': { '$sum': { '$toInt': '$ShareCapitalMobilizedInInr' } } }
      }, {
        '$project': { '_id': 0, 'total': 1 }
      }
    ]
  }
  if (year == "2017-2018" || year == "2018-2019" || year == "2019-2020" || year == "2020-2021" || year == "2021-2022") {
    mongo.queryWithAggregator(backlogAggregation, "backlogData", function (response) {
      callback(response)
    })
  } else if (year == "CUMULATIVE") {
    mongo.queryWithAggregator(backlogAggregation, "backlogData", function (response1) {
      mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response2) {
        var final = parseInt(response1[0].total + response2[0].total)
        var comma = final.toLocaleString();
        let response = [{ total: comma }]
        callback(response)
      })
    })
  } else {
    mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response3) {
      callback(response3)
    })
  }
}

exports.getaverageofCapital = function (callback) {
  let aggregation = [
    {
      '$match': { 'status': 'published' }
    }, {
      '$project': { '_id': 0, 'ShareCapitalMobilizedInInr': 1 }
    }, {
      '$group': { '_id': '$_id', 'Average': { '$avg': { '$toInt': '$ShareCapitalMobilizedInInr' } } }
    }, {
      '$project': { '_id': 0, "Average": { "$round": ["$Average", 2] } }
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    callback(response1)
  })
}

exports.getaverageofShare = function (callback) {
  let aggregation = [
    {
      '$match': { 'status': 'published' }
    }, {
      '$project': { '_id': 0, 'NoOfFarmerMobilizedAsShareholders': 1 }
    }, {
      '$group': { '_id': '$_id', 'Average': { '$avg': { '$toInt': '$NoOfFarmerMobilizedAsShareholders' } } }
    }, {
      '$project': { '_id': 0, 'Average': { '$round': ['$Average', 2] } }
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    callback(response1)
  })
}

exports.getbarchartDetails = function (year, callback) {
  let aggregation = [
    {
      '$match': { 'year': year }
    }, {
      '$project': { '_id': 0, 'targets': 1, 'achievements': 1 }
    }
  ]
  mongo.queryWithAggregator(aggregation, "iaTarget", function (response1) {
    callback(response1)
  })
}

exports.gettargetDetails = function (year, iaName, callback) {
  if (iaName == "ALL") {
    let aggregation = [
      {
        '$match': { 'year': year, }
      }, {
        '$project': { '_id': 0, }
      }
    ]
    mongo.queryWithAggregator(aggregation, "iaTarget", function (response1) {
      callback(response1)
    })
  } else {
    let aggregation = [
      {
        '$match': { 'year': year, 'iaName': iaName }
      }, {
        '$project': { '_id': 0, }
      }
    ]
    mongo.queryWithAggregator(aggregation, "iaTarget", function (response1) {
      callback(response1)
    })
  }
}

exports.getequityGrant = function (callback) {
  let aggregation = [
    {
      '$match': { 'status': 'published' }
    }, {
      '$group': {
        '_id': 'iaName', 'EquityGrantPending': { '$sum': { '$cond': [{ '$eq': ['$EquityGrantAvailed', 'no'] }, 1, 0] } },
        'EquityGrantAvailed': { '$sum': { '$cond': [{ '$eq': ['$EquityGrantAvailed', 'yes'] }, 1, 0] } },
        'total': { '$sum': 1 }
      }
    }, {
      '$project': { '_id': 0 }
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    callback(response1)
  })
}

exports.getequityGrantyearwise = function (year, iaName, callback) {
  var aggregation
  if (iaName == "ALL") {
    aggregation = [
      {
        '$match': { 'year': year, 'status': 'published' }
      }, {
        '$group': {
          '_id': 'iaName', 'EquityGrantPending': { '$sum': { '$cond': [{ '$eq': ['$EquityGrantAvailed', 'no'] }, 1, 0] } },
          'EquityGrantAvailed': { '$sum': { '$cond': [{ '$eq': ['$EquityGrantAvailed', 'yes'] }, 1, 0] } },
          'total': { '$sum': 1 }
        }
      }, {
        '$project': { '_id': 0 }
      }
    ]
  } else {
    aggregation = [
      {
        '$match': { 'year': year, 'iaName': iaName, 'status': 'published' }
      }, {
        '$group': {
          '_id': 'iaName', 'EquityGrantPending': { '$sum': { '$cond': [{ '$eq': ['$EquityGrantAvailed', 'no'] }, 1, 0] } },
          'EquityGrantAvailed': { '$sum': { '$cond': [{ '$eq': ['$EquityGrantAvailed', 'yes'] }, 1, 0] } },
          'total': { '$sum': 1 }
        }
      }, {
        '$project': { '_id': 0 }
      }
    ]
  }
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    callback(response1)
  })
}

exports.getequitygrantagencywise = function (year, iaName, callback) {
  var aggregation
  if (iaName == "ALL") {
    aggregation = [
      {
        '$match': { 'year': year, 'status': 'published' }
      }, {
        '$group': {
          '_id': '$iaName', 'pending': { '$sum': { '$cond': [{ '$eq': ['$EquityGrantAvailed', 'no'] }, 1, 0] } },
          'availed': { '$sum': { '$cond': [{ '$eq': ['$EquityGrantAvailed', 'yes'] }, 1, 0] } }, 'total': { '$sum': 1 }
        }
      }, {
        '$project': { '_id': 0, 'iaName': '$_id', 'pending': 1, 'availed': 1, 'total': 1 }
      }, {
        '$sort': { 'iaName': 1 }
      }
    ]
  } else {
    aggregation = [
      {
        '$match': { 'year': year, 'iaName': iaName, 'status': 'published' }
      }, {
        '$group': {
          '_id': '$iaName', 'pending': { '$sum': { '$cond': [{ '$eq': ['$EquityGrantAvailed', 'no'] }, 1, 0] } },
          'availed': { '$sum': { '$cond': [{ '$eq': ['$EquityGrantAvailed', 'yes'] }, 1, 0] } }, 'total': { '$sum': 1 }
        }
      }, {
        '$project': { '_id': 0, 'iaName': '$_id', 'pending': 1, 'availed': 1, 'total': 1 }
      }, {
        '$sort': { 'iaName': 1 }
      }
    ]
  }
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    callback(response1)
  })
}

exports.getcapitalagencywise = function (callback) {
  var aggregation = [
    {
      '$match': { 'status': 'published' }
    }, {
      '$group': { '_id': '$iaName', 'total': { '$sum': { '$toInt': '$ShareCapitalMobilizedInInr' } } }
    }, {
      '$project': { '_id': 1, 'total': 1 }
    }, {
      '$sort': { '_id': 1 }
    }
  ]
  var backlogAggregation = [
    {
      '$match': { 'oldData': true }
    }, {
      '$group': { '_id': '$iaName', 'total': { '$sum': { '$toInt': '$ShareCapitalMobilizedInInr' } } }
    }, {
      '$project': { '_id': 1, 'total': 1 }
    }, {
      '$sort': { '_id': 1 }
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    mongo.queryWithAggregator(backlogAggregation, "backlogData", function (response2) {
      for (let i = 0; i < response1.length; i++) {
        for (let j = 0; j < response2.length; j++) {
          if (response1[i]._id == response2[j]._id) {
            response1[i].total = parseInt(response1[i].total + response2[j].total)
          }
        }
        if (i + 1 == response1.length) {
          callback(response1)
        }
      }
    })
  })
}

exports.getcapitalaverage = function (callback) {
  var aggregation = [
    {
      '$match': { 'status': 'published' }
    }, {
      '$group': {
        '_id': '$iaName', 'totalfpo': { '$sum': 1 }, 'sharecapital': { '$sum': { '$toInt': '$ShareCapitalMobilizedInInr' } }
      }
    }, {
      '$project': { '_id': 1, 'sharecapital': 1, 'totalfpo': 1 }
    }, {
      '$sort': { '_id': 1 }
    }
  ]
  backlogAggregation = [
    {
      '$match': { 'oldData': true }
    }, {
      '$group': {
        '_id': '$iaName', 'sharecapital': { '$sum': { '$toInt': '$ShareCapitalMobilizedInInr' } }, 'totalfpo': {
          '$sum': {
            '$toInt': '$achievement'
          }
        }
      }
    }, {
      '$sort': { '_id': 1 }
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    mongo.queryWithAggregator(backlogAggregation, "backlogData", function (response2) {
      var final = [];
      for (let i = 0; i < response1.length; i++) {
        for (let j = 0; j < response2.length; j++) {
          if (response1[i]._id == response2[j]._id) {
            response1[i].sharecapital = parseInt((response1[i].sharecapital + response2[j].sharecapital))
            response1[i].totalfpo = parseInt((response1[i].totalfpo + response2[j].totalfpo))
          }
        }
        response1[i].total = response1[i].sharecapital / response1[i].totalfpo;
        if (i + 1 == response1.length) {
          callback(response1)
        }
      }
    })
  })
}

exports.getholderagencywise = function (callback) {
  var aggregation = [
    {
      '$match': { 'status': 'published' }
    }, {
      '$group': { '_id': '$iaName', 'total': { '$sum': { '$toInt': '$NoOfFarmerMobilizedAsShareholders' } } }
    }, {
      '$project': { '_id': 1, 'total': 1 }
    }, {
      '$sort': { '_id': 1 }
    }
  ]
  var backlogAggregation = [
    {
      '$match': { 'oldData': true }
    }, {
      '$group': { '_id': '$iaName', 'total': { '$sum': { '$toInt': '$NoOfFarmerMobilizedAsShareholders' } } }
    }, {
      '$project': { '_id': 1, 'total': 1 }
    }, {
      '$sort': { '_id': 1 }
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    mongo.queryWithAggregator(backlogAggregation, "backlogData", function (response2) {
      for (let i = 0; i < response1.length; i++) {
        for (let j = 0; j < response2.length; j++) {
          if (response1[i]._id == response2[j]._id) {
            response1[i].total = parseInt(response1[i].total + response2[j].total)
          }
        }
        if (i + 1 == response1.length) {
          callback(response1)
        }
      }
    })
  })
}

exports.getholderaverage = function (callback) {
  var aggregation = [
    {
      '$match': {'status': 'published'}
    }, {
      '$group': {'_id': '$iaName','totalfpo': {'$sum': 1},'shareholder': {'$sum': {'$toInt': '$NoOfFarmerMobilizedAsShareholders'}}}
    }, {
      '$project': {'_id': 1,'shareholder': 1,'totalfpo': 1}
    }, {
      '$sort': {'_id': 1}
    }
  ]
  backlogAggregation = [
    {
      '$match': {'oldData': true}
    }, {
      '$group': {'_id': '$iaName','shareholder': {'$sum': {'$toInt': '$NoOfFarmerMobilizedAsShareholders'}},
      'totalfpo': {'$sum': {'$toInt': '$achievement'}}}
    }, {
      '$sort': {'_id': 1}
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    mongo.queryWithAggregator(backlogAggregation, "backlogData", function (response2) {
      var final = [];
      for (let i = 0; i < response1.length; i++) {
        for (let j = 0; j < response2.length; j++) {
          if (response1[i]._id == response2[j]._id) {
            response1[i].shareholder = parseInt((response1[i].shareholder + response2[j].shareholder))
            response1[i].totalfpo = parseInt((response1[i].totalfpo + response2[j].totalfpo))
          }
        }
        response1[i].total = response1[i].shareholder / response1[i].totalfpo;
        if (i + 1 == response1.length) {
          callback(response1)
        }
      }
    })
  })
}

exports.getturnover = function (callback) {

  var aggregation = [
    {
      '$match': { 'status': 'published' }
    }, {
      '$group': { '_id': null, 'total': { '$avg': { '$toInt': '$AnnualBusinessTurnoverinInr' } } }
    }, {
      '$project': { '_id': 0, 'total': { '$round': ['$total', 2] } }
    }
  ]
  var backlogAggregation = [
    {
      '$match': { 'oldData': true }
    }, {
      '$group': { '_id': null, 'total': { '$avg': { '$toInt': '$AnnualBusinessTurnoverinInr' } } }
    }, {
      '$project': { '_id': 0, 'total': { '$round': ['$total', 2] } }
    }
  ]

  mongo.queryWithAggregator(backlogAggregation, "backlogData", function (response1) {
    mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response2) {
      var final = parseInt(response1[0].total + response2[0].total)
      let response = [{ total: final }]
      callback(response)
    })
  })
}

exports.getturnoveryearwise = function (year, iaName, callback) {
  // console.log(year,iaName,"asdfghjkl;'");
  var aggregation
  var backlogAggregation

  if (iaName == "ALL") {
    aggregation = [
      {
        '$match': { 'year': year, 'status': 'published' }
      }, {
        '$group': { '_id': null, 'total': { '$avg': { '$toInt': '$AnnualBusinessTurnoverinInr' } } }
      }, {
        '$project': { '_id': 0, 'total': { '$round': ['$total', 2] } }
      }
    ]
    backlogAggregation = [
      {
        '$match': { 'year': year, 'oldData': true }
      }, {
        '$group': { '_id': null, 'total': { '$avg': { '$toInt': '$AnnualBusinessTurnoverinInr' } } }
      }, {
        '$project': { '_id': 0, 'total': { '$round': ['$total', 2] } }
      }
    ]
  }
  else {
    aggregation = [
      {
        '$match': { 'year': year, 'iaName': iaName, 'status': 'published' }
      }, {
        '$group': { '_id': null, 'total': { '$avg': { '$toInt': '$AnnualBusinessTurnoverinInr' } } }
      }, {
        '$project': { '_id': 0, 'total': { '$round': ['$total', 2] } }
      }
    ]
    backlogAggregation = [
      {
        '$match': { 'year': year, 'iaName': iaName, 'oldData': true }
      }, {
        '$group': { '_id': null, 'total': { '$avg': { '$toInt': '$AnnualBusinessTurnoverinInr' } } }
      }, {
        '$project': { '_id': 0, 'total': { '$round': ['$total', 2] } }
      }
    ]
  }

  if (year == "2017-2018" || year == "2018-2019" || year == "2019-2020" || year == "2016-2017") {
    mongo.queryWithAggregator(backlogAggregation, "backlogData", function (response) {
      // console.log(response, 'response');
      if (response.length) {
        callback(response)
      } else {
        let response1 = [{
          total: 0
        }]
        callback(response1)
      }


    })
  }
  // else if (year == "CUMULATIVE") {
  //   mongo.queryWithAggregator(backlogAggregation, "backlogData", function (response1) {
  //     mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response2) {
  //       // console.log(response1[0].total, "response1");
  //       // console.log(response2[0].total, "response2");
  //       var final = parseInt(response1[0].total + response2[0].total)
  //       let response = [{ total: final }]
  //       callback(response)
  //     })
  //   })
  // }
  else {
    mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response3) {
      // console.log(response3, 'response3');
      if (response3.length) {
        callback(response3)
      } else {
        let response = [{
          total: 0
        }]
        callback(response)
      }
    })
  }
}

exports.getturnoveragencywise = function (year, iaName, callback) {
  if (iaName == "ALL") {
    var aggregation = [
      {
        '$match': { 'status': 'published', 'year': year }
      }, {
        '$group': { '_id': '$iaName', 'total': { '$sum': { '$toInt': '$AnnualBusinessTurnoverinInr' } } }
      }, {
        '$project': { '_id': 0, 'iaName': "$_id", 'total': 1 }
      }, {
        '$sort': { 'iaName': 1 }
      }
    ]
    var backlogAggregation = [
      {
        '$match': { 'oldData': true, 'year': year }
      }, {
        '$group': { '_id': '$iaName', 'total': { '$sum': { '$toInt': '$AnnualBusinessTurnoverinInr' } } }
      }, {
        '$project': { '_id': 0, 'iaName': "$_id", 'total': 1 }
      }, {
        '$sort': { 'iaName': 1 }
      }
    ]
  } else {
    var aggregation = [
      {
        '$match': { 'status': 'published', 'iaName': iaName, 'year': year }
      }, {
        '$group': { '_id': '$iaName', 'total': { '$sum': { '$toInt': '$AnnualBusinessTurnoverinInr' } } }
      }, {
        '$project': { '_id': 0, 'iaName': "$_id", 'total': 1 }
      }, {
        '$sort': { 'iaName': 1 }
      }
    ]
    var backlogAggregation = [
      {
        '$match': { 'oldData': true, 'iaName': iaName, 'year': year }
      }, {
        '$group': { '_id': '$iaName', 'total': { '$sum': { '$toInt': '$AnnualBusinessTurnoverinInr' } } }
      }, {
        '$project': { '_id': 0, 'iaName': "$_id", 'total': 1 }
      }, {
        '$sort': { 'iaName': 1 }
      }
    ]
  }
  if (year == "2017-2018" || year == "2018-2019" || year == "2019-2020" || year == "2016-2017") {
    mongo.queryWithAggregator(backlogAggregation, "backlogData", function (response2) {
      callback(response2)
    })
  } else {
    mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
      callback(response1)
    })
  }

  // mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
  //   mongo.queryWithAggregator(backlogAggregation, "backlogData", function (response2) {
  //     console.log(response1, "response1");
  //     console.log(response2, "response2");
  //     // let result = response2.filter(a => !response1.some(b => a.cbboName === b.cbboName));
  //     //   console.log(result, "result");
  //     for (let i = 0; i < response1.length; i++) {
  //       for (let j = 0; j < response2.length; j++) {
  //         if (response1[i].iaName == response2[j].iaName) {
  //           // console.log(parseInt(response1[i].total + response2[j].total), "2222");
  //           response1[i].total = parseInt(response1[i].total + response2[j].total)
  //           // console.log(response1, "111111111111");
  //         }
  //       }
  //       if (i + 1 == response1.length) {
  //         console.log(response1, "response");
  //         callback(response1)
  //       }
  //     }
  //     // var final = parseInt(response1[0].total + response2[0].total)
  //     // const response = [{ total: final }]

  //   })
  // })
  // let aggregation = [
  //   {
  //     '$match': { 'status': 'published' }
  //   }, {
  //     '$group': { '_id': '$iaName', 'total': { '$sum': { '$toInt': '$AnnualBusinessTurnoverinInr' } } }
  //   }, {
  //     '$project': { '_id': 1, 'total': 1 }
  //   }, {
  //     '$sort': { '_id': 1 }
  //   }
  // ]
  // mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
  //   callback(response1)
  // })
  // }
}




exports.getdashboarddata = function (callback) {
  mongo.findAll('targetAllocation', function (response1) {
    callback(response1)
  })
}

exports.getdashboarddataYear = function (data, callback) {
  // console.log(data, 'g');
  // console.log(11111111111111);

  var condition;

  if (data.selectAgency === 'ALL') {
    condition = {
      'typesOffpo': data.selectTypes, 'timeSlot': data.selectSlots, 'finyear': data.selectyear,
    }

  } else {
    condition = {
      'finyear': data.selectyear, 'iaName': data.selectAgency, 'typesOffpo': data.selectTypes, 'timeSlot': data.selectSlots,
    }
  }

  // if (data.selectAgency === 'ALL' && data.selectyear === 'ALL') {
  //   condition = {
  //    'typesOffpo': data.selectTypes, 'timeSlot': data.selectSlots, }

  // } if (data.selectAgency != "ALL" && data.selectyear === 'ALL') {
  //   condition = {
  //     'iaName': data.selectAgency, 'typesOffpo': data.selectTypes, 'timeSlot': data.selectSlots,
  //   }
  // } if (data.selectAgency === "ALL" && data.selectyear != 'ALL') {
  //   condition = {
  //     'finyear': data.selectyear, 'typesOffpo': data.selectTypes, 'timeSlot': data.selectSlots,
  //   }
  // }
  // if (data.selectAgency != "ALL" && data.selectyear != 'ALL') {
  //   condition = {
  //     'finyear': data.selectyear, 'iaName': data.selectAgency, 'typesOffpo': data.selectTypes, 'timeSlot': data.selectSlots,
  //   }
  // }

  // console.log(condition, "condition");

  let aggregation = [
    {
      '$match': condition
    }, {
      '$project': {
        '_id': 0
      }
    }
  ]
  mongo.queryWithAggregator(aggregation, "targetAllocation", function (response1) {
    // console.log(response1, 'response1');
    // var remainingArr
    // if (data.selectAgency != 'ALL' && data.selectTypes == '3month') {
    //   remainingArr = response1.map(function (item) {
    //     delete item.percentageOffpocompletedstatutoryaudit;
    //     delete item.percentageOffpofilledroc;
    //     return item;
    //   });

    // } else if (data.selectAgency != 'ALL' && data.selectTypes == '11month') {
    //   remainingArr = response1.map(function (item) {
    //     delete item.percentageOffpocompletedstatutoryaudit;
    //     delete item.percentageOffpofilledroc;
    //     delete item.percentageOffpoobtainedcommencementofbusiness;
    //     delete item.percentageOffpoobtainedgstlicense;
    //     delete item.percentageOffpocompletedagm;
    //     return item;
    //   });
    // } else {
    //   remainingArr = response1;
    // }
    // console.log(remainingArr, "remainingArr");

    callback(response1)
    // callback(remainingArr)
  })
}


exports.getOlddata = function (callback) {

  let aggregation1 = [
    {
      '$project': {
        '_id': 0, 'target': 1, 'NoOfFarmerMobilizedAsShareholders': 1, 'ShareCapitalMobilizedInInr': 1, 'year': 1,
        'iaName': 1, 'achievement': 1, 'AnnualBusinessTurnoverinInr': 1
      }
    }
  ]
  mongo.queryWithAggregator(aggregation1, "backlogData", function (response1) {
    // console.log(response1);
    for (let i = 0; i < response1.length; i++) {
      if (response1[i].NoOfFarmerMobilizedAsShareholders == 0) {
        response1[i].avgShare = 0;
      } else {
        response1[i].avgShare = (response1[i].NoOfFarmerMobilizedAsShareholders / response1[i].target).toFixed(2);
      }
      if (response1[i].ShareCapitalMobilizedInInr == 0) {
        response1[i].avgCapital = 0;
      } else {
        response1[i].avgCapital = (response1[i].ShareCapitalMobilizedInInr / response1[i].target).toFixed(2);
      }
      if (response1.length == i + 1) {
        // console.log(response1,"response1");
        callback(response1)
      }
    }
    // callback(response1)
  })
  // let aggregation = [
  //   {
  //     '$project': {
  //       '_id': 0, 'target': 1, 'NoOfFarmerMobilizedAsShareholders': 1, 'ShareCapitalMobilizedInInr': 1,
  //       'avgShare': { '$divide': ['$NoOfFarmerMobilizedAsShareholders', '$target'] },
  //       'avgCapital': { '$divide': ['$ShareCapitalMobilizedInInr', '$target'] }, 'year': 1, 'iaName': 1, 'achievement': 1,
  //       'AnnualBusinessTurnoverinInr': 1
  //     }
  //   }, {
  //     '$project': {
  //       '_id': 0, 'avgShare': { '$round': ['$avgShare', 2] }, 'avgCapital': { '$round': ['$avgCapital', 2] },
  //       'year': 1, 'iaName': 1, 'target': 1, 'achievement': 1, 'NoOfFarmerMobilizedAsShareholders': 1, 'ShareCapitalMobilizedInInr': 1,
  //       'AnnualBusinessTurnoverinInr': 1
  //     }
  //   }
  // ]
  // mongo.queryWithAggregator(aggregation, "backlogData", function (response1) {
  // console.log(response1,'response1');
  //   callback(response1)
  // })
}

exports.publishData = async (data, callback) => {
  try {
    let db = await newmongo.mongoConnection()
    let response = await newmongo.insertDocument(data, 'backlogData', db)
    callback(response);
    newmongo.mongoClose(db);

  } catch (e) {
    console.log(e);
  }

}

exports.deleteRow = function (data, callback) {
  let match = { iaName: data.iaName, cbboName: data.cbboName, cbboCode: data.cbboCode }
  mongo.removeDocument(match, 'IA-CbboMaster', function (response) {
    callback(response)
  })
}

exports.deleteOldRow = function (data, callback) {
  let match = { iaName: data.iaName, year: data.year }
  mongo.removeDocument(match, 'backlogData', function (response) {
    callback(response)
  })
}

exports.deleteRowMaping = async (data, callback) => {
  // console.log(data,'data');
  try {
    let db = await newmongo.mongoConnection()
    var mquery2 = { cbboName: data.cbboName, fpoName: data.fpoName, year: data.year, iaName: data.iaName, status: "assigned" }
    let res = await newmongo.findOne('missingFpo', mquery2, db)
    console.log(res, "res");
    if (res) {
      var mvalue2 = { status: "pending" }
      let response2 = newmongo.updateOne(mquery2, mvalue2, 'missingFpo', db)
    }
    let match = { iaName: data.iaName, cbboName: data.cbboName, fpoName: data.fpoName, cbboCode: data.cbboCode, year: data.year }
    mongo.removeDocument(match, 'ia-Cbbo-FpoMaster', function (response) {
      mongo.updateOneWithUnset({ cbboName: data.cbboName, fpoName: data.fpoName }, { cbboName: "" }, 'FPOmaster', function (response1) {
      })
      callback(response)
    })
  } catch (error) {
    console.log(error);
  }
}


exports.getgrievanceData = function (callback) {

  let aggregation1 = [
    {
      '$project': {
        '_id': 0, 
        'petitioner_name': 1, 
        'email': 1, 
        'district': 1, 
        'block': 1, 
        'uploadUrl': 1, 
        'mobile_no': 1, 
        'address': 1, 
        'sender_identity': 1, 
        'to_whom': 1, 
        'submitedOn': {
          '$dateToString': {
            'format': '%d-%m-%Y', 
            'date': '$submitedOn'
          }
        }
      }
    }
  ]
  console.log(JSON.stringify(aggregation1),"ooooo");
  mongo.queryWithAggregator(aggregation1, "GrievanceSubmit", function (response1) {
    // console.log(response1);
   
    callback(response1)
  })
  
}
