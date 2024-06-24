const multer = require("multer"); // Importing multer for handling file uploads
const path = require("path"); // Importing path to work with file and directory paths

// Configuring the storage settings for multer
const storage = multer.diskStorage({

    // Setting the destination folder for uploaded files
    destination: function(req, file, callback) {

        callback(null, './uploads'); // All uploaded files will be saved in the 'uploads' directory
    },

    // Setting the filename for uploaded files
    filename: function(req, file, callback) {

        // Creating a unique filename by appending the current timestamp to the original file extension
        callback(null, new Date().getTime() + path.extname(file.originalname));
    }
});

// File filter to accept only image files (JPEG and PNG)
const fileFilter = (req, file, callback) => {

    // Checking the file's MIME type to ensure it's an image
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {

        callback(null, true); // Accept the file
        
    } else {

        // Reject the file and pass an error message
        callback(new Error('Unsupported file format. Only JPEG and PNG are allowed.'), false);
    }
}

// Configuring multer with storage settings, file size limit, and file filter
const upload = multer({

    storage: storage, // Using the configured storage settings

    limits: {
        fileSize: 1024 * 1024 * 20 // Limiting the file size to 20MB
    },

    fileFilter: fileFilter // Using the configured file filter

});

// Exporting the upload function for use in other parts of the application
module.exports = {

    upload: upload
    
}
