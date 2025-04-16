const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
        return res
            .status(401)
            .json({ message: 'Authorization header tidak ada' });

    if (!authHeader.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ message: 'Format token salah (harus Bearer)' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token akses tidak ada' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err)
            return res
                .status(403)
                .json({ message: 'Token akses tidak valid atau kadaluwarsa' });

        try {
            const userFound = await User.findByPk(decoded.user_id);
            if (!userFound) {
                return res
                    .status(401)
                    .json({ message: 'User tidak ditemukan' });
            }

            req.user_id = decoded.user_id;
            req.role = decoded.role;
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Terjadi kesalahan saat verifikasi token',
            });
        }
    });
};

module.exports = verifyJWT;
