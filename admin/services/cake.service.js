const cakeModel = require('../models/cake.model');
const {ITEM_PER_PAGE} = require('../bin/const');

const getRetrieveCakes = async (page) => {
  const cakes = await cakeModel
    .find({})
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);

  return cakes;
}

module.exports = {
  getRetrieveCakes
}