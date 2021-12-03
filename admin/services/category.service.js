const categoryModel = require('../models/category.model');

const getCategories = async () => {
  try {
    const categories = await categoryModel.find({});

    return categories;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getCategories
}