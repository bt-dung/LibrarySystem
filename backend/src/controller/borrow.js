const Borrow = require('../models/Borrowings')
const GenreCount = require('../models/GenreCount')
const Books = require('../models/Books')
const AuthorCount = require('../models/AuthorCount')

const insertBorrow = async (req, res) => {
    const { userId, bookId, borrowDate, returnDate } = req.body;
    const newBorrow = new Borrow({
        userId,
        bookId,
        borrowDate: borrowDate || new Date('2024-01-01'),
        returnDate: returnDate || new Date('2024-01-10')
    });
    await newBorrow.save();

    const book = await Books.findById(bookId);
    if (book) {
        const author = book.author;
        const subcategory = book.subcategory;

        await AuthorCount.findOneAndUpdate(
            { msv, author },
            { $inc: { count: 1 } },
            { upsert: true }
        );
        await GenreCount.findOneAndUpdate(
            { msv, subcategory },
            { $inc: { count: 1 } },
            { upsert: true }
        );
    }

    try {
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
module.exports = { insertBorrow }