const cakeService = require('../services/cake.service');
const categoryService = require('../services/category.service');

const getRetrieveCakes = async (req, res, next) => {
  const { originalUrl } = req;
  let url = originalUrl;
  let { page, search, sort } = req.query;

  if (page === undefined) {
    page = 1;
  }

  url = url.split('page=')[0];
  if (url[url.length - 1] !== '?' && url[url.length - 1] !== '&') {
    if (url.includes('?')) {
      url += '&';
    } else {
      url += '?';
    }
  }

  const { cakes, pagination } = await cakeService.getRetrieveCakes(page, search, sort);

  res.render('cake/index', { title: "Product list", which: 'product', cakes, pagination, search, sort, url });
}

const getCreateCake = async (req, res, next) => {
  const categories = await categoryService.getCategories();

  res.render('cake/create', { title: "Product - Admin", which: 'product', categories });
}

const postCreateCake = async (req, res, next) => {
  await cakeService.postCreateCake(req);

  res.redirect('/cakes');
};

const getUpdateCake = async (req, res, next) => {
  const { cakeId } = req.params;

  const cake = await cakeService.getUpdateCake(cakeId);
  const categories = await categoryService.getCategories();

  res.render('cake/update', { title: "Product - Admin", which: 'product', cake, categories });
}

const putUpdateCake = async (req, res, next) => {
  await cakeService.putUpdateCake(req);

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