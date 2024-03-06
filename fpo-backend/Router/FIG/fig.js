var ex = require('express')
var router = ex.Router()
var model = require('../../Model/FIG/fig')
const request = require('request');



router.get('/getAllAppliedFarmer', (req, res) => {
    sessionRefNo = req.session.refNo
    model.getAllAppliedFarmer(sessionRefNo, function (response) {
        res.send(response)
    })
})

router.get('/fetchAllProducedDataForForwardToFpo/:figRefNo', model.fetchAllProducedDataForForwardToFpo)
router.get('/getAvailableCropType/:godownId', model.getAvailableCropType)

router.post('/forwardProducedDataToFpo', model.forwardProducedDataToFpo)

router.post('/approve', (req, res) => {
    model.approve(req.body, (response) => {
        res.send(response)
        if (response.status == 1) {
            let sms = 'Your registration is successful. Id is ' + userId + ' for FPOSmartConnect portal DAFE AGRIOR';
            
            // request('http://apicol.nic.in/Registration/EPestSMS?mobileNo=' + response.mobNo + '&sms=' + sms, function (error, response3, body) {
            // });
            request('http://mkuy.apicol.nic.in/Registration/EPestSMSNew?template_id=1107163056827906030&type=OTP&mobileNo=' + response.mobNo + '&sms=' + sms, function (error, response, body) {
            })
        }
    })
})

router.post('/forwardToFpo', model.forwardToFpo)

router.get('/getFPOs/:figRefNo', model.getFPOs)

router.get('/getCropCata', model.getCropCata)

router.get('/getCropAccToCatagory/:cropCat', model.getCropAccToCatagory)

router.get('/getCropAccToCatagorygetCropAccToCatagory/:cropCat', model.getCropAccToCatagory)

router.get('/getItemTypeData/:itemType', model.getItemTypeData)

router.get('/getFertBrand/:fertTypeName', model.getFertBrand)

router.get('/getAllVarieties/:cropCode', model.getAllVarieties)

router.post('/onSubmitProducedForm', function (req, res) {
    let data = req.body
    data.harvestingDate = new Date(data.harvestingDate)
    // data.indentSale = true
    data.producedSale = true
    data.fpoApproved = false
    model.onSubmitProducedForm(data, function (response) {
        res.send({ status: response.insertedCount })
    })
})

router.post('/onSubmitIndentForm', function (req, res) {
    let data = req.body
    // //console.log(data,"indent Form" )
    data.indentSale = true
    data.fpoApproved = true
    model.onSubmitIndentForm(data, function (response) {
        res.send({ status: response.insertedCount })
    })
})

router.get('/getAppliedProducedAggregator/:figRefNo', model.getAppliedProducedAggregator)

router.get('/getApprovedIndents/:figRefNo', model.getApprovedIndents)

router.get('/getRejectedIndents/:figRefNo', model.getRejectedIndents)

router.get('/getFarmers/:figRefNo', model.getFarmers)

router.get('/getAppliedSaleIndents/:fpoId/:itemType/:year/:season', model.getAppliedSaleIndents)

router.get('/getapproveddata/:figRefNo', model.getApprovedDemandData);

router.get('/getrejectedata/:figRefNo', model.getRejectedDemandData);



module.exports = router;