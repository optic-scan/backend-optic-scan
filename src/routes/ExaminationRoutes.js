const express = require('express');
const router = express.Router();
const upload = require('../middleware/eyePic.js');

const {
    getExamResult,
    submitExam,
    diagnosisDokter,
} = require('../controllers/exam/ExaminationController.js');

router.get('/my-result', getExamResult);
router.post('/submit-exam', upload.single('eye_pic'), submitExam);
router.post('/diagnosis-dokter', diagnosisDokter);

module.exports = router;
