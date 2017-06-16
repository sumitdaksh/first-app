var mongo = require('mongodb');
var MongoClient = mongo.MongoClient
var conStr = require('./dataBaseUrl');
var url = conStr.conn();


// - Get Users Method
var GetData = (collection, cb) => {
  MongoClient.connect(url, (err, db)=> {
    if (err) throw err;
      db.collection(collection).find({}).toArray((err, result)=> {
        if (err) throw err;
          cb(err,result);
        db.close();
      });
  });
}

// -  Remove User row
var deleteEmployee = (collection, query ,cb) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    console.log('collection, query');
    console.log(collection, query);
    var myquery = { email: query };
    console.log(myquery);
    db.collection(collection).remove(myquery, function(err, obj) {
      if (err) throw err;
      cb(err, obj)
      console.log(obj.result.n + " document(s) deleted");
      db.close();
    });
  });
}

// - Update Employee Records

var updateEmployee = (collection,query,cb)=>{
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myquery = { email: query.email };
  var newvalues = query;
  console.log('var newvalues = query')
  console.log(newvalues)
  db.collection(collection).update(myquery, newvalues, function(err, res) {
    if (err) throw err;
      cb(err,res);
      console.log(res.result.nModified + " record updated");
      db.close();
   });
 });
}
// -  Export Method
module.exports.GetData = GetData;
module.exports.deleteEmployee = deleteEmployee;
module.exports.updateEmployee = updateEmployee;
