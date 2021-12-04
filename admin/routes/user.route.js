const router = require('express').Router();

const userController = require('../controllers/user.controller');
const uploadFileMiddleware = require('../middlewares/uploadFile.middleware');

router.get('/', userController.getRetrieveUsers);

router.get('/create', userController.getCreateUser);

router.post('/create',
  uploadFileMiddleware.single('avatar'),
  userController.postCreateUser
);

router.get('/:userId/update', userController.getUpdateUser);

router.post('/:userId/update',
  uploadFileMiddleware.single('avatar'),
  userController.putUpdateUser
);

router.get('/:userId/delete', userController.deleteUser);

module.exports = router;
