const router = require('express').Router();

const cakeController = require('../controllers/cake.controller');

const uploadFileMiddleware = require('../middlewares/uploadFile.middleware');

router.get('/', cakeController.getRetrieveCakes);

router.get('/create', cakeController.getCreateCake);

router.post('/create', uploadFileMiddleware.single('figure'), cakeController.postCreateCake);

router.get('/:id/update', cakeController.getUpdateCake);

router.put('/:id/update', cakeController.putUpdateCake);

router.delete('/:id/delete', cakeController.deleteCake);

module.exports = router;

