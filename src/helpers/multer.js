const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.env.FOLDER}`);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${file.originalname
      .replace(fileExtension, '')
      .toLowerCase()
      .split(' ')
      .join('-')}-${Date.now()}${fileExtension}`;

    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50000000, // 50MB
  },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

module.exports = upload;
