const userModel = require('../models/user.model');

const getRetrieveUserById = async (userId) => {
  const user = await userModel.findById(userId).lean();

  return user;
};

const getRetrieveUserByEmail = async (email) => {
  const user = await userModel.findOne({ email });

  return user;
}

module.exports = {
  getRetrieveUserById,
  getRetrieveUserByEmail
};