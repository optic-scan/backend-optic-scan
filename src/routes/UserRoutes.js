const express = require('express');
const router = express.Router();

const { getUserProfile } = require('../controllers/UserController.js');
const changePasswordController = require('../controllers/auth/ChangePasswordController');

router.get('/profile', getUserProfile);
router.patch('/change-password', changePasswordController);

module.exports = router;
