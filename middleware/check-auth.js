const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
    try {
        // Ensure the Authorization header is present
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: "Authorization header missing"
            });
        }

        // Split the Authorization header and ensure it follows the correct format
        const tokenParts = req.headers.authorization.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(401).json({
                message: "Invalid Authorization header format"
            });
        }

        const token = tokenParts[1]; // Extract the token part

        // Verify the extracted token using the secret key
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails, return a 401 response with an error message
        return res.status(401).json({
            message: "Invalid or expired token provided",
            error: error.message // Include the error message for better debugging
        });
    }
}

module.exports = {
    checkAuth
};
