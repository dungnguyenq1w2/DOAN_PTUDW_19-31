const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  commentator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  cake: {
    type: Schema.Types.ObjectId,
    ref: 'Cake'
  },
  content: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const commentModel = mongoose.model('Comment', commentSchema, 'comments');

module.exports = commentModel;