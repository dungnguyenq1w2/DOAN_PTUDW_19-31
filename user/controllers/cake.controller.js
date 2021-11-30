const cakeService = require('../services/cake.service');
const { PAGE_PER_PAGINATION } = require('../bin/const');

const getRetrieveCakes = async (req, res, next) => {
  let { page, category, search, sort } = req.query;
  let { url } = req;

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

  const { cakes, pagination } = await cakeService.getRetrieveCakes(page, category, search, sort);

  res.render('shop', {
    title: 'Shop',
    which: 'shop',
    cakes,
    pagination,
    category,
    search,
    sort,
    url
  });
};

const getRetrieveCake = async (req, res, next) => {
  const { cakeId } = req.params;

  const cake = await cakeService.getRetrieveCake(cakeId);

  res.render('viewCake', { title: 'Cakes', which: 'shop', cake });
}

module.exports = {
  getRetrieveCakes,
  getRetrieveCake
}