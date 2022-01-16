const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const passportMiddleware = require('../middlewares/passport.middleware');
const uploadFileMiddleware = require('../middlewares/uploadFile.middleware');

router.get('/signIn', authController.getSignIn);

router.post(
  '/signIn',
  authMiddleware.guestMiddleware,
  passportMiddleware.authenticate('local', { failureRedirect: '/signIn' }),
  authController.postSignIn
);

router.get('/signUp', authMiddleware.guestMiddleware, authController.getSignUp);

router.post('/signUp', authMiddleware.guestMiddleware, authController.postSignUp);

router.get('/forgetAccount', authMiddleware.guestMiddleware, authController.getForgetAccount);

router.post('/forgetAccount', authMiddleware.guestMiddleware, authController.postForgetAccount);

router.get('/signOut', authMiddleware.authMiddleware, authController.getSignOut);

router.get('/users/:userId', authMiddleware.authMiddleware, authController.getRetrieveUser);

router.get('/users/:userId/update', authMiddleware.authMiddleware, authController.getUpdateUser);

router.post(
  '/users/:userId/update',
  authMiddleware.authMiddleware,
  uploadFileMiddleware.single('avatar'),
  authController.putUpdateUser
);

module.exports = router;
