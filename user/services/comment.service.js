const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const userModel = require('../models/user.model');
const cakeModel = require('../models/cake.model');
const commentModel = require('../models/comment.model');
const paginationHelper = require('../helpers/pagination.helper');
const { ITEM_PER_PAGE } = require('../bin/const');

const getRetrieveComments = async (cakeId, page) => {
  const pipeline = [];

  pipeline.push(
    {
      '$match': { 'cake': ObjectId(cakeId) }
    },
    {
      '$lookup': {
        from: 'users',
        localField: 'commentator',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      '$unwind': '$user'
    },
    {
      '$project': {
        '_id': 1,
        'content': 1,
        'createdAt': 1,
        'commentator': 1,
        'user.name': 1,
        'user.avatar': 1
      }
    },
    {
      '$sort': {
        'createdAt': -1
      }
    }
  );

  const comments = await commentModel
    .aggregate(pipeline)
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);

  pipeline.push({
    '$count': 'numComments'
  });

  let numComments;
  try {
    [ { numComments } ] = await commentModel.aggregate(pipeline);
  } catch (error) {
    numComments = 0;
  }

  const pagination = paginationHelper(numComments, page);

  return { comments, pagination };
};

module.exports = {
  getRetrieveComments
};