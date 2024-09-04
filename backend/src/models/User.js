const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
    },
    msv: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', UserSchema);