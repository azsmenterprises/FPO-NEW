var mongo = require('../mongo/mongo')
var newmongo = require('../mongo/newMongo')
const moment = require('moment')


exports.getData = function (refNo, callback) {
  let aggregation = [
    {
      '$match': { 'refNo': refNo }
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    callback(response1)
  })
}

exports.getAverage = function (FinYear, refNo, callback) {
  let aggregation = [
    {
      '$match': { 'refNo': refNo, 'year': FinYear }
    }, {
      '$project': { '_id': 0, 'NoOfFarmerMobilizedAsShareholders': 1 }
    }, {
      '$group': { '_id': '$_id', 'AverageValue': { '$avg': { '$toInt': '$NoOfFarmerMobilizedAsShareholders' } } }
    }
  ]
  mongo.queryWithAggregator(aggregation, 'cbboreportmaster', function (response1) {
    callback(response1)
  })
}

exports.getYearwiseData = function (FinYear, refNo, callback) {
  let aggregation = [
    {
      '$match': { 'refNo': refNo, "year": FinYear }
    }, {
      '$facet': {
        'ceoStatus': [{
          '$project': { '_id': 0, 'CeoAppointed': 1 }
        }, {
          '$group': { '_id': '$CeoAppointed', 'CeoAppointed': { '$sum': { '$cond': [{ '$eq': ['$CeoAppointed', 'yes'] }, 1, 0] } } }
        }, { '$match': { '_id': 'yes' } }],
        'auditorstatus': [{
          '$project': { '_id': 0, 'AuditorAppointed': 1 }
        }, {
          '$group': { '_id': '$AuditorAppointed', 'AuditorAppointed': { '$sum': { '$cond': [{ '$eq': ['$AuditorAppointed', 'yes'] }, 1, 0] } } }
        }, { '$match': { '_id': 'yes' } }],
        'commencementstatus': [{
          '$project': { '_id': 0, 'commencementOfBusinessfieldWithMca': 1 }
        }, {
          '$group': { '_id': '$commencementOfBusinessfieldWithMca', 'commencementOfBusinessfieldWithMca': { '$sum': { '$cond': [{ '$eq': ['$commencementOfBusinessfieldWithMca', 'yes'] }, 1, 0] } } }
        }, { '$match': { '_id': 'yes' } }],
        'ststatus': [{
          '$project': { '_id': 0, 'GstLicenceApplied': 1 }
        }, {
          '$group': { '_id': '$GstLicenceApplied', 'GstLicenceApplied': { '$sum': { '$cond': [{ '$eq': ['$GstLicenceApplied', 'yes'] }, 1, 0] } } }
        }, { '$match': { '_id': 'yes' } }],
        'statutorystatus': [{
          '$project': { '_id': 0, 'statutoryAudit': 1 }
        }, {
          '$group': { '_id': '$statutoryAudit', 'statutoryAudit': { '$sum': { '$cond': [{ '$eq': ['$statutoryAudit', 'Yes'] }, 1, 0] } } }
        }, { '$match': { '_id': 'Yes' } }],
        'agmConducted': [{
          '$project': { '_id': 0, 'AgmConducted': 1 }
        }, {
          '$group': { '_id': '$AgmConducted', 'AgmConducted': { '$sum': { '$cond': [{ '$eq': ['$AgmConducted', 'yes'] }, 1, 0] } } }
        }, { '$match': { '_id': 'yes' } }],
        'filledroc': [{
          '$project': { '_id': 0, 'fpoFilledroc': 1 }
        }, {
          '$group': { '_id': '$fpoFilledroc', 'fpoFilledroc': { '$sum': { '$cond': [{ '$eq': ['$fpoFilledroc', 'Yes'] }, 1, 0] } } }
        }, { '$match': { '_id': 'Yes' } }],
        'accountantstatus': [{
          '$project': { '_id': 0, 'AccountedAppointed': 1 }
        }, {
          '$group': { '_id': '$AccountedAppointed', 'AccountedAppointed': { '$sum': { '$cond': [{ '$eq': ['$AccountedAppointed', 'yes'] }, 1, 0] } } }
        }, { '$match': { '_id': 'yes' } }]
      }
    }
  ]
  mongo.queryWithAggregator(aggregation, 'cbboreportmaster', function (response1) {
    callback(response1)
  })
}

