var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/', function(req, res, next) {
  res.render('breakfast', { title: 'Order your breakfast' });
});
router.get('/', function(req, res, next) {
  res.render('lunch', { title: 'Order your Lunch' });
});
router.get('/', function(req, res, next) {
  res.render('dinner', { title: 'order your Dinner' });
});


module.exports = router;
