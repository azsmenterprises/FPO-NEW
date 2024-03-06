var ex = require('express')
var router = ex.Router()
var model = require('../../Model/FPO/producedDemandAggre')
const request = require('request');

router.get('/figProducedData', (req, res) => {
    model.figProducedData(req.query, (response) => {
        res.send(response)
    })
})


router.post('/viewFigProducedDetails', (req, res) => {
    model.viewFigProducedDetails(req.body, (response) => {
        res.send(response)
    })
})
router.get('/approvedProduced', (req, res) => {
    model.approvedProduced(req.query, (response) => {
        res.send(response)
    })
})


router.post('/approveFigProducedData', (req, res) => {
    model.approveFigProducedData(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})
router.post('/rejectList', (req, res) => {
    model.rejectList(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})

router.get('/rejectedProducedList', (req, res) => {
    model.rejectedProducedList(req.query, (response) => {
        res.send(response)
    })
})

router.get('/viewlistindent', (req, res) => {
    model.viewlistindent((response) => {
        res.send(response)
    })
})

router.get('/indentapprovefigindent', (req, res) => {
    // ////////console.log('hi123');
    model.indentapprovefigindent(req.query, (response) => {
        res.send(response)
    })
})

router.get('/figapproveindentdetail', (req, res) => {
    model.figapproveindentdetail(JSON.parse(req.query.data), (response) => {
        res.send(response)
    })
})

router.post('/approveIndent', (req, res) => {
    model.approveIndent(req.body, (response) => {
        // res.send({ status: response.modifiedCount })
        if (response.status > 0 && response.agreeForElicense == true) {
            res.send({ status: response.status })
            // let dataForELicense = []
            // ////////console.log(response);
            // for (let i = 0; i < response.dataForELicense.length; i++) {
            let data = {}
            data.appKey = 'LKD22VHJOIUTYRTESX5678BSD45XP5YJHGJK879KWEAJHN942'
            data.type = response.dataForELicense[0].itemType.toLowerCase()
            data.fpoName = response.dataForELicense[0].fpo.fpoName
            data.fpoId = response.dataForELicense[0].fpo.fpoId
            data.fpoPhoneNo = response.fpoPhNo
            if (response.dataForELicense[0].itemType == 'Seed') {
                data.productName = response.dataForELicense[0].variety.Variety_Name
            } else {
                data.productName = response.dataForELicense[0].technicalName
            }
            data.durationTill = new Date()
            data.districtName = response.district.toUpperCase()
            data.orderId = response.dataForELicense[0].uniqueId
            data.amount = response.dataForELicense[0].totalQuantity
            data.unit = 'Ton'

            // dataForELicense.push(data)

            // if (i + 1 == response.dataForELicense.length) {
            sendDemandToElicense(data)
            // }
            // }

        } else if (response.dontPublishInElicense == false) {
            res.send({ status: response.status })
        } else {
            res.send({ status: response.status })
        }
    })
})

function sendDemandToElicense(dataForELicense) {
    var headers = {
        "Content-Type": "application/json"
    }
    var options = {
        url: "https://odishaagrilicense.nic.in/user/fpoDemandToDealers",
        method: "POST",
        headers: headers,
        json: true,
        body: dataForELicense
    }
    request(options, function (err, res, body) {
        if (err || res.statusCode != 200) {
            model.failedToPushElicense(dataForELicense, function (response) {

            })
        }
        if (res.statusCode == 200) {
            model.updateElicenseResponse(dataForELicense.orderId, function (response1) {

            })
        }
    })
}


router.post('/rejectIndent', (req, res) => {
    model.rejectIndent(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})

router.get('/approvedDemand', (req, res) => {
    // ////////console.log('hi123');
    model.approvedDemand(req.query, (response) => {
        res.send(response)
    })
})

router.get('/rejectedDemand', (req, res) => {
    // ////////console.log('hi123');
    model.rejectedDemand(req.query, (response) => {
        res.send(response)
    })
})

router.post('/onSubmitFpoSelfProducedForm', function (req, res) {
    let data = req.body
    data.sowingDate = new Date(data.sowingDate)

    data.harvestingDate = new Date(data.harvestingDate)
    data.producedSale = true
    data.fpoApproved = true
   // data.fpoSelfProduced = true  //commented due to no fig , because fpos have their own self produced which is already maintained in the db so to differentiate between selfproduced and the farmer registered or who contacted fpo this flag is removed.
    model.onSubmitFpoSelfProducedForm(data, function (response) {
        res.send({ status: response.insertedCount })
    })
})

// router.post('/fpoProducedSale',model.fpoProducedSale)

router.post('/fpoProducedSale',(req,res)=>{
    //////console.log(req.body,"sdfsf");
    model.fpoProducedSale(req.body,(response)=>{
        res.send(response)
    })
})

router.post('/producedAddToGodown',(req,res)=>{
    model.producedAddToGodown(req.body,(response)=>{
        res.send({status:response})
    })
})

router.get('/getAllFpoGodowns/:fpoId',(req,res)=>{
    model.getAllFpoGodowns(req.params.fpoId,(response)=>{
        res.send(response)
    })
})
router.get('/getFarmers/:figRefNo', model.getFarmers)

module.exports = router;