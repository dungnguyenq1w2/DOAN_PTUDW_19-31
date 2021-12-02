const cakeService = require('../services/cake.service');
const categoryService = require('../services/category.service');

const getRetrieveTopCakes = async (req, res, next) => {
  const { cakes } = await cakeService.getRetrieveCakes(1, undefined, undefined, undefined);
  const categories = await categoryService.getCategories();

  res.render('index', { title: 'Cake', which: 'home', cakes, categories });
}

module.exports = {
  getRetrieveTopCakes
}