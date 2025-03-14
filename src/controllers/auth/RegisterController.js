const User = require('../../models/User.js');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    const { name, email, birthdate, role, password } = req.body;
    if (!name || !email || !birthdate || !role || !password) {
        return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    const duplicate = await User.findOne({
        where: { email },
    });
    if (duplicate)
        return res.status(409).json({ message: 'Email sudah terdaftar' });

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = {
            name,
            email,
            birthdate,
            role,
            password: hashedPwd,
        };
        await User.create(newUser);
        res.status(201).json({ message: 'User baru berhasil dibuat' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = handleRegister;
