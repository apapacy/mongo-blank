var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
console.log('123')
// Connection URL
var url = 'mongodb://localhost/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log(db)
  console.log("Connected correctly to server");

  var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    for (var i = 0; i < 30000 ; i++) {
    collection.insertMany([
      {a : 1}
    ], function(err, result) {
    });
  }
  }
  insertDocuments(db, function(){    });
});
console.log('456')