exports.getTabledata = function (FinYear, refNo, callback) {
  let aggregation = [
    {
      '$match': { 'refNo': refNo, 'year': FinYear }
    }, {
      '$facet': {
        'enumstatus': [{
          '$project': { '_id': 0, 'RegistrationOnEnam': 1 }
        }, {
          '$group': { '_id': '$RegistrationOnEnam', 'RegistrationOnEnam': { '$sum': { '$cond': [{ '$eq': ['$RegistrationOnEnam', 'Yes'] }, 1, 0] } } }
        }, {
          '$match': { '_id': 'Yes' }
        }], 'tradingstatus': [{
          '$project': { '_id': 0, 'fpotradingThroughenum': 1 }
        }, {
          '$group': { '_id': '$fpotradingThroughenum', 'fpotradingThroughenum': { '$sum': { '$cond': [{ '$eq': ['$fpotradingThroughenum', 'Yes'] }, 1, 0] } } }
        }, {
          '$match': { '_id': 'Yes' }
        }]
      }
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    callback(response1)
  })
}

exports.getturnOver = function (FinYear, refNo, callback) {
  let aggregation = [
    {
      '$match': { 'refNo': refNo, 'year': FinYear }
    }, {
      '$project': { '_id': 0, 'AnnualBusinessTurnoverinInr': { '$toInt': '$AnnualBusinessTurnoverinInr' } }
    }, {
      '$match': { 'AnnualBusinessTurnoverinInr': { '$gt': 5000000 } }
    }, {
      '$count': 'AnnualBusinessTurnoverinInr'
    }
  ]
  mongo.queryWithAggregator(aggregation, 'cbboreportmaster', function (response1) {
    callback(response1)
  })
}

exports.getmouRegistration = function (FinYear, refNo, callback) {
  let aggregation = [
    {
      '$match': { 'refNo': refNo, 'year': FinYear }
    }, {
      '$project': { '_id': 0, 'NoOfMouSignedVendorRegistration': { '$toInt': '$NoOfMouSignedVendorRegistration' } }
    }, {
      '$group': { '_id': '$type', 'NoOfMouSignedVendorRegistration': { '$sum': '$NoOfMouSignedVendorRegistration' } }
    }
  ]
  mongo.queryWithAggregator(aggregation, 'cbboreportmaster', function (response1) {
    callback(response1)
  })
}

exports.getBusinessplan = function (FinYear, refNo, callback) {
  let aggregation = [
    {
      '$match': { 'refNo': refNo, 'year': FinYear, 'BusinessPlanFormulated': '3-5year' }
    }, {
      '$project': { '_id': 0, 'BusinessPlanFormulated': 1 }
    }, {
      '$count': 'BusinessPlanFormulated'
    }
  ]
  mongo.queryWithAggregator(aggregation, 'cbboreportmaster', function (response1) {
    callback(response1)
  })
}

exports.getTargetdata = function (FinYear, refNo, callback) {
  let aggregation = [
    {
      '$match': { 'refNo': refNo, 'year': FinYear }
    }, {
      '$facet': {
        'loanstatus': [{
          '$project': { '_id': 0, 'receivedloanFrombank': 1 }
        }, {
          '$group': { '_id': '$receivedloanFrombank', 'receivedloanFrombank': { '$sum': { '$cond': [{ '$eq': ['$receivedloanFrombank', 'Yes'] }, 1, 0] } } }
        }, {
          '$match': { '_id': 'Yes' }
        }],
        'equitystatus': [{
          '$project': { '_id': 0, 'EquityGrantAvailed': 1 }
        }, {
          '$group': { '_id': '$EquityGrantAvailed', 'EquityGrantAvailed': { '$sum': { '$cond': [{ '$eq': ['$EquityGrantAvailed', 'yes'] }, 1, 0] } } }
        }, {
          '$match': { '_id': 'yes' }
        }]
      }
    }
  ]
  mongo.queryWithAggregator(aggregation, 'cbboreportmaster', function (response1) {
    callback(response1)
  })
}

exports.getAverageofshare = function (FinYear, refNo, callback) {
  let aggregation = [
    {
      '$match': { 'refNo': refNo, 'year': FinYear }
    }, {
      '$project': { '_id': 0, 'ShareCapitalMobilizedInInr': 1 }
    }, {
      '$group': { '_id': '$_id', 'Average': { '$avg': { '$toInt': '$ShareCapitalMobilizedInInr' } } }
    }
  ]
  mongo.queryWithAggregator(aggregation, 'cbboreportmaster', function (response1) {
    callback(response1)
  })
}

