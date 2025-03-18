const User = require('../models/User.js');
const Examination = require('../models/Examination.js');

const getMyExamResult = async (req, res) => {
    const user_id = req.user_id;

    try {
        const response = await Examination.findAll({
            where: { patient_id: user_id },
        });
        res.json({
            message: `Data hasil pemeriksaan login berhasil diambil`,
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    getMyExamResult,
};
