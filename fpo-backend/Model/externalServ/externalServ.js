const { ObjectID } = require('mongodb')
var mongo = require('../mongo/mongo')
var newMongo = require('../mongo/newMongo')

exports.getDistricts = function (req, res) {
    mongo.findAll('districtMaster', function (response) {
        res.send(response)
    })
}