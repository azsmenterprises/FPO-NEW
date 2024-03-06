var ex = require('express')
var router = ex.Router()
var model = require('../../Model/fpoProfile/fpoProfile')
const request = require('request');



router.get('/fpoDetails/:fpoRefNo', (req, res) => {
    model.fpoDetails(req.params.fpoRefNo, function (response) {
        res.send(response[0])
    })
})

router.get('/getProfileLikes/:fpoId', (req, res) => {

    model.getProfileLikes(req.params.fpoId, function (response) {

        res.send(response[0])
    })
})
router.get('/updateFpoTest', (req, res) => {
    model.updateFpoTest(function (response) {
        res.send(true)
    })
})

// =========================================OTP Actions start============================================
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
router.post('/varifyOtpAndSendDataLikes', (req, res) => {

    model.varifyOtpAndSendData(req.body, function (response) {
        if (response > 0) {
            res.send({ status: true })
        }
    })
})

router.get('/varifyMobileNO/:mobNo', (req, res) => {
    randomString(function (mOTP) {
        req.session.OTP = mOTP;
        var sms = "Your OTP is " + mOTP + " for FPOSmartConnect portal DAFE AGRIOR";
        console.log(sms, req.params.mobNo);
        request('http://mkuy.apicol.nic.in/Registration/EPestSMSNew?template_id=1107162995846260685&type=OTP&mobileNo=' + req.params.mobNo + '&sms=' + sms, function (error, response, body) {

            if (response) {
                res.send({ status: 'matched' })
            }
            if (error) {

            }

        });
    });
})

router.post('/varifyOtpAndSendData', function (req, res) {
    // console.log(req.session.OTP);
    if (req.body.otp == req.session.OTP) {
        model.varifyOtpAndSendData(req.body, function (response) {
            if (response > 0) {
                res.send({ status: true })
            }
        })
    } else {
        // console.log(4,req.body);
        res.send({ status: 'otpError' })
    };
});

// router.get('/fpoDetailsNew/:fpoId', (req, res) => {
//     model.fpoDetailsNew(req.params.fpoId,function (response) {
//         console.log(response,"kjsgsgsg");
//         res.send(response[0])
//     })
// })


module.exports = router