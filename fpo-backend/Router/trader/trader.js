var ex = require('express')
var router = ex.Router()
var model = require('../../Model/trader/trader')
// var fpoProfileModel=require('../../Model/trader/trader')


router.get('/loadtrader', (req, res) => {
    model.loadTrader((response) => {
        res.send(response)
    })
})


router.get('/loadtraderwithsort', (req, res) => {
    model.loadTraderWithSort((response) => {
        res.send(response)
    })
})

router.get('/searchTraderFromSearchBar/:searchtraderName', (req, res) => {
    model.searchTraderFromSearchBar(req.params.searchtraderName, (response) => {
        res.send(response)
    })
})
router.get('/getTraderDistricts', (req, res) => {
    model.getTraderDistricts(req.query,(response) => {
        res.send(response)
    })
})

router.get('/getTraderState', (req, res) => {
    model.getTraderState((response) => {
        res.send(response)
    })
})

router.get('/getTraderCrop', (req, res) => {
    model.getTraderCrop(req.query,(response) => {
        console.log(response);
        res.send(response)

    })
})

router.get('/searchTrader', (req, res) => {
   
    model.searchTrader(req.query, (response) => {
        res.send(response)
    })
})

module.exports = router;