var ex = require('express');
var app = ex();
var cors = require('cors');
var path = require('path')
var bodyparser = require('body-parser');
var session = require('express-session')
const { uuid } = require('uuidv4');
var env=require('dotenv').config()
var mongoConnection=require('./Model/mongo/mongoConnection')
var CryptoJS=require('crypto-js')
var editFpo = require('./Router/FPO/editFarmer');
var updateFpoData = require('./Router/FPO/updateFpo')
var adminUpdate = require('./Router/Admin/adminUpdate')
var adhUpdate = require('./Router/adh/adhUpdate')
var ahoUpdate = require('./Router/aho/ahoUpdate')
var cbboUpdate = require('./Router/cbbo/cbboUpdate')
var iaUpdate = require('./Router/Ia/iaUpdate')
var addFarmerData = require('./Router/FPO/addFarmerData')
var login = require('./Router/Auth/login')
var fig = require('./Router/FIG/fig')
var landingRoute = require('./Router/landingPage/landingPage')
var externalServ = require('./Router/externalService/externalServ')
var producedDemandAggre = require('./Router/FPO/producedDemandAggre')
var fpoFilter = require('./Router/fpoFilter/fpoFilter')
var fpofilterNew = require('./Router/fpofilterNew/fpofilterNew')

var fpoProfile = require('./Router/fpoProfile/fpoProfile')
var fpoProfileNew = require('./Router/fpoProfile/fpoProfileNew')

var consumerGroup=require('./Router/consumerGroup/consumerGroup')
var trader = require('./Router/trader/trader')//by jd
var loadingtraderProfile = require('./Router/traderProfile/traderProfile')//by jd
var multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// app.use(ex.json())

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(bodyparser.json({ limit: "5mb" }));
app.use(bodyparser.urlencoded({ extended: true, limit: '5mb' })); //Used for large size image upload in base 64

app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  key: 'Secret',
  secret: require('crypto').randomBytes(64).toString('hex'),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // expires: 1 * 24 * 3600 * 1000
    maxAge: 3600000
  }
}));

// =================================Added from landing page start=====================================

app.use(ex.static(path.join(__dirname, 'public')));
app.use(ex.static(path.join(__dirname, 'frontend/dist/fpo-smart-connect/')));


// app.use(ex.static('./public'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/landRoute', landingRoute);
// app.use('/externalRoute', externalRoute);

// app.use(ex.static('./frontend/dist/fpo-smart-connect/'))


app.get('/', function (req, res) {
  res.render('homeNew',{Farmer_ID:req.query.Farmer_ID,applicationId:req.query.applicationId,from:"fpo"});
})
// app.get('/new', function (req, res) {
//   res.render('homeNew',{Farmer_ID:req.query.Farmer_ID,applicationId:req.query.applicationId,from:"fpo"});
// })

app.get('/odia', function (req, res) {
  res.render('homeodia',{Farmer_ID:req.query.Farmer_ID,applicationId:req.query.applicationId,from:"fpo"});
})


app.get('/fpoProfile', function (req, res) {
  res.render('fpoProfilePage')
})

app.get('/fpoFilter', function (req, res) {
  res.render('fpoFilter')
})
app.get('/fpofilterNew', function (req, res) {
  res.render('fpofilterNew')
})
app.get('/fpo1', function (req, res) {
  res.render('fpo1')
})
app.get('/fpo2', function (req, res) {
  res.render('fpo2')
})



// added on 03-02-24 
app.get('/fpoProfileNew', (req, res) => {
  // console.log(req.query.fpoData,"jay jagANNATH");
  res.render('fpoProfileNew', { userId: req.query.fpoData });
})
app.get('/knowledgeMaterialNew', function (req, res) {
  res.render('knowledgeMaterialNew')
})
app.get('/schemeGuidelinesNew', function (req, res) {
  res.render('schemeGuidelinesNew')
})
app.get('/faqNew', function (req, res) {
  res.render('faqNew')
})
app.get('/redirectToFpoProfile', (req, res) => {
  res.render('fpoProfilePage', { userId: req.query.fpoData });
})
// app.get('/grievance', (req, res) => {
//   res.render('grievance', { userId: req.query.fpoData });
// })

// app.get('/grievance', (req, res) => {
//   res.render('grievance', { id: req.query.id })
// })

app.get('/userLogin', (req, res) => {
  req.session.loginUserTypeToShow=req.query.userType
  res.sendFile(path.join(__dirname,'frontend/dist/fpo-smart-connect/login.html'))
})

app.get('/topbarmenu', (req, res) => {
  res.render('topbarmenu', { id: req.query.id })
})


