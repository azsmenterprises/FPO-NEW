var newMongo = require('../mongo/newMongo')

exports.fpoDetailsNew=async(fpoId,callback)=>{
  try{
    let aggregator = [
      { 
        '$match': { 'fpoId': fpoId } 
      },
      {
        '$project': {
          'fpoName': 1, 
          'fpoId': 1, 
          'refNo': 1, 
          'organisationHelpedToCreateSPO': 1,
          'address': '$FPOData.address', 
          'FPOData.fpoMailId': 1, 
          'FPOData.fpoContactNo': 1, 
          'FPOData.regNoOfFPO': 1, 
          'FPOData.noOfFarmerMember': 1,
          'noOfBoardDirectors': {
            '$cond': {
              'if': { '$isArray': '$boardDirectorsDetails' },
              'then': { '$size': '$boardDirectorsDetails' },
              'else': 0
            }
          },
          'bodStaffTotal': {
            '$sum': [
              { '$cond': { 'if': { '$isArray': '$boardDirectorsDetails' }, 'then': { '$size': '$boardDirectorsDetails' }, 'else': 0 } },
              { '$cond': { 'if': { '$isArray': '$staffDetails' }, 'then': { '$size': '$staffDetails' }, 'else': 0 } }
            ]
          },
          'FPOAwardSize': {
            '$cond': {
              'if': { '$isArray': '$FPOAward' },
              'then': { '$size': '$FPOAward' },
              'else': 0
            }
          },
          'totalFemale': {
            '$cond': {
              'if': { '$isArray': '$boardDirectorsDetails' },
              'then': {
                '$size': {
                  '$filter': {
                    'input': '$boardDirectorsDetails',
                    'cond': { '$eq': ['$$this.sex', 'Female'] }
                  }
                }
              },
              'else': 0
            }
          },
          'ceoName': {
            '$filter': {
              'input': '$staffDetails',
              'cond': { '$eq': ['$$this.designation', 'CEO'] }
            }
          },
          'processingCapacity': 1, 
          'FPOData.storageArea': 1, 
          'FPOData.dateOfReg': 1,
          'totalBusinessDone.tbd1920': 1, 
          'totalBusinessDone.tbd1819': 1, 
          'totalBusinessDone.tbd1718': 1, 
          'schemesAvailed': 1, 
          'businessActivities1920.businessActivities': 1,
          'secondaryBusinessDetails.businessActivity': 1, 
          'Capacity': 1, 
          'InfraCapacity': 1, 
          'InfrastructureDetail': 1, 
          'storageDetails': 1,
          'FPOAward': 1
        }
      }
    ]
    // console.log(JSON.stringify(aggregator),"iiiiiiiiiiiiii");
      let db=await newMongo.mongoConnection()
      let response=await newMongo.queryWithAggregator(aggregator,'FPOmaster',db)
        let aggregator1=[
          {
            '$match': {
              'fpoId': response[0].fpoId
            }
          }, {
            '$sort': {
              '_id': -1
            }
          }
        ]
        let response1=await newMongo.queryWithAggregator(aggregator1,'meetingsDetails',db)
        if(response1.length>0){
          response[0].lastBodMeeting=response1[0].meetingDate
        }else{
        response[0].lastBodMeeting='No meetings held'
        }

        let aggregator2 = 
        [
          {
            '$match': {
              'fpoId': response[0].fpoId
            }
          }, {
            '$project': {
              '_id': 0, 
              'fpoId': 1, 
              'season': 1, 
              'cropCatagory': 1, 
              'cropName': 1, 
              'quantity': 1, 
              'transctionAmount': 1, 
              'productionArea': 1, 
              'Sowing': 1, 
              'Harvesting': 1, 
              'cropType': 1, 
              'variety': 1
            }
          }
        ]
        let response2=await newMongo.queryWithAggregator(aggregator2,'cropProduction',db);
        // console.log(response2, "nodata");
        // console.log(JSON.stringify(aggregator2),"iuiuiiiiiiiiiiiiiiii");

        response[0].cropProducedAggreData=response2
        callback(response);
        // //console.log(response,"response");
        newMongo.mongoClose(db)
  }catch(e){
    //console.log(12,e.message);
  }
}



  exports.getProfileLikes = async (data, callback) => {
    try {
      data.type="Like";
      let db = await newMongo.mongoConnection()
      let response = await newMongo.insertDocument(data, 'userDataFromFpoProfile', db);
      callback(data.fpoName)
      newMongo.mongoClose(db)
    } catch (e) {
      //console.log(e)
  
    }
  }

  exports.getfpoName = async function(data) {
    return new Promise(async (resolve, reject) => {
      try {
        let aggregator = [
          {
            '$match': {
              'fpoId': data.fpoId
            }
          }, 
          {
            '$project': {
              'fpoName': 1, 
              '_id': 0
            }
          }
        ];
        console.log(JSON.stringify(aggregator),"mmmmmm");
  
        let db = await newMongo.mongoConnection();
        let response = await newMongo.queryWithAggregator(aggregator, 'FPOmaster', db);
        
        console.log(response[0].fpoName);
        resolve(response[0].fpoName);
        
        newMongo.mongoClose(db);
      } catch (error) {
        reject(error);
      }
    });
  };





  
  exports.fpoProfileLike = async (data, callback) => {
    try {
      let aggregator = [
        {
          '$match': {
            'fpoId': data
          }
        }, {
          '$project': {
            'type': 1, 
            '_id': 0
          }
        }, {
          '$count': 'type'
        }
      ]
      // console.log(JSON.stringify(aggregator),"likeslikeslikes");
      let db = await newMongo.mongoConnection();
      let response = await newMongo.queryWithAggregator(aggregator, 'userDataFromFpoProfile', db);
      console.log(response,"oooo");

      callback(response[0].type)
      newMongo.mongoClose(db)
    } catch (e) {
      //console.log(e)
  
    }
  }

  exports.connectBackData = async (data, callback) => {
    try {
      let db = await newMongo.mongoConnection()
      let response = await newMongo.insertDocument(data, 'connectBack', db);
      callback(response)
      newMongo.mongoClose(db)
    } catch (e) {
      //console.log(e)
  
    }
  }
  