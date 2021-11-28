const firebaseAdmin = require('firebase-admin');

const uploadFile = (req) => {
  const blob = firebaseAdmin.storage().bucket().file(req.file.originalname);

  console.log('Here');

  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimeType
    }
  })

  blobWriter.on('error', (error) => {
    console.log('Error');
  })

  blobWriter.on('finish', () => {
    console.log('Success');
  })

  blobWriter.end(req.file.buffer);
}

module.exports = uploadFile;