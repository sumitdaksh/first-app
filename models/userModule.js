var mongo = require('mongodb');
var MongoClient = mongo.MongoClient
var conStr = require('./dataBaseUrl');
var url = conStr.conn();
// -  Looged in Method
var loggedIn = (item)=> {
  MongoClient.connect(url, (err, db)=> {
    if (err) throw err;
    console.log("Connected to Database");
      if(item.email != '' && item.password != '') {
        db.collection('Users').find(item).toArray(function(err, result) {
          if (err) throw err;
            else{
              var data = {
                'name': result[0].name,
                'email': result[0].email,
                'contact': result[0].contact,
                'Date': result[0].Date.toString()
              }
              console.log(data);
              db.close();
            }
        });
      } else {
        console.log('Enter user name or password')
      }
  });
}
// - Sign Up Method
var signUp = (item, collection)=> {
  MongoClient.connect(url, (err, db)=> {
    if (err) throw err;
    console.log('collection');
    console.log(collection);
    console.log("Connected to Database");
  	db.collection(collection).insert(item, (err, records)=> {
  		if (err) throw err;
  		console.log("Record added as ");
	  });
  });
}
// - Get Users Method
var GetData = () => {
  MongoClient.connect(url, (err, db)=> {
    if (err) throw err;
    // console.log("Connected to Database");
    // console.log("Connected to Database to user page");
      db.collection('Employee').find({}).toArray(function(err, result) {
        if (err) throw err;
      //  console.log(result);
        db.close();
      });
  });
}
// -  Export Method
module.exports.signUp = signUp;
module.exports.loggedIn = loggedIn;
module.exports.GetData = GetData;
