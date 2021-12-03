const userModel = require('../models/user.model');

const paginationHelper = require('../helpers/pagination.helper');

const { ITEM_PER_PAGE } = require('../bin/const');

const getRetrieveUsers = async (page, search, sort) => {
  const pipeline = [];

  if (search !== undefined) {
    pipeline.push({
      '$match': {
        '$text': {
          '$search': search
        }
      }
    });
  }

  if (sort !== undefined && sort !== 'Default sorting') {
    pipeline.push({
      '$sort': { [sort]: 1 }
    })
  }

  let users;
  try {
    users = await userModel
      .aggregate(pipeline)
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);
  } catch (error) {
    console.log(error);
    users = [];
  }

  pipeline.push({
    '$count': 'numUsers'
  })

  let numUsers;
  try {
    [ { numUsers } ] = await userModel.aggregate(pipeline);
  } catch (error) {
    console.log(error);
    numUsers = 0;
  }

  const pagination = paginationHelper(numUsers, page);

  return { users, pagination };
};

const getRetrieveUserById = async (userId) => {
  try {
    const user = await userModel.findById(userId);

    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteUser = async (userId) => {
  try {
    await userModel.findByIdAndUpdate(userId, { 'state.value': 'deleted' });
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  getRetrieveUsers,
  getRetrieveUserById,
  deleteUser
}