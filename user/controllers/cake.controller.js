const cakeService = require('../services/cake.service');

const getRetrieveCakes = async (req, res, next) => {
  let { page } = req.query;

  if (typeof page == 'undefined') {
    page = 1;
  }

  const cakes = await cakeService.getRetrieveCakes(page);

  res.render('shop', { title: 'Shop', which: 'shop', cakes });
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