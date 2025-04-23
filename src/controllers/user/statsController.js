const { User } = require('../../models');

const getTotalPatientsAndDoctors = async (req, res) => {
    try {
        const totalPatients = await User.count({ where: { role: 'pasien' } });
        const totalDoctors = await User.count({ where: { role: 'dokter' } });

        res.status(200).json({
            message: 'Berhasil mengambil data total pasien dan dokter',
            data: {
                total_pasien: totalPatients,
                total_dokter: totalDoctors,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Gagal mengambil data total pasien dan dokter',
            error: error.message,
        });
    }
};

module.exports = {
    getTotalPatientsAndDoctors,
};
