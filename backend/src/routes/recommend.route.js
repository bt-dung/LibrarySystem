const express = require('express')
const router = express.Router();
const { getRecommend } = require('../controller/getRecommend')
const auth = require('../middlewares/authMiddleware');

router.get('/recommend', auth, getRecommend);

module.exports = router