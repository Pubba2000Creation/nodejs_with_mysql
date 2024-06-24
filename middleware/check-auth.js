const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken library

// Middleware function to check for a valid JWT token in the request
function checkAuth(req, res, next) {
    try {
        // Extract the token from the Authorization header
        // The header is expected to be in the format "Bearer <token>"
        const token = req.headers.authorization.split(" ")[1]; // Extract the token part after "Bearer"
        
        // Verify the extracted token using the secret key
        // If the token is valid, decode it and assign the decoded data to req.userData
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;
        
        // Call the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails, return a 401 response with an error message
        return res.status(401).json({
            message: "Invalid or expired token is provided",
            error: error
        });


      
        
    }
}

module.exports = {
    // Exporting the checkAuth function for use in other parts of the application
    checkAuth:checkAuth
 } 
