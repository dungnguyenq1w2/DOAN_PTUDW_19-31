const userModel = require('../models/user.model');

const uploadFileHelper = require('../helpers/uploadFile.helper');
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

const postCreateUser = async (req) => {
  const { phone, password, name, state, role, email } = req.body;

  try {
    const { _id: userId } = await userModel.create({
      name,
      phone,
      email,
      password,
      roles: [role],
      'state.value': state,
    });

    if (req.file) {
      const signedUrl = await uploadFileHelper(req);

      await userModel.findByIdAndUpdate(userId, { avatar: signedUrl });
    }

    return userId;
  } catch (error) {
    console.log(error);
    return error;
  }
}

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
  postCreateUser,
  deleteUser
}