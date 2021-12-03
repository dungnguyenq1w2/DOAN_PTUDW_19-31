const userModel = require('../models/user.model');

const getRetrieveUserById = async (userId) => {
  const user = await userModel.findById(userId).lean();

  return user;
};

const getRetrieveUserByEmail = async (email) => {
  const user = await userModel.findOne({ email });

  return user;
};

const postSignUp = async (name, phone, email, password) => {
  try {
    const user = await userModel.findOne({ email });

    if (user) {
      throw new Error('Email already in use');
    }

    const newUser = new userModel({
      name,
      phone,
      email,
      password
    });
    const createdUser = await newUser.save();

    return createdUser;
  } catch (error) {
    return error;
  }
};

const putUpdateUser = async (userId, name, phone, email) => {
  try {
    const user = await userModel.findByIdAndUpdate(userId, { name, phone, email });

    return user;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getRetrieveUserById,
  getRetrieveUserByEmail,
  postSignUp,
  putUpdateUser
};