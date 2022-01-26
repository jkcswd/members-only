const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController')

router.get('/', messageController.messageGet);
router.post('/', messageController.messagePost);

module.exports = router;
