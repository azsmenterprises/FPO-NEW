var mongo = require("../mongo/mongo");
var newmongo = require("../mongo/newMongo");
const moment = require("moment");

exports.getfpoList = function (distCode, callback) {
    let aggregation = [
        {$match:{"FPOData.district_id": distCode}},
        {$project:{fpoName: 1,_id: 0, fpoId: 1}},
        {$sort: {'fpoName': 1}}
      ];
    mongo.queryWithAggregator(aggregation, "FPOmaster", function (response1) {
      callback(response1);
    });
  };
  
  exports.getBodMeetingDetails = function (financialYear, fpoId, callback) {
    let aggregation = [
        {$match: {fpoId:fpoId}},
        {$addFields: {meetingYear: {$year: {$toDate: "$meetingDate"}}}},
        {$addFields: {financialYear: {$concat: [{$toString: "$meetingYear"},"-",{$toString: {$add: ["$meetingYear", 1]}}]}}},
        {$project: {_id: 0}},
        {$match:{financialYear: financialYear}},
      ];
    mongo.queryWithAggregator(aggregation, "meetingsDetails", function (response1) {
      callback(response1);
    });
  }

  exports.getFpoDetails = function (financialYear, fpoId, callback) {
    let aggregation = [
      {$match:{fpoId: fpoId,"FPOData.year": financialYear}},
      {$project:{_id: 0}},
    ]
    mongo.queryWithAggregator(aggregation, "FPOmaster", function (response1) {
      callback(response1);
    });
  }

//  added by arindam


  exports.getfpoListforBusiness = function (distCode, callback) {
    let aggregation = [
        {$match:{"FPOData.district_id": distCode}},
        {$project:{fpoName: 1,_id: 0, fpoId: 1}},
        {$sort: {'fpoName': 1}}
      ];
    mongo.queryWithAggregator(aggregation, "FPOmaster", function (response1) {
      callback(response1);
    });
  };

  exports.getBusinessDetails = function (financialYear, fpoId, callback) {
    let aggregation =[
      {
        '$match': {
          'fpoId': fpoId, 
          'FPOData.year': financialYear
        }
      }, {
        '$project': {
          '_id': 0
        }
      }
    ];
    mongo.queryWithAggregator(aggregation, "FPOmaster", function (response1) {
      callback(response1);
    });


    
  }

  exports.getCropDetails = function (financialYear, fpoId, callback) {
    let aggregation =[
      {
        '$match': {
          'fpoId': fpoId
        }
      }, {
        '$project': {
          '_id': 0
        }
      }
    ]
    mongo.queryWithAggregator(aggregation, "cropProduction", function (response1) {
      callback(response1);
    });
 
  }
  exports.getTurnoverDetails = function (financialYear, fpoId, callback) {
    let aggregation =[
      {
        '$match': {
          'fpoId': fpoId, 
        }
      }, {
        '$project': {
          '_id': 0
        }
      }
    ]
    mongo.queryWithAggregator(aggregation, "fpoFinYearData", function (response1) {
      callback(response1);
    });
 
  }

  exports.getProfitDetails = function (financialYear, fpoId, callback) {
    let aggregation =[
      {
        '$match': {
          'fpoId': fpoId, 
        }
      }, {
        '$project': {
          '_id': 0
        }
      }
    ]
    mongo.queryWithAggregator(aggregation, "fpoFinYearPLData", function (response1) {
      callback(response1);
    });
 
  }

  exports.submitFinaldata = async (data, callback) => {
    try {
      let db = await newmongo.mongoConnection();
      data.insertionDate = new Date();
      let response = await newmongo.insertDocument(data, "scoringMaster", db);
      let fpoData = data.getFpoDetailsData[0]
      let response1 = await newmongo.insertDocument(fpoData, "fpoScoringMaster", db);
      callback(response,response1);
      newmongo.mongoClose(db);
    } catch (e) {
      console.log(e);
    }
  };