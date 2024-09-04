const mongoose = require('mongoose');
const User = require('./User')

const genreCountSchema = new mongoose.Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subcategory: { type: String, required: true },
    count: { type: Number, default: 0 }
});

const GenreCount = mongoose.model('GenreCount', genreCountSchema);

module.exports = GenreCount;