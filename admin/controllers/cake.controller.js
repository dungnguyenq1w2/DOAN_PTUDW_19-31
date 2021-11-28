const cakeService = require('../services/cake.service');

const getRetrieveCakes = async (req, res, next) => {
  let { page } = req.query;

  if (typeof page == 'undefined') {
    page = 1;
  }
  const { cakes, pages } = await cakeService.getRetrieveCakes(page);

  res.render('cake/index', { title: "Product list", productList: true, cakes, pages, page });
}

const getCreateCake = async (req, res, next) => {
  res.render('cake/create', { title: "Product - Admin", product: true });
}

const postCreateCake = async (req, res, next) => {
  await cakeService.postCreateCake(req);

  res.redirect('/cakes');
};

const getUpdateCake = async (req, res, next) => {
  const { cakeId } = req.params;

  const cake = await cakeService.getUpdateCake(cakeId);

  res.render('cake/update', { title: "Product - Admin", product: true, cake });
}

const putUpdateCake = async (req, res, next) => {
  await cakeService.postUpdateCake(req);

  res.redirect('/cakes');
}

const deleteCake = async (req, res, next) => {
  const { cakeId } = req.params;

  await cakeService.deleteCake(cakeId);

  res.redirect('/cakes');
}

module.exports = {
  getRetrieveCakes,
  getCreateCake,
  postCreateCake,
  getUpdateCake,
  putUpdateCake,
  deleteCake
}