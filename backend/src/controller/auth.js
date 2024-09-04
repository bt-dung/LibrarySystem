const Users = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { asyncHandler } = require('../middlewares/asyncHandler')


const registerUser = asyncHandler(async (req, res) => {
    const { username, msv, email, password } = req.body;

    if (!username || !msv || !email || !password) {
        throw new Error("Please fill all the inputs.");
    }

    const userExists = await Users.findOne({ msv });
    if (userExists) { return res.status(400).send({ message: "User already exists", success: false }) };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new Users({ username, msv, email, password: hashedPassword });

    try {
        await newUser.save();
        res.send({ message: "Create account success!!", success: true });
    } catch (error) {
        res.status(400).send({ message: "Invalid user data", success: false });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        let existingUser = await userModel.findOne({ email });

        if (!existingUser) return res.status(500).send("wrong!!");

        bcrypt.compare(password, existingUser.password, function (err, result) {
            if (result) res.status(200).send("u can login")
            else res.redirect("/login")
        })
        if (validEmail && match) {
            const token = jwt.sign(
                { id: validEmail.id, role: validEmail.role, name: validEmail.username },
                process.env.KEY_TOKEN,
                { expiresIn: "2h" }
            );
            res.cookie("token", token)
            return res.send({
                message: "đăng nhập thành công",
                success: true,
                token,
            });
        }
    } catch (error) {
        console.log(error);
        return res.send({ message: "something is wrong", success: false });

    }

});
const logoutUser = (req, res) => {
    res.clearCookie("token")
    res.send({ success: true })
}

module.exports = { registerUser, loginUser, logoutUser }