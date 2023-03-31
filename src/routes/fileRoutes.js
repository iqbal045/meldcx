const router = require('express').Router();
const { files, getFile, deleteFile } = require('../controllers/FileController');

router.post('/', files);
router.get('/:publicKey', getFile);
router.delete('/:privateKey', deleteFile);
module.exports = router;
