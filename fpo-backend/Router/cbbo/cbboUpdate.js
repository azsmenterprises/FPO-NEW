var ex = require('express')
var router = ex.Router()
var model = require('../../Model/cbbo/cbboUpdate')
var request = require('request')

router.post('/publishData', (req, res) => {
    let data = req.body
    data.cbboCode = req.session.cbboCode;
    model.publishData(req.body, function (response) {
        res.send(response)
    })
})

router.post('/draftData', (req, res) => {
    let data = req.body
    data.cbboCode = req.session.cbboCode;
    model.draftData(req.body, function (response) {
        res.send(response)
    })
})

router.get("/getIa", function (req, res) {
    model.getIa(function (data) {
        res.json(data);
    })
});

router.get("/getMappingData/:cbboName", function (req, res) {
    model.getMappingData(req.params.cbboName, function (response) {
        res.send(response);
    })
});

router.get("/getFpo/:cbboName", function (req, res) {
    model.getFpo(req.params.cbboName, function (response) {
        res.send(response);
    })
});

router.get("/getData", function (req, res) {
    model.getData(req.session.cbboCode, function (data) {
        res.json(data);
    })
});

router.get("/draftedData", function (req, res) {
    model.draftedData(req.session.cbboCode, function (data) {
        res.json(data);
    })
});

router.get('/getDetails/:fpoId', (req, res) => {
    model.getDetails(req.params.fpoId, (response) => {
        res.send(response)
    })
})

router.put('/deleteRow', (req, res) => {
    model.deleteRow(req.body, (response) => {
        res.send({ status: response })
    })
})

router.post('/updateList', (req, res) => {
    model.updateList(req.body, (response) => {
        // ////////console.log(response);
        res.send({ status: response.modifiedCount })
    })
})

router.post('/updatepublishList', (req, res) => {
    model.updatepublishList(req.body, (response) => {
        // ////////console.log(response);
        res.send({ status: response.modifiedCount })
    })
})

router.get("/getdistrictList", function (req, res) {
    model.getdistrictList(function (data) {
        res.json(data);
    })
});

router.get('/getBlocks/:districtCode', (req, res) => {
    model.getBlocks(req.params.districtCode, (response) => {
        res.send(response)
    })
})

router.get('/getfpoList/:blockName', (req, res) => {
    model.getfpoList(req.params.blockName, (response) => {
        res.send(response)
    })
})

router.post('/sendtoAdmin', (req, res) => {
    // console.log(req.session.cbboCode,'oijhgf');
    var data = req.body;
    data.cbboCode = req.session.cbboCode
    model.sendtoAdmin(data, function (response) {
        res.send(response)
    })
})

router.get('/getshareHolder', (req, res) => {
    model.getshareHolder(req.session.cbboCode, function (response) {
        res.send(response)
    })
});

router.get('/getshareCapital', (req, res) => {
    model.getshareCapital(req.session.cbboCode, function (response) {
        res.send(response)
    })
});

router.get('/getaverageofShare', (req, res) => {
    model.getaverageofShare(req.session.cbboCode, function (response) {
        res.send(response)
    })
});

router.get('/getaverageofCapital', (req, res) => {
    model.getaverageofCapital(req.session.cbboCode, function (response) {
        res.send(response)
    })
});

router.get('/getaverageofTurnover', (req, res) => {
    model.getaverageofTurnover(req.session.cbboCode, function (response) {
        res.send(response)
    })
});

router.get('/getwomenBod', (req, res) => {
    model.getwomenBod(req.session.cbboCode, function (response) {
        res.send(response)
    })
});
router.get('/getTotalFpo', (req, res) => {
    model.getTotalFpo(req.session.cbboCode, function (response) {
        res.send(response)
    })
});

router.get('/getCbbotarget', (req, res) => {
    model.getCbbotarget(req.session.cbboCode, function (response) {
        res.send(response)
    })
});

router.get('/monthWiseFpo/:timeSlot/:cbboName', (req, res) => {
    model.monthWiseFpo(req.params, (response) => {
        res.send(response)
    })
})

