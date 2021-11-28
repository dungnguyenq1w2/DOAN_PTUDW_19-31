const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  avatar: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: [String]
  },
  state: {
    value: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'inactive'
    },
    token: {
      type: String,
      default: null
    },
    generatedAt: {
      type: Date,
      default: null
    }
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

const userModel = mongoose.model('User', userSchema, 'users');

module.exports = userModel;