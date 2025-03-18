const express = require('express');
const router = express.Router();

const registerController = require('../controllers/auth/RegisterController.js');
const loginController = require('../controllers/auth/LoginController.js');
const logoutController = require('../controllers/auth/LogoutController.js');
const authenticatedUserController = require('../controllers/auth/AuthenticateUserController.js');

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/logout', logoutController);
router.get('/auth/me', authenticatedUserController);

module.exports = router;
