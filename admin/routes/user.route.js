const router = require('express').Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const uploadFileMiddleware = require('../middlewares/uploadFile.middleware');

router.get('/',
  authMiddleware.adminMiddleware,
  userController.getRetrieveUsers
);

router.get('/create',
  authMiddleware.adminMiddleware,
  userController.getCreateUser
);

router.post('/create',
  authMiddleware.adminMiddleware,
  uploadFileMiddleware.single('avatar'),
  userController.postCreateUser
);

router.get('/:userId/update',
  authMiddleware.adminMiddleware,
  userController.getUpdateUser
);

router.post('/:userId/update',
  authMiddleware.adminMiddleware,
  uploadFileMiddleware.single('avatar'),
  userController.putUpdateUser
);

router.get('/:userId/delete',
  authMiddleware.adminMiddleware,
  userController.deleteUser
);

router.put('/:userId/lock',
  authMiddleware.adminMiddleware,
  userController.putLockUser
);

module.exports = router;
