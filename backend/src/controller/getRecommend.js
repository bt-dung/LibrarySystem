const GenreCount = require('../models/GenreCount')
const AuthorCount = require('../models/AuthorCount')
const Books = require('../models/Books')
const Borrow = require('../models/Borrowings')

const getRecommend = async (req, res) => {
    const id = req.params.id;
    try {
        const userGenreCounts = await GenreCount.find({ userId: id }).sort({ count: -1 }).limit(2);
        const userAuthorCounts = await AuthorCount.find({ userId: id }).sort({ count: -1 }).limit(2);
        if (userGenreCounts.length === 0 || userAuthorCounts === 0) {
            const pipeline = [
                { $group: { _id: '$bookId', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 5 }
            ]
            const popurlarBooks = await Borrow.aggregate(pipeline);
            const popurlarBooksId = popurlarBooks.map(book => book._id);
            const recommendBook = await Books.find({
                _id: { $in: popurlarBooksId }
            })
            return res.send({ data: recommendBook });
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
                    b._id.toString() === book.bookId.toString()
                ))
            );
            return res.send({ data: recommendBook });
        }
    }
    catch (error) {
        console.error('Error in getRecommend:', error);
        return res.status(500).send({ message: 'Có lỗi xảy ra', success: false });
    }
}

module.exports = { getRecommend }