var cron = require('node-cron');
// ======================= for 22 th date of every month ==========
//"min hour dayOfMonth * *" //this will run on 22th of every month at 10:01 AM
cron.schedule('01 10 22 * *', function (res) {
    model.getCbboContactForSendMessage((response) => {
        // console.log(response, "send sms");
        if (response.length > 0) {
            for (let i = 0; i < array.length; i++) {
                // let idPass = response[0].fpoId
                let idName = response[i].fpoName
                // console.log(idPass,'idPass');

                const current = new Date();
                current.setMonth(current.getMonth() + 1);
                var nextMonth = current.toLocaleString('default', { month: 'long' });
                // console.log(nextMonth, "nextMonth");
                // const date = new Date(Date.now());
                // var currentMonth = date.toLocaleString('en-US', { month: 'long' }); // {month:'long'}

                process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1; //makes TLS connections and HTTPS requests insecure by enabling certificate verification
                // let sms = 'Your registration is successful. Id is ' + idPass + ' Password is Test@1234 for FPOSmartConnect portal DAFE AGRIOR';
                // let sms = 'Kindly submit' + " "+ idPass + " "+ 'Key FPO details of all the FPO under' + " "+ idName + " "+ 'on www.fpoodisha.nic.in before 5th of' + " "+ nextMonth + '. FPO Odisha.. DAFP AGRIOR'
                let sms = 'Kindly update the Profile of' + " " + idName + " " + 'on www.fpoodisha.nic.in before' + " " + nextMonth + " " + '. FPO Odisha. DAFP AGRIOR'

                request('http://mkuy.apicol.nic.in/Registration/EPestSMSNew?template_id=1107167273253542948&mobileNo=' + response[i].contactNo + '&sms=' + sms, function (error, response, body) {
                })
            }
        }
    })
});

// =========================================
// ===================== for 28th date of every month =============
//"min hour dayOfMonth * *" //this will run on 28th of every month at 10:01 AM
cron.schedule('01 10 28 * *', function (res) {
    model.getCbboContactForSendMessage((response) => {
        // console.log(response, "send sms");
        if (response.length > 0) {
            for (let i = 0; i < response.length; i++) {
                let idName = response[i].fpoName
                console.log(idName, 'idName');
                // let idPass = response[i].fpoId
                const current = new Date();
                current.setMonth(current.getMonth() + 1);
                var nextMonth = current.toLocaleString('default', { month: 'long' });
                // const date = new Date(Date.now());
                // var currentMonth = date.toLocaleString('en-US', { month: 'long' }); // {month:'long'}
                // console.log(currentMonth, "currentMonth");

                process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1; //makes TLS connections and HTTPS requests insecure by enabling certificate verification
                // let sms = 'Your registration is successful. Id is ' + idPass + ' Password is Test@1234 for FPOSmartConnect portal DAFE AGRIOR';
                // let sms = 'Kindly submit'+" " + idPass + " "+'Key FPO details of all the FPO under' +" "+ idName + " "+'on www.fpoodisha.nic.in before 5th of' + " "+currentMonth +'. FPO Odisha.. DAFP AGRIOR'
                let sms = 'Kindly update the Profile of' + " " + idName + " " + 'on www.fpoodisha.nic.in before' + " " + nextMonth + " " + '. FPO Odisha. DAFP AGRIOR'
                request('http://mkuy.apicol.nic.in/Registration/EPestSMSNew?template_id=1107167273253542948&mobileNo=' + response[i].contactNo + '&sms=' + sms, function (error, response, body) {
                })
            }
        }
    })
});

router.get('/getFpoReportFile/:fpoId', (req, res) => {
    model.getFpoReportFile(req.params.fpoId, (response) => {
        res.send(response)
    })
})
//==================================
router.post("/getCbboDataByFilter", function (req, res) {
    req.body.cbboCode = req.session.cbboCode;
    model.getCbboDataByFilter(req.body, function (response) {
        res.send(response);
    })
});

router.get("/getCbboList", function (req, res) {
    console.log(req.session.refNo, 'req.session.iaNamereq.session.iaName');
    model.getCbboList(req.session.iaName, function (response) {
        res.send(response)
    })
});

router.get("/getCbboTargetList", function (req, res) {
    let data = {
        selectyear: req.query.selectyear,
        selectTypes: req.query.selectTypes,
        selectSlots: req.query.selectSlots,
    }
    model.getCbboTargetList(data, req.session.refNo, function (response1) {
        res.send(response1);
    })
});

router.get("/getCbboAchievementListhhh", function (req, res) {
    let data = { selectCbbo: req.query.selectCbbo }
    model.getCbboAchievementList(data, req.session.refNo, function (response1) {
        res.send(response1);
    })
});

module.exports = router;