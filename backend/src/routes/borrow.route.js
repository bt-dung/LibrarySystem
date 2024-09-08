const express = require('express');
const { borrow } = require('../controller/borrow');
const router = express.Router();

router.post('/borrow', borrow);

module.exports = router;

