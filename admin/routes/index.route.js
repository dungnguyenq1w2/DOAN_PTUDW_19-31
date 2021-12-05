const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const passportMiddleware = require('../middlewares/passport.middleware');

router.get('/',
  authMiddleware.guestMiddleware,
  authController.getIndex
);

router.get('/signIn',
  authMiddleware.guestMiddleware,
  authController.getSignIn
);

router.post('/signIn',
  authMiddleware.guestMiddleware,
  passportMiddleware.authenticate('local', {
    successRedirect: '/cakes',
    failureRedirect: '/signIn',
  })
);

router.get('/signOut',
  authMiddleware.adminMiddleware,
  authController.getSignOut
);

module.exports = router;