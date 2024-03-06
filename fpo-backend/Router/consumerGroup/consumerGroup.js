var router=require('express').Router()
var model=require('../../Model/consumerGroup/consumerGroup')
var multer=require('multer')
var path=require('path')

router.get('/getAllCropCat/:cgRefNo',model.getAllCropCat)

router.get('/loadCrops/:cropCat',model.loadCrops)

let Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/productsImagesByCG');
    },
    filename: function (req, file, callback) {
        // callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        callback(null,Date.now() + path.extname(file.originalname));

    }
});
let fileFilter = (req, file, callback) => {
    if (file.mimetype =='image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
        callback(null, true);
    } else {
        callback(new Error('File Format Should be PDF or Image'));
    }
}
var upload = multer({ storage: Storage, fileFilter: fileFilter }).fields([
    { name: 'img', maxCount: 1 },
    { name: 'formValue', maxCount: 1 },

]);
router.post('/addProductSubmit',upload,(req,res)=>{
    let mdata = JSON.parse(req.body.formValue);
    if (req.files.img != undefined) {
        mdata.productImg = req.files.img[0].filename;
    }
    model.addProductSubmit(mdata,(response)=>{
        res.send({status:response})
    })
})

router.get('/getConsumerListToApprove/:cgRefNo',(req,res)=>{
    model.getConsumerListToApprove(req.params.cgRefNo,(response)=>{
        res.send(response)
    })
})

router.post('/approveConsumer',(req,res)=>{
    model.approveConsumer(req.body,(response)=>{
        res.send(response)
    })
})

router.get('/getFpoListForCg/:cgRefNo',(req,res)=>{
    model.getFpoListForCg(req.params.cgRefNo,(response)=>{
        res.send(response)
    })
})

router.get('/getApprovedConsumerList/:cgRefNo',(req,res)=>{
    model.getApprovedConsumerList(req.params.cgRefNo,(response)=>{
        res.send(response)
    })
})

router.post('/blockUnblockConsumer',model.blockUnblockConsumer)


router.get('/getProductsAddedList/:cgRefNo',model.getProductsAddedList)

router.post('/blockUnblockProduct',model.blockUnblockProduct)

router.post('/consumerRegisterSubmit',model.consumerRegisterSubmit)

router.get('/getDashboardData/:cgRefNo',model.getDashboardData)
router.get('/getDashboardChart/:cgRefNo',model.getDashboardChart)


router.get('/getTrader/:cgRefNo',model.getTrader)
router.post('/updateTrader/:cgRefNo',model.updateTrader)

module.exports=router