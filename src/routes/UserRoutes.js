const express = require('express');
const router = express.Router();

const { getUserProfile } = require('../controllers/UserController.js');

router.get('/profile', getUserProfile);

module.exports = router;
