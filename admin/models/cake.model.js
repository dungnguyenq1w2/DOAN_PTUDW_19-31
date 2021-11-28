const mongoose = require('mongoose');
const { Schema } = mongoose;

const cakeSchema = new Schema({
  name: {
    type: String
  },
  introduction: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: String
  },
  tags: {
    type: [String]
  },
  figure: {
    type: String
  },
  isArchived: {
    type: Boolean,
    default: false
  }
});

const cakeModel = mongoose.model('Cake', cakeSchema, 'cakes');

module.exports = cakeModel;