const cakeModel = require('../models/cake.model');
const categoryModel = require('../models/category.model');
const uploadFileHelper = require('../helpers/uploadFile.helper');
const paginationHelper = require('../helpers/pagination.helper');
const { ITEM_PER_PAGE } = require('../bin/const');

const getRetrieveCakes = async (page, search, sort) => {
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
};

const postCreateCake = async (req) => {
  const { name, introduction, description, price, category, tags } = req.body;

  const { _id: categoryId } = await categoryModel.findOne({ name: category });
  const signedUrl = await uploadFileHelper(req);
  const cleanedTag = tags.filter(tag => tag);

  const cake = new cakeModel({
    name,
    introduction,
    description,
    price,
    category: categoryId,
    figure: signedUrl,
    tags: cleanedTag
  });

  try {
    await cake.save();
  } catch (error) {
    return error;
  }
};

const getUpdateCake = async (cakeId) => {
  const cake = await cakeModel
    .findById(cakeId)
    .populate('category', 'name');

  return cake;
};

const putUpdateCake = async (req) => {
  const { cakeId } = req.params;
  const { name, introduction, description, price, category, figure, tags } = req.body;

  const { _id: categoryId } = await categoryModel.findOne({ name: category });
  const cleanedTags = tags.filter(tag => tag);

  await cakeModel.findByIdAndUpdate(cakeId, {
    name,
    introduction,
    description,
    price,
    category: categoryId,
    figure,
    tags: cleanedTags
  });

  if (req.file) {
    const signedUrl = await uploadFileHelper(req);

    await  cakeModel.findByIdAndUpdate(cakeId, { figure: signedUrl });
  }
};

const deleteCake = async (cakeId) => {
  await cakeModel.findByIdAndUpdate(cakeId, { isArchived: true });
};

module.exports = {
  getRetrieveCakes,
  postCreateCake,
  getUpdateCake,
  putUpdateCake,
  deleteCake
};