const User = require('../../models/User.js');

const handleLogout = async (req, res) => {
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken) {
        return res
            .status(200)
            .json({ message: 'Tidak ada token pada cookie, sudah logout' });
    }

    try {
        const userFound = await User.findOne({
            where: { refresh_token: refreshToken },
        });
        if (!userFound) {
            res.clearCookie('jwt', {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'Lax',
                secure: false,
            });
            return res.status(200).json({
                message: 'User tidak ditemukan, cookie sudah dibersihkan',
            });
        }

        await userFound.update({ refresh_token: null });
        res.clearCookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({ message: 'Logout berhasil' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal logout' });
    }
};

module.exports = handleLogout;
