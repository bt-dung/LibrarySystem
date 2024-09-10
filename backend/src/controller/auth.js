const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { asyncHandler } = require('../middlewares/asyncHandler')
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    console.log('JWT Secret:', process.env.JWT_SECRET);
    return jwt.sign({ id }, 'DungLapLanh', {
        expiresIn: maxAge
    })
}
const registerUser = asyncHandler(async (req, res) => {
    const { username, msv, email, password } = req.body;

    if (!username || !msv || !email || !password) {
        throw new Error("Please fill all the inputs.");
    }

    const userExists = await User.findOne({ msv });
    if (userExists) { return res.status(400).send({ message: "User already exists", success: false }) };

    const newUser = new User({ studentName: username, msv: msv, email: email, password: password });

    try {
        await newUser.save();
        const token = createToken(newUser._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        return res.status(201).json({ message: "Create account success", newUser: newUser._id, success: true });
    } catch (error) {
        console.error("Error saving user:", error);
        return res.status(400).send({ message: "Invalid user data", success: false });
    }
});
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        console.log('Set-Cookie Header:', res.getHeader('Set-Cookie'));
        return res.status(200).json({
            message: "Đăng nhập thành công",
            success: true,
            user: user._id
        });
    } catch (error) {
        return res.status(400).json({ message: "Đăng nhập thất bại", success: false, error });
    }

});
const logoutUser = (req, res) => {
    res.clearCookie("token")
    res.send({ success: true })
}

module.exports = { registerUser, loginUser, logoutUser }