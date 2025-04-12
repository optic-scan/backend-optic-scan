const express = require('express');
const router = express.Router();

const { getUserProfile } = require('../controllers/user/UserController.js');
const changePasswordController = require('../controllers/user/ChangePasswordController');

router.get('/profile', getUserProfile);
router.patch('/change-password', changePasswordController);

module.exports = router;
