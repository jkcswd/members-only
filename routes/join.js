var express = require('express');
var router = express.Router();
const join = require('../controllers/joinController')

router.get('/', join.joinGet);
router.post('/', join.joinPost);

module.exports = router;
