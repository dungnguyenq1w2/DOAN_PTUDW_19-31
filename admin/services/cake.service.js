const cakeModel = require('../models/cake.model');
const uploadFileHelper = require('../helpers/uploadFile.helper');
const { ITEM_PER_PAGE } = require('../bin/const');

const getRetrieveCakes = async (page) => {
  const cakes = await cakeModel
    .find({ isArchived: false })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);

  const numCakes = await cakeModel
    .find({})
    .count();

  const numPages = Math.ceil(numCakes / ITEM_PER_PAGE);
  const pages = Array.from({ length: numPages }, (_, i) => i + 1);

  return { cakes, pages };
}

const postCreateCake = async (req) => {
  const { name, introduction, description, price, category, figure } = req.body;

  const signedUrl = await uploadFileHelper(req);

  const cake = new cakeModel({
    name,
    introduction,
    description,
    price,
    category,
    figure: signedUrl
  });

  await cake.save();
}

const getUpdateCake = async (cakeId) => {
  const cake = await cakeModel.findById(cakeId);

  return cake;
}

const postUpdateCake = async (req) => {
  const { cakeId } = req.params;
  const { name, introduction, description, price, category, figure } = req.body;

  await cakeModel.findByIdAndUpdate(cakeId, { name, introduction, description, price, category, figure });

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