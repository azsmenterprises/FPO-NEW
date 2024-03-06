var ex = require('express')
var router = ex.Router()
var model = require('../../Model/Admin/adminUpdate')
var sha512 = require('js-sha512').sha512;
const request = require('request');
const multer = require('multer');
const path = require('path');

router.get('/getAllData', (req, res) => {
    model.getAllData(function (response) {
        res.send(response)
    })
})

router.get('/getInfoType', (req, res) => {
    let data = [{ name: 'FPO Update', code: 'fpoUpdate' }, { name: 'Reference Document', code: 'refDoc' }, { name: 'Circular Notification', code: 'circularNotifi' }, { name: 'Agriculam Services', code: 'agriServices' }]
    res.send(data)
})

router.post('/addData', (req, res) => {
    model.addData(req.body, function (response) {
        res.send({ status: response.insertedCount })
    })
})

router.get('/delete/:id', (req, res) => {
    model.delete(req.params.id, function (response) {
        res.send({ status: response.deletedCount })
    })
})

router.post('/update', (req, res) => {
    model.update(req.body, function (response) {
        res.send({ status: response.modifiedCount })
    })
})

router.get('/getFigRegisterData', model.getFigRegisterData)

router.post('/approveFig', function (req, res) {
    model.approveFig(req.body, (response) => {

        if (response.status == 1) {
            let finYear = new Date().getFullYear()
            let userId = finYear + response.response1.blockCode + response.randomNo
            let data1 = {
                refNo: response.response1.refNo,
                userId: userId,
                password: response.response1.password,
                mobileNo: response.response1.leaderMobNo
            }
            // Creating user id and password and inserting in userAuth collection
            model.figIdPassStoreOnApprove(data1, function (response2) {
                if (response2.status == 1) {
                    res.send({ status: response.status })
                    // +" and your password is:"+password
                    let sms = 'Your FIG registration has been approved.Your user id is:' + userId
                    request('http://apicol.nic.in/Registration/EPestSMS?mobileNo=' + response.response1.mobileNo + '&sms=' + sms, function (error, response3, body) {
                    });
                } else {
                    res.send({ status: response.status })
                }
            })
        } else {
            res.send({ status: response.status })
        }
    })
})

router.post('/rejectFig', (req, res) => {
    model.rejectFig(req.body, (response) => {
        res.send(response)
        if (response.status == 1) {
            let sms = 'Your fig registration has been rejected'
            request('http://apicol.nic.in/Registration/EPestSMS?mobileNo=' + response.mobNo + '&sms=' + sms, function (error, response3, body) {
            });
        }
    })
})

router.post('/schemeMaster', async (req, res) => {
    let Storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, 'public/schemeDocsUploaded');
        },
        filename: function (req, file, callback) {
            // callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            callback(null, Date.now() + path.extname(file.originalname));
        }
    });
    let fileFilter = (req, file, callback) => {
        if (file.mimetype == 'application/pdf' || file.mimetype == 'application/PDF' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
            callback(null, true);
        } else {
            callback(new Error('File Format Should be PDF or Image'));
        }
    }
    var upload = multer({ storage: Storage, fileFilter: fileFilter }).fields([
        { name: 'pdfFile', maxCount: 1 },
        { name: 'schemeimage', maxCount: 1 },

    ]);

    upload(req, res, async err => {
        try {
            if (err) throw err;
            let mdata = JSON.parse(req.body.value);
            if (req.files.pdfFile != undefined) {
                mdata.pdfFileUrl = req.files.pdfFile[0].filename;
            }
            if (req.files.schemeimage != undefined) {
                mdata.schemeimageurl = req.files.schemeimage[0].filename;
            }
            model.schemeMasterForm(mdata, function (response) {
                res.send({ status: response });
            });
        } catch (e) {
        }
    });
});

router.get('/getfpodata', (req, res) => {
    model.getFpoData(function (response1) {
        res.send(response1)
    })
});

router.post('/blockUnblockfpo', model.blockUnblockFpo)

router.post('/approveFpo', (req, res) => {
    model.approveFpo(req.body, (response) => {
        if (response.status > 0) {
            let idPass = response.fpoData.userId
            let sms = 'Your registration is successful. Id is ' + idPass + ' Password is Test@1234 for FPOSmartConnect portal DAFE AGRIOR';
            request('http://mkuy.apicol.nic.in/Registration/EPestSMSNew?template_id=1107163056827906030&mobileNo=' + response.fpoData.mobileNo + '&sms=' + sms, function (error, response, body) {
            })
        }
        res.send(response)
    })
})

router.get("/getIa", function (req, res) {
    model.getIa(function (data) {
        res.json(data);
    })
});

router.get("/getCbbo", function (req, res) {
    model.getCbbo(function (data) {
        res.json(data);
    })
});

router.post('/submit', (req, res) => {
    model.submit(req.body, function (response) {
        res.send(response)
    })
})

router.get("/getIaCbbo", function (req, res) {
    model.getIaCbbo(function (data) {
        res.json(data);
    })
});

router.get("/getFpo", function (req, res) {
    model.getFpo(function (data) {
        res.json(data);
    })
});
router.post('/assign', (req, res) => {
    model.assign(req.body, function (response) {
        res.send(response)
    })
})

router.get("/getIaCbboFpo", function (req, res) {
    model.getIaCbboFpo(function (data) {
        res.json(data);
    })
});

router.get("/getCbboMaster/:iaName", function (req, res) {
    model.getCbboMaster(req.params.iaName, function (data) {
        res.json(data);
    })
});

