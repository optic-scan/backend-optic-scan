const createImageUploader = require('./createImageUploader');
const multer = require('multer');
const eyePicUpload = createImageUploader({
    folderName: 'eye-scans',
    filePrefix: 'eye',
    fileKey: 'eye_pic',
});

module.exports = (req, res, next) => {
    eyePicUpload(req, res, function (err) {
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
