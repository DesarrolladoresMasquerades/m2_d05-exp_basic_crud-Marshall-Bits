// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const app = require("../app")
const router = express.Router();

const Book = require("../models/Book.model")



router
  .route("/books/:id/edit")
  .get((req, res) => {
    const id = req.params.id;
    Book.findById(id).then((book) => {
      res.render("book-edit", book)
    })
  })
  .post((req, res) => {
    const id = req.params.id
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const rating = req.body.rating;
    Book.findByIdAndUpdate(
      id,
      { title, description, author, rating },
      { new: true }
    )
      .then((editedBook) => {
        res.redirect(`/books/${id}`)
      })
  });

router
  .route("/books/create")
  .get((req, res) => {
    res.render("book-create")
  })
  .post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const rating = req.body.rating;
    
    Book.create({title, author, description, rating})
    .then(()=> res.redirect("/books"))
    .catch((error) => `Error while creating a new book: ${error}`);
  })

router.get('/books/:id', (req, res) => {
  const id = req.params.id
  Book.findById(id)
    .then(book => {
      console.log(`Read this book from the DB: ${book}`);
    })
    .catch((err) => console.log("DB error reading '/books'"));
})

router.get("/books", (req, res) => {
  Book.find()
    .then((books) => {
      console.log(`Found ${books.length} books from the DB`);
      res.render("books-list", { books })
    })
    .catch(err => console.log("DBerror reading '/books'"))
})

module.exports = router;
