var mongo = require('../mongo/mongo')
var newmongo = require('../mongo/newMongo')

exports.figProducedData = async (data, callback) => {
    try {
        let aggregation =
            [
                {
                    '$match': {
                        'rejectedByFpo': {
                            '$ne': true
                        },
                        'fpoApproved': {
                            '$ne': true
                        },
                        'type': data.type,
                        'fpo.fpoId': data.fpoId,
                        'year': data.year,
                        'season': data.season,
                        'producedSale': true,
                        'forwardToFpo': true
                    }
                }, {
                    '$group': {
                        '_id': {
                            'crop': '$crop',
                            'variety': '$variety',
                            'cropCatagory': '$cropCatagory'
                        },
                        'count': {
                            '$sum': '$quantity'
                        }
                    }
                }, {
                    '$project': {
                        '_id': 0,
                        'crop': '$_id.crop',
                        'variety': '$_id.variety',
                        'cropCatagory': '$_id.cropCatagory',
                        'count': 1
                    }
                }
            ];
        let db = await newmongo.mongoConnection()
        let response = await newmongo.queryWithAggregator(aggregation, 'figProducedAggreMaster', db)
        if (response.length == 0) {
            callback([]);
            newmongo.mongoClose(db)
        } else {
            callback(response);
            newmongo.mongoClose(db)
        }
    } catch (e) {

    }
}
exports.viewFigProducedDetails = function (data, callback) {
    mongo.queryFindAll({ rejectedByFpo: { $ne: true }, fpoApproved: { $ne: true }, 'forwardToFpo': true, cropCatagory: data.cropCatagory, 'crop.Crop_Code': data.crop.Crop_Code, 'variety.Variety_Code': data.variety.Variety_Code }, 'figProducedAggreMaster', function (response) {
        callback(response)
    })
}

exports.approveFigProducedData = function (data, callback) {
    mongo.updateMany({ 'fpo.fpoId': data.fpoId, 'crop.Crop_Code': data.crop.Crop_Code, 'variety.Variety_Code': data.variety.Variety_Code, cropCatagory: data.cropCatagory }, { fpoApproved: true, fpoApprovedOn: new Date() }, 'figProducedAggreMaster', function (response) {
        callback(response)
    })
}
exports.rejectList = function (data, callback) {
    mongo.updateMany({ 'fpo.fpoId': data.fpoId, 'crop.Crop_Code': data.crop.Crop_Code, 'variety.Variety_Code': data.variety.Variety_Code, cropCatagory: data.cropCatagory }, { rejectedByFpo: true, fpoRejectedOn: new Date() }, 'figProducedAggreMaster', function (response) {
        callback(response)
    })
}

exports.approvedProduced = async (data, callback) => {
    try {
        let db = await newmongo.mongoConnection()
        let aggregate = [
            {'$match': { 'fpo.fpoId': data.fpoId, fpoApproved: true, type: data.type, year: data.year, season: data.season ,quantity:{$gt:0} }
            }, {
                '$group': { '_id': { 'cropCatagory': '$cropCatagory','crop': '$crop.Crop_Code', 'cropName': '$crop.Crop_Name', 'variety': '$variety.Variety_Code',  'varietyName': '$variety.Variety_Name'
                    },'quantity': {'$sum': '$quantity' },
                    'figName': {  '$first': '$figName' }
                },
            }
        ]
        let response = await newmongo.queryWithAggregator(aggregate, 'figProducedAggreMaster', db)
        // //console.log(response,"khkjhkjhkjhkjhkjhkjhjk");
        let dataForFrontend = []
        response.forEach(async element => {
            try {
                let aggregate1 = [
                    {'$match': {  'fpoId': data.fpoId,'cropCode': element._id.crop, 'variety': element._id.variety }
                    }, {'$group': {  '_id': { fpoId: '$fpoId', cropCode: '$cropCode',  variety: '$variety' },
                            'saleQuantity': { '$sum': '$saleQuantity'   }
                        }
                    }
                ]
                let response1 = await newmongo.queryWithAggregator(aggregate1, 'fpoSaleMaster', db)
                if (response1.length != 0) {
                    element.quantity = element.quantity - response1[0].saleQuantity
                }
                if (response1.length == 0) {
                    element.quantity = element.quantity
                }
                dataForFrontend.push(element)
                if (response.length == dataForFrontend.length) {
                    callback(dataForFrontend)
                    newmongo.mongoClose(db);
                }
            } catch (e) {
                ////////console.log(1, e.message);
            }
        });

    } catch (e) {
        ////////console.log(2, e.message);
    }
}

