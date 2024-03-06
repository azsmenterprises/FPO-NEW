var ex = require('express')
var router = ex.Router()
var crypto = require('crypto')
var format = require('biguint-format');
var model = require('../../Model/Auth/login')
var sha512 = require('js-sha512').sha512;


// On login page load,below api is called for salt value for angular
router.get('/getSaltForUserAuth', function (req, res) {
    let saltvalue = random(50, 1000)
    req.session.salt = saltvalue;
    res.send({ salt: saltvalue })
})
function random(low, high) {
    return randomC(4) / Math.pow(2, 4 * 8 - 1) * (high - low) + low;
}
function randomC(qty) {
    var x = crypto.randomBytes(qty);
    return format(x, 'dec');
}

router.get('/getUserType', function (req, res) {
    res.send({ userType: req.session.loginUserTypeToShow })
})

router.post('/login', function (req, res) {
    model.getUserIdForLogin(req.body.userid, (response) => {
        try {
            if (response.status == true) {
                // let dbPass = sha512(response.password + req.session.salt)
                // console.log(req.body.password , sha512(response.res.password + req.session.salt),"req.body.password == sha512(response.password + req.session.salt)");
                if (req.body.password == sha512(response.res.password + req.session.salt)) {
                    req.session.refNo = response.res.refNo
                    req.session.userType = response.res.userType
                    if (response.res.userType == 'ia') {
                        req.session.iaName = response.res?.iaName
                        res.send({ status: 'success', refNo: response.res?.refNo, userType: response.res?.userType })
                    }
                     else if (response.res.userType == 'Cbbo') {
                        req.session.cbboCode = response.res?.cbboCode
                        res.send({ status: 'success', cbboCode: response.res?.cbboCode, userType: response.res?.userType })
                    }
                     else if (response.res.userType == 'FPO') {
                        req.session.fpoId = response.res.fpoId
                        res.send({ status: 'success', refNo: response.res?.refNo, userType: response.res?.userType, fpoId: response.res?.fpoId })
                    } else if(response.res.userType == 'ADH'){
                        req.session.refNo = response.res.refNo
                        res.send({ status: 'success', refNo: response.res?.refNo, userType: response.res?.userType})
                    } else if(response.res.userType == 'AHO'){
                        req.session.refNo = response.res.refNo
                        res.send({ status: 'success', refNo: response.res?.refNo, userType: response.res?.userType})
                    }
                    else {
                        res.send({ status: 'success', refNo: response.res?.refNo, userType: response.res?.userType })
                    }
                    // res.send({ status: 'success', refNo: response.res?.refNo, userType: response.res?.userType })
    
                } else {
                    res.send({ status: 'mismatch' })
                }
            } else {
                res.send({ status: "fail", message: "Your Id is not Active" });
            }
        } catch (error) {
            console.log(error,"error");
        }

    })
})

// router.get('/getUserRoleForAuth', (req, res) => {
//     res.send(req.session.userType)
// })
router.get('/getUserRoleForAuth', (req, res) => {
    // console.log(req.session.userType, "req.session.userType");
    if (req.session.userType == undefined) {
        res.send({ status: true, userType: "", userName: "" })
        return;
    }
    let data = {}
    data.type = req.session.userType;
    if (data.type == 'Admin') {
        res.send({ status: true, userType: req.session.userType, userName: "ADMIN" })
        return;
    }
    if (data.type == 'FPO') {
        data.id = req.session.fpoId
    }
    if (data.type == 'FIG') {
        data.id = req.session.refNo
    }
    if (data.type == 'ia') {
        data.id = req.session.refNo
    }
    if (data.type == 'Cbbo') {
        data.id = req.session.cbboCode
    }
    if (data.type == 'ADH') {
        data.id = req.session.refNo
    }
    if (data.type == 'AHO') {
        data.id = req.session.refNo
    }
    if (req.session.userType == 'ConsumerGroup' || req.session.userType == 'Trader') {
        data.type = req.session.userType
        data.id = req.session.refNo
    }
    model.sideBarUserName(data, (response) => {
        // console.log(response,'response');
        if (response) {
            res.send({ status: true, userType: req.session.userType, userName: response.name })
        }
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (!err) {
            res.send({ status: true })
        }
    })

})

router.post('/sideBarUserName', (req, res) => {
    // console.log(req.session);
    let data = req.body
    if (data.type == 'FPO') {
        data.id = req.session.fpoId
    }
    if (data.type == 'FIG') {
        data.id = req.session.refNo
    }
    if (data.type == 'ia') {
        data.id = req.session.refNo
    }
    if (data.type == 'ADH') {
        data.id = req.session.refNo
    }
    if (data.type == 'AHO') {
        data.id = req.session.refNo
    }
    if (data.type == 'Cbbo') {
        data.id = req.session.cbboCode
    }
    if (req.session.userType == 'ConsumerGroup' || req.session.userType == 'Trader') {
        data.type = req.session.userType
        data.id = req.session.refNo
    }
    model.sideBarUserName(data, (response) => {
        res.send(response)
    })
})

router.get('/getFigFpoIdForReloadPagePurpose', (req, res) => {
    if (req.session.userType == 'FPO') {
        res.send({ userType: req.session.userType, fpoId: req.session.fpoId, refNo: req.session.refNo })
    }
    if (req.session.userType == 'Cbbo') {
        res.send({ userType: req.session.userType, cbboCode: req.session.cbboCode })
    }
    if (req.session.userType == 'ia') {
        res.send({ userType: req.session.userType, refNo: req.session.refNo })
    }
    if (req.session.userType == 'ADH') {
        res.send({ userType: req.session.userType, refNo: req.session.refNo })
    }
    if (req.session.userType == 'AHO') {
        res.send({ userType: req.session.userType, refNo: req.session.refNo })
    }
    if (req.session.userType == 'FIG') {
        res.send({ userType: req.session.userType, refNo: req.session.refNo })
    }
    if (req.session.userType == 'ConsumerGroup' || req.session.userType == 'Trader') {
        res.send({ userType: req.session.userType, refNo: req.session.refNo })
    }
    if (!req.session) {
        res.send({ userType: 'no data' })
    }
})

router.post('/passwordChange', (req, res) => {
    let data = req.body
    // console.log(req.session.refNo, "req.session.refNo");
    // console.log(data.id, 'data.id');
    if (req.session.refNo == data.id) {
        model.checkCurrentPassword(data, (response) => {
            res.send(response)
        })
    } else {
        res.send({ status: 'invalid session' })
    }

})

router.get('/checkForPasswordChangedOrNot/:fpoId', (req, res) => {
    model.checkForPasswordChangedOrNot(req.params.fpoId, (response) => {
        if (response == true) {
            res.send({ changed: true })
        } else {
            res.send({ changed: false })
        }
    })
})

module.exports = router