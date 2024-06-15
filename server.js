// Import the built-in 'http' module from Node.js
const http = require('http');

// Define the port number that the server will listen on
const port = 3000;

// Import the Express application instance from the 'app.js' file
const app = require('./app');

// Create an HTTP server using the Express application
const server = http.createServer(app);

// Start the server and have it listen on the specified port
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
