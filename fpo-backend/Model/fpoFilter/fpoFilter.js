var newMongo = require('../mongo/newMongo')



exports.loadFpos = async (callback) => {
  try {
    let aggregate =[
      {
        '$match': {
          'status': 'Approved'
        }
      }, {
        '$project': {
          'fpoId': 1, 
          'fpoName': {
            '$toUpper': '$fpoName'
          }, 
          'refNo': 1, 
          'FPOData.district': {
            '$toUpper': '$FPOData.district'
          }, 
          'FPOData.block': {
            '$toUpper': '$FPOData.block'
          }, 
          'FPOData.noOfFarmerMember': 1, 
          'totalBusinessDone.tbd1920': 1
        }
      }, {
        '$project': {
          '_id': 0, 
          'fpoId': 1, 
          'fpoName': 1, 
          'refNo': 1, 
          'FPOData': 1, 
          'distrctName': '$FPOData.district', 
          'blockName': '$FPOData.block', 
          'totalBusinessDone': 1
        }
      }, {
        '$sort': {
          'fpoName': 1
        }
      }
    ]
    const db = await newMongo.mongoConnection();
    let response = await newMongo.queryWithAggregator(aggregate, 'FPOmaster', db)
    // //console.log(response,aggregate,"jhgjhdgjh");
    callback(response)
    newMongo.mongoClose(db)
  } catch (e) {

  }
}

exports.loadFposWithSort = async (callback) => {
  try {
    let aggregate = [
      {
        '$project': {
          'fpoId': 1, 'fpoName': {
            '$toUpper': '$fpoName'
          }, 'refNo': 1,
          'FPOData.district': {
            '$toUpper': '$FPOData.district'
          }, 'FPOData.block': {
            '$toUpper': '$FPOData.block'
          },
          'FPOData.noOfFarmerMember': 1,
          'totalBusinessDone.tbd1920': 1
        }
      }, {
        '$sort': {
          'fpoName': 1
        }
      }
    ]
    const db = await newMongo.mongoConnection();
    let response = await newMongo.queryWithAggregator(aggregate, 'FPOmaster', db)
    callback(response)
    newMongo.mongoClose(db)
  } catch (e) {

  }
}

exports.searchFpoFromSearchBar = async (searchFpoName, callback) => {
  try {
    let aggregate = [
      {
        '$project': {
          'fpoId': 1,
          'fpoName': {
            '$toUpper': '$fpoName'
          },
          'refNo': 1,
          'FPOData.district': {
            '$toUpper': '$FPOData.district'
          },
          'FPOData.block': {
            '$toUpper': '$FPOData.block'
          },
          'FPOData.noOfFarmerMember': 1,
          'totalBusinessDone.tbd1920': 1
        }
      }, {
        '$match': {
          'fpoName': {
            '$regex': searchFpoName.toUpperCase()
          }
        }
      }, {
        '$sort': {
          'fpoName': 1
        }
      }
    ]
    const db = await newMongo.mongoConnection();
    let response = await newMongo.queryWithAggregator(aggregate, 'FPOmaster', db)
    callback(response)
    newMongo.mongoClose(db)
  } catch (e) {

  }
}

exports.loadCropCatagories = async (callback) => {
  try {
    let aggregate = [
      {
        '$group': {
          '_id': '$Crop_category'
        }
      }, {
        '$sort': {
          '_id': 1
        }
      }
    ]

    const db = await newMongo.mongoConnection();
    let response = await newMongo.queryWithAggregator(aggregate, 'cropMaster', db);
    callback(response);
    newMongo.mongoClose(db)
  } catch (e) {

  }
}

// exports.searchFpo = async (data, callback) => {
//   console.log(data, 222222);
//   try {
//     let match = {}
//     if (data.districtCode != 'undefined' && data.districtCode != 'null') {
//       match = { 'FPOData.district_id': data.districtCode }
//     }
//     if (data.blockCode != 'undefined' && data.blockCode != 'null' && data.blockCode != undefined) {
//       match1 = { 'FPOData.block_id': data.blockCode }
//       match = { ...match, ...match1 }
//     }
//     var aggregate = [{ '$match': match }]
//     if (data.cropcat != 'undefined' && data.cropcat != 'null') {
//       cropCat = data.cropcat.split(',')
//       aggregate = [{ '$match': match }, {
//         $lookup: {
//           from: 'figProducedAggreMaster',
//           localField: 'fpoId',
//           foreignField: 'fpo.fpoId',
//           as: 'otherDetail'
//         }
//       }, {
//         $match: {
//           otherDetail: { $gt: { $size: 1 } },
//           'otherDetail.cropCatagory': { $in: cropCat }
//         }
//       }]

