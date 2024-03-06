var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var DB = "FPOSurvey";

var db

const connectDB=async(callback)=>{
    try{
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, database) {
            if (err) throw err;
            var dbo = database.db(DB);
            db=dbo
            return callback(err)
        })
    }catch(e){

    }
}

const getDB=()=>db

const disconnectDB=()=>db.close()

module.exports={connectDB,getDB,disconnectDB}