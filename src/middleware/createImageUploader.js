const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createImageUploader = ({ folderName, filePrefix, fileKey }) => {
    const uploadDir = path.join(__dirname, `../../public/images/${folderName}`);
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            const timestamp = Date.now();
            const userId = req.user_id;
            const ext = path.extname(file.originalname);
            cb(null, `${filePrefix}-${userId}-${timestamp}${ext}`);
        },
    });

    const fileFilter = (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            const errMsg = 'Hanya boleh upload gambar (jpeg, jpg, png)';
            req.fileValidationError = errMsg;
            cb(new Error(errMsg), false);
        }
    };

    return multer({
        storage,
        fileFilter,
        limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
    }).single(fileKey);
};

module.exports = createImageUploader;
