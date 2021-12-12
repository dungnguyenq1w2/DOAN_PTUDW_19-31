const commentService = require('../services/comment.service');

const getRetrieveComments = async (req, res, next) => {
  let { cake: cakeId, page } = req.query;

  if (page === undefined) {
    page = 1;
  }

  const { comments, pagination } = await commentService.getRetrieveComments(cakeId, page);

  res.status(200).json({ comments, pagination });
};

const postCreateComments = async (req, res, next) => {
  const { cake: cakeId } = req.query;
  const { _id: userId } = req.user;
  const { content } = req.body;

  const { comments, pagination } = await commentService.postCreateComment(userId, cakeId, content);

  res.status(200).json({ comments, pagination });
};

module.exports = {
  getRetrieveComments,
  postCreateComments
}