var ex = require('express')
var router = ex.Router()
var model = require('../../Model/landingPage/landingPage')
const request = require('request');
var sha512 = require('js-sha512').sha512;
var multer = require('multer');
 path = require('path')
const upload = multer({ dest: 'uploads/' });
const SERVER_HOST = 'https://fpoodisha.nic.in/';


router.post('/figRegCheck', function (req, res) {
    model.figRegCheck(req.body, function (response) {
        res.send(response)
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

router.post('/sendOTP', function (req, res) {
    randomString(function (mOTP) {
        req.session.OTP = mOTP;
        var sms = "Your OTP is "+mOTP+" for FPOSmartConnect portal DAFE AGRIOR";
        // ////////console.log("phone:", req.body.mobNo, sms)
        // req.body.mobNo
        request('http://mkuy.apicol.nic.in/Registration/EPestSMSNew?template_id=1107162995846260685&type=OTP&mobileNo=' + req.body.mobNo + '&sms=' + sms, function (error, response, body) {
            res.send(response)
            // ////////console.log(1,response);
            // ////////console.log(2,error);
        });
    });
});

router.post('/otpVerify', function (req, res) {
    if (req.body.otp == req.session.OTP) {
        model.submitFigReg(req.body.figData, function (response) {
            res.send({ status: response.status })

            // Added later
            // if (response.status == 1) {
            //     let finYear = new Date().getFullYear()
            //     let userId = finYear + response.data.blockCode + response.randomNo

            //     // let sourcePassword = 'Test@1234'
            //     // var hash = sha512(sourcePassword)
            //     // let password = hash
            //     let data1 = {
            //         refNo: response.data.refNo,
            //         userId: userId,
            //         // password: password
            //         password: response.data.password,
            //         mobileNo: response.data.leaderMobNo

            //     }

            //     // Creating user id and password and inserting in userAuth collection

            //     model.figIdPassStoreOnApprove(data1, function (response2) {
            //         if (response2.status> 0) {
            //             res.send({ status: response.status })
            //             // +" and your password is:"+password
            //             let sms = 'OTP for reset password is' + userId + 'dafp'
            //             // response.response1.mobileNo
            //             request('http://mkuy.apicol.nic.in/Registration/EPestSMS?mobileNo=' + 7008143795 + '&sms=' + sms, function (error, response3, body) {
            //             });
            //         } else {
            //             res.send({ status: response.status })
            //         }

            //     })

            // }
        })
    } else {
        res.send({ status: 'otpError' })
    };
});


router.post('/sendOTPForFarmerReg', function (req, res) {
    randomString(function (mOTP) {
        req.session.OTP = mOTP; 
      //console.log(mOTP);
        var sms = "Your OTP is "+mOTP+" for FPOSmartConnect portal DAFE AGRIOR";
        // req.body.mobNO
        request('http://mkuy.apicol.nic.in/Registration/EPestSMSNew?template_id=1107162995846260685&type=OTP&mobileNo=' + req.query.mobNO + '&sms=' + sms, function (error, response, body) {
            res.send(response)
            // ////////console.log(response);
        });
    });
});
router.post('/otpVerifyForFrmEnroll', function (req, res) {
    if (req.body.frmOtp == req.session.OTP) {
        res.send({ status: true })
    } else {
        res.send({ status: 'otpError' })
    };
});

// =========================================OTP Actions end============================================

// =======================================Farmer Registration start====================================

router.get('/getVlgForFrmrReg/:vlgCode', function (req, res) {
    model.getVlgForFrmrReg(req.params.vlgCode, function (response) {
        res.send(response)
    })
});

router.get('/getCropData', model.getCropData);

router.post('/submitFarmerReg', model.submitFarmerReg)

router.get('/getAllFigs', model.getAllFigs)

router.get('/getAllFpos', model.getAllFpos)

router.get('/titleEdit', model.titleEdit);

router.get('/titleEdit1', model.titleEdit);
router.get('/titleEdit2', model.titleEdit);
router.get('/titleEdit3', model.titleEdit);

router.get('/location', model.location)

router.get('/getStateWiseFPO', model.getStateWiseFPO)

router.get('/getStateWiseFPOData/:distname', model.getStateWiseFPOData)

router.get('/getDistricts', model.getDistricts)

router.get('/getCrops', model.getCrops)

router.get('/getBlocksOfDistrict/:distCode', model.getBlocksOfDistrict)

// router.get('/getAllFposFromDist/:distCode', model.getAllFposFromDist)

router.get('/getGP/:blockCode', model.getGP)

router.get('/getVillage/:gpCode', model.getVillage)

router.get('/media', model.media)

router.get('/fpoDetailsForScroll', model.fpoDetailsForScroll)

router.get('/getAllSchemes', (req, res) => {
    model.getAllSchemes((response) => {
        res.send(response)
    })
})

router.get('/getAllSchemesOdia', (req, res) => {
    model.getAllSchemesOdia((response) => {
        res.send(response)
    })
})

router.get('/schemeDetails/:id', (req, res) => {
    let id = req.params.id
    model.schemeDetails(id, (response) => {
        res.send(response)
    })
})

router.get('/getAllDepartmentsForSchemes', model.getAllDepartmentsForSchemes)

router.get('/getAllBeneficiaryTypes', model.getAllBeneficiaryTypes)

router.get('/getSchemeAccToDepartment/:selectedDepartment/:selectedBeneficiary', (req, res) => {
    let selectedDepartment = req.params.selectedDepartment
    let selectedBeneficiary = req.params.selectedBeneficiary
    let data={
        selectedDepartment:selectedDepartment,
        selectedBeneficiary:selectedBeneficiary
    }
    if (selectedDepartment == 'selectAll' && selectedBeneficiary == 'selectAll') {
        model.getAllSchemes((response) => {
            res.send(response)
        })
    }
    else if (selectedDepartment != 'undefined' && selectedBeneficiary!= 'undefined') {
        model.getSchemeAccToDepartment(data, (response) => {
            res.send(response)
        })
    } else {
        res.send([])
    }
})


router.get('/schemedetailView', (req, res) => {
    let concernedDepartment = req.query.concernedDepartment
    let data={
        concernedDepartment:concernedDepartment,
    }
    model.schemedetailView(data, (response) => {
        res.send(response)
    })
})









// =========================CG Registration start========================================
router.post('/cgFormSubmit',(req,res)=>{
    model.cgFormSubmit(req.body,(response)=>{
        res.send(response)
    })
})
router.get('/getAllFposFromDist/:distCode',(req,res)=>{
    model.getAllFposFromDist(req.params,(response)=>{
        res.send(response)
    })
})


router.get('/TestCheck',(req,res)=>{
    //console.log("test ");
    let data= "x"
    let data1 ="y"

    model.TestCheck((response)=>{
        res.send(response)
    })
})

// router.post('/consumerRegFormSubmit',(req,res)=>{
//     model.consumerRegistrationSubmit(req.body,(response)=>{
//         res.send(response)
//     })
// })
router.post('/cgMobNoSubmit',(req,res)=>{
    randomString(function (mOTP) {
        req.session.cgOTP = mOTP;
        var sms = "Your OTP is "+mOTP+" for FPOSmartConnect portal DAFE AGRIOR";
        // req.body.cgMobNo
        request('http://mkuy.apicol.nic.in/Registration/EPestSMSNew?template_id=1107162995846260685&type=OTP&mobileNo=' + req.body.cgMobNo + '&sms=' + sms, function (error, response, body) {
            if(response){
                res.send({status:'matched'})
            }
            if(error){
                ////////console.log('error',error);
            }
            // ////////console.log(response);
        });
    });
})

router.get('/cgVerifyOtp/:enteredOtp',async(req,res)=>{
    let cgEnteredOtp=req.params.enteredOtp
    if(cgEnteredOtp==req.session.cgOTP){
        res.send({status:'matched'})
    }else{
        res.send({status:'mismatch'})
    }
})


// =========================CG Registration end========================================

// =============================Consumer Registration Start========================================
router.post('/csRegFormSubmit',(req,res)=>{
    model.consumerRegistrationSubmit(req.body,(response)=>{
        res.send(response)
    })
})
router.post('/csMobNoSubmit',(req,res)=>{
    randomString(function (mOTP) {
        req.session.csOTP = mOTP;
        var sms = "Your OTP is "+mOTP+" for FPOSmartConnect portal DAFE AGRIOR";
        // req.body.csMobNo
        request('http://mkuy.apicol.nic.in/Registration/EPestSMSNew?template_id=1107162995846260685&type=OTP&mobileNo=' + req.body.csMobNo + '&sms=' + sms, function (error, response, body) {
            if(response){
                res.send({status:'matched'})
            }
            if(error){
                ////////console.log('error',error);
            }
            // ////////console.log(response);
        });
    });
})



router.get('/csVerifyOtp/:enteredOtp',async(req,res)=>{
    let csEnteredOtp=req.params.enteredOtp
    if(csEnteredOtp==req.session.csOTP){
        res.send({status:'matched'})
    }else{
        res.send({status:'mismatch'})
    }
})

router.get('/getallConsumerdata/:distCode', model.getallConsumerdata);
router.get('/getConsumerdata/:csData', model.getConsumerdata)

// =============================Consumer Registration End========================================

// =============================Trader Registration start=======================================
router.post('/sendOtptoTrader',(req,res)=>{
    randomString(function (mOTP) {
        req.session.traderOTP = mOTP;
        var sms = "Your OTP is "+mOTP+" for FPOSmartConnect portal DAFE AGRIOR";
        // req.body.cgMobNo
        request('http://mkuy.apicol.nic.in/Registration/EPestSMSNew?template_id=1107162995846260685&type=OTP&mobileNo=' + req.body.traderMobNo + '&sms=' + sms, function (error, response, body) {
            
        if(response){
                res.send({status:'matched'})
            }
            if(error){
                ////////console.log('error',error);
            }
            // ////////console.log(response);
        });
    });
})

router.get('/traderVerifyOtp/:enteredOtp',async(req,res)=>{
    let traderEnteredOtp=req.params.enteredOtp
    if(traderEnteredOtp==req.session.traderOTP){
        res.send({status:'matched'})
    }else{
        res.send({status:'mismatch'})
    }
})

router.post('/traderFormSubmit',(req,res)=>{
    model.traderFormSubmit(req.body,(response)=>{
        res.send(response)
    })
})

// =====================================================Trader Reg End====================================================

router.get('/getAllFpoLocations',(req,res)=>{
    model.getAllFpoLocations((response)=>{
        // //////console.log(response,"FPO LOCATIONS");
        res.send(response)
    })
})

router.get('/getAllFaqTypes', model.getAllFaqTypes)

router.post('/feedbackformsubmit',(req,res)=>{
    // ////////console.log(req.body);
    model.feedbackformsubmit(req.body,(response)=>{
        res.send(response)
        
    })
})

router.get('/getlandingpagetopmenuData/:id',model.getlandingpagetopmenuData)

router.post('/sendOtptoFPO',(req,res)=>{
    randomString(function (mOTP) {
        req.session.fpoOTP = mOTP;
        var sms = "Your OTP is "+mOTP+" for FPOSmartConnect portal DAFE AGRIOR";
        // req.body.cgMobNo
        request('http://mkuy.apicol.nic.in/Registration/EPestSMSNew?template_id=1107162995846260685&type=OTP&mobileNo=' + req.body.fpoContactNo + '&sms=' + sms, function (error, response, body) {
            if(response){
                res.send({status:'sent'})
            }
            if(error){
                console.log('error in sendOtptoFPO in landingPage.js ',error);
            }
            // console.log(response,'response');
        });
    });
})

router.post('/fpoRegFormSubmit',(req,res)=>{
    if(req.body.FPOotp==req.session.fpoOTP){
        model.fpoRegformSubmit(req.body,(response)=>{
            res.send({status:'matched',res:response})
        })
    }else{
        res.send({status:'mismatch'})
    }
    
})
router.get('/searchFAQ/:searchFAQ',(req,res)=>{
    // ////////console.log(req.params.searchFAQ,11111111111);
    model.searchFAQ(req.params.searchFAQ,(response) => {
        res.send(response)
    })
})
router.get('/getcircularNotice', function (req, res, next) {
    model.getcircularNotice(function (response) {
        res.json(response); 
    });
});


router.get('/getFpoDetailsIndex', function (req, res, next) {
    model.getFpoDetailsIndex(function (response) {
        res.json(response); 
    });
});

router.get('/updateParameter', model.updateParameter)

// router.post('/getDetatilsForDistrict',(req,res)=>{
//     var mData={};
//     model.getDetatilsForDistrict(mData,(response)=>{
//         res.send(response)
        
//     })
// })

router.get('/getDetatilsForOdisha', function (req, res, next) {
    model.getDetatilsForOdisha(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForMayurbhanj', function (req, res, next) {
    model.getDetatilsForMayurbhanj(function (response) {
        res.send(response) 
    });
}); 
router.get('/getDetatilsForSundargarh', function (req, res, next) {
    model.getDetatilsForSundargarh(function (response) {
        res.send(response) 
    });
}); 
router.get('/getDetatilsForKeonjhar', function (req, res, next) {
    model.getDetatilsForKeonjhar(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForKandhamal', function (req, res, next) {
    model.getDetatilsForKandhamal(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForGanjam', function (req, res, next) {
    model.getDetatilsForGanjam(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForKalahandi', function (req, res, next) {
    model.getDetatilsForKalahandi(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForKoraput', function (req, res, next) {
    model.getDetatilsForKoraput(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForAnugul', function (req, res, next) {
    model.getDetatilsForAnugul(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForSambalpur', function (req, res, next) {
    model.getDetatilsForSambalpur(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForNabarangpur', function (req, res, next) {
    model.getDetatilsForNabarangpur(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForRayagada', function (req, res, next) {
    model.getDetatilsForRayagada(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForBargarh', function (req, res, next) {
    model.getDetatilsForBargarh(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForBalangir', function (req, res, next) {
    model.getDetatilsForBalangir(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForDhenkanal', function (req, res, next) {
    model.getDetatilsForDhenkanal(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForBalasore', function (req, res, next) {
    model.getDetatilsForBalasore(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForKhordha', function (req, res, next) {
    model.getDetatilsForKhordha(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForGajapati', function (req, res, next) {
    model.getDetatilsForGajapati(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForNayagarh', function (req, res, next) {
    model.getDetatilsForNayagarh(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForCuttack', function (req, res, next) {
    model.getDetatilsForCuttack(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForBoudh', function (req, res, next) {
    model.getDetatilsForBoudh(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForMalkangiri', function (req, res, next) {
    model.getDetatilsForMalkangiri(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForDeogarh', function (req, res, next) {
    model.getDetatilsForDeogarh(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForKendrapada', function (req, res, next) {
    model.getDetatilsForKendrapada(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForJajpur', function (req, res, next) {
    model.getDetatilsForJajpur(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForNuapada', function (req, res, next) {
    model.getDetatilsForNuapada(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForBhadrak', function (req, res, next) {
    model.getDetatilsForBhadrak(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForPuri', function (req, res, next) {
    model.getDetatilsForPuri(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForSonepur', function (req, res, next) {
    model.getDetatilsForSonepur(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForJagatsinghpur', function (req, res, next) {
    model.getDetatilsForJagatsinghpur(function (response) {
        res.send(response) 
    });
});
router.get('/getDetatilsForJharsuguda', function (req, res, next) {
    model.getDetatilsForJharsuguda(function (response) {
        res.send(response) 
    });
});

router.post('/submitGrievance',  function (req, res, next) {

    try {
      let Storage = multer.diskStorage({
     destination: function (req, file, callback) {
          callback(null, 'public/assetsNew/images/grivanceUpload');
        },
        filename: function (req, file, callback) {
          var x = file.originalname.split(".").pop();
          callback(null, file.fieldname + '-' + Date.now() + "." + x);
        }
      });

      let fileFilter = (req, file, callback) => {
        if (file.mimetype == 'application/pdf' || file.mimetype == 'image/jpeg' 
          || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == ".csv" 
        || file.mimetype == "application/vnd.ms-excel" 
        || file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
        || file.mimetype == "application/msword" 
        || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
          callback(null, true);
        } else {
          callback(new Error('File Format Should be PDF or Jpeg/Image'));
        }
      }

      var upload = multer({ storage: Storage, fileFilter: fileFilter }).fields([
        { name: 'upload', maxCount: 1 }
      ]);

      upload(req, res, async err => {
        if (err) throw err;
        let myData = JSON.parse(req.body.Name1);

        if (req.files.upload != undefined) {
          var part1 = req.files.upload[0].path.split("public");

          path = SERVER_HOST + part1[1];
          myData.uploadUrl = path;
          
        }
        // console.log(myData,"tttttttttt");
        model.submitGrievance(myData,  function (response) {
          res.send(response);
        });
      })
    } catch (e) {
      console.log(e)
      res.status(500).send(e);
    }
});
module.exports = router