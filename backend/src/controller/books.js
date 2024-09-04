const Books = require('../models/Books')


const getAllBooks = async (req, res) => {
    try {
        const allBook = await Books.find();
        res.send(allBook);
    } catch (error) {
        console.log(error);
        return res.send({ message: "something is wrong", success: false });
    }
};
const getSingleBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await Books.findById(bookId);
        res.send(book);
    } catch (error) {
        console.log(error);
        return res.send({ message: "something is wrong", success: false });
    }
};

module.exports = { getAllBooks, getSingleBook }