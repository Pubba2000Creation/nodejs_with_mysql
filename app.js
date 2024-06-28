const express = require('express'); // Import the Express library
const bodyParser = require('body-parser'); // Import body-parser to parse incoming request bodies

// Import routes from the routes directory
const postRouter = require('./routes/posts'); // Import the post routes
const userRouter = require('./routes/user'); // Import the user routes
const imageRoutes = require("./routes/images"); // Import the image routes for uploading images
const testRoutes = require('./routes/test');
const commentRouter = require('./routes/comments'); // Import the comments routes
const addressRouter = require('./routes/address')

// Create an instance of an Express application
const app = express();

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());


// Serve the uploads directory as static files
app.use('/uploads', express.static('uploads'));

// Use the imported routes for the specified URL paths
app.use("/posts", postRouter); // Routes for handling posts
app.use("/user", userRouter); // Routes for handling users
app.use("/images", imageRoutes); // Routes for handling image uploads
app.use("/test",testRoutes); // rote for handel the testing
app.use('/comments',commentRouter); // route for handeling comments
app.use('/address',addressRouter)


// Export the Express application instance to be used in other parts of the application
module.exports = app;
