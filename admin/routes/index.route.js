const router = require('express').Router();

const cakeController = require('../controllers/cake.controller');

router.get('/', (req, res, next) => {
  res.redirect('/cakes');
});

module.exports = router;