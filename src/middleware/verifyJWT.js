const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
        return res
            .status(401)
            .json({ message: 'Authorization header tidak ada' });

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token tidak ada' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res
                .status(403)
                .json({ message: 'Token tidak valid atau kadaluarsa' });
        req.user_id = decoded.user_id;
        req.user_type = decoded.type;
        next();
    });
};

module.exports = verifyJWT;