exports.submit = async (data, callback) => {
  try {
    let db = await newmongo.mongoConnection()
    let response = await newmongo.insertDocument(data, 'targetAllocation', db)
    callback(response);
    newmongo.mongoClose(db);

  } catch (e) {
    console.log(e);
  }

}

exports.getRegdAge = function (fpoAge, iaName, callback) {

  if (fpoAge == "3month") {
    var date = new Date();
    var fromDate = new Date(date.setDate(date.getDate() - 90));
    var d = fromDate.getDate();
    var m = fromDate.getMonth() + 1;
    var y = fromDate.getFullYear();
    var fromDate1 = (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) + '-' + y;
    var fromDate2 = new Date(fromDate1);

    var match = { dateofIncorporation: { $gt: fromDate2 } }
  } else if (fpoAge == "11month") {
    var date = new Date();
    var fromDate = new Date(date.setDate(date.getDate() - 330));
    var d = fromDate.getDate();
    var m = fromDate.getMonth() + 1;
    var y = fromDate.getFullYear();
    var fromDate1 = (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) + '-' + y;
    var fromDate2 = new Date(fromDate1);


    var date = new Date();
    var toDate = new Date(date.setDate(date.getDate() - 90));
    var d = toDate.getDate();
    var m = toDate.getMonth() + 1;
    var y = toDate.getFullYear();
    var toDate1 = (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) + '-' + y;
    var toDate2 = new Date(toDate1);


    var match = { $and: [{ dateofIncorporation: { $gte: fromDate2 } }, { dateofIncorporation: { $lt: toDate2 } }] }
  } else {
    var date = new Date();
    var fromDate = new Date(date.setDate(date.getDate() - 360));
    var d = fromDate.getDate();
    var m = fromDate.getMonth() + 1;
    var y = fromDate.getFullYear();
    var fromDate1 = (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) + '-' + y;
    var fromDate2 = new Date(fromDate1);
    // console.log(fromDate2,'fromDate2');
    var match = { dateofIncorporation: { $lt: fromDate2 } }

  }
  match.iaName = iaName;
  let aggregation = [{ $match: match },
  // { $count: "total" }
  // {'$match': { 'refNo': refNo }},
  { '$project': { '_id': 0, } }
  ]
  mongo.queryWithAggregator(aggregation, 'cbboreportmaster', function (response1) {
    callback(response1)
  })
}

exports.getAchievement = function (iaName, year, callback) {
  var fpocount;
  aggregation = [
    {
      '$match': { 'iaName': iaName, 'year': year }
    }, {
      '$project': { '_id': 0, 'iaName': 0, 'cbboName': 0, 'year': 0 }
    }, {
      '$count': 'fpo'
    }
  ]

  mongo.queryWithAggregator(aggregation, "ia-Cbbo-FpoMaster", function (response) {
    // callback(response)
    console.log(response, 'response');

    if (response) {
      fpocount = response.length > 0 ? response[0]?.fpo : 0;
      aggregation1 = [
        {
          '$match': { 'iaName': iaName, 'year': year }
        }, {
          '$project': { '_id': 0, 'targets': 1 }
        },
      ]
      mongo.queryWithAggregator(aggregation1, "iaTarget", function (response1) {
        var targets = response1.length > 0 ? response1[0].targets : 0;
        var final = { fpo: fpocount, targets: targets }
        console.log(final, 'final');
        callback(final)
      })
    }
    //  fpocount = response[0]?.fpo

  })
}



exports.iaTarget = async (data, callback) => {
  try {
    let db = await newmongo.mongoConnection()
    let response = await newmongo.insertDocument(data, 'iaTarget', db)
    if (response) {
      callback({ status: true, message: "Data added successfully" })
    } else {
      callback({ status: false, message: "Data not added " })
    }
    // callback(response);
    newmongo.mongoClose(db);

  } catch (e) {
    console.log(e);
  }

}

exports.getcbboList = function (iaName, callback) {
  aggregation = [
    {
      '$match': { 'iaName': iaName }
    }, {
      '$project': {
        'cbboName': 1,
        'cbboCode': 1,
        '_id': 0
      }
    }
  ]
  mongo.queryWithAggregator(aggregation, "IA-CbboMaster", function (response) {
    callback(response)
  })
}

