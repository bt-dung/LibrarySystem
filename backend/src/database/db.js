const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://buitiendung687:librarydb@library.8xfu7.mongodb.net/?retryWrites=true&w=majority&appName=Library');
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;