app.get('/feedback', function (req, res) {
  res.render('feedback',{ id: req.query.id })
})
app.get('/FAQ', function (req, res) {
  res.render('FAQ')
})
app.get('/sugamFPO', function (req, res) {
  res.render('sugamFpo',{Farmer_ID:req.query.Farmer_ID,applicationId:req.query.applicationId,from:"sugam"})
})

app.get('/sugamFarmer', function (req, res) {
  res.render('sugamFarmer',{Farmer_ID:req.query.Farmer_ID,applicationId:req.query.applicationId})
})
app.get('/acknowledgementFPO', function (req, res) {
  const chkSum = '252e80b4e5d9cfc8b369ad98dcc87b5f';
  const Data='[{"result_code":1,"result":{"applicationRefNo":"'+req.query.applicationId+'","Farmer_ID":"'+req.query.Farmer_ID+'","msg":"Application Applied"}}]';
  const signedData = CryptoJS.HmacSHA256(Data, chkSum).toString();
  // const signedData = 111;

  res.render('acknowledgementFPO', {  RESULT_CODE: 1, RESULT:Data, ENC_TOKEN:signedData})
})
app.get('/acknowledgementFPOReg', function (req, res) {
  const chkSum = '252e80b4e5d9cfc8b369ad98dcc87b5f';
  const Data='[{"result_code":1,"result":{"applicationRefNo":"'+req.query.applicationId+'","applicationRefNo":"'+req.query.applicationRefNo+'","msg":"Application Applied"}}]';
  const signedData = CryptoJS.HmacSHA256(Data, chkSum).toString();
  // const signedData = 111;

  res.render('acknowledgementFPOReg', {  RESULT_CODE: 1, RESULT:Data, ENC_TOKEN:signedData})
})
app.get('/trader', function (req, res) {
  res.render('trader')
})
app.get('/redirectToTraderProfile', (req, res) => {
  res.render('traderProfile',{ traderRefNo: req.query.refNo });
})
app.get('/resources', function (req, res) {
  res.render('resources')
})

app.get('/knowledgeM', function (req, res) {
  res.render('knowledgeM')
})

app.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

app.get('/dashboardia', (req, res) => {
  res.render('dashboardia')
})

app.get('/dashboardCbbo', (req, res) => {
  res.render('dashboardCbbo')
})

app.get('/traderNew',(req,res)=>{
  res.render('traderNew')
})

app.get('/grievance', function (req, res) {
  res.render('grievance')
})
app.get('/homeNewTrader', function (req, res) {
  res.render('homeNewTrader',{Farmer_ID:req.query.Farmer_ID,applicationId:req.query.applicationId,from:"fpo"})
})

app.post("/upload", upload.single('upload'),(req, res) =>{
  console.log(req.body);
  console.log(req.file);

  return res.redirect('/')
});
// app.get('/externalServ', function (req, res) {
//   res.render('externalServ')
// })
// app.get('/userLogin/',ex.static(path.join('./frontend/dist/fpo-smart-connect/')))

// ================================Added from landing page end========================================

app.use('/fpo', editFpo)
app.use('/updateFpo', updateFpoData)
app.use('/adminUpdate', adminUpdate)

app.use('/adhUpdate',adhUpdate)
app.use('/ahoUpdate',ahoUpdate)

app.use('/cbboUpdate',cbboUpdate)
app.use('/iaUpdate',iaUpdate)
app.use('/addMembers', addFarmerData)
app.use('/login', login)
app.use('/fig', fig)
app.use('/producedDemandAggre', producedDemandAggre)
app.use('/fpoFilter', fpoFilter)
app.use('/fpofilterNew', fpofilterNew) 

app.use('/fpoProfile', fpoProfile)
app.use('/fpoProfileNew', fpoProfileNew)

app.use('/consumerGroup',consumerGroup)
app.use('/trader',trader)//by jd
app.use('/traderProfile',loadingtraderProfile)//by jd
app.use('/api', externalServ);

app.use((req, res, next) => {
  res.render('error404')
})


// process.on('SIGINT',function(){
//   //console.log('db disconnected');
//   mongoConnection.disconnectDB()
// })

// process.on('uncaughtException',function(reason,p){
//   //console.log('db disconnected(uncaught expection)',reason);
//   mongoConnection.disconnectDB()
// })

// mongoConnection.connectDB(async (err)=>{
//   try{
//     if(err) throw err
//     //console.log('db connected');
//   }catch(e){
//     //console.log('db connection error');
//   }
// })

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0 //FIXME: //To be checked during server deployment

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
