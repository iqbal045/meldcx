const response = require('./../helpers/response');

exports.files = async (req, res) => {
  try {
    console.log('file POST');
    // return response
    return response.success(res, {}, 'file POST', 200);
  } catch (err) {
    return response.error(res, err, 'Error Occurred.', err.status || 500);
  }
};

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

// delete file
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
