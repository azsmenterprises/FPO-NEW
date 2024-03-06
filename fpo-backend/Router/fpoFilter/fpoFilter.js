var ex = require('express')
var router = ex.Router()
var model = require('../../Model/fpoFilter/fpoFilter')
var fpoProfileModel=require('../../Model/fpoProfile/fpoProfile')


router.get('/loadFpos', (req, res) => {
    model.loadFpos((response) => {
        res.send(response)
    })
})

router.get('/loadCropCatagories', (req, res) => {
    model.loadCropCatagories((response) => {
        res.send(response)
    })
})

router.get('/searchFpo', (req, res) => {
console.log(req.query,"req.query");
    model.searchFpo(req.query, (response) => {
    
        res.send(response)
    })
})



router.get('/redirectToFpoProfile', (req, res) => {
    // //console.log(req.query.fpoData);
    // res.render('fpoProfilePage',{userId:req.query.fpoData})
    res.render('/fpoProfilePage',{userId:req.query.fpoData});
    
    // res.send({status:'success',fpoRefNo:req.body.refNo})
    // fpoProfileModel.getFpoRefNoFromFpoFilterPage(req.body.refNo)
})

router.get('/loadFposWithSort',(req,res)=>{
    model.loadFposWithSort((response) => {
        res.send(response)
    })
})

router.get('/searchFpoFromSearchBar/:searchFpoName',(req,res)=>{
    model.searchFpoFromSearchBar(req.params.searchFpoName,(response) => {
        res.send(response)
    })
})

module.exports = router;