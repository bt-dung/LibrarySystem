const express = require('express');
const auth = require('../middlewares/authMiddleware')
const { borrow } = require('../controller/borrow');
const router = express.Router();

router.patch('/borrow', auth, borrow);

module.exports = router;

