const jwt = require('jsonwebtoken');
const { User } = require('../../models');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt)
        return res.status(401).json({ message: 'Token refresh tidak ada' });

    const refreshToken = cookies.jwt;

    try {
        const userFound = await User.findOne({
            where: { refresh_token: refreshToken },
        });

        if (!userFound)
            return res
                .status(403)
                .json({ message: 'Akses ditolak. Silakan login kembali.' });

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || decoded.user_id !== userFound.user_id)
                    return res.status(403).json({
                        message: 'Token tidak valid. Silakan login kembali',
                    });

                const accessToken = jwt.sign(
                    { user_id: decoded.user_id, role: decoded.role },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '60m' }
                );

                return res.status(200).json({
                    message: 'Access token terbaru berhasil dibuat',
                    accessToken,
                });
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Gagal memperbarui token' });
    }
};

module.exports = handleRefreshToken;
