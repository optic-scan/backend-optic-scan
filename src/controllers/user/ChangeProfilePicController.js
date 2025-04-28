const { User } = require('../../models');
const path = require('path');
const { deleteFileIfExists } = require('../../utils/fileHelper');
const fs = require('fs').promises;

const changeProfilePic = async (req, res) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }

    if (!req.file) {
        return res.status(400).json({ message: 'File gambar tidak ditemukan' });
    }

    const user_id = req.user_id;

    try {
        const user = await User.findByPk(user_id);
        const oldProfilePic = user.profile_pic;

        if (oldProfilePic && oldProfilePic !== 'blank-profile-pic.png') {
            const oldFilePath = path.join(
                __dirname,
                '../../../public/images/profile-pics',
                oldProfilePic
            );
            await deleteFileIfExists(oldFilePath);
        }

        await user.update({ profile_pic: req.file.filename });

        return res.status(200).json({
            message: 'Foto profil berhasil diperbarui',
            file: req.file.filename,
        });
    } catch (error) {
        if (req.file) {
            const newFilePath = path.join(
                __dirname,
                '../../../public/images/profile-pics',
                req.file.filename
            );
            await deleteFileIfExists(newFilePath);
        }

        return res.status(500).json({
            message: 'Gagal memperbarui foto profil',
            error: error.message,
        });
    }
};

module.exports = changeProfilePic;
