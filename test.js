var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');
var streets = fs.readFileSync('./streets.json');
var streets = JSON.parse(streets);
console.log(streets);
console.log('123')
// Connection URL
var url = 'mongodb://localhost/test';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  //console.log(db)
  console.log("Connected correctly to server");

  var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('streets');
    // Insert some documents
    for (var i = 0; i < 1 ; i++) {
    collection.insertMany(
      streets
    , function(err, result) {
    });
  }
  }
  db.collection('sities').mapReduce(
    function(){
      emit('1',{count:2})},
    function(key, values) {
       return 16;
    },
    {out: {inline: 1}}
, function(err, data){if (err) console.log(err); else {console.log('+++++');console.log(data);}});
  //insertDocuments(db, function(){    });
});
console.log('456')

/*
a = db.town.mapReduce(f
unction(){emit(16, {name0:this.name});},
function(key,values){var res=[]; values.forEach(function(v){res.push(v)});return {ref:res}},
{out:{inline:1}})

*/
