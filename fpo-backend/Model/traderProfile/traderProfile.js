var newMongo = require('../mongo/newMongo')


exports.loadTraderProfile = async (traderRefNo,callback) => {
    ////////console.log("hiiii");
    try {
        let aggregate = [
            {
              '$match': {
                'refNo': traderRefNo,
                'groupRegType':'Trader'
              }
            }
          ]
        const db = await newMongo.mongoConnection();
        let response = await newMongo.queryWithAggregator(aggregate, 'consumerGroup', db)
        callback(response)
        ////////console.log(response);
        newMongo.mongoClose(db)
    } catch (e) {

    }
}

// exports.loadTraderProfile = async (req, res) => {
//     ////////console.log("hiiiiiiii");
//     // ////////console.log(req.params.id);
//     let data = req.params.refNo
//     try {
//         let db = await newMongo.mongoConnection()
//         let response = await newMongo.findOne('consumerGroup', { refNo: data }, db)
//         ////////console.log(response);
//         res.send(response);
//         db.close();

//     }
//     catch (e) {
//         //console.error(e);
//         res.status(500).send('Unexpected error');
//     }
// }