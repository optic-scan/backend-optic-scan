const express = require('express');
const router = express.Router();

const registerController = require('../controllers/auth/RegisterController.js');
const loginController = require('../controllers/auth/loginController.js');
const logoutController = require('../controllers/auth/logoutController.js');
const authenticatedUserController = require('../controllers/auth/AuthenticateUserController.js');

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/logout', logoutController);
router.get('/auth/me', authenticatedUserController);

module.exports = router;
