const cakeService = require('../services/cake.service');

const getRetrieveCakes = async (req, res, next) => {
  let { page } = req.query;

  if (typeof page == 'undefined') {
    page = 1;
  }

  const cakes = await cakeService.getRetrieveCakes(page);

  res.render('cakes', { title: 'Shop', shop: 'true', cakes });
};

module.exports = {
  getRetrieveCakes
}