const express = require('express');
const router = express.Router();

const {
    getUserProfile,
    changePassword,
} = require('../controllers/UserController.js');

router.get('/profile', getUserProfile);
router.get('/change-password', changePassword);

module.exports = router;