exports.fpoList = function (iaName, cbboName,year, callback) {
  aggregation = [
    {
      '$match': {
        'iaName': iaName,
        'cbboName': cbboName,
        'year': year,
      }
    }, {
      '$project': {
        '_id': 0,
        'iaName': 0,
        'cbboName': 0,
        'year': 0,
        'cbboCode': 0
      }
    }, {
      '$count': 'fpoName'
    }
  ]
  mongo.queryWithAggregator(aggregation, "ia-Cbbo-FpoMaster", function (response) {
    callback(response)
  })
}

exports.cbboTarget = async (data, callback) => {
  try {
    let db = await newmongo.mongoConnection()
    let response = await newmongo.insertDocument(data, 'cbboTarget', db)
    callback(response);
    newmongo.mongoClose(db);

  } catch (e) {
    console.log(e);
  }

}

exports.showcbboTarget = function (iaName, callback) {
  aggregation = [
    {
      '$match': {
        'iaName': iaName
      }
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboTarget", function (response) {
    callback(response)
  })
}

exports.getdashboarddataByYear = function (data, refNo, callback) {
  // console.log(data, 'data');
  // console.log(11111111111111);

  // var condition;

  // if (data.selectAgency === 'FDRVC') {
  //   condition = {
  //     'typesOffpo': data.selectTypes, 'timeSlot': data.selectSlots, 'finyear': data.selectyear,
  //   }
  // }

  // console.log(refNo,"refNo");
  var condition = {
    'refNo': refNo, 'typesOffpo': data.selectTypes, 'timeSlot': data.selectSlots, 'finyear': data.selectyear, 'iaName': data.selectAgency
  }
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

    callback(response1)
  })
}

exports.gettotalCbbo = function (iaName, callback) {
  let aggregation = [
    {
      '$match': {
        'iaName': iaName
      }
    }, {
      '$count': 'cbbo'
    }
  ]
  mongo.queryWithAggregator(aggregation, "IA-CbboMaster", function (response1) {
    console.log(response1, "maduri");
    let result = response1.length == 0 ? 0 : response1[0].cbbo
    console.log(result, "result");
    callback({ "totalCbbo": result })
    // callback(response1)
  })
}

exports.gettotalFpo = function (iaName, callback) {
  let aggregation = [
    {
      '$match': {
        'iaName': iaName
      }
    }, {
      '$count': 'fpo'
    }
  ]
  mongo.queryWithAggregator(aggregation, "ia-Cbbo-FpoMaster", function (response1) {
    console.log(response1, "master");
    let result = response1.length == 0 ? 0 : response1[0].fpo
    console.log(result, "result");
    callback({ "totalFpo": result })
    // callback(response1)
  })
}

exports.getshareHolder = function (iaName, callback) {
  // var aggregation = [
  //   {
  //     '$match': { 'status': 'published', 'iaName': iaName }
  //   }, {
  //     '$group': { '_id': null, 'total': { '$sum': { '$toInt': '$NoOfFarmerMobilizedAsShareholders' } } }
  //   }, {
  //     '$project': { '_id': 0, 'total': 1 }
  //   }
  // ]
  var aggregation =[
    {
      '$match': {'status': 'published','iaName': iaName }
    }, {
      '$project': {'_id': 0,'NoOfFarmerMobilizedAsShareholders': 1,'insertionDate': 1,'fpo': 1}
    }, {
      '$sort': {'insertionDate': -1}
    }, {
      '$group': {'_id': '$fpo','data': {'$push': {'NoOfFarmerMobilizedAsShareholders': '$NoOfFarmerMobilizedAsShareholders','insertionDate': '$insertionDate'}}}
    }, {
      '$project': {'_id': 0,'fpo': '$_id','data': 1}
    }, {
      '$project': {'newField': {'$arrayElemAt': ['$data', 0]},'fpo': 1}
    }, {
      '$project': {'NoOfFarmerMobilizedAsShareholders': '$newField.NoOfFarmerMobilizedAsShareholders','insertionDate': '$newField.insertionDate'}
    }, {
      '$group': {'_id': '$_id','total': {'$sum': {'$toInt': '$NoOfFarmerMobilizedAsShareholders'}}}
    }, {
      '$project': {'_id': 0,'total':1}
    }
  ]
    mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response) {
      if (response.length > 0) {
        callback(response[0])
      } else {
        let response1 = { total: 0 }; 
        callback(response1)
      }
    })
}

