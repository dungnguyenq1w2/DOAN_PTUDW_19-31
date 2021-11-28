const express = require('express');
const uploadFile = require('../middlewares/uploadFile.middleware');
const router = express.Router();

const uploadFileHelper = require('../helpers/uploadFile.helper');

router.get('/', (req, res, next) => {
  res.render('product/productList_admin', { title: "Cake - Admin", home: true });
});

router.get('/productList', (req, res, next) => {
  res.render('product/productList_admin', { title: "Product List - Admin", productList: true});
});

router.get('/product', (req, res, next) => {
  res.render('product/product_admin', { title: "Product - Admin", product: true});
});

router.post('/product', uploadFile.single('figure'), async (req, res, next) => {
  const url = await uploadFileHelper(req);

  res.redirect('/productList');
})

module.exports = router;