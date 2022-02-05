const express = require('express')
const bookRoute = express.Router()

const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/book.controller')

bookRoute.get('/', getBooks)
bookRoute.get('/:id', getBookById)
bookRoute.post('/create-book', createBook)
bookRoute.patch('/update-book/:id', updateBook)
bookRoute.delete('/delete-book/:id', deleteBook)

module.exports = bookRoute