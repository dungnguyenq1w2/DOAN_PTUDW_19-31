const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
  roles: {
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
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

userSchema.pre('save', async function(next) {
  const user = this;

  if (!user.isModified('password'))
    return next();

  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);

    return isMatch;
  } catch (error) {
    return error;
  }
};

userSchema.index({ name: 'text' });

const userModel = mongoose.model('User', userSchema, 'users');

module.exports = userModel;