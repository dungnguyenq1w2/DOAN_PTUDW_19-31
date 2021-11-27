const mongoose = require('mongoose');
const { Schema } = mongoose;

const cakeSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  type: {
    type: String
  },
  figures: {
    type: [String]
  }
});

const cakeModel = mongoose.model('Cake', cakeSchema, 'cakes');

module.exports = cakeModel;