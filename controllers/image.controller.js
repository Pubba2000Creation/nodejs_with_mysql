// Function to handle image upload
function upload(req, res) {
    // Check if the file was successfully uploaded and has a filename
    if (req.file && req.file.filename) {
        // Respond with success message and the filename of the uploaded image
        res.status(200).json({
            message: "Image uploaded successfully",
            url: req.file.filename // Returning the filename as the URL
        });
    } else {
        // Respond with an error message if the upload failed
        res.status(500).json({
            message: "Image upload went wrong!"
        });
    }
}

// Export the upload function to be used in routes
module.exports = {
    upload: upload
};
