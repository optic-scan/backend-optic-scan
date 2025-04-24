const createImageUploader = require('./createImageUploader');
const multer = require('multer');
const profilePicUpload = createImageUploader({
    folderName: 'profile-pics',
    filePrefix: 'profile',
    fileKey: 'profile_pic',
});

const handleEyePicUpload = (req, res, next) => {
    profilePicUpload(req, res, function (err) {
        if (
            err instanceof multer.MulterError &&
            err.code == 'LIMIT_FILE_SIZE'
        ) {
            return res
                .status(400)
                .json({ message: 'Ukuran file terlalu besar' });
        }

        // No error
        next();
    });
};

module.exports = handleEyePicUpload;