exports.getshareCapital = function (iaName,callback) {
  // let aggregation =[
  //   {
  //     '$match': {'status': 'published','iaName': iaName}
  //   }, {
  //     '$group': {'_id': null,'total': {'$sum': {'$toInt': '$ShareCapitalMobilizedInInr'}}}
  //   }, {
  //     '$project': {'_id': 0,'total': 1}
  //   }
  // ]
  var aggregation =[
    {
      '$match': {'status': 'published','iaName': iaName}
    }, {
      '$project': {'_id': 0,'ShareCapitalMobilizedInInr': 1,'insertionDate': 1,'fpo': 1}
    }, {
      '$sort': {'insertionDate': -1}
    }, {
      '$group': {'_id': '$fpo','data': {'$push': {'ShareCapitalMobilizedInInr': '$ShareCapitalMobilizedInInr','insertionDate': '$insertionDate'}}}
    }, {
      '$project': {'_id': 0,'fpo': '$_id','data': 1}
    }, {
      '$project': {'newField': {'$arrayElemAt': ['$data', 0]},'fpo': 1}
    }, {
      '$project': {'ShareCapitalMobilizedInInr': '$newField.ShareCapitalMobilizedInInr','insertionDate': '$newField.insertionDate'}
    }, {
      '$group': {'_id': '$_id','total': {'$sum': {'$toInt': '$ShareCapitalMobilizedInInr'}}}
    }, {
      '$project': {'_id': 0,'total':1}
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    if (response1.length > 0) {
      callback(response1[0])
    } else {
      let response = { total: 0 }; 
      callback(response)
    }
  })
}

exports.getaverageofShare = function (iaName, callback) {
  // let aggregation = [
  //   {
  //     '$match': { 'status': 'published', 'iaName': iaName }
  //   }, {
  //     '$project': { '_id': 0, 'NoOfFarmerMobilizedAsShareholders': 1 }
  //   }, {
  //     '$group': { '_id': '$_id', 'Average': { '$avg': { '$toInt': '$NoOfFarmerMobilizedAsShareholders' } } }
  //   }, {
  //     '$project': { 'Average': { '$round': ['$Average'] } }
  //   }
  // ]
  let aggregation = [
    {
      '$match': {'status': 'published','iaName': iaName}
    }, {
      '$project': {'_id': 0,'NoOfFarmerMobilizedAsShareholders': 1,'insertionDate': 1,'fpo': 1}
    }, {
      '$sort': {'insertionDate': -1}
    }, {
      '$group': {'_id': '$fpo','data': {'$push': {'NoOfFarmerMobilizedAsShareholders': '$NoOfFarmerMobilizedAsShareholders','insertionDate': '$insertionDate'}}}
    }, {
      '$project': {'_id': 0,'fpo': '$_id','data': 1}
    }, {
      '$project': {'newField': {'$arrayElemAt': ['$data', 0]},'fpo': 1}
    }, {
      '$project': {'NoOfFarmerMobilizedAsShareholders': '$newField.NoOfFarmerMobilizedAsShareholders','insertionDate': '$newField.insertionDate'}
    }, {
      '$group': {'_id': '$_id','Average': {'$avg': {'$toInt': '$NoOfFarmerMobilizedAsShareholders'}}}
    }, {
      '$project': {'_id': 0,'Average': {'$round': ['$Average']}}
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    if (response1.length > 0) {
      callback(response1[0])
    } else {
      let response = { Average: 0 }; 
      callback(response)
    }
  })
}

exports.getaverageofCapital = function (iaName, callback) {
  // let aggregation = [
  //   {
  //     '$match': { 'status': 'published', 'iaName': iaName }
  //   }, {
  //     '$project': { '_id': 0, 'ShareCapitalMobilizedInInr': 1 }
  //   }, {
  //     '$group': { '_id': '$_id', 'Average': { '$avg': { '$toInt': '$ShareCapitalMobilizedInInr' } } }
  //   }, {
  //     '$project': { '_id': 0, 'Average': { '$round': ['$Average', 2] } }
  //   }
  // ]
  let aggregation = [
    {
      '$match': {'status': 'published','iaName': iaName}
    }, {
      '$project': {'_id': 0,'ShareCapitalMobilizedInInr': 1,'insertionDate': 1,'fpo': 1}
    }, {
      '$sort': {'insertionDate': -1}
    }, {
      '$group': {'_id': '$fpo','data': {'$push': {'ShareCapitalMobilizedInInr': '$ShareCapitalMobilizedInInr','insertionDate': '$insertionDate'}}}
    }, {
      '$project': {'_id': 0,'fpo': '$_id','data': 1}
    }, {
      '$project': {'newField': {'$arrayElemAt': ['$data', 0]},'fpo': 1}
    }, {
      '$project': {'ShareCapitalMobilizedInInr': '$newField.ShareCapitalMobilizedInInr','insertionDate': '$newField.insertionDate'}
    }, {
      '$group': {'_id': '$_id','Average': {'$avg': {'$toInt': '$ShareCapitalMobilizedInInr'}}}
    }, {
      '$project': {'_id': 0,'Average': {'$round': ['$Average', 2]}}
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    if (response1.length > 0) {
      callback(response1[0])
    } else {
      let response = { Average: 0 }; 
      callback(response)
    }
  })
}


