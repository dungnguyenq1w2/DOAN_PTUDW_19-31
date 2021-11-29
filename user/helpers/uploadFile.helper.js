const firebaseAdmin = require('firebase-admin');

const uploadFile = async (req) => {
  const blob = firebaseAdmin.storage().bucket().file(req.file.originalname);

  blob.createWriteStream({
    metadata: {
      contentType: req.file.mimeType
    }
  })
    .on('error', (error) => {
      console.log(error);
    })
    .on('finish', () => {
      console.log('Success');
    })
    .end(req.file.buffer);

  const [signedUrl] = await blob.getSignedUrl({
    action: 'read',
    expires: '01-01-2100'
  });

  return signedUrl;
}

module.exports = uploadFile;