exports.rejectedProducedList = function (data, callback) {
    mongo.queryFindAll({ 'fpo.fpoId': data.fpoId, rejectedByFpo: true, fpoApproved: { $ne: true } }, 'figProducedAggreMaster', function (response) {
        callback(response)
    })
}

exports.producedAddToGodown = async (data, callback) => {
    try {
        delete data._id
        let db = await newmongo.mongoConnection()
        let randomNo=await newmongo.autoIncrement({},'fpoGodownDataManagement',db)
        let lotNumber=`${data.districtCode}${data.districtName.substring(0,3).toUpperCase()}${data.godownId}${randomNo}`
        data.lotNumber=lotNumber
        data.info = 'addedByFpo'
        data.destinationDistrictCode = data.districtCode
        data.destinationDistrictName = data.districtName
        data.destinationGodownId = data.godownId
        data.destinationGodownName = data.godownName
        data.sourceDistrictCode = ''
        data.sourceDistrictName = ''
        data.sourceGodownId = ''
        data.sourceGodownName = ''
        data.addedOn=new Date()
        data.status='Received'
        delete data.districtCode
        delete data.districtName
        delete data.godownId
        delete data.godownName
        let response = await newmongo.insertDocument(data, 'fpoGodownDataManagement', db)
        callback(response.insertedCount)
        db.close()
    } catch (e) {
        ////////console.log(e.message);
    }
}

exports.getAllFpoGodowns = async (fpoId, callback) => {
    try {
        let db = await newmongo.mongoConnection()
        let response = await newmongo.queryFindAll({ fpoId: fpoId }, 'fpoGodownMaster', db)
        callback(response)
        db.close()

    } catch (e) {
        ////////console.log(e.message);
    }
}

exports.indentapprovefigindent = function (data, callback) {
    // mongo.queryFindAll({rejectedByFpo:{$ne:true},fpoApproved:{$ne:true}},'figIndentMaster',function(response){        
    //     callback(response)    
    // })

    if (data.type == 'Seed') {
        var aggregation =
            [
                {
                    '$match': {
                        'rejectedByFpo': {
                            '$ne': true
                        },
                        'fpoApproved': {
                            '$ne': true
                        },
                        'itemType': data.type,
                        'fpo.fpoId': data.fpoId
                    }
                }, {
                    '$group': {
                        '_id': {
                            'crop': '$crop',
                            'variety': '$variety',
                            'cropCatagory': '$cropCatagory'
                        },
                        'count': {
                            '$sum': '$quantity'
                        }
                    }
                }, {
                    '$project': {
                        '_id': 0,
                        'crop': '$_id.crop',
                        'variety': '$_id.variety',
                        'cropCatagory': '$_id.cropCatagory',
                        'count': 1
                    }
                }
            ];
    } else {
        var aggregation =
            [
                {
                    '$match': {
                        'rejectedByFpo': {
                            '$ne': true
                        },
                        'fpoApproved': {
                            '$ne': true
                        },
                        'itemType': data.type,
                        'fpo.fpoId': data.fpoId
                    }
                }, {
                    '$group': {
                        '_id': {
                            'itemType': '$itemType',
                            'technicalName': '$technicalName',
                            'brandName': '$brandName'
                        },
                        'count': {
                            '$sum': '$quantity'
                        }
                    }
                }, {
                    '$project': {
                        '_id': 0,
                        'itemType': '$_id.itemType',
                        'technicalName': '$_id.technicalName',
                        'brandName': '$_id.brandName',
                        'count': 1
                    }
                }
            ];
    }
    mongo.queryWithAggregator(aggregation, "figIndentMaster", function (response) {
        if (response.length == 0) {
            callback([]);
        } else {
            callback(response);
        }
    });

}

exports.figapproveindentdetail = function (data, callback) {
    if (data.itemType != 'Seed') {
        mongo.queryFindAll(
            {
                rejectedByFpo: { $ne: true },
                fpoApproved: { $ne: true },
                'fpo.fpoId': data.fpoId,
                'itemType': data.itemType,
                'technicalName': data.technicalName,
                'technicalName': data.technicalName
            },
            'figIndentMaster', function (response) {
                callback(response)
            })
    } else {
        mongo.queryFindAll(
            {
                rejectedByFpo: { $ne: true },
                fpoApproved: { $ne: true },
                'fpo.fpoId': data.fpoId,
                'crop.Crop_Code': data.crop.Crop_Code,
                'variety.Variety_Code': data.variety.Variety_Code,
                'cropCatagory': data.cropCatagory
            },
            'figIndentMaster', function (response) {
                callback(response)
            })
    }

}

