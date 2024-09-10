const express = require('express')
const { getAllBooks, getSingleBook } = require('../controller/books')
const router = express.Router();
const { getRecommend } = require('../controller/getRecommend')

router.get('/allBook', getAllBooks)
    .get("/:id", getSingleBook)
    .get("/recommend/:id", getRecommend)

module.exports = router