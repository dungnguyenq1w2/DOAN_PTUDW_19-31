const router = require('express').Router();

const cakeController = require('../controllers/cake.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const uploadFileMiddleware = require('../middlewares/uploadFile.middleware');

router.get('/',
  authMiddleware.adminMiddleware,
  cakeController.getRetrieveCakes
);

router.get('/create',
  authMiddleware.adminMiddleware,
  cakeController.getCreateCake
);

router.post('/create',
  authMiddleware.adminMiddleware,
  uploadFileMiddleware.single('figure'),
  cakeController.postCreateCake
);

router.get('/:cakeId/update',
  authMiddleware.adminMiddleware,
  cakeController.getUpdateCake
);

router.post('/:cakeId/update',
  authMiddleware.adminMiddleware,
  uploadFileMiddleware.single('figure'),
  cakeController.putUpdateCake
);

router.get('/:cakeId/delete',
  authMiddleware.adminMiddleware,
  cakeController.deleteCake
);

module.exports = router;