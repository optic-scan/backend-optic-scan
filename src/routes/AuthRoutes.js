const express = require('express');
const router = express.Router();

const registerController = require('../controllers/auth/pasien/RegisterController.js');
const loginController = require('../controllers/auth/pasien/loginController.js');
const logoutController = require('../controllers/auth/pasien/logoutController.js');

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/logout', logoutController);

module.exports = router;
