var mongo = require("../mongo/mongo");
var newmongo = require("../mongo/newMongo");
const moment = require("moment");

exports.publishData = async (data, callback) => {
  try {
    let db = await newmongo.mongoConnection();
    let randomValue = await newmongo.autoIncrement({}, "cbboreportmaster", db);
    let refNo = "cbboSl00" + randomValue;
    data.cbboSNo = refNo;
    data.insertionDate = new Date();
    data.dateofIncorporation = new Date(data.dateofIncorporation);
    data.status = "published";
    let response = await newmongo.insertDocument(data, "cbboreportmaster", db);
    callback(response);
    newmongo.mongoClose(db);
  } catch (e) {
    console.log(e);
  }
};

exports.draftData = async (data, callback) => {
  try {
    let db = await newmongo.mongoConnection();
    let randomValue = await newmongo.autoIncrement({}, "cbboreportmaster", db);
    let refNo = "cbboSl00" + randomValue;
    data.cbboSNo = refNo;
    data.insertionDate = new Date();
    data.status = "draft";
    let response = await newmongo.insertDocument(data, "cbboreportmaster", db);
    callback(response);
    newmongo.mongoClose(db);
  } catch (e) {
    console.log(e);
  }
};

exports.getIa = function (callback) {
  mongo.findAll("IAmaster", function (response1) {
    callback(response1);
  });
};