exports.approveIndent = async function (data, callback) {
    if (data.type == 'Seed') {
        try {
            let db = await newmongo.mongoConnection()
            let uniqueId = await newmongo.autoIncrement({}, 'figIndentMaster', db)
            let response = await newmongo.updateMany({
                rejectedByFpo: { $ne: true },
                fpoApproved: { $ne: true },
                'fpo.fpoId': data.fpoId,
                'crop.Crop_Code': data.crop.Crop_Code,
                'variety.Variety_Code': data.variety.Variety_Code,
                'cropCatagory': data.cropCatagory,
                'itemType': data.type
            }, { fpoApproved: true, fpoApproveDate: new Date(), uniqueId: "orderFert" + uniqueId }, 'figIndentMaster', db)
            if (data.agreeForElicense == true) {

                let aggregation = [
                    {
                        '$match': {
                            'uniqueId': uniqueId
                        }
                    }, {
                        '$group': {
                            '_id': null,
                            'totalQuantity': {
                                '$sum': '$quantity'
                            },
                            'fpo': {
                                '$first': '$fpo'
                            },
                            'itemType': {
                                '$first': '$itemType'
                            },
                            'variety': {
                                '$first': '$variety'
                            },
                            'itemType': {
                                '$first': '$itemType'
                            },
                            'uniqueId': { '$first': '$uniqueId' }
                        }
                    }
                ]
                let dataForELicense = await newmongo.queryWithAggregator(aggregation, 'figIndentMaster', db)
                let fpoData = await newmongo.findOne('FPOmaster', { 'fpoId': data.fpoId }, db)

                callback({ district: fpoData.FPOData.district, fpoPhNo: fpoData.FPOData.fpoContactNo, status: response.modifiedCount, dataForELicense: dataForELicense, agreeForElicense: data.agreeForElicense, dontPublishInElicense: data.dontPublishInElicense })
                newmongo.mongoClose(db)

            } else {
                callback({ status: response.modifiedCount, dontPublishInElicense: data.dontPublishInElicense })
                newmongo.mongoClose(db)

            }
        } catch (e) {
            ////////console.log(e);
        }
    } else {
        try {
            let db = await newmongo.mongoConnection()

            let uniqueId = await newmongo.autoIncrement({}, 'figIndentMaster', db)

            let response = await newmongo.updateMany({
                rejectedByFpo: { $ne: true },
                fpoApproved: { $ne: true },
                'fpo.fpoId': data.fpoId,
                'itemType': data.type,
                'technicalName': data.technicalName,
                'brandName': data.brandName
            }, { fpoApproved: true, fpoApproveDate: new Date(), uniqueId: "orderFert" + uniqueId }, 'figIndentMaster', db)

            if (data.agreeForElicense) {

                let aggregation = [
                    {
                        '$match': {
                            'uniqueId': uniqueId
                        }
                    }, {
                        '$group': {
                            '_id': null,
                            'totalQuantity': {
                                '$sum': '$quantity'
                            },
                            'fpo': {
                                '$first': '$fpo'
                            },
                            'itemType': {
                                '$first': '$itemType'
                            },
                            'technicalName': {
                                '$first': '$technicalName'
                            },
                            'brandName': {
                                '$first': '$brandName'
                            },
                            'itemType': {
                                '$first': '$itemType'
                            },
                            'uniqueId': { '$first': '$uniqueId' }
                        }
                    }
                ]
                let dataForELicense = await newmongo.queryWithAggregator(aggregation, 'figIndentMaster', db)
                let fpoData = await newmongo.findOne('FPOmaster', { 'fpoId': data.fpoId }, db)

                callback({ district: fpoData.FPOData.district, fpoPhNo: fpoData.FPOData.fpoContactNo, status: response.modifiedCount, dataForELicense: dataForELicense, agreeForElicense: data.agreeForElicense, dontPublishInElicense: data.dontPublishInElicense })
                newmongo.mongoClose(db)

            } else {
                callback({ status: response.modifiedCount, dontPublishInElicense: data.dontPublishInElicense })
                newmongo.mongoClose(db)

            }
        } catch (e) {
            ////////console.log(e);
        }
    }

}

exports.failedToPushElicense = async function (data, callback) {
    try {
        let db = await newmongo.mongoConnection();
        newmongo.insertDocument(data, 'demandFailedToPushElicense', db)
        newmongo.updateMany({ uniqueId: data.orderId }, { elicenseFailedPushDate: new Date(), pushedToElicense: false }, 'figIndentMaster', db)
        newmongo.mongoClose(db)
    } catch (e) {

    }
}

