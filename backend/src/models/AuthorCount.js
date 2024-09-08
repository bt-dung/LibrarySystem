const mongoose = require('mongoose');
const User = require('./User')

const authorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    author: { type: String, required: true },
    count: { type: Number, default: 0 }
});

const AuthorCount = mongoose.model('AuthorCount', authorSchema);

module.exports = AuthorCount;