var newMongo = require('../mongo/newMongo')


exports.loadTrader = async (callback) => {
    try {
        let aggregate =[
            {
                '$match': {
                    'groupRegType': 'Trader'
                }
            }, {
                '$project': {
                    'traderName': {
                        '$toUpper': '$traderName'
                    }, 
                    'cgMobNo': 1, 
                    'traderMail': 1, 
                    'traderCity': 1,
                    'refNo':1,
                    'Crop_Name':1,
                    'districtName':1,
                    'traderState':1
                }
            }
        ]
        const db = await newMongo.mongoConnection();
        let response = await newMongo.queryWithAggregator(aggregate, 'consumerGroup', db)
        callback(response)
        newMongo.mongoClose(db)
    } catch (e) {

    }
}

exports.loadTraderWithSort = async (callback) => {
    try {
        let aggregate = [
            {
                '$match': {
                    'groupRegType': 'Trader'
                }
            }, {
                '$project': {
                    'traderName': {
                        '$toUpper': '$traderName'
                    }, 
                    'refNo': 1,
                    'cgMobNo': 1, 
                    'traderMail': 1, 
                    'traderCity': 1,
                    'refNo':1,
                    'Crop_Name':1,
                    'districtName':1,
                    'traderState':1, 
                    'traderCity': {
                        '$toUpper': '$traderCity'
                    }
                }
            }, {
                '$sort': {
                    'traderName': 1
                }
            }
        ]
        const db = await newMongo.mongoConnection();
        let response = await newMongo.queryWithAggregator(aggregate, 'consumerGroup', db)
        callback(response)
        newMongo.mongoClose(db)
    } catch (e) {

    }
}

exports.searchTraderFromSearchBar = async (searchtraderName,callback) => {
    try {
        let aggregate = [
            {
                '$match': {
                    'groupRegType': 'Trader'
                }
            },
            {
              '$project': { 
                'traderName': {
                  '$toUpper': '$traderName'
                }, 
                'refNo': 1, 
                'traderCity': {
                  '$toUpper': '$traderCity'
                }, 
              }
            }, {
              '$match': {
                'traderName': {
                  '$regex': searchtraderName.toUpperCase()
                }
              }
            }, {
              '$sort': {
                'traderName': 1
              }
            }
          ]
        const db = await newMongo.mongoConnection();
        let response = await newMongo.queryWithAggregator(aggregate, 'consumerGroup', db)
        callback(response)  
        newMongo.mongoClose(db)
    } catch (e) {

    }
}

exports.searchTrader = async (data, callback) => {
    try {
     
        let match = { groupRegType: "Trader" }
        if (data.state != 'undefined' && data.state != 'null') {
            match.traderState = data.state
        }
        if (data.districtName != 'undefined' && data.districtName != 'null') {
            match.districtName = data.districtName
        }

        if (data.Crop_Name != 'undefined' && data.Crop_Name!= 'null') {
            match.Crop_Name = data.Crop_Name
        }
        let aggregate = [{ '$match': match }, {
            '$project': {
                'traderName': {
                    '$toUpper': '$traderName'
                },
                'cgMobNo': 1,
                'traderMail': 1,
                'traderCity': 1,
                'refNo': 1,
                'Crop_Name': 1,
                'districtName': 1,
                'traderState': 1
            }
        },{$sort:{traderName:1}}]

        let db = await newMongo.mongoConnection()
        let response = await newMongo.queryWithAggregator(aggregate, 'consumerGroup', db)
        callback(response)
        newMongo.mongoClose(db)

    } catch (e) {

    }
}

exports.getTraderDistricts = async (data,callback) => {
    try {
        let aggregate = [
            {'$match': {'groupRegType': 'Trader','traderState':data.state,'districtName':{$ne:null}} }, 
            {'$group': { _id:'$districtName'}},
            {'$project':{ _id:0,districtName:'$_id'}},
            {$sort:{districtName:1}}
          ]
        const db = await newMongo.mongoConnection();
        let response = await newMongo.queryWithAggregator(aggregate, 'consumerGroup', db)
        callback(response)
        newMongo.mongoClose(db)
    } catch (e) {

    }
}

exports.getTraderState = async (callback) => {
    try {
        let aggregate = [
            {'$match': {'groupRegType': 'Trader',traderState:{$exists:true}} },
           {'$group': { _id:'$traderState'}},
            {'$project':{ _id: 0,traderValue:'$_id',traderState:{ '$toUpper': '$_id' } }},
            {$sort:{traderState:1}}
          ]
        const db = await newMongo.mongoConnection();
        let response = await newMongo.queryWithAggregator(aggregate, 'consumerGroup', db)
        callback(response)
        newMongo.mongoClose(db)
    } catch (e) {

    }
}


exports.getTraderCrop = async (data, callback) => {
    try {
        let match={'groupRegType': 'Trader'}
        if (data.state != undefined) {
            match.traderState = data.state
        }
        if (data.districtName != undefined) {
            match.districtName = data.districtName
        }
        let aggregate = [
            { '$match': match },
            { '$group': { _id: '$Crop_Name' } },
            { '$project': { _id: 0, Crop_Name: '$_id' } },
            { $sort: { Crop_Name: 1 } }
        ]
        const db = await newMongo.mongoConnection();
        let response = await newMongo.queryWithAggregator(aggregate, 'consumerGroup', db)
        callback(response)
        newMongo.mongoClose(db)
    } catch (e) {

    }
}

