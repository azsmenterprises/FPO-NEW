var mongo = require('../mongo/mongo')
var newMongo = require('../mongo/newMongo')

exports.getUserIdForLogin = function (data, callback) {
    try {
        mongo.findOne('userAuth', { userId: data }, function (response) {
            if (response) {
                // console.log(response.isActive, "login");
                if (response?.isActive == undefined || response?.isActive == true) {
                    callback({ status: true, res: response })
                } else {
                    callback({ status: false, res: response })
                }
            } else {
                callback({ status: false })
            }
        })
    } catch (error) {
        console.log(error, "error");
    }
}

exports.sideBarUserName = async (data, callback) => {
    try {
        let db = await newMongo.mongoConnection()
        if (data.type == 'FPO') {
            let response = await newMongo.findOne('FPOmaster', { fpoId: data.id }, db)
            callback({ name: response.fpoName })
            newMongo.mongoClose(db);
        }
        if (data.type == 'FIG') {
            let response = await newMongo.findOne('figRegistrationMaster', { refNo: data.id }, db)
            callback({ name: response.figName })
            newMongo.mongoClose(db);
        }
        if (data.type == 'ia') {
            let response = await newMongo.findOne('IAmaster', { refNo: data.id }, db)
            callback({ name: response.iaName })
            newMongo.mongoClose(db);
        }
        if (data.type == 'ADH') {
            let response = await newMongo.findOne('adhMaster', { refNo: data.id }, db)
            callback({ name: response.userId })
            newMongo.mongoClose(db);
        }
        if (data.type == 'AHO') {
            let response = await newMongo.findOne('ahoMaster', { refNo: data.id }, db)
            callback({ name: response.districtId })
            newMongo.mongoClose(db);
        }
        if (data.type == 'Cbbo') {
            let response = await newMongo.findOne('cbbo', { cbboCode: data.id }, db)
            callback({ name: response.cbboName })
            newMongo.mongoClose(db);
        }
        if (data.type == 'ConsumerGroup') {
            let response = await newMongo.findOne('consumerGroup', { refNo: data.id }, db)
            callback({ name: response.cgName, type: 'consumerGroup' })
            newMongo.mongoClose(db);
        }
        if (data.type == 'Trader') {
            let response = await newMongo.findOne('consumerGroup', { refNo: data.id }, db)
            callback({ name: response.traderName, type: 'Trader' })
            newMongo.mongoClose(db);
        }
    } catch (e) {

    }
}

exports.checkCurrentPassword = async (data, callback) => {
    try {
        let db = await newMongo.mongoConnection()
        let response = await newMongo.findOne('userAuth', { userType: data.type, refNo: data.id, password: data.currentPassword }, db)
        if (response != null) {
            let response1 = await newMongo.updateOne({ userType: data.type, refNo: data.id, password: data.currentPassword }, { password: data.newPassword, passwordChanged: true, passwordChangeDate: new Date() }, 'userAuth', db)
            if (response1.modifiedCount > 0) {
                callback({ status: 'changed' })
            } else {
                callback({ status: 'unsuccess' })
            }
        } else {
            callback({ status: 'invalid' })
        }
    } catch (e) {
        ////////console.log(e.message);
    }
}

exports.checkForPasswordChangedOrNot = async (fpoId, callback) => {
    try {
        let db = await newMongo.mongoConnection()
        let response = await newMongo.findOne('userAuth', { fpoId: fpoId, userType: 'FPO' }, db)
        callback(response.passwordChanged)
        db.close()
    } catch (e) {

    }
}
