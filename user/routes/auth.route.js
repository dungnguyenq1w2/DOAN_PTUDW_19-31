const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const passportMiddleware = require('../middlewares/passport.middleware');

router.get('/signIn', authController.getSignIn);

router.post(
  '/signIn',
  passportMiddleware.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signIn',
  })
);

router.get('/signUp', authController.getSignUp);

router.post('/signUp', authController.postSignUp);

router.get('/signOut', authController.getSignOut);

module.exports = router;
