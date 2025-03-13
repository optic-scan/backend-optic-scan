const Pasien = require('../../../models/Pasien.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Email dan password wajib ada' });
    }

    try {
        const pasienFound = await Pasien.findOne({
            where: { email },
        });
        if (!pasienFound) {
            return res
                .status(401)
                .json({ message: 'Email atau password salah' });
        }
        const verifikasi = await bcrypt.compare(password, pasienFound.password);
        if (!verifikasi) {
            return res
                .status(401)
                .json({ message: 'Email atau password salah' });
        }

        const accessToken = jwt.sign(
            { user_id: pasienFound.pasien_id, user_type: 'pasien' },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60m' }
        );
        const refreshToken = jwt.sign(
            { user_id: pasienFound.pasien_id, user_type: 'pasien' },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        await Pasien.update(
            { refresh_token: refreshToken },
            { where: { pasien_id: pasienFound.pasien_id } }
        );

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'None',
            secure: false,
        });
        res.json({
            message: 'Login berhasil',
            user_type: 'pasien',
            accessToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = handleLogin;
