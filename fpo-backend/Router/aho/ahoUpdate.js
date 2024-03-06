var ex = require('express')
var router = ex.Router()
var model = require('../../Model/aho/ahoUpdate')
var request = require('request')

router.get('/getfpoList/:distCode', (req, res) => {
    model.getfpoList(req.params.distCode, (response) => {
        res.send(response)
    })
})
router.get('/getBodMeetingDetails/:financialYear/:fpoId', (req, res) => {
    model.getBodMeetingDetails(req.params.financialYear, req.params.fpoId, function (response) {
        res.send(response)
    })
});
router.get('/getFpoDetails/:financialYear/:fpoId', (req, res) => {
    model.getFpoDetails(req.params.financialYear, req.params.fpoId, function (response) {
        res.send(response)
    })
});
// added by arindam


router.get('/getfpoListforBusiness/:distCode', (req, res) => {
    model.getfpoListforBusiness(req.params.distCode, (response) => {
        // console.log(response,"66655");
        res.send(response)
    })
})
router.get('/getBusinessDetails/:financialYear/:fpoId', (req, res) => {
    model.getBusinessDetails(req.params.financialYear, req.params.fpoId, function (response) {
        res.send(response)
    })
}); 
router.get('/getCropDetails/:financialYear/:fpoId', (req, res) => {
    model.getCropDetails(req.params.financialYear, req.params.fpoId, function (response) {
        res.send(response)
    })
}); 
router.get('/getTurnoverDetails/:financialYear/:fpoId', (req, res) => {
    model.getTurnoverDetails(req.params.financialYear, req.params.fpoId, function (response) {
        res.send(response)
    })
});
router.get('/getProfitDetails/:financialYear/:fpoId', (req, res) => {
    model.getProfitDetails(req.params.financialYear, req.params.fpoId, function (response) {
        res.send(response)
    })
});
router.post('/submitFinaldata', (req, res) => {
    let data = req.body
    model.submitFinaldata(data, function (response) {
        res.send(response)
    })
})  
module.exports = router;