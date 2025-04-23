const createImageUploader = require('./createImageUploader');
module.exports = createImageUploader({
    folderName: 'profile-pics',
    filePrefix: 'profile',
});
