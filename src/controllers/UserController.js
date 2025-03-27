const User = require('../models/User.js');

const getUserProfile = async (req, res) => {
    const user_id = req.user_id;

    try {
        const response = await User.findByPk(user_id, {
            attributes: { include: ['name', 'email', 'birthdate', 'role'] },
        });
        res.json({
            message: `Data user yang login berhasil diambil`,
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

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
        res.json({ message: 'Password berhasil diubah' });
    } catch (error) {}
};

module.exports = {
    getUserProfile,
    changePassword,
};
