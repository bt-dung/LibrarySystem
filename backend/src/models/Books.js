const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        bookId: String,
        title: {
            type: String,
            require: true,
        },
        author: {
            type: String,
            default: ""
        },
        publish_year: {
            type: Date,
            require: true,
        },
        cover_url: {
            type: String,
            require: true,
        },

        genre: {
            type: String,
            default: "",
        },
        subcategory: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);