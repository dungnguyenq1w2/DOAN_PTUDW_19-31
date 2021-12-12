const commentService = require('../services/comment.service');

const getRetrieveComments = async (req, res, next) => {
  let { cake: cakeId, page } = req.query;

  if (page == undefined) {
    page = 1;
  }

  const { comments, pagination } = await commentService.getRetrieveComments(cakeId, page);

  return res.status(200).json({ comments, pagination });
}

module.exports = {
  getRetrieveComments
}