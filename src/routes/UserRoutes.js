const express = require('express');
const router = express.Router();
const upload = require('../middleware/profilePic.js');

const {
    getUserProfile,
    updateUserProfile,
} = require('../controllers/user/UserController.js');
const changePasswordController = require('../controllers/user/ChangePasswordController');
const changeProfilePicController = require('../controllers/user/ChangeProfilePicController');
const {
    getTotalPatientsAndDoctors,
} = require('../controllers/user/statsController.js');

router.get('/profile', getUserProfile);
router.patch('/profile', updateUserProfile);
router.patch('/change-password', changePasswordController);
router.patch(
    '/change-profile-pic',
    upload.single('profile_pic'),
    changeProfilePicController
);
router.get('/users-count', getTotalPatientsAndDoctors);

module.exports = router;
