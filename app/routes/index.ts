declare function require(name:string);
declare var module:any;
var Express = require('express');
var router = Express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', layout: 'layout' });
});

module.exports = router;
