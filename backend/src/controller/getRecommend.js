const GenreCount = require('../models/GenreCount')
const AuthorCount = require('../models/AuthorCount')
const Books = require('../models/Books')
const Borrow = require('../models/Borrowings')

const getRecommend = async (req, res) => {
    const msv = req.params.msv;
    const userGenreCounts = await GenreCount.find({ msv }).sort({ count: -1 }).limit(2);
    const userAuthorCounts = await AuthorCount.find({ msv }).sort({ count: -1 }).limit(2);
    if (userGenreCounts.length === 0 || userAuthorCounts === 0) {
        const pipeline = [
            { $group: { bookId: '$bookId', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]
        const popurlarBooks = await Borrow.aggregate(pipeline);
        const popurlarBooksId = popurlarBooks.map(book => book.bookId);
        const recommendBook = await Books.find({
            bookId: { $in: popurlarBooksId }
        })
        res.send(recommendBook)
    } else {
        const recommendedGenreBooks = await Books.find({
            genre: { $in: userGenreCounts.map(count => count.genre) }
        }).limit(4);
        const recommendedAuthorBooks = await Books.find({
            author: { $in: userAuthorCounts.map(count => count.author) }
        }).limit(4)

        const combinedBooks = [...recommendedGenreBooks, ...recommendedAuthorBooks];
        const recommendBook = combinedBooks.filter((book, index, self) =>
            index === self.findIndex((b) => (
                b.bookId.toString() === book.bookId.toString()
            ))
        );
        res.send(recommendBook)
    }
}

module.exports = { getRecommend }