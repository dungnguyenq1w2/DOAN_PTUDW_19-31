const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('product/productList_admin', { title: "Cake - Admin", home: true });
});

router.get('/productList', (req, res, next) => {
    res.render('product/productList_admin', { title: "Product List - Admin", productList: true});
});

router.get('/product', (req, res, next) => {
    res.render('product/product_admin', { title: "Product - Admin", product: true});
});

module.exports = router;