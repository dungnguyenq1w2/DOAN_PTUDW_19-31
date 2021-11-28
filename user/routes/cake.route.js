const router = require('express').Router();

const multer = require('multer');

const cakeController = require('../controllers/cake.controller');
// const uploadFile = require('../middlewares/uploadFile.middleware');
// const uploadFile1 = require('../helpers/uploadFile.helper');

router.get('/', cakeController.getRetrieveCakes);

router.get('/:id', (req, res, next) => {
  res.render("product", { title: "Product", shop: "true" });
});

// router.post('/', uploadFile.single('figure'),
//   (req, res) => uploadFile1(req));

const uploadFile = multer({
  storage: multer.memoryStorage()
})

router.post('/', (req) => {
  const { name } = req.body;
  console.log(name);
});

module.exports = router;