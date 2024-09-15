const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controller/auth')
const router = express.Router();

router.post("/login", loginUser)
    .post("/register", registerUser)
    .post('/logout', logoutUser);
module.exports = router;