exports.updateElicenseResponse = async function (uniqueId, callback) {
    try {
        let db = await newmongo.mongoConnection();
        newmongo.updateMany({ uniqueId: uniqueId }, { elicensePushDate: new Date(), pushedToElicense: true }, 'figIndentMaster', db)
        newmongo.mongoClose(db)
    } catch (e) {

    }

}

exports.rejectIndent = async function (data, callback) {
    if (data.type == 'Seed') {
        try {
            let db = await newmongo.mongoConnection()
            let response = await newmongo.updateMany({
                rejectedByFpo: { $ne: true },
                fpoApproved: { $ne: true },
                'fpo.fpoId': data.fpoId,
                'crop.Crop_Code': data.crop.Crop_Code,
                'variety.Variety_Code': data.variety.Variety_Code,
                'cropCatagory': data.cropCatagory
            }, { rejectedByFpo: true }, 'figIndentMaster', db)
            callback(response)
            newmongo.mongoClose(db)
        } catch (e) {
            ////////console.log(e);
        }
    } else {
        try {
            let db = await newmongo.mongoConnection()
            let response = await newmongo.updateMany({
                rejectedByFpo: { $ne: true },
                fpoApproved: { $ne: true },
                'fpo.fpoId': data.fpoId,
                'itemType': data.type,
                'technicalName': data.technicalName,
                'brandName': data.brandName
            }, { rejectedByFpo: true }, 'figIndentMaster', db)
            callback(response)
            newmongo.mongoClose(db)
        } catch (e) {
            ////////console.log(e);
        }
    }

}

exports.approvedDemand = async function (data, callback) {
    try {
        let db = await newmongo.mongoConnection();
        let response = await newmongo.queryFindAll({ 'fpo.fpoId': data.fpoId, itemType: data.type, fpoApproved: true }, 'figIndentMaster', db)
        callback(response)
        newmongo.mongoClose(db);
    } catch (e) {

    }
}

exports.rejectedDemand = async function (data, callback) {
    try {
        let db = await newmongo.mongoConnection();
        let response = await newmongo.queryFindAll({ 'fpo.fpoId': data.fpoId, itemType: data.type, rejectedByFpo: true }, 'figIndentMaster', db)
        callback(response)
        newmongo.mongoClose(db);
    } catch (e) {

    }
}

exports.onSubmitFpoSelfProducedForm = async function (data, callback) {
    try {
        let db = await newmongo.mongoConnection()
        let fpoData = await newmongo.findOne('FPOmaster', { fpoId: data.fpo }, db)
        data.fpo = {
            refNo: fpoData.refNo,
            fpoId: fpoData.fpoId,
            fpoName: fpoData.fpoName
        }
        let response = await newmongo.insertDocument(data, 'figProducedAggreMaster', db)
        callback(response)
        newmongo.mongoClose(db);
    } catch (e) {
        ////////console.log(e);
    }
}

exports.fpoProducedSale = async (data, res) => {
    try {
        let db = await newmongo.mongoConnection()
        let transactionNo = await newmongo.autoIncrement({ 'mobileNo': data.mobileNo, saleDate: data.saleDate, fpoId: data.fpoId, cropCode: data.cropCode, variety: data.variety }, 'fpoSaleMaster', db)
        data.transactionNo = data.fpoId + '/' + data.cropCode + '/' + data.variety + '/' + transactionNo
        data.dataInsertDate = new Date()
        //////console.log(data);
        let response = await newmongo.insertDocument(data, 'fpoSaleMaster', db)
        //////console.log(response);
        if (response.insertedCount > 0) {
            res({ status: 'success' })
           
            newmongo.mongoClose(db)
        } else {
          
            res({})
            newmongo.mongoClose(db)
        }
    } catch (e) {
       
    }
}


exports.getFarmers = async (req, res) => {
    try {
        let data = req.params.figRefNo
        let db = await newmongo.mongoConnection()
            let aggregate = [
                {
                    '$match':{'additionalData.fpoId':data}
                }, {
                    '$project': {
                        _id: 0,
                        'farmerId': 1,
                        'farmerName': 1,
                        'fullFarmerData.VCHMOBILENO': 1
                    }
                }
            ]
            let response = await newmongo.queryWithAggregator(aggregate, 'membersCorner', db)
            res.send(response)

           res.send([])
        newmongo.mongoClose(db);

    } catch (e) {
        ////////console.log(e);

    }
}