var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){console.log("we're connected!");});
var kittySchema = mongoose.Schema({
  name: String,
  cats: Number
});
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
  }
var Kitten = mongoose.model('Kitten', kittySchema);
router.get('/:name', async function(req, res, next) {
try {
    for (var i =0; i<10000; i++) {
    var fluffy = new Kitten({ name:req.params.name + i, cats:i, test:i });
    //fluffy.speak(); // "Meow name is fluffy"
    fluffy.save();
    //a = await promify(fluffy, fluffy.save)
    //console.log(a)
    }
    res.send('respond with a resource++');
} catch (ex) {console.log(ex)}


});


function promify() {
  var self = arguments[0];
  var func = arguments[1];
  var args = [];
  var next = 2;

  for (var i = next; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  return new Promise(function(resolve, reject) {
    args.push(function(error, data) {
      if (error) {
        reject(error)
      } else {
        resolve(data);
      }
    })
    func.apply(self, args);
  });
}


module.exports = router;
