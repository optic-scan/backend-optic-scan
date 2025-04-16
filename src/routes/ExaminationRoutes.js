const express = require('express');
const router = express.Router();
const upload = require('../middleware/eyePic.js');

const {
    getExamResult,
    submitExam,
} = require('../controllers/exam/ExaminationController.js');

router.get('/my-result', getExamResult);
router.post('/submit-exam', upload.single('eye_pic'), submitExam);

module.exports = router;
