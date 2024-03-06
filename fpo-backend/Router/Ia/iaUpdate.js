var ex = require('express')
var router = ex.Router()
var model = require('../../Model/Ia/iaUpdate')
var request = require('request')
const jwt = require('jsonwebtoken')

router.get('/getData', (req, res) => {
    const refNo = req.session.refNo
    model.getData(refNo, function (response) {
        res.send(response)
    })
})

router.get('/getAverage/:FinYear', function (req, res) {
    model.getAverage(req.params.FinYear, req.session.refNo, function (response) {
        res.send(response)
    })
})

router.get('/getYearwiseData/:FinYear', function (req, res) {
    model.getYearwiseData(req.params.FinYear, req.session.refNo, function (response) {
        res.send(response)
    })
})

router.get('/getTabledata/:FinYear', function (req, res) {
    model.getTabledata(req.params.FinYear, req.session.refNo, function (response) {
        res.send(response)
    })
})

router.get('/getturnOver/:FinYear', function (req, res) {
    model.getturnOver(req.params.FinYear, req.session.refNo, function (response) {
        res.send(response)
    })
})

router.get('/getmouRegistration/:FinYear', function (req, res) {
    model.getmouRegistration(req.params.FinYear, req.session.refNo, function (response) {
        res.send(response)
    })
})

router.get('/getBusinessplan/:FinYear', function (req, res) {
    model.getBusinessplan(req.params.FinYear, req.session.refNo, function (response) {
        res.send(response)
    })
})

router.get('/getTargetdata/:FinYear', function (req, res) {
    model.getTargetdata(req.params.FinYear, req.session.refNo, function (response) {
        res.send(response)
    })
})

router.get('/getAverageofshare/:FinYear', function (req, res) {
    model.getAverageofshare(req.params.FinYear, req.session.refNo, function (response) {
        res.send(response)
    })
})

router.post('/submit', (req, res) => {
    let data = req.body;
    data.refNo = req.session.refNo
    // console.log(data.refNo,"hiknkji");

    model.submit(data, function (response) {
        res.send(response)
    })
})

router.get('/getRegdAge/:fpoAge', function (req, res) {
    model.getRegdAge(req.params.fpoAge, req.session.iaName, function (response) {
        res.send(response)
    })
})

router.get("/getAchievement/:iaName/:year", function (req, res) {
    model.getAchievement(req.params.iaName,req.params.year, function (response) {
        res.send(response);
    })
});

router.post('/iaTarget', (req, res) => {
    model.iaTarget(req.body, function (response) {
        res.send(response)
    })
})

router.get("/getcbboList/:iaName", function (req, res) {
    model.getcbboList(req.params.iaName, function (response) {
        res.send(response);
    })
});

router.get("/fpoList/:iaName/:cbboName/:year", function (req, res) {
    model.fpoList(req.params.iaName, req.params.cbboName,req.params.year, function (response) {
        res.send(response);
    })
});

router.post('/cbboTarget', (req, res) => {
    model.cbboTarget(req.body, function (response) {
        res.send(response)
    })
})

router.get("/showcbboTarget/:iaName", function (req, res) {
    model.showcbboTarget(req.params.iaName, function (response) {
        res.send(response);
    })
});

router.get("/getdashboarddataByYear", function (req, res) {
    // console.log(req.query,"query");
    let data={
         selectyear:req.query.selectyear,
         selectTypes:req.query.selectTypes,
         selectSlots:req.query.selectSlots,
         selectAgency:req.query.selectAgency,
       }
    // console.log(req.session.refNo,"req.session.refNo");
     model.getdashboarddataByYear(data,req.session.refNo,function (response1) {
         res.json(response1); 
     })
 });

 
router.get("/getRefNo", function (req, res) {
   var response=req.session.iaName
         res.json(response); 
 });

 router.get('/gettotalCbbo', (req, res) => {
    // console.log(req.session.iaName,"iaName");
    model.gettotalCbbo(req.session.iaName,function (response) {
        console.log(response,"response");
        res.send(response)
    })
});

router.get('/gettotalFpo', (req, res) => {
    console.log(req.session.iaName,"iaName to be printed");
    model.gettotalFpo(req.session.iaName,function (response) {
        console.log(response,"dfgfgdfgdfgfd");
        res.send(response)
    })
});

router.get('/getshareHolder', (req, res) => {
    model.getshareHolder(req.session.iaName,function (response) {
        res.send(response)
    })
});

router.get('/getshareCapital', (req, res) => {
    model.getshareCapital(req.session.iaName,function (response) {
        res.send(response)
    })
});

router.get('/getaverageofShare', (req, res) => {
    model.getaverageofShare(req.session.iaName,function (response) {
        res.send(response)
    })
});

router.get('/getaverageofCapital', (req, res) => {
    model.getaverageofCapital(req.session.iaName,function (response) {
        res.send(response)
    })
});

router.get('/getaverageofTurnover', (req, res) => {
    model.getaverageofTurnover(req.session.iaName,function (response) {
        res.send(response)
    })
});

router.get('/getwomenBod', (req, res) => {
    model.getwomenBod(req.session.iaName,function (response) {
        res.send(response)
    })
});

router.get("/selfTarget", function (req, res) {
    model.selfTarget(req.session.iaName, function (response) {
        res.send(response);
    })
});

router.post('/deleteRowTarget', (req, res) => {
    model.deleteRowTarget(req.body, (response) => {
        res.send(response)
    })
})
router.post('/deleteCbboTarget', (req, res) => {
    model.deleteCbboTarget(req.body, (response) => {
        res.send(response)
    })
})
router.post("/getDataByFilter", function (req, res) {
    req.body.refNo = req.session.refNo;
    model.getDataByFilter(req.body, function (response) {
        res.send(response);
    })
});



module.exports = router;
