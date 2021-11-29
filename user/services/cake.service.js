const cakeModel = require('../models/cake.model');
const { ITEM_PER_PAGE } = require('../bin/const');

const getRetrieveCakes = async (page) => {
  const cakes = await cakeModel
    .find({ isArchived: false })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);

  return cakes;
}

const getRetrieveCake = async (cakeId) => {
  const cake = await cakeModel
    .findOne({ _id: cakeId, isArchived: false });

  return cake;
}

module.exports = {
  getRetrieveCakes,
  getRetrieveCake
}