const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/signIn', function(req, res, next) {
  res.render('user/signIn');
});

router.get('/signUp', (req, res, next) => {
  res.render('user/signUp');
})

module.exports = router;
