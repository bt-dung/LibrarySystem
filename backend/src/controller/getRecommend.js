const GenreCount = require('../models/GenreCount')
const AuthorCount = require('../models/AuthorCount')
const Books = require('../models/Books')
const Borrow = require('../models/Borrow')

const getRecommend = async (req, res) => {
    const userId = req.user.userID;
    try {
        const userGenreCounts = await GenreCount.find({ user: userId }).sort({ count: -1 }).limit(2);
        const userAuthorCounts = await AuthorCount.find({ user: userId }).sort({ count: -1 }).limit(2);

        console.log('User Genre Counts:', userGenreCounts);
        console.log('User Author Counts:', userAuthorCounts);

        if (userGenreCounts.length === 0 || userAuthorCounts === 0) {
            const pipeline = [
                { $group: { _id: "$book", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 5 }
            ]
            const popurlarBooks = await Borrow.aggregate(pipeline);
            console.log("Popurlar Book: ", popurlarBooks)
            const popurlarBooksId = popurlarBooks.map(book => book._id);
            console.log('Popular Book IDs:', popurlarBooksId)
            const recommendBook = await Books.find({
                _id: { $in: popurlarBooksId }
            })

            console.log('Recommended Books (Popular):', recommendBook);
            return res.send({ data: recommendBook });
        } else {
            const genres = userGenreCounts.map(item => item.genre)
            const authors = userAuthorCounts.map(item => item.author)
            const pipeline = [
                { $group: { _id: "$book", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 2 }
            ]
            const popurlarBooks = await Borrow.aggregate(pipeline);
            const popurlarBooksId = popurlarBooks.map(book => book._id);
            const topBook = await Books.find({
                _id: { $in: popurlarBooksId }
            })

            const recommendedGenreBooks = await Books.find({
                genre: { $in: genres }
            }).limit(4);
            const recommendedAuthorBooks = await Books.find({
                author: { $in: authors }
            }).limit(4)

            const recommendBook = [...recommendedGenreBooks, ...recommendedAuthorBooks, ...topBook];
            return res.send({ data: recommendBook });
        }
    }
    catch (error) {
        console.error('Error in getRecommend:', error);
        return res.status(500).send({ message: 'Có lỗi xảy ra', success: false });
    }
}

module.exports = { getRecommend }