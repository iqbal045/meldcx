const router = require('express').Router();
const { files, getFile, deleteFile } = require('../controllers/FileController');
const upload = require('../helpers/multer');

router.post('/', upload.single('file'), files);
router.get('/:publicKey', getFile);
router.delete('/:privateKey', deleteFile);

module.exports = router;
