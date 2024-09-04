const express = require('express')
const connectDB = require('./database/db');
const dotenv = require('dotenv');
const app = express();
const borrowRoute = require('./routes/borrow.route')
const authRoute = require('./routes/auth.route')
const bookRoute = require('./routes/book.route')
const saveBooks = require('./data/books')
const cookieParser = require('cookie-parser')
const cors = require('cors')


app.use(cors());
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"))



// saveBooks();
app.use("/book", bookRoute);
app.use("/auth", authRoute);
app.use('/borrow', borrowRoute);

connectDB();
app.listen(PORT, () => console.log(`Server started on port:http://localhost:${PORT}`));