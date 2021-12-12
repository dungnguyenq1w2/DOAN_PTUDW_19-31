const router = require('express').Router();

const commentController = require('../controllers/comment.controller');

router.get('/comments', commentController.getRetrieveComments);

module.exports = router;