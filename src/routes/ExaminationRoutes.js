const express = require('express');
const router = express.Router();

const { getMyExamResult } = require('../controllers/ExaminationController.js');

router.post('/my-result', getMyExamResult);

module.exports = router;
