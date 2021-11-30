const cakeService = require('../services/cake.service');

const getRetrieveCakes = async (req, res, next) => {
  const { originalUrl } = req;
  let url = originalUrl;
  let { page, search, sort } = req.query;

  if (typeof page == 'undefined') {
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

  console.log(pagination);

  res.render('cake/index', { title: "Product list", which: 'product', cakes, pagination, search, sort, url });
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