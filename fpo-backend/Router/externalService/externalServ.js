var ex = require('express')
var router = ex.Router()
var model=require('../../Model/externalServ/externalServ')
var fpoModel=require('../../Model/landingPage/landingPage')
const request = require('request');


router.get('/getDistricts', model.getDistricts)

router.post('/registerFpo', function (req, res, next) {
  //console.log("ROUTE");
  //console.log(req.body,"bodyyyyyy");
    if (req.body.appKey == "LKD22VHJOIUTYRTESX5678BSD45XP5YJHGJK879KWEAJHN942") {
      //console.log("insideif");
        fpoModel.fpoRegformSubmit(req.body, (response)=>{
          res.send({status:'matched',res:response})
      });
    } else {
      res.send([{ message: "Not Allowed" }]);
    }
  });
module.exports = router