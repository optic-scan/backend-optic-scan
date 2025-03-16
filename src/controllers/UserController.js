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

module.exports = {
    getUserProfile,
};
