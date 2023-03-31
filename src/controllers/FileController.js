const response = require('./../helpers/response');
const cryptoJs = require('./../helpers/crypto-js');
const { File } = require('../models/File');
const fs = require('fs');

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
      fileUrl: path,
      mimeType: mimetype,
      publicKey: keyPair.publicKey,
      privateKey: keyPair.privateKey,
    });

    // save file
    await file.save();

    // return response
    return response.success(res, keyPair, 'File upload successfully.', 201);
  } catch (err) {
    return response.error(res, err, 'Error Occurred.', err.status || 500);
  }
};

// get file by public key
exports.getFile = async (req, res) => {
  try {
    // find file by public key
    const file = await File.findOne({ publicKey: req.params.publicKey });

    // check if file is present
    if (!file) {
      return response.error(res, {}, 'File not found.', 404);
    }

    // generate file url
    const fileUrl = `${req.protocol}://${req.get('host')}/${file.fileUrl}`;

    const data = {
      fileUrl,
      mimeType: file.mimeType,
    };

    // return response
    return response.success(res, data, 'File retrieve.', 200);
  } catch (err) {
    return response.error(res, err, 'Error Occurred.', err.status || 500);
  }
};

// delete file by private key
exports.deleteFile = async (req, res) => {
  try {
    // find file by public key
    const file = await File.findOne({ privateKey: req.params.privateKey });

    // check if file is present
    if (!file) {
      return response.error(res, {}, 'File not found.', 404);
    }

    // delete file from db
    await File.findByIdAndRemove(file.id);

    // delete file from storage
    await fs.unlinkSync(file.fileUrl);

    // return response
    return response.success(res, {}, 'File deleted successfully.', 200);
  } catch (err) {
    return response.error(res, err, 'Error Occurred.', err.status || 500);
  }
};
