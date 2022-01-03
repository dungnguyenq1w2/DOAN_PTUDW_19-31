const cakeService = require('../services/cake.service');
const categoryService = require('../services/category.service');

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
  const categories = await categoryService.getCategories();

  res.render('shop', {
    title: 'Shop',
    which: 'shop',
    categories,
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

  const { cake, relatedProducts } = await cakeService.getRetrieveCake(cakeId);

  res.render('viewCake', { title: 'Cakes', which: 'shop', cake, relatedProducts });
}

module.exports = {
  getRetrieveCakes,
  getRetrieveCake
}