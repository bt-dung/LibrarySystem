const mongoose = require('mongoose')
const User = require('./User')
const Book = require('./Books')

const borrowSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books',
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
        default: new Date('2024-01-10'),
        required: true
    },
    status: {
        type: String,
        enum: ['borrowed', 'returned', 'overdue'],
        default: 'borrowed'
    }
});
module.exports = mongoose.model('Borrow', borrowSchema);
