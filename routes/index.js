var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signIn', function(req, res, next) {
  res.render('signIn', { title: 'Express' });
});

router.get('/about', (req, res, next) => {
  res.render('about');
});

router.get('/contact',(req, res, next) => {
  res.render('contact');
});

router.get('/shop',(req, res, next) => {
  res.render('shop');
});

router.get('/checkout',(req, res, next) => {
  res.render('checkout');
});

router.get('/shoppingCart',(req, res, next) => {
  res.render('shoppingCart');
});

router.get('/product',(req, res, next) => {
  res.render('product');
});

module.exports = router;
