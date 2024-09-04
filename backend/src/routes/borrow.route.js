const express = require('express');
const insertBorrow = require('../controller/borrow');
const router = express.Router();

router.post('/insertBorrow', insertBorrow);

module.exports = router

