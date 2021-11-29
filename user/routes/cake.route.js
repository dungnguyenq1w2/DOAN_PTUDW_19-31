const router = require('express').Router();

const cakeController = require('../controllers/cake.controller');

router.get('/shop', cakeController.getRetrieveCakes);

router.get('/cakes/:cakeId', cakeController.getRetrieveCake);

module.exports = router;