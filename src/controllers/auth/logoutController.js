const User = require('../../models/User.js');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res
            .status(200)
            .json({ message: 'Tidak ada token pada cookie, sudah logout' });
    }

    const refreshToken = cookies.jwt;

    const userFound = await User.findOne({
        where: { refresh_token: refreshToken },
    });
    if (!userFound) {
        res.clearCookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            message: 'User tidak ditemukan, cookie sudah dibersihkan',
        });
    }

    await userFound.update(
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
