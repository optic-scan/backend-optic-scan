const { User } = require('../../models');

const getUserProfile = async (req, res) => {
    const user_id = req.user_id;

    try {
        const response = await User.findByPk(user_id, {
            attributes: ['name', 'email', 'birthdate', 'role', 'profile_pic'],
        });
        return res.status(200).json({
            message: `Data user yang login berhasil diambil`,
            data: response,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, data: null });
    }
};

const updateUserProfile = async (req, res) => {
    const user_id = req.user_id;
    const { name, email, birthdate } = req.body;

    try {
        const user = await User.findByPk(user_id);

        await user.update({
            name: name || user.name,
            email: email || user.email,
            birthdate: birthdate || user.birthdate,
        });

        return res.status(200).json({ message: 'Profil berhasil diperbarui' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat update profil',
        });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
};
