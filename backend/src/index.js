const express = require('express')
const connectDB = require('./database/db');
const dotenv = require('dotenv');
const app = express();
const recommendRoute = require('./routes/recommend.route')
const borrowRoute = require('./routes/borrow.route')
const authRoute = require('./routes/auth.route')
const bookRoute = require('./routes/book.route')
const saveBooks = require('./data/books')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const requireAuth = require('./middlewares/authMiddleware')


app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST,GET,PUT,DELETE,PATCH"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
dotenv.config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"))



// saveBooks();
app.use("/api/v1", bookRoute);
app.use("/api/v1", authRoute);
app.use('/api/v1', borrowRoute);
app.use('/api/v1', recommendRoute);

connectDB();
app.listen(PORT, () => console.log(`Server started on port:http://localhost:${PORT}`));