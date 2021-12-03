const router = require('express').Router();

const cakeController = require('../controllers/cake.controller');
const uploadFileMiddleware = require('../middlewares/uploadFile.middleware');

router.get('/', cakeController.getRetrieveCakes);

router.get('/create', cakeController.getCreateCake);

router.post('/create', uploadFileMiddleware.single('figure'), cakeController.postCreateCake);

router.get('/:cakeId/update', cakeController.getUpdateCake);

router.post('/:cakeId/update', uploadFileMiddleware.single('figure'), cakeController.putUpdateCake);

router.get('/:cakeId/delete', cakeController.deleteCake);

module.exports = router;