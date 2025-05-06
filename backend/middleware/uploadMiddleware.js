const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory to save the uploaded files
    },
    filename: function (req, file, cb) {
       cb(null, Date.now() + '-' + file.originalname); // Append the current timestamp to the original filename
    }
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false); // Reject the file
    }

};
const upload = multer({ 
    storage, fileFilter }); // 'profileImage' is the name of the field in the form


module.exports = upload; // Export the middleware to be used in routes