const cakeModel = require('../models/cake.model');
const uploadFileHelper = require('../helpers/uploadFile.helper');
const { ITEM_PER_PAGE, PAGE_PER_PAGINATION } = require('../bin/const');

const getRetrieveCakes = async (page, search, sort) => {
  const filter = { page, isArchived: false };
  const arg = {};

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

const postCreateCake = async (req) => {
  const { name, introduction, description, price, category, tags } = req.body;

  const signedUrl = await uploadFileHelper(req);
  const cleanedTag = tags.filter(tag => tag);

  const cake = new cakeModel({
    name,
    introduction,
    description,
    price,
    category,
    figure: signedUrl,
    tags: cleanedTag
  });

  await cake.save();
}

const getUpdateCake = async (cakeId) => {
  const cake = await cakeModel.findById(cakeId);

  return cake;
}

const postUpdateCake = async (req) => {
  const { cakeId } = req.params;
  const { name, introduction, description, price, category, figure, tags } = req.body;

  const cleanedTags = tags.filter(tag => tag);

  await cakeModel.findByIdAndUpdate(cakeId, {
    name,
    introduction,
    description,
    price,
    category,
    figure,
    tags: cleanedTags
  });

  if (req.file) {
    const signedUrl = await uploadFileHelper(req);

    await  cakeModel.findByIdAndUpdate(cakeId, { figure: signedUrl })
  }
}

const deleteCake = async (cakeId) => {
  await cakeModel.findByIdAndUpdate(cakeId, { isArchived: true });
}

module.exports = {
  getRetrieveCakes,
  postCreateCake,
  getUpdateCake,
  postUpdateCake,
  deleteCake
}