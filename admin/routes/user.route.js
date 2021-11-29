const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('user/index', { title: 'Users List - Admin', which: 'user' });
});

router.get('/:id/update', (req, res, next) => {
  res.render('user/update', { title: 'User - Admin', which: 'user' });
});

module.exports = router;
