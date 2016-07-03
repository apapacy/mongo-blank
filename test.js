require('traceur').require.makeDefault(function(filename) {
  // don't transpile our dependencies, just our app
  return filename.indexOf('node_modules') === -1;
}, {
  annotations: true,
  arrayComprehension: true,
  asyncFunctions: true,
  asyncGenerators: true,
});


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
  db.collection('cities').find({Name: 'Харьков-1'}).forEach(function(city){
    console.log(city.Code)
    db.collection('streets').find({CityCode: "100000000"}).toArray(function (error, data){
      for (var i in data)
      console.log(data[i])
    });
  })
  /*db.collection('cities').mapReduce(
    function(){
      var name = this.Name;
        db.collection('streets').find({CityCode: this.Code}).forEach(function(street){
        street.CityName = name
        emit(street.Name, street)
      })
      emit('1',{count:2})},
    function(key, values) {
       return values[0];
    },
    {
      out: {inline: 1},
      query: {Name: 'Харьков'}
    }
, function(err, data){if (err) console.log(err); else {console.log('+++++');console.log(data);}});*/
  //insertDocuments(db, function(){    });
});
console.log('456')

/*
a = db.town.mapReduce(f
unction(){emit(16, {name0:this.name});},
function(key,values){var res=[]; values.forEach(function(v){res.push(v)});return {ref:res}},
{out:{inline:1}})

*/
