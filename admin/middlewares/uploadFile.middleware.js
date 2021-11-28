const multer = require('multer');

const uploadFile = multer({
  storage: multer.memoryStorage()
})

module.exports = uploadFile;