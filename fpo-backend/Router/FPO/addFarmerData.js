var express = require('express')
var router = express.Router()
var model = require('../../Model/FPO/addFarmerData')
const landingModel = require('../../Model/landingPage/landingPage')
var request = require('request')

router.post('/getFarmerDetails', (req, res) => {
    try {
        var headers = {
            "Content-Type": "application/json"
        }
        var options = {
            url: 'https://mkuy.apicol.nic.in/api/FarmerData?farmerID=' + req.body.farmerId,
            method: "GET",
            headers: headers,
            json: false
        }
        request(options, function (err, response, body) {
            if (err ==null) {
                // ////////console.log(JSON.parse(body).LGDVillageCode,"village code");
                if(JSON.parse(body).LGDVillageCode){
                    landingModel.getVlgForFrmrReg(JSON.parse(body).LGDVillageCode, function (response1) {
                        res.send({ status: 'success', data: body, address: response1 })
                    })
                }else{
                    res.send({ status: 'success', data: body, address: {} })

                }
              
            } else {
                res.send({ status: 'error' })
            }
        })
        // ////////console.log(req.params.farmerId);
        // res.send(data)
    } catch (e) {
        ////////console.log('error msg', e.message);
    }

})


router.post('/addMemberFinalSubmit', (req, res) => {
    model.addMemberFinalSubmit(req.body, (response) => {
        if (response.insertedCount == 'duplicate') {
            res.send({ status: 'duplicate' })
        } else {
            res.send({ status: response.insertedCount })
        }
    })
})

function randomString(callback) {
    var chars = "0123456789";
    var string_length = 6;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    callback(randomstring);
}

router.get('/sendOtpForAddingFpoMember/:MobileNo',(req,res)=>{
    randomString(function (mOTP) {
        req.session.addMemberOTP = mOTP;
        var sms = 'OTP for reset password is' + mOTP + 'dafp';
        //////////console.log(req.query)
        // req.body.mobNo
        //////console.log('otp is'+mOTP);
        request('http://mkuy.apicol.nic.in/Registration/EPestSMS?mobileNo=' + req.params.MobileNo + '&sms=' + sms, function (error, response, body) {
            res.send(response)
            // ////////console.log(response);
        });
    });
})

router.get('/confirmOtpForAddMember/:otp',(req,res)=>{
    if(req.session.addMemberOTP==req.params.otp){
        res.send({match:true})
    }else{
        res.send({match:false})
    }
})

router.get('/getRelevantTrader/:fpoId', (req, res) => {
    model.getRelevantTrader(req.params.fpoId, (response) => {
        res.send(response)
    })
})
router.get('/getCropData', (req, res) => {
    model.getCropData((response) => {
        res.send(response)
    })
})

router.get('/getBankData', (req, res) => {
    model.getBankData((response) => {
        res.send(response)
    })
})

router.get('/loadVariety/:cropCode', (req, res) => {
    model.loadVariety(req.params.cropCode, (response) => {
        res.send(response)
    })
})

module.exports = router;