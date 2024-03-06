var newMongo = require('../mongo/newMongo')

// exports.getFpoRefNoFromFpoFilterPage=function(fpoRefNo){
//     this.fpoRefNoFetchedFromFpoFilter=fpoRefNo
// }

exports.fpoDetails = async (fpoRefNo, callback) => {

  try {
    let db = await newMongo.mongoConnection()
    let aggregator = [
      { '$match': { 'refNo': fpoRefNo } },
      {
        '$project': {
          'fpoName': 1, 'fpoId': 1, 'refNo': 1, 'organisationHelpedToCreateSPO': 1,
          'FPOData.address': 1, 'FPOData.fpoMailId': 1, 'FPOData.fpoContactNo': 1, 'FPOData.regNoOfFPO': 1, 'FPOData.noOfFarmerMember': 1,
          'noOfBoardDirectors': { '$size': '$boardDirectorsDetails' },
          'bodStaffTotal': {
            '$sum': [
              '$noOfBoardDirectors', { '$size': '$staffDetails' }
            ]
          },
          'FPOAwardSize': { '$size': '$FPOAward' }, 'FPOAward': 1, 'processingCapacity': 1, 'FPOData.storageArea': 1, 'FPOData.dateOfReg': 1,
          'totalBusinessDone.tbd1920': 1, 'totalBusinessDone.tbd1819': 1, 'totalBusinessDone.tbd1718': 1, 'schemesAvailed': 1, 'businessActivities1920.businessActivities': 1,
          'secondaryBusinessDetails.businessActivity': 1, 'Capacity': 1, 'InfraCapacity': 1, 'InfrastructureDetail': 1, 'storageDetails': 1,
          'total': { '$size': { '$filter': { 'input': '$boardDirectorsDetails', 'cond': { '$eq': ['$$this.sex', 'Female'] } } } },
          'ceoName': { '$filter': { 'input': '$staffDetails', 'cond': { '$eq': ['$$this.designation', 'CEO'] } } }
        }
      }
    ]
    // console.log(JSON.stringify(aggregator),"ddddddddd");
    let response = await newMongo.queryWithAggregator(aggregator, 'FPOmaster', db);
    let aggregator1 = [
      { '$match': { 'fpoId': response[0].fpoId } },
      { '$sort': { '_id': -1 } }]
    let response1 = await newMongo.queryWithAggregator(aggregator1, 'meetingsDetails', db)
    if (response1.length > 0) {
      response[0].lastBodMeeting = response1[0].meetingDate
    } else {
      response[0].lastBodMeeting = 'No meetings held'
    }

    let aggregator2 = [
      { '$match': { 'fpo.fpoId': fpoId, 'fpoApproved': true } }, {
        '$group': {
          '_id': {
            'type': '$type', 'cropCatagory': '$cropCatagory',
            'crop': '$crop.Crop_Code', 'cropName': '$crop.Crop_Name', 'variety': '$variety.Variety_Code'
          },
          'minHarvDate': { '$min': '$harvestingDate' },
          'maxHarvDate': { '$max': '$harvestingDate' }, 'quantity': {
            '$sum': '$quantity'
          }, 'harvestingDate': {
            '$first': '$harvestingDate'
          }, 'picOfProduct': { '$first': '$picOfProduct' }
        }
      }]
    let response2 = await newMongo.queryWithAggregator(aggregator2, 'figProducedAggreMaster', db);


    if (response2.length != 0) {
      response[0].cropProducedAggreData = response2
      callback(response);
    } else {
      let aggregator3 = [{ '$match': { fpoId: response[0].fpoId } }]
      let response3 = await newMongo.queryWithAggregator(aggregator3, 'cropProduction', db);
      response[0].cropProducedAggreData = response3
      // console.log(response3, "data");
      callback(response);
    }

    newMongo.mongoClose(db)
  } catch (e) {
    console.log(12, e.message);
  }
}


exports.getProfileLikes = async (fpoId, callback) => {
  try {
    // //console.log(fpoId,"in model");
    let aggregator = [
      {
        '$match': {
          'type': 'Interested',
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

    let db = await newMongo.mongoConnection()
    let response = await newMongo.queryWithAggregator(aggregator, 'userDataFromFpoProfile', db);
    // //console.log(response);
    callback(response)
    newMongo.mongoClose(db)
  } catch (e) {
    //console.log(e)

  }
}

exports.varifyOtpAndSendData = async (data, callback) => {
  try {
    let userData;
    if (data.type == "Like") {
      userData = {
        type: data.type,
        fpoName: data.fpoName,
        fpoId: data.fpoId
      }
    }
    else {

      userData = {
        type: data.type,
        fpoName: data.fpoName,
        fpoId: data.fpoId,
        mobNo: data.mobNo,
        name: data.name,
        message: data.messageText,
        typeCat: data.typeCat,
        status: ""
      }
    }
    let db = await newMongo.mongoConnection()
    let response = await newMongo.insertDocument(userData, 'userDataFromFpoProfile', db)

    callback(response.insertedCount)
    newMongo.mongoClose(db)
  } catch (e) {

  }
}
exports.updateFpoTest = async (callback) => {
  try {
    let db = await newMongo.mongoConnection()
    let aggregator2 = [{ $match: { refNo: { $exists: true } } }]
    let response2 = await newMongo.queryWithAggregator(aggregator2, 'FPOmaster1', db);
    response2.forEach(function (a) {

      newMongo.updateOne({ refNo: a.refNo }, { FPOAward: a.FPOAward, schemesAvailed: a.schemesAvailed, blockStatus: a.blockStatus, distUpdated: a.distUpdated }, 'FPOmaster', db)

    })

    callback(true);

  } catch (e) {
    console.log(12, e.message);
  }
}



