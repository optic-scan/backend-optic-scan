const User = require('../../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    generateAccessToken,
    generateRefreshToken,
} = require('../../utils/jwt.js');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Email dan password wajib ada' });
    }

    try {
        const userFound = await User.findOne({
            where: { email },
            attributes: ['user_id', 'email', 'password', 'role'],
        });
        if (!userFound) {
            return res
                .status(401)
                .json({ message: 'Email atau password salah' });
        }
        const isPasswordMatch = await bcrypt.compare(
            password,
            userFound.password
        );
        if (!isPasswordMatch) {
            return res
                .status(401)
                .json({ message: 'Email atau password salah' });
        }

        const accessToken = generateAccessToken({
            user_id: userFound.user_id,
            role: userFound.role,
        });
        const refreshToken = generateRefreshToken({
            user_id: userFound.user_id,
            role: userFound.role,
        });

        await User.update(
            { refresh_token: refreshToken },
            { where: { user_id: userFound.user_id } }
        );

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'Lax',
            secure: false,
        });
        res.json({
            message: 'Login berhasil',
            role: userFound.role,
            accessToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat login pada server',
        });
    }
};

module.exports = handleLogin;
