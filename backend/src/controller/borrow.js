const Borrow = require('../models/Borrowings')
const GenreCount = require('../models/GenreCount')
const Books = require('../models/Books')
const AuthorCount = require('../models/AuthorCount')

const borrow = async (req, res) => {
    try {
        const { userId, bookId, borrowDate, returnDate } = req.body;
        const newBorrow = new Borrow({
            user: userId,
            book: bookId,
            borrowDate: borrowDate || new Date('2024-01-01'),
            returnDate: returnDate || new Date('2024-01-10'),
            status: 'borrowed'
        });
        await newBorrow.save();
        const book = await Books.findById(bookId);
        if (book) {
            const authorBook = book.author;
            const subcategoryBook = book.subcategory;

            await AuthorCount.findOneAndUpdate(
                { user: userId, author: authorBook },
                { $inc: { count: 1 } },
                { upsert: true }
            );
            await GenreCount.findOneAndUpdate(
                { user: userId, subcategory: subcategoryBook },
                { $inc: { count: 1 } },
                { upsert: true }
            );
        }

        res.status(201).json({
            message: 'Book borrowed successfully',
            success: true
        });
    } catch (error) {
        console.error('Error inserting borrow:', error);
        res.status(500).json({
            message: 'An error occurred while borrowing the book',
            error: error.message
        });
    }
}
module.exports = { borrow }