const cakeService = require('../services/cake.service');
const cakeModel = require('../models/cake.model');

const getRetrieveCakes = async (req, res, next) => {
  let { page } = req.query;

  if (typeof page == 'undefined') {
    page = 1;
  }

  const cakes = await cakeService.getRetrieveCakes(page);

  console.log(cakes);

  res.render('product/productList_admin', { title: "Product List - Admin", productList: true, cakes });
}

const getCreateCake = async (req, res, next) => {
  res.render('product/product_admin', { title: "Product - Admin", product: true });
}

const postCreateCake = async (req, res, next) => {
  res.redirect('/productList');
};

const getUpdateCake = async (req, res, next) => {
  res.render('product/product_admin', { title: "Product - Admin", product: true });
}

const putUpdateCake = async (req, res, next) => {

}

const deleteCake = async (req, res, next) => {

}

module.exports = {
  getRetrieveCakes,
  getCreateCake,
  postCreateCake,
  getUpdateCake,
  putUpdateCake,
  deleteCake
}