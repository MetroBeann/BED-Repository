const express = require("express");
const usersController = require("./controllers/usersController");
// ... other import statements
const app = express();
// ... other app setup

const staticMiddleware = express.static("public"); // Path to the public folder

// Include body-parser middleware to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

app.use(staticMiddleware); // Mount the static middleware

app.post("/users", usersController.createUser); // Create user
app.get("/users", usersController.getAllUsers); // Get all users
app.get("/users/:id", usersController.getUserById); // Get user by ID
app.put("/users/:id", usersController.updateUser); // Update user
app.delete("/users/:id", usersController.deleteUser); // Delete user
app.get("/users/search", usersController.searchUsers);
app.get("/users/with-books", usersController.getUsersWithBooks);