exports.getMappingData = function (cbboName,callback) {
  aggregation = [
    {
      $match: {
        cbboName: cbboName,
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ];
  mongo.queryWithAggregator(aggregation, "missingFpo", function (response) {
    callback(response);
  });
};

exports.getFpo = function (cbboName, callback) {
  aggregation = [
    {
      $match: {
        cbboName: cbboName,
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ];
  mongo.queryWithAggregator(aggregation, "FPOmaster", function (response) {
    console.log(response);
    callback(response);
  });
};

exports.getData = function (cbboCode, callback) {
  let aggregation = [
    {
      $match: {
        status: "published",
        cbboCode: cbboCode,
      },
    },
  ];
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    callback(response1);
  }
  );
};

exports.draftedData = function (cbboCode, callback) {
  var current = new Date();
  // console.log(current, "current");
  var currentDate = current.getDate();
  const date = new Date(Date.now());
  var currentMonth = date.toLocaleString("en-US", { month: "long" }); // {month:'long'}
  // console.log(currentMonth, "currentMonth");
  var previousData = [];
  if (currentDate >= 1 && currentDate <= 5) {
    const current1 = new Date();
    current1.setMonth(current1.getMonth() - 1);
    var previousMonth = current1.toLocaleString("default", { month: "long" });
    // console.log(previousMonth, "previousMonth");
    let aggregation1 = [
      {
        $match: {
          status: "draft",
          cbboCode: cbboCode,
          timeSlot: previousMonth,
        },
      },
    ];
    mongo.queryWithAggregator(
      aggregation1,
      "cbboreportmaster",
      function (response1) {
        previousData = response1;
      }
    );
  }

  let aggregation = [
    {
      $match: {
        status: "draft",
        timeSlot: currentMonth,
      },
    },
  ];
  mongo.queryWithAggregator(
    aggregation,
    "cbboreportmaster",
    function (response2) {
      let final = response2.concat(previousData);
      // console.log(final,"final");
      callback(final);
    }
  );
};

exports.getDetails = function (fpoId, callback) {
  let aggregation = [
    {
      '$match': {'fpoId': fpoId}
    }, {
      '$project': {'_id': 0,'fpoName': 1,'fpoId': 1,'regNoOfFPO': '$FPOData.regNoOfFPO','fpoMailId': '$FPOData.fpoMailId', 
        'fpoContactNo': '$FPOData.fpoContactNo','dateOfReg': '$FPOData.dateOfReg','haveBankAccount': '$accountDetails.haveBankAccount', 
        'noOfFarmerMember': '$FPOData.noOfFarmerMember','haveYearPlan': '$businessActivities1920.haveYearPlan','businessPlanFor2021': '$businessActivities1920.businessPlanFor2021', 
        'baselineSurvey': 1,'ceo': '$staffDetails.designation','womenbod': '$boardDirectorsDetails.sex','licenseType': '$License.licenseType', 
        'accountant': '$staffDetails.designation','gst': '$License.licenseType','boardDirectorsDetails': 1,'paidUpCapitalAmount': '$FPOData.paidUpCapitalAmount', 
        'NoOfFarmerMobilizedAsShareholders': '$FPOData.NoOfFarmerMobilizedAsShareholders','statutoryAudit': '$businessActivities1920.statutoryAudit', 
        'fpofilledRoc': '$businessActivities1920.fpofilledRoc','tradingThroughenum': '$businessActivities1920.tradingThroughenum', 
        'registrationEnum': '$businessActivities1920.registrationEnum','haveAvailedLoan': '$schemesAvailed.haveAvailedLoan', 
        'equityGrant': 1}
    }, {
      '$project': {'fpoName': 1,'fpoId': 1,'regNoOfFPO': 1,'fpoMailId': 1,'fpoContactNo': 1,'dateOfReg': 1,'haveBankAccount': 1, 
        'noOfFarmerMember': 1,'equityGrant': 1,'haveYearPlan': 1,'businessPlanFor2021': 1,'baselineSurvey': 1,'paidUpCapitalAmount': 1, 
        'womenbod': {'$cond': {'if': {'$in': ['Female', '$womenbod']},'then': true,'else': false}},'NoOfFarmerMobilizedAsShareholders': 1, 
        'ceo': {'$cond': {'if': {'$in': ['CEO', '$ceo']},'then': true,'else': false}},'statutoryAudit': 1,'fpofilledRoc': 1, 
        'accountant': {'$cond': {'if': {'$in': ['Accountant', '$accountant']},'then': true,'else': false}},'tradingThroughenum': 1, 
        'gst': {'$cond': {'if': {'$in': ['GST', '$gst']},'then': true,'else': false}},'registrationEnum': 1,'haveAvailedLoan': 1, 
        'bod': {'$size': '$boardDirectorsDetails'}}
    }, {
      '$lookup': {'from': 'fpoFinYearData','localField': 'fpoId','foreignField': 'fpoId','as': 'x'}
    }, {
      '$unwind': '$equityGrant'
    }, {
      '$sort': {'equityGrant.index': -1}
    }, {
      '$limit': 1
    }, {
      '$project': {'fpoName': 1,'fpoId': 1,'regNoOfFPO': 1,'fpoMailId': 1,'fpoContactNo': 1,'dateOfReg': 1,'haveBankAccount': 1, 
        'noOfFarmerMember': 1,'haveAvailedEquityGrant': '$equityGrant.haveAvailedEquityGrant','haveYearPlan': 1,'businessPlanFor2021': 1, 
        'baselineSurvey': 1,'womenbod': 1,'ceo': 1,'accountant': 1,'gst': 1,'bod': 1,'turnover': {'$arrayElemAt': ['$x.turnoverAmount', 0]}, 
        'paidUpCapitalAmount': 1,'NoOfFarmerMobilizedAsShareholders': 1,'statutoryAudit': 1,'fpofilledRoc': 1,'tradingThroughenum': 1, 
        'registrationEnum': 1,'haveAvailedLoan': 1}
    }
  ];
  mongo.queryWithAggregator(aggregation, "FPOmaster", function (response1) {
    if (response1.length > 0) {
      var tempDate = new Date(response1[0].dateOfReg);
      var tempMonth = parseInt(tempDate.getMonth()) + 1;
      if (tempMonth < 10) {
        tempMonth = "0" + tempMonth;
      }
      response1[0].dateOfReg =
        tempDate.getDate() + "-" + tempMonth + "-" + tempDate.getFullYear();
      callback(response1);
    } else {
      callback(response1);
    }
  });
};

exports.deleteRow = function (data, callback) {
  const cbboSNo = data.cbboSNo;
  mongo.removeDocument({ cbboSNo: cbboSNo }, "cbboreportmaster", function (response) {
    callback(response);
  }
  );
};

exports.updateList = function (data, callback) {
  let match = { timeSlot: data.timeSlot,iaName: data.iaName, year: data.year, fpo: data.fpo };
  console.log(match, "match");
  mongo.updateOne(match, data, "cbboreportmaster", function (response) {
    callback(response);
  });
};

exports.updatepublishList = function (data, callback) {
  const cbboSNo = data.cbboSNo;
  const publishDate = new Date();
  const status = "published";
  const alldata = { publishDate: publishDate, status: status };
  mongo.updateOne(
    { cbboSNo: cbboSNo },
    alldata,
    "cbboreportmaster",
    function (response) {
      callback(response);
    }
  );
};

exports.getdistrictList = function (callback) {
  mongo.findAll("districtMaster", function (response1) {
    callback(response1);
  });
};

exports.getBlocks = function (districtCode, callback) {
  let aggregation = [
    {
      $match: {
        districtCode: districtCode,
      },
    },
    {
      $project: {
        _id: 0,
        blockName: 1,
      },
    },
  ];
  mongo.queryWithAggregator(aggregation, "blockMaster", function (response1) {
    callback(response1);
  });
};

exports.getfpoList = function (blockName, callback) {
  console.log(blockName);
  let aggregation = [
    {
      $project: { _id: 0,
        "FPOData.block": {
          $toUpper: "$FPOData.block",
        },
        fpoName: 1,
        fpoId: 1,
        cbboName: 1,
      },
    },
    {
      $match: {
        "FPOData.block": blockName,
        cbboName: {
          $exists: false,
        },
      },
    },
    {
      $project: {
        fpoName: 1,
        fpoId: 1,
      },
    },
  ];
  mongo.queryWithAggregator(aggregation, "FPOmaster", function (response1) {
    callback(response1);
  });
};

exports.sendtoAdmin = async (data, callback) => {
  try {
    let db = await newmongo.mongoConnection();
    let randomValue = await newmongo.autoIncrement({}, "missingFpo", db);
    let refNo = "fpo000" + randomValue;
    data.FpoSlNo = refNo;
    data.status = "pending";
    let response = await newmongo.insertDocument(data, "missingFpo", db);
    callback(response);
    newmongo.mongoClose(db);
  } catch (e) {
    console.log(e);
  }
};

exports.getshareHolder = function (cbboCode, callback) {
  // var aggregation = [
  //   {
  //     $match: {status: "published",cbboCode: cbboCode}
  //   },
  //   {
  //     $group: {_id: null,total: {$sum: {$toInt: "$NoOfFarmerMobilizedAsShareholders"}}}
  //   },
  //   {
  //     $project: {_id: 0,total: 1}
  //   },
  // ];
  var aggregation =[
    {
      '$match': {'status': 'published','cbboCode': cbboCode}
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
  mongo.queryWithAggregator(aggregation,"cbboreportmaster",function (response) {
    if (response.length > 0) {
      callback(response[0]);
    } else {
      let response1 = { total: 0 };
      callback(response1);
    }
    }
  );
};

exports.getshareCapital = function (cbboCode, callback) {
  // let aggregation = [
  //   {
  //     $match: {status: "published",cbboCode: cbboCode}
  //   },
  //   {
  //     $group: {_id: null,total: {$sum: {$toInt: "$ShareCapitalMobilizedInInr"}}}
  //   },
  //   {
  //     $project: {_id: 0,total: 1}}
  // ];
  var aggregation =[
    {
      '$match': {'status': 'published','cbboCode': cbboCode}
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
  mongo.queryWithAggregator(aggregation,"cbboreportmaster",function (response1) {
    if (response1.length > 0) {
      callback(response1[0]);
    } else {
      let response = { total: 0 };
      callback(response);
    }
    }
  );
};

exports.getaverageofShare = function (cbboCode, callback) {
  // let aggregation = [
  //   {
  //     $match: {status: "published",cbboCode: cbboCode,},
  //   },
  //   {
  //     $project: { _id: 0,NoOfFarmerMobilizedAsShareholders: 1,},
  //   },
  //   {
  //     $group: { _id: "$_id",Average: {$avg: {$toInt: "$NoOfFarmerMobilizedAsShareholders",},},},
  //   },
  //   {
  //     $project: {Average: {$round: ["$Average"]}},
  //   },
  // ];
  let aggregation = [
    {
      '$match': {'status': 'published','cbboCode': cbboCode}
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
  mongo.queryWithAggregator(aggregation,"cbboreportmaster",function (response1) {
    if (response1.length > 0) {
      callback(response1[0]);
    } else {
      let response = { Average: 0 };
      callback(response);
    }
    }
  );
};

exports.getaverageofCapital = function (cbboCode, callback) {
  // let aggregation = [
  //   {
  //     $match: {status: "published",cbboCode: cbboCode}
  //   },
  //   {
  //     $project: {_id: 0,ShareCapitalMobilizedInInr: 1}
  //   },
  //   {
  //     $group: { _id: "$_id",Average: {$avg: {$toInt: "$ShareCapitalMobilizedInInr"}}}
  //   },
  //   {
  //     $project: { _id: 0,Average: {$round: ["$Average", 2]}}
  //   },
  // ];
  let aggregation = [
    {
      '$match': {'status': 'published','cbboCode': cbboCode}
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
  mongo.queryWithAggregator(aggregation,"cbboreportmaster",function (response1) {
    if (response1.length > 0) {
      callback(response1[0]);
    } else {
      let response = { Average: 0 };
      callback(response);
    }
    }
  );
};

exports.getaverageofTurnover = function (cbboCode, callback) {
  // let aggregation = [
  //   {
  //     $match: { status: "published", cbboCode: cbboCode },
  //   },
  //   {
  //     $project: { _id: 0, AnnualBusinessTurnoverinInr: 1 },
  //   },
  //   {
  //     $group: {_id: "$_id",Average: { $avg: { $toInt: "$AnnualBusinessTurnoverinInr" } },},
  //   },
  //   {
  //     $project: { _id: 0, Average: { $round: ["$Average", 2] } },
  //   },
  // ];
  let aggregation = [
    {
      '$match': {'status': 'published','cbboCode': cbboCode}
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
  mongo.queryWithAggregator(aggregation,"cbboreportmaster",function (response1) {
      if (response1.length > 0) {
        callback(response1[0]);
      } else {
        let response = { Average: 0 };
        callback(response);
      }
    }
  );
};

exports.getwomenBod = function (cbboCode, callback) {
  let aggregation = [
    {
      $match: {
        status: "published",
        cbboCode: cbboCode,
      },
    },
    {
      $group: {
        _id: "iaName",
        male: { $sum: { $cond: [{ $eq: ["$Min1WomenBod", "no"] }, 1, 0] } },
        female: {
          $sum: {
            $cond: [{ $eq: ["$Min1WomenBod", "yes"] }, 1, 0],
          },
        },
        total: { $sum: 1 },
      },
    },
    {
      $project: { _id: 0 },
    },
  ];
  mongo.queryWithAggregator(aggregation,"cbboreportmaster",function (response1) {
      callback(response1);
    }
  );
};

exports.getTotalFpo = function (cbboCode, callback) {
  let aggregation = [
    {
      $match: {
        cbboCode: cbboCode,
      },
    },
    {
      $count: "fpo",
    },
  ];
  mongo.queryWithAggregator(aggregation,"ia-Cbbo-FpoMaster",function (response1) {
      if (response1.length > 0) {
        callback(response1[0]);
      } else {
        let response = { fpo: 0 };
        callback(response);
      }
    }
  );
};

exports.getCbbotarget = function (cbboCode, callback) {
  let aggregation = [
    {
      $match: {
        cbboCode: cbboCode,
      },
    },
  ];
  mongo.queryWithAggregator(aggregation, "cbboTarget", function (response1) {
    callback(response1);
  });
};

// exports.getCbboContactForSendMessage = function (callback) {
//   let aggregation = [
    // {
    //   $match: { fpoName: "sidheswar", },
    // },
//     {
//       $project: { _id: 0, fpoName: 1, fpoId: 1, contactNo: "$FPOData.fpoContactNo", mailId: "$FPOData.fpoMailId", },
//     },
//   ];
//   mongo.queryWithAggregator(aggregation, "FPOmaster", function (response1) {
//     callback(response1);
//   });
// };

exports.monthWiseFpo = function (data, callback) {
  // console.log(data, "data");
  let aggregation = [
    {
      $match: { timeSlot: data.timeSlot },
    },
    {
      $project: { _id: 0, timeSlot: 1, insertionDate: 1, fpo: 1 },
    },
  ];
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response) {
    // console.log(response,"response");
    aggregation = [
      {
        $match: { cbboName: data.cbboName },
      },
      {
        $project: { _id: 0, fpoName: 1, fpoId: 1 },
      },
    ];
    mongo.queryWithAggregator(aggregation, "FPOmaster", function (fpoResult) {
      const current = new Date();
      var currentYear = current.getFullYear();
      var mapResult = [];
      if (response.length > 0) {
        for (let i = 0; i < response.length; i++) {
          var mapYear = response[i].insertionDate.getFullYear();
          if (mapYear === currentYear) {
            mapResult.push(response[i]);
          }
          if (response.length == i + 1) {
            if (fpoResult.length > 0) {
              var difference = fpoResult.filter((ar) => !mapResult.find((rm) => rm.fpo === ar.fpoName)
              );
              if (difference.length) {
                callback(difference);
              }
            }
          }
        }
      }else{
        callback(fpoResult);
      }
    });
  });
};
exports.getCbboDataByFilter = function (data, callback) {
  // console.log(data,"data");
  let condition = {   status: "published",
  cbboCode: data.cbboCode, year: data.year, timeSlot: data.timeSlot, iaName: data.iaName, fpo: data.fpo }
  if (condition.year == "") {
    delete condition.year;
  }
  if (condition.timeSlot == "") {
    delete condition.timeSlot;
  }
  if (condition.iaName == "") {
    delete condition.iaName;
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
    callback(response);
  }
  );
};

exports.getFpoReportFile = function (fpoId, callback) {
  let aggregation = [
    {
      '$match': {
        'fpoId': fpoId,
        'turnOverRepUploaded': true
      }
    }, {
      '$sort': {
        'addedOn': -1
      }
    }, {
      '$project': {
        '_id': 0,
      }
    },
  ];
  let aggregation1 = [
    {
      '$match': {
        'fpoId': fpoId
      }
    }, {
      '$project': {
        '_id': 0, 
        'fpoId': 1, 
        'businessFileUploaded': '$businessActivities1920.businessFileUploaded', 
        'businessFilePath': '$businessActivities1920.businessFilePath'
      }
    }, {
      '$match': {
        'businessFileUploaded': true
      }
    }, {
      '$project': {
        'fpoId': 1, 
        'businessFilePath': 1
      }
    }
  ]
  var finalResponse = {}
  mongo.queryWithAggregator(aggregation, "fpoFinYearData", function (response) {
    console.log(response,"response");
    if (response && response?.length > 0) {
      finalResponse.status = true, finalResponse.turnOverFilePath = response[0].turnOverFilePath;
    } else {
      finalResponse.status = false, finalResponse.turnOverFilePath = "";
    }
    mongo.queryWithAggregator(aggregation1, "FPOmaster", function (response1) {
      console.log(response1, "response1");
      if (response1 && response1?.length > 0) {
        finalResponse.status = true, finalResponse.businessFilePath = response1[0].businessFilePath;
      } else {
        finalResponse.status = false, finalResponse.businessFilePath = "";
      }
      console.log(finalResponse, "finalResponse");
      callback(finalResponse)
    });
  });
};

exports.getCbboList = function (iaName, callback) {
  let aggregation = [
    {
      '$match': {
        'iaName': iaName
      }
    }, {
      '$project': {
        '_id': 0, 
        'cbboName': 1
      }
    }, {
      '$sort': {
        'cbboName': 1
      }
    }
  ]
  mongo.queryWithAggregator(aggregation, "IA-CbboMaster", function (response1) {
    callback(response1);
  });
};

exports.getCbboTargetList = function ( data,refNo, callback) {
  var condition = {
    'refNo': refNo, 'typesOffpo': data.selectTypes, 'timeSlot': data.selectSlots, 'finyear': data.selectyear
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
    callback(response1)
  })
}

exports.getCbboAchievementList = function ( data,refNo, callback) {
  var condition = {
    'refNo': refNo, 'cbboName': data.selectCbbo
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
  mongo.queryWithAggregator(aggregation, "cbboreportmaster", function (response1) {
    callback(response1)
  })
}