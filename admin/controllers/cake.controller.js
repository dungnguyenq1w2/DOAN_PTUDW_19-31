const cakeService = require('../services/cake.service');

const getRetrieveCakes = async (req, res, next) => {
  let { page, search } = req.query;

  if (typeof page == 'undefined') {
    page = 1;
  }
  const { cakes, numPages } = await cakeService.getRetrieveCakes(page, search);

  console.log(req.url);

  res.render('cake/index', { title: "Product list", which: 'product', cakes, numPages, page, search });
}

const getCreateCake = async (req, res, next) => {
  res.render('cake/create', { title: "Product - Admin", which: 'product' });
}

const postCreateCake = async (req, res, next) => {
  await cakeService.postCreateCake(req);

  res.redirect('/cakes');
};

const getUpdateCake = async (req, res, next) => {
  const { cakeId } = req.params;

  const cake = await cakeService.getUpdateCake(cakeId);

  res.render('cake/update', { title: "Product - Admin", which: 'product', cake });
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