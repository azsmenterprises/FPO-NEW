var ex = require('express')
var router = ex.Router()
var model = require('../../Model/FPO/editFPO')
var landModel = require('../../Model/landingPage/landingPage')
var request = require('request')
const jwt = require('jsonwebtoken')

router.get('/searchFarmer/:fpoId/:farmerId', (req, res) => {
    // ////////console.log("dfdfsfs");
    let data = {
        fpoId: req.params.fpoId,
        farmerId: req.params.farmerId
    }
    // ////////console.log(data);

    model.searchFarmer(data, (response) => {
        res.send(response)
    })
})

router.post('/updateFarmer', (req, res) => {
    model.updateFarmer(req.body, (response) => {
        // ////////console.log(response);
        res.send({ status: response.modifiedCount })
    })
})


router.post('/deleteFarmer', (req, res) => {
    model.deleteFarmer(req.body, (response) => {
        // ////////console.log(response);
        res.send({ status: response.modifiedCount })
    })
})

router.get('/getAllForwardedFarmer/:fpoId', model.getAllForwardedFarmer)

router.post('/approveForwardedFarmer', (req, res) => {
    model.approveForwardedFarmer(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})

router.get('/getCGListForFpo/:fpoId', (req, res) => {
    model.getCGListForFpo(req.params.fpoId, (response) => {
        res.send(response)
    })
})

router.get('/getTraderListForFpo/:fpoId', (req, res) => {
    model.getRelevantTrader(req.params.fpoId, (response) => {
        //////console.log(response,"Relevant Trader");
        res.send(response)
    })
})

router.get('/getConsumerListForFpo/:fpoId', (req, res) => {
    model.getRelevantConsumer(req.params.fpoId, (response) => {
        //////console.log(response,"Relevant Trader");
        res.send(response)
    })
})

router.get('/getSoldProductsOfFpo/:fpoId', (req, res) => {
    model.getSoldProductsOfFpo(req.params.fpoId, (response) => {
        res.send(response)
    })
})

router.get('/getDataForDashboard/:fpoId', model.getDataForDashboard);
router.get('/getLikes/:fpoId', (req, res) => {
    model.getLikes(req.params.fpoId,function (response) {
      
       if(response[0]=="undefined"){
        response[0]={type:0}
       }
        res.send(response[0])
    })
})

router.get('/getNotifications/:fpoId', model.getNotifications);
router.get('/updateNotificationsStatus/:id/:status', model.updateNotificationsStatus);
router.get('/getNotificationByStatus/:fpoId/:status', model.getNotificationByStatus);


router.get('/dateForDashboard/:fpoId', model.dateForDashboard);
router.get('/getFigPendingApproveListForFpo/:fpoRefNo', model.getFigPendingApproveListForFpo)

function randomString(callback) {
    var chars = "0123456789";
    var string_length = 4;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    callback(randomstring);
}

router.post('/ApproveFig', (req, res) => {
    model.ApproveFig(req.body, (response) => {
        try {
            if (response > 0) {
                let finYear = new Date().getFullYear()
                randomString(function (mOTP) {
                    let userId = finYear + req.body.blockCode + mOTP
                    let data1 = {
                        refNo: req.body.refNo,
                        userId: userId,
                        password: req.body.password,
                        mobileNo: req.body.leaderMobNo
                    }
                    // Creating user id and password and inserting in userAuth collection
                    landModel.figIdPassStoreOnApprove(data1, function (response2) {
                        if (response2.status > 0) {
                            res.send({ status: response })
                            // +" and your password is:"+password
                            let sms = 'Your registration is successful. Id is ' + userId + 'for FPOSmartConnect portal DAFE AGRIOR'
                            // response.response1.mobileNo

                            request('http://mkuy.apicol.nic.in/Registration/EPestSMSNew?template_id=1107163056827906030&type=OTP&mobileNo=' + response.response1.mobileNo + '&sms=' + sms, function (error, response, body) {
                            })
                        } else {
                            res.send({ status: response })
                        }

                    })

                })

            } else {
                res.send({ status: 0 })
            }
        } catch (e) {
            ////////console.log(e.message, 546);
        }

    })
})
router.get('/getFigApprovedListForFpo/:fpoRefNo', model.getFigApprovedListForFpo)

router.get('/getDistricts', model.getDistricts)

router.get('/getBlocksOfDistrict/:districtCode', model.getBlocksOfDistrict)

router.get('/getGP/:blockCode', model.getGP)

router.get('/getVillage/:gpCode', model.getVillage)
router.get('/getAllVillage/:district', model.getAllVillage)
router.get('/loadTrader/', model.loadTrader)
router.get('/traderData/:refId', model.traderData)


router.get('/statusForElicenseRegisterButton/:fpoId', (req, res) => {
    model.statusForElicenseRegisterButton(req.params.fpoId, (response) => {
        res.send(response)
    })
})
router.get('/registerToElicensing/:fpoId', (req, res) => {
    let fpoId = req.params.fpoId
    model.registerToElicensing(fpoId, (response) => {
        if (!response.fpoMailId || !response.name || !response.aadhar || !response.gender || !response.fpoContactNo || !response.district || !response.block || !response.village || !response.address || !response.pincode) {
            res.send({ status: 'updateRequired', dataForPatch: response })
        } else if (response) {
            let data = {
                appKey: 'LKD22VHJOIUTYRTESX5678BSD45XP5YJHGJK879KWEAJHN942',
                email: response.fpoMailId,
                name: response.name,
                aadhar: response.aadhar,
                gender: response.gender,
                phoneNumber: response.fpoContactNo,
                districtName: response.district,
                districtCode: response.district_id,
                blockName: response.block,
                blockCode: response.block_id,
                villageName: response.village,
                plotNo: response.address,
                pin: response.pincode,
                password: response.password,
                fpoId: response.fpoId
            }
            let headers = {
                "Content-Type": "application/json"
            }
            let dataForElicensing = {
                url: "https://odishaagrilicense.nic.in/user/registerFpo",
                method: "POST",
                headers: headers,
                json: true,
                body: data
            }
            request(dataForElicensing, function (error, response, body) {
                // res.send({ status: 'e-Licensing system registration successful' })
                res.send({ status: response.body[0].message })
                let eLicensingResponse = {
                    fpoId: data.fpoId,
                    aadhar: data.aadhar,
                    response: response.body[0].message
                }
                model.eLicensingStatus(eLicensingResponse, (response1) => {

                })
            })
        } else {
            res.send({ status: 'error' })
        }
    })
})



router.get('/externalLink/:fpoId', (req, res) => {
    let fpoId = req.params.fpoId
    model.registerToElicensing(fpoId, (response) => {
        if (!response.fpoMailId || !response.name || !response.aadhar || !response.gender || !response.fpoContactNo || !response.district || !response.block || !response.village || !response.address || !response.pincode) {
            res.send({ status: 'updateRequired', dataForPatch: response })
        } else if (response) {
            let data = {
                appKey: 'LKD22VHJOIUTYRTESX5678BSD45XP5YJHGJK879KWEAJHN942',
                email: response.fpoMailId,
                name: response.name,
                aadhar: response.aadhar,
                gender: response.gender,
                phoneNumber: response.fpoContactNo,
                districtName: response.district,
                districtCode: response.district_id,
                blockName: response.block,
                blockCode: response.block_id,
                villageName: response.village,
                plotNo: response.address,
                pin: response.pincode,
                password: response.password,
                fpoId: response.fpoId
            }
            let headers = {
                "Content-Type": "application/json"
            }
            let dataForElicensing = {
                url: "https://odishaagrilicense.nic.in/user/registerFpo",
                method: "POST",
                headers: headers,
                json: true,
                body: data
            }
            request(dataForElicensing, function (error, response, body) {
                // res.send({ status: 'e-Licensing system registration successful' })
                res.send({ status: response.body[0].message })
                let eLicensingResponse = {
                    fpoId: data.fpoId,
                    aadhar: data.aadhar,
                    response: response.body[0].message
                }
                model.eLicensingStatus(eLicensingResponse, (response1) => {

                })
            })
        } else {
            res.send({ status: 'error' })
        }
    })
})

router.post('/submitFormForElicensing', (req, res) => {
    let data = req.body
    let dist = data.district
    let block = data.block
    let gp = data.gramPanchayat
    let village = data.village
    data.district = dist.districtName
    data.district_id = dist.districtCode
    data.block = block.blockName
    data.block_id = block.blockCode
    data.gramPanchayat = gp.gpName
    data.gramPanchayatCode = gp.gpCode
    data.village = village.villageName
    data.villageCode = village.villageCode

    model.submitFormForElicensing(data, (response) => {
        if (response.modifiedCount > 0) {
            res.send({ status: 'Profile data updated successfully', statusValue: response.modifiedCount })
            // let dataForElicensing = {
            //     url: ' https://fpoodisha.nic.in/fpo/registerToElicensing/'+data.fpoId,
            //     method: "GET",
            //     json: true,
            //     body: data
            // }
            // request(dataForElicensing, (error, response, body) => {
            //     res.write('Registered successfully')
            //     res.end()
            // })
        } else {
            res.send({ status: 'Already modified' })

        }
    })
})

router.get('/loginToElicensing/:fpoId', (req, res) => {
    let fpoId = req.params.fpoId
    model.loginToElicensing(fpoId, (response) => {
        let token = jwt.sign({ fpoId: fpoId, userid: response }, process.env.secret, { expiresIn: '30s' })
        res.send({ token: token })
    })

})

router.post('/addGodownSubmit', (req, res) => {
    model.addGodownSubmit(req.body, (response) => {
        res.send({ status: response })
    })
})

router.post('/stockTransferForm', (req, res) => {
    model.stockTransferForm(req.body, (response) => {
        res.send({ availableQuant: response })
    })
})

router.get('/getAllGodowns', (req, res) => {
    model.getAllGodowns((response) => {
        res.send(response)
    })
})
router.get('/getAvailableCropType', (req, res) => {
    ////////console.log(req.params, 1234567);
    model.getAvailableCropType(req.params, (response) => {
        res.send(response)
    })
})

router.get('/loadDestGodown/:destinationDistrictCode', (req, res) => {
    model.loadDestGodown(req.params.destinationDistrictCode, (response) => {
        res.send(response)
    })
})

router.post('/stockTransferSubmit', (req, res) => {
    model.stockTransferSubmit(req.body, (response) => {
        res.send({ status: response })
    })
})

router.get('/getAllStockForReceiptData/:fpoId', (req, res) => {
    model.getAllStockForReceiptData(req.params.fpoId, (response) => {
        res.send(response)
    })
})

router.get('/getAllStockInTransitData/:fpoId', (req, res) => {
    model.getAllStockInTransitData(req.params.fpoId, (response) => {
        res.send(response)
    })
})

router.get('/receiveStock/:_id', (req, res) => {
    model.receiveStock(req.params._id, (response) => {
        res.send({ status: response })
    })
})

router.post('/searchGodownReport', (req, res) => {
    model.searchGodownReport(req.body, (response) => {
        res.send(response)
    })
})

router.post('/godownSaleDataSubmit', (req, res) => {
    model.godownSaleDataSubmit(req.body, (response) => {
        res.send({ status: response })
    })
})

module.exports = router;