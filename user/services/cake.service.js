const cakeModel = require('../models/cake.model');
const { ITEM_PER_PAGE, PAGE_PER_PAGINATION } = require('../bin/const');

const getRetrieveCakes = async (page, category, search, sort) => {
  const filter = { page, isArchived: false };
  const arg = {};

  if (category !== undefined) {
    filter.category = category;
  }
  if (search !== undefined) {
    filter.$text = { $search: search };
  }
  if (sort !== undefined && sort !== 'Default sorting') {
    arg[sort] = 1;
  }

  const cakes = await cakeModel
    .find(filter)
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE)
    .sort(arg);

  const numCakes = await cakeModel
    .find(filter)
    .count();

  const numPages = Math.ceil(numCakes / ITEM_PER_PAGE);
  const orderPage = Math.ceil(page / PAGE_PER_PAGINATION);
  const maxPage = orderPage * PAGE_PER_PAGINATION;
  const unitPage = maxPage - PAGE_PER_PAGINATION;
  const endPage = (numPages < maxPage) ? numPages % PAGE_PER_PAGINATION : (maxPage - unitPage);

  const pagination = {
    order: orderPage,
    curr: parseInt(page),
    num: numPages,
    unit: unitPage,
    max: maxPage,
    end: endPage,
  };

  return { cakes, pagination };
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