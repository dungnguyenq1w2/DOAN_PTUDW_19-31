const cakeService = require('../services/cake.service');

const getRetrieveTopCakes = async (req, res, next) => {
  const { cakes } = await cakeService.getRetrieveCakes(1, undefined, undefined, undefined);

  res.render('index', { title: 'Cake', which: 'home', cakes });
}

module.exports = {
  getRetrieveTopCakes
}