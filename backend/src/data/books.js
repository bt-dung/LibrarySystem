const fs = require('fs');
const path = require('path')
const filePath = path.join(__dirname, "../public/books.json")
const Book = require('../models/Books');
const saveBooks = async () => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const listData = data.data
        console.log(typeof (data.data))
        for (let i in listData) {
            console.log(listData[i]);

            const dataBook = await Book.create(listData[i]);
        }
        console.log('Books have been succcessfully!!!!')
    } catch (error) {
        console.error('Error saving books', error)
    }
}
module.exports = saveBooks;