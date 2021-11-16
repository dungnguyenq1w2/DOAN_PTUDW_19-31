const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/product', function(req, res, next) {
  res.render('admin/product');
});

router.get('/shop', (req, res, next) => {
  res.render('admin/shop');
})

module.exports = router;