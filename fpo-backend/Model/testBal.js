db.NewBlocksForFpos.aggregate([{ $match: { "oldBlockName": { $exists: true } } }]).forEach(function (a) {
    print(a.oldBlockName);
    db.FPOmasterServer.update({ 'FPOData.block': a.oldBlockName }, { $set: { updated:true,"FPOData.block": a.newBlockName, "FPOData.block_id": a.blockCode, "FPOData.district_id":a.districtCode} }, false, true)
})

db.FPOmaster.aggregate([{ $match: { "fpoName": { $exists: true } } }]).forEach(function (a) {
    print(a.fpoName,a.FPOData.regNoOfFPO);
    db.newdata.update({ 'CIN': a.FPOData.regNoOfFPO }, { $set: { alreadyExists:true} })  
})



// --------------------percentage-------------------
[
    {
      '$match': {
        'refNo': 'ia001'
      }
    }, {
      '$project': {
        '_id': 0, 
        'CeoAppointed': 1
      }
    }, {
      '$group': {
        '_id': null, 
        'count': {
          '$sum': 1
        }, 
        'data': {
          '$push': '$$ROOT'
        }
      }
    }, {
      '$unwind': '$data'
    }, {
      '$group': {
        '_id': {
          'CeoAppointed': '$data.CeoAppointed'
        }, 
        'count': {
          '$sum': 1
        }, 
        'total': {
          '$first': '$count'
        }
      }
    }, {
      '$project': {
        '_id': 0, 
        'CeoAppointed': '$_id.CeoAppointed', 
        'percentage': {
          '$multiply': [
            {
              '$divide': [
                100, '$total'
              ]
            }, '$count'
          ]
        }
      }
    }
  ]





  // -------------------fieldcount-------------
  [
    {
      '$match': {
        'refNo': 'ia001'
      }
    }, {
      '$project': {
        '_id': 0, 
        'AgmConducted': 1
      }
    }, {
      '$group': {
        '_id': '$AgmConducted', 
        'AgmConducted': {
          '$sum': {
            '$cond': [
              {
                '$eq': [
                  '$AgmConducted', 'yes'
                ]
              }, 1, 0
            ]
          }
        }
      }
    }, {
      '$match': {
        '_id': 'yes'
      }
    }
  ]



  // ---------------greaterthan--------------
  [
    {
      '$match': {
        'refNo': 'ia001', 
        'year': '2022-2023'
      }
    }, {
      '$project': {
        '_id': 0, 
        'AnnualBusinessTurnoverinInr': {
          '$toInt': '$AnnualBusinessTurnoverinInr'
        }
      }
    }, {
      '$match': {
        'AnnualBusinessTurnoverinInr': {
          '$gt': 50
        }
      }
    }
  ]




  // ------------adition-----------
  [
    {
      '$match': {
        'refNo': 'ia001', 
        'year': '2022-2023'
      }
    }, {
      '$project': {
        '_id': 0, 
        'NoOfMouSignedVendorRegistration': {
          '$toInt': '$NoOfMouSignedVendorRegistration'
        }
      }
    }, {
      '$group': {
        '_id': '$type', 
        'sum': {
          '$sum': '$NoOfMouSignedVendorRegistration'
        }
      }
    }
  ]

  // -----------------------count------------
  [
    {
      '$match': {
        'refNo': 'ia001', 
        'year': '2020-2021', 
        'BusinessPlanFormulated': '3-5year'
      }
    }, {
      '$project': {
        '_id': 0, 
        'BusinessPlanFormulated': 1
      }
    }, {
      '$count': 'BusinessPlanFormulated'
    }
  ]
  

  // -----------------cnvert date string to date format---------------
  db.detail.aggregate([{$match:{}}]).forEach(function(a){
    print(a.fpoId)
    date1 = a.dateOfReg;
    date = date1.substring(0, 2);
    month = date1.substring(3, 5);
    year = date1.substring(6, 10);
    date2 = month + "/" + date + "/" + year;
    date3 = new Date(date2);
    db.detail.updateOne({ fpoId: a.fpoId }, { $set: { approvedOn: date3 } })
})

db.detail.aggregate([{$match:{}}]).forEach(function(a){
  print(a.fpoId) 
  db.FPOmaster.updateOne({ fpoId: a.fpoId }, { $set: { approveDate: a.approvedOn,statusApproved:true } })
})