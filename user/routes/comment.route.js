const router = require('express').Router();

const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/comments', commentController.getRetrieveComments);

router.post('/comments',
  authMiddleware.authMiddleware,
  commentController.postCreateComments
);

module.exports = router;