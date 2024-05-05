const express = require("express");
const bodyParser = require("body-parser");
const booksController = require("./controllers/booksController"); // Import controllers
const app = express();
const validateBook = require("./middlewares/validateBook");


//Configuring Middleware
app.use(bodyParser.json()); //Parse incoming JSON data in request body
app.use(bodyParser.urlencoded({ extended: true })); //for form data handling

//Define individual routes
app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);
app.post("/books", booksController.createBook); //create new data
app.put("/books/:id", booksController.updateBook); //update existing data
app.delete("/books/:id", booksController.deleteBook);

app.post("/books", validateBook, booksController.createBook); // Add validateBook before createBook
app.put("/books/:id", validateBook, booksController.updateBook); // Add validateBook before updateBook

//Define Port and Start Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})