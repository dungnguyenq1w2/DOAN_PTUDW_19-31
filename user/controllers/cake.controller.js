const cakeService = require('../services/cake.service');

const getRetrieveCakes = async (req, res, next) => {
  let { page, category } = req.query;

  if (page === undefined) {
    page = 1;
  }

  const { cakes, numPages } = await cakeService.getRetrieveCakes(page, category);

  res.render('shop', { title: 'Shop', which: 'shop', cakes, numPages, page, category });
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