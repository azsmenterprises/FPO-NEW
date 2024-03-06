const Db = require("mongodb/lib/db");

Db.FPOmaster1.aggregate(
    [{
          $match:{refNo:{$exist:true} 
   }
}]).forEach(function(a){
     print(a.fpoName)
     Db.FPOmaster.update({refNo:a.refNo},{$set:{FPOAward:a.FPOAward,schemesAvailed:a.schemesAvailed,blockStatus:a.blockStatus,distUpdated:a.distUpdated}})
})

exports.updateEnumData = function (data, callback) {
    mongo.updateOne({ fpoId: data.fpoId }, { 'enumeratorData.enumName': data.enumData.name, 'enumeratorData.enumContactNo': data.enumData.contactNo, 'enumeratorData.surveyDate': data.enumData.dateOfSurvey, 'enumeratorData.fpoGPSdata': data.enumData.gpsCordinates }, 'FPOmaster', function (response) {
        callback(response)
    })
}
exports.updateFpoTest=async(fpoRefNo,callback)=>{
    try{
        let db=await newMongo.mongoConnection()
       let aggregator2= [{ $match:{refNo:{$exist:true} }}]
          let response2=await newMongo.queryWithAggregator(aggregator2,'figProducedAggreMaster',db);
        response2.forEach(function(a){
            print(a.fpoName)
            mongo.updateOne({ refNo:a.refNo }, { FPOAward:a.FPOAward,schemesAvailed:a.schemesAvailed,blockStatus:a.blockStatus,distUpdated:a.distUpdated }, 'FPOmaster', function (response) {
             
            })
           
       })
          
          callback(true);
          newMongo.mongoClose(db)
    }catch(e){
      ////////console.log(12,e.message);
    }
}