router.get("/gettingCbbo/:iaName", function (req, res) {
    model.gettingCbbo(req.params.iaName, function (response1) {
        res.send(response1);
    })
});

router.get('/missingFpo', (req, res) => {
    model.missingFpo(function (response) {
        res.send(response)
    })
});

router.post('/mappingofmissingData', (req, res) => {
    model.mappingofmissingData(req.body, function (response) {
        res.send(response)
    })
})

router.post('/rejectMissingFpo', (req, res) => {
    model.rejectMissingFpo(req.body, function (response) {
        res.send(response)
    })
})

router.get('/gettotalIa', (req, res) => {
    model.gettotalIa(function (response) {
        res.send(response)
    })
});

router.get('/gettotalCbbo', (req, res) => {
    model.gettotalCbbo(function (response) {
        res.send(response)
    })
});

router.get('/gettotalFpo', (req, res) => {
    model.gettotalFpo(function (response) {
        res.send(response)
    })
});

router.get('/getwomenBod', (req, res) => {
    model.getwomenBod(function (response) {
        res.send(response)
    })
});

router.get("/getwomenBodyearwise/:year", function (req, res) {
    model.getwomenBodyearwise(req.params.year, function (response1) {
        res.send(response1);
    })
});

router.get('/getwomenBodagencywise', (req, res) => {
    model.getwomenBodagencywise(function (response) {
        res.send(response)
    })
});

router.get('/getshareHolder', (req, res) => {
    model.getshareHolder(function (response) {
        res.send(response)
    })
});

router.get('/getshareCapital', (req, res) => {
    model.getshareCapital(function (response) {
        res.send(response)
    })
});

router.get('/getaverageofCapital', (req, res) => {
    model.getaverageofCapital(function (response) {
        res.send(response)
    })
});

router.get('/getaverageofShare', (req, res) => {
    model.getaverageofShare(function (response) {
        res.send(response)
    })
});

router.get("/getbarchartDetails/:year", function (req, res) {
    model.getbarchartDetails(req.params.year, function (response1) {
        console.log(response1, "jys fvbbb");
        res.send(response1);
    })
});

router.get("/gettargetDetails/:year/:iaName", function (req, res) {
    model.gettargetDetails(req.params.year, req.params.iaName, function (response1) {
        res.send(response1);
    })
});

router.get('/getequityGrant', (req, res) => {
    model.getequityGrant(function (response) {
        res.send(response)
    })
});

router.get("/getequityGrantyearwise/:year/:iaName", function (req, res) {
    model.getequityGrantyearwise(req.params.year, req.params.iaName, function (response1) {
        res.send(response1);
    })
});

router.get('/getequitygrantagencywise/:year/:iaName', (req, res) => {
    model.getequitygrantagencywise(req.params.year, req.params.iaName, function (response) {
        res.send(response)
    })
});

router.get("/getshareCapitalyearwise/:year", function (req, res) {
    model.getshareCapitalyearwise(req.params.year, function (response1) {
        res.send(response1);
    })
});

router.get('/getcapitalagencywise', (req, res) => {
    model.getcapitalagencywise(function (response) {
        res.send(response)
    })
});

router.get('/getcapitalaverage', (req, res) => {
    model.getcapitalaverage(function (response) {
        res.send(response)
    })
});

router.get("/getshareHolderyearwise/:year", function (req, res) {
    model.getshareHolderyearwise(req.params.year, function (response1) {
        res.send(response1);
    })
});

router.get('/getholderagencywise', (req, res) => {
    model.getholderagencywise(function (response) {
        res.send(response)
    })
});

router.get('/getholderaverage', (req, res) => {
    model.getholderaverage(function (response) {
        res.send(response)
    })
});

router.get('/getturnover', (req, res) => {
    model.getturnover(function (response) {
        res.send(response)
    })
});

router.get("/getturnoveryearwise/:year/:iaName", function (req, res) {
    model.getturnoveryearwise(req.params.year, req.params.iaName, function (response1) {
        res.send(response1);
    })
});

router.get('/getturnoveragencywise/:year/:iaName', (req, res) => {
    model.getturnoveragencywise(req.params.year, req.params.iaName, function (response) {
        res.send(response)
    })
});

router.get("/getdashboarddata", function (req, res) {
    model.getdashboarddata(function (response1) {
        res.json(response1);
    })
});

router.get("/getdashboarddataByYear", function (req, res) {
    // console.log(req.query,"query");
    let data = {
        selectyear: req.query.selectyear,
        selectTypes: req.query.selectTypes,
        selectSlots: req.query.selectSlots,
        selectAgency: req.query.selectAgency,
    }
    model.getdashboarddataYear(data, function (response1) {
        res.json(response1);
    })
});

router.get('/getOlddata', (req, res) => {
    model.getOlddata(function (response) {
        res.send(response)
    })
});

router.post('/publishData', (req, res) => {
    model.publishData(req.body, function (response) {
        res.send(response)
    })
})

router.post('/deleteRow', (req, res) => {
    model.deleteRow(req.body, (response) => {
        res.send({ status: response })
    })
})

router.post('/deleteOldRow', (req, res) => {
    model.deleteOldRow(req.body, (response) => {
        res.send({ status: response })
    })
})

router.post('/deleteRowMaping', (req, res) => {
    model.deleteRowMaping(req.body, (response) => {
        res.send({ status: response })
    })
})
router.get('/getgrievanceData', (req, res) => {
    model.getgrievanceData(function (response) {
        console.log(response,"9898");
        res.send(response)
    })
});

module.exports = router;