//     }




//     let db = await newMongo.mongoConnection()
//     let response = await newMongo.queryWithAggregator(aggregate, 'FPOmaster', db)
//     console.log(response,"responseresponseresponseresponse");
//     callback(response)
//     newMongo.mongoClose(db)

//   } catch (e) {

//   }
// }


exports.searchFpo = async (data, callback) => {
  // console.log(data,222222);
  try {
    let match = {}
    if (data.districtCode != '') {
      match = { 'FPOData.district_id': data.districtCode }
    }
    // if (data.blockCode != 'undefined' && data.blockCode != 'null'&& data.blockCode != undefined) {
    //   match1 = { 'FPOData.block_id': data.blockCode }
    //   match = { ...match, ...match1 }
    // }
    if (data.blockCode != '') {
      console.log("dcfghj");
      match = { 'FPOData.district_id': data.districtCode, 'FPOData.block_id': data.blockCode }
    }
    if (data.cropcat != '') {
      match.cropName = data.cropcat
    }

    console.log(match, "match");

    // let aggregate = [{ '$match': match }]
    // let db = await newMongo.mongoConnection()
    // let response = await newMongo.queryWithAggregator(aggregate, 'FPOmaster', db)
    // console.log(response,"response");
    let match1 = {};
    var aggregate1;
    if (data.startTurnoverNo == 'undefined' || data.endTurnoverNo == 'undefined') {
      // data.startTurnoverNo = '0';
      aggregate1 = [
        { '$match': match },
        {
          '$lookup': {
            'from': 'fpoFinYearData',
            'localField': 'fpoId',
            'foreignField': 'fpoId',
            'as': 'x'
          }
        },
        {
          '$project': {
            'turnover': {
              '$arrayElemAt': [
                '$x.turnoverAmount', 0
              ]
            },
            'fpoId': 1,
            'district_id': '$FPOData.district_id',
            'district': '$FPOData.district',
            'block_id': '$FPOData.block_id',
            'block': '$FPOData.block',
            'cropName': 1,
            'fpoName': 1
          }
        }
      ]
      // console.log(JSON.stringify(aggregate1),"aggregate1aggregate1aggregate1");  
    } else {
      match1 = { "turnover": { "$gte": parseInt(data.startTurnoverNo), "$lte": parseInt(data.endTurnoverNo) } };
      aggregate1 = [
        { '$match': match },
        {
          '$lookup': {
            'from': 'fpoFinYearData',
            'localField': 'fpoId',
            'foreignField': 'fpoId',
            'as': 'x'
          }
        },
        {
          '$project': {
            'turnover': {
              '$arrayElemAt': [
                '$x.turnoverAmount', 0
              ]
            },
            'fpoId': 1,
            'district_id': '$FPOData.district_id',
            'district': '$FPOData.district',
            'block_id': '$FPOData.block_id',
            'block': '$FPOData.block',
            'cropName': 1,
            'fpoName': 1
          }
        }, {
          '$project': {
            'turnover': { $toInt: "$turnover" },
            'fpoId': 1,
            'district_id': 1,
            'district': 1,
            'block_id': 1,
            'block': 1,
            'cropName': 1,
            'fpoName': 1
          }
        },
        { '$match': match1 }
      ]
    }
    // if (data.endTurnoverNo == 'undefined') {
    //   data.endTurnoverNo = '0';
    // }
    // match1 = { "turnover": { "$gte": data.startTurnoverNo, "$lte": data.endTurnoverNo } };

    // let aggregate1 = [{ '$match': match1 }]

    let db1 = await newMongo.mongoConnection()
    let response1 = await newMongo.queryWithAggregator(aggregate1, 'FPOmaster', db1)
    if (response1.length > 0) {
      console.log(response1.length, "response1");
      callback(response1)
      newMongo.mongoClose(db)
    }


  } catch (e) {

  }
}