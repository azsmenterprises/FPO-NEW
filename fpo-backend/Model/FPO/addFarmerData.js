var mongo = require('../mongo/mongo')
var newMongo = require('../mongo/newMongo')

exports.addMemberFinalSubmit = function (data, callback) {

    mongo.findOne('membersCorner', { farmerId: data.farmerId }, function (response) {
        ////////console.log('mm',response);
        if (!response) {
            data.status = "Approved";
            mongo.insertDocument(data, 'membersCorner', (response1) => {
                callback(response1)
            })
        } else {
            callback({ insertedCount: 'duplicate' })
        }
    })
}

exports.getCropData = function (callback) {
    mongo.findAll('cropMaster', function (response) {
        callback(response)
    })
}
exports.getRelevantTrader = async function (fpoId, callback) {

    let aggregate = [{ '$match': { 'additionalData.fpoId': fpoId } },
    { '$project': { '_id': 0, 'cropData': 1 } },
    { '$unwind': '$cropData' },
    { '$project': { 'crop': '$cropData.crop' } },
    { '$group': { '_id': '$crop' } }];
    let db = await newMongo.mongoConnection()
    let response = await newMongo.queryWithAggregator(aggregate, 'membersCorner', db)
    //////console.log(response,"before map");
    let cropList = response.map(({ _id }) => _id)
    //////console.log(cropList);
    aggregation1 = [{ '$match': { 'itemName.Crop_Name': { '$in': cropList } } },
    { '$project': { 'cgRefNo': 1, '_id': 0 } },
    { '$lookup': { 'from': 'consumerGroup', 'localField': 'cgRefNo', 'foreignField': 'refNo', 'as': 'data' } },
    { '$project': { 'cgRefNo': 1, 'traderName': { '$arrayElemAt': ['$data.traderName', 0] } } }]
    let response1 = await newMongo.queryWithAggregator(aggregation1, 'consumerGroupProductMaster', db)
    callback(response1)
    newMongo.mongoClose(db);
}

exports.getRelevantConsumer = async function (fpoId, callback) {

    let aggregate = [{ '$match': { 'additionalData.fpoId': fpoId } },
    { '$project': { '_id': 0, 'cropData': 1 } },
    { '$unwind': '$cropData' },
    { '$project': { 'crop': '$cropData.crop' } },
    { '$group': { '_id': '$crop' } }];
    let db = await newMongo.mongoConnection()
    let response = await newMongo.queryWithAggregator(aggregate, 'membersCorner', db)
    let cropList = response.map(({ _id }) => _id)
    //////console.log(cropList);
    aggregation1 = [{ '$match': { 'itemName.Crop_Name': { '$in': cropList } } },
    { '$project': { 'cgRefNo': 1, '_id': 0 } },
    { '$lookup': { 'from': 'consumerGroup', 'localField': 'cgRefNo', 'foreignField': 'refNo', 'as': 'data' } },
    { '$project': { 'cgRefNo': 1, 'traderName': { '$arrayElemAt': ['$data.traderName', 0] } } }]
    let response1 = await newMongo.queryWithAggregator(aggregation1, 'consumerGroupProductMaster', db)
    callback(response1)
    newMongo.mongoClose(db);
}




exports.getBankData = function (callback) {
    let aggregate = [
        {
            '$group': {
                '_id': '$vchBankName'
            }
        }, {
            '$sort': {
                '_id': 1
            }
        }
    ]
    mongo.queryWithAggregator(aggregate, 'bankMaster', function (response) {
        callback(response)
    })
}

exports.loadVariety = function (data, callback) {
    mongo.queryFindAll({ 'Crop_Code': data }, 'varietyMaster', function (response) {
        if (response) {
            callback(response)
        }
    })
}