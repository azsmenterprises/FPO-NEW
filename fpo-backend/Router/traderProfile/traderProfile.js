var ex = require('express')
var router = ex.Router()
var model = require('../../Model/traderProfile/traderProfile')


router.get('/loadtraderprofile/:traderRefNo', (req, res) => {
    ////////console.log(req.params.traderRefNo);
    model.loadTraderProfile(req.params.traderRefNo,function(response)  {
        ////////console.log(123,response);
        res.send({data:response})
    })
})


// router.get('/loadtraderprofile/:refNo',model.loadTraderProfile)

module.exports = router;
