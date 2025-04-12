const User = require('../../models/User.js');
const bcrypt = require('bcrypt');

const changePassword = async (req, res) => {
    const user_id = req.user_id;

    const { oldPassword, newPassword } = req.body;
    try {
        const userFound = await User.findByPk(user_id);
        if (!userFound) {
            return res.status(401).json({ message: 'User tidak ditemukan' });
        }
        const verifikasi = await bcrypt.compare(
            oldPassword,
            userFound.password
        );
        if (!verifikasi) {
            return res.status(401).json({ message: 'Password lama salah' });
        }

        await User.update({ password: newPassword }, { where: { user_id } });
        return res.json({ message: 'Password berhasil diubah' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat merubah password',
        });
    }
};

module.exports = changePassword;
