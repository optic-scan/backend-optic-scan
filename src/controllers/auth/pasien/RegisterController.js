const Pasien = require('../../../models/Pasien.js');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    const { name, email, birthdate, password } = req.body;
    if (!name || !email || !birthdate || !password) {
        return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    const duplicate = await Pasien.findOne({
        where: { email },
    });
    if (duplicate)
        return res.status(409).json({ message: 'Email sudah terdaftar' });

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const newPasien = {
            name,
            email,
            birthdate,
            password: hashedPwd,
        };
        await Pasien.create(newPasien);
        res.status(201).json({ message: 'User Pasien berhasil dibuat' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = handleRegister;
