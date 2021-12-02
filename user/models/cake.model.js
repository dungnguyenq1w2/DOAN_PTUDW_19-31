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
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  sku: {
    type: Number,
    default: 1
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

cakeSchema.index({ name: 'text' });

const cakeModel = mongoose.model('Cake', cakeSchema, 'cakes');

module.exports = cakeModel;