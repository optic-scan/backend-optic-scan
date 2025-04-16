const { User } = require('../../models');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    const { name, email, birthdate, role, password } = req.body;
    if (!name || !email || !birthdate || !role || !password) {
        return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    if (role !== 'pasien' && role !== 'dokter') {
        return res.status(400).json({ message: 'Role tidak valid' });
    }

    const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isEmail(email)) {
        return res.status(400).json({ message: 'Format email tidak valid' });
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
            profile_pic: 'blank-profile-pic.png',
            refresh_token: null,
        };
        await User.create(newUser);
        res.status(201).json({ message: 'User baru berhasil dibuat' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = handleRegister;
