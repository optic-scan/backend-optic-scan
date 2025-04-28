const bcrypt = require('bcrypt');
const { User } = require('../../models');

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

        const hashedPwd = await bcrypt.hash(newPassword, 10);

        await User.update({ password: hashedPwd }, { where: { user_id } });
        return res.status(200).json({ message: 'Password berhasil diubah' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat merubah password',
        });
    }
};

module.exports = changePassword;
