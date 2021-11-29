const cakeModel = require('../models/cake.model');
const { ITEM_PER_PAGE } = require('../bin/const');

const getRetrieveCakes = async (page, category) => {
  const filter = { page, isArchived: false };
  if (category !== undefined) {
    filter.category = category;
  }

  const cakes = await cakeModel
    .find(filter)
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);

  const numCakes = await cakeModel
    .find(filter)
    .count();

  const numPages = Math.ceil(numCakes / ITEM_PER_PAGE);

  return { cakes, numPages };
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