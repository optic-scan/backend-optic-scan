const User = require('../../models/User');
const path = require('path');
const fs = require('fs');

const changeProfilePic = async (req, res) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }

    if (!req.file) {
        return res.status(400).json({ message: 'File gambar tidak ditemukan' });
    }

    try {
        const user_id = req.user_id;
        const user = await User.findByPk(user_id);
        const oldProfilePic = user.profile_pic;

        const oldFilePath = path.join(
            __dirname,
            '../../../public/images/profile_pics',
            oldProfilePic
        );
        if (oldProfilePic && fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
        }

        await user.update({ profile_pic: req.file.filename });

        res.status(200).json({
            message: 'Foto profil berhasil diperbarui',
            file: req.file.filename,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Gagal memperbarui foto profil',
            error: error.message,
        });
    }
};

module.exports = changeProfilePic;
