const cakeModel = require('../models/cake.model');
const categoryModel = require('../models/category.model');

const { ITEM_PER_PAGE, PAGE_PER_PAGINATION } = require('../bin/const');
const paginationHelper = require("../helpers/pagination.helper");


const getRetrieveCakes = async (page, category, search, sort) => {
  const pipeline = [];

  if (search !== undefined) {
    pipeline.push({
      '$match': {
        '$text': {
          '$search': search
        }
      }
    });
  }

  pipeline.push(
    {
      '$match': { 'isArchived': false }
    },
    {
      '$lookup': {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category'
    }
    },
    { '$unwind': '$category' }
  );

  if (category !== undefined) {
    pipeline.push({
      '$match': { 'category.name': category }
    });
  }

  if (sort !== undefined && sort !== 'Default sorting') {
    pipeline.push({
      '$sort': { [sort]: 1 }
    })
  }

  const cakes = await cakeModel
    .aggregate(pipeline)
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);

  pipeline.push({
    '$count': 'numCakes'
  })

  let numCakes;
  try {
    [ { numCakes } ] = await cakeModel.aggregate(pipeline);
  } catch (error) {
    numCakes = 0;
  }

  const pagination = paginationHelper(numCakes, page);

  return { cakes, pagination };
}

const getRetrieveCake = async (cakeId) => {
  const cake = await cakeModel
    .findOne({ _id: cakeId, isArchived: false })
    .populate('category', 'name');

  return cake;
}

module.exports = {
  getRetrieveCakes,
  getRetrieveCake
}