exports.getaverageofTurnover = function (iaName, callback) {
  // let aggregation = [
  //   {
  //     '$match': { 'status': 'published', 'iaName': iaName }
  //   }, {
  //     '$project': { '_id': 0, 'AnnualBusinessTurnoverinInr': 1 }
  //   }, {
  //     '$group': { '_id': '$_id', 'Average': { '$avg': { '$toInt': '$AnnualBusinessTurnoverinInr' } } }
  //   }, {
  //     '$project': { '_id': 0, 'Average': { '$round': ['$Average', 2] } }
  //   }
  // ]
  let aggregation = [
    {
      '$match': {'status': 'published', 'iaName': iaName }
    }, {
      '$project': {'_id': 0,'AnnualBusinessTurnoverinInr': 1,'insertionDate': 1,'fpo': 1}
    }, {
      '$sort': {'insertionDate': -1}
    }, {
      '$group': {'_id': '$fpo','data': {'$push': {'AnnualBusinessTurnoverinInr': '$AnnualBusinessTurnoverinInr','insertionDate': '$insertionDate'}}}
    }, {
      '$project': {'_id': 0,'fpo': '$_id','data': 1}
    }, {
      '$project': {'newField': {'$arrayElemAt': ['$data', 0]},'fpo': 1}
    }, {
      '$project': {'AnnualBusinessTurnoverinInr': '$newField.AnnualBusinessTurnoverinInr','insertionDate': '$newField.insertionDate'}
    }, {
      '$group': {'_id': '$_id','Average': {'$avg': {'$toInt': '$AnnualBusinessTurnoverinInr'}}}
    }, {
      '$project': {'_id': 0,'Average': {'$round': ['$Average', 2]}}
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    if (response1.length > 0) {
      callback(response1[0])
    } else {
      let response = { Average: 0 }; 
      callback(response)
    }
  })
}

exports.getwomenBod = function (iaName, callback) {
  let aggregation = [
    {
      '$match': { 'status': 'published', 'iaName': iaName }
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

exports.selfTarget = function (iaName, callback) {
  // console.log(iaName,"iaName");
  let aggregation = [
    {
      '$match': { 'iaName': iaName }
    }
  ]
  mongo.queryWithAggregator(aggregation, "iaTarget", function (response1) {
    callback(response1)
  })
}

exports.deleteRowTarget = function (data, callback) {
  let match = { targets: data.targets, year: data.year, achievements: data.achievements, iaName: data.iaName }
  mongo.removeDocument(match, 'iaTarget', function (response) {
    if (response) {
      callback({ status: true, message: "Deleted successfully" })
    } else {
      callback({ status: false, message: "Deletion failed" })
    }
  })
}
exports.deleteCbboTarget = function (data, callback) {
  console.log(data, "data");
  let match = { year: data.year, iaName: data.iaName, cbboCode: data.cbboCode, targets: data.targets, achievements: data.achievements, }
  mongo.removeDocument(match, 'cbboTarget', function (response) {
    if (response) {
      callback({ status: true, message: "Deleted successfully" })
    } else {
      callback({ status: false, message: "Deletion failed" })
    }
  })
}
exports.getDataByFilter = function (data, callback) {
  // console.log(data, "data");

  let condition = {refNo: data.refNo, year: data.year, timeSlot: data.timeSlot, cbboName: data.cbboName, fpo: data.fpo }
  if (condition.year == "") {
    delete condition.year;
  }
  if (condition.timeSlot == "") {
    delete condition.timeSlot;
  }
  if (condition.cbboName == "") {
    delete condition.cbboName;
  }
  if (condition.fpo == "") {
    delete condition.fpo;
  }
  // console.log(condition,"333333333");
 let aggregation = [
    {
      '$match': condition
    }
  ]
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response) {
    // console.log(response.length,"response");
    callback(response)
  })
}

