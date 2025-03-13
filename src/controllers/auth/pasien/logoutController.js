const Pasien = require('../../../models/Pasien.js');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res
            .status(200)
            .json({ message: 'Tidak ada token, sudah logout' });
    }

    const refreshToken = cookies.jwt;

    const pasienFound = await Pasien.findOne({
        where: { refresh_token: refreshToken },
    });
    if (!pasienFound) {
        res.clearCookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res
            .status(200)
            .json({
                message: 'User tidak ditemukan, cookie sudah dibersihkan',
            });
    }

    await pasienFound.update(
        { refresh_token: null },
        { where: { refresh_token: refreshToken } }
    );
    res.clearCookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: 'Logout berhasil' });
};

module.exports = handleLogout;
