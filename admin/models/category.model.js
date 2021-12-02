const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String
  },
  figure: {
    type: String
  }
});

const categoryModel = mongoose.model('Category', categorySchema, 'categories');

module.exports = categoryModel;