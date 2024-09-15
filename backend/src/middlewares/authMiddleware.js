const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.headers.authorization;
    console.log("Token:", token)
    if (token) {
        const access = token.split(" ")[1];
        jwt.verify(access, 'DungLapLanh', (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                return res.status(403).json({ message: 'Token không hợp lệ' });
            }
            else {
                req.user = decodedToken;
                next()
            }
        })
    } else res.status(401).json({ message: 'Authentication required' });
};