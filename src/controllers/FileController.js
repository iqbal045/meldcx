const response = require('./../helpers/response');
const cryptoJs = require('./../helpers/crypto-js');
const { File } = require('../models/File');

// create file
exports.files = async (req, res) => {
  try {
    // check if file is present
    if (!req.file) {
      return response.error(res, {}, 'File required.', 400);
    }

    const { path, mimetype } = req.file;

    // generate public, private key pair
    const keyPair = await cryptoJs.generateKeyPair();

    const file = new File({
      fileUrl: '/' + path,
      mimeType: mimetype,
      publicKey: keyPair.publicKey,
      privateKey: keyPair.privateKey,
    });

    // save file
    await file.save();

    // generate file url
    file.fileUrl = `${req.protocol}://${req.get('host')}${file.fileUrl}`;

    // return response
    return response.success(res, file, 'File upload successfully.', 201);
  } catch (err) {
    return response.error(res, err, 'Error Occurred.', err.status || 500);
  }
};

// get file by public key
exports.getFile = async (req, res) => {
  try {
    console.log(req.params.publicKey);
    // return response
    return response.success(
      res,
      { key: req.params.publicKey },
      'file getFile',
      200,
    );
  } catch (err) {
    return response.error(res, err, 'Error Occurred.', err.status || 500);
  }
};

// delete file by private key
exports.deleteFile = async (req, res) => {
  try {
    console.log(req.params.privateKey);
    // return response
    return response.success(
      res,
      { key: req.params.privateKey },
      'file deleteFile',
      200,
    );
  } catch (err) {
    return response.error(res, err, 'Error Occurred.', err.status || 500);
  }
};
