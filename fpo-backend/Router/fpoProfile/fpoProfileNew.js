var ex = require('express')
var router = ex.Router()
var model = require('../../Model/fpoProfile/fpoProfileNew')
const request = require('request');


router.get('/fpoDetailsNew/:fpoId', (req, res) => {
    model.fpoDetailsNew(req.params.fpoId,function (response) {
        // console.log(response[0],"kjsgsgsg");
        res.send(response[0])
    })
})

router.get('/getProfileLikes', async (req, res) => {
    var mData={};
    mData.fpoId = req.query.fpoId;
    mData.fpoName = await  model.getfpoName(mData)
    console.log(mData.fpoName ,"pppp");
    model.getProfileLikes(mData, function (response) {
        res.send(response)
    })
})
router.get('/connectBackData',(req, res) => {
    var mData=req.query;
    model.connectBackData(mData, function (response) {
        res.send(true)
    })
})
router.get('/fpoProfileLike/:fpoId', (req, res) => {
    console.log(req.params,"777s");
    model.fpoProfileLike(req.params.fpoId, function (response) {
        console.log(response,"hhhh");
        res.send({type:response});
    });
});



module.exports = router