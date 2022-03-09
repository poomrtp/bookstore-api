const express = require('express')
const bookRoute = express.Router()

const { getBooks, getBookByName, createBook, updateBook, deleteBook } = require('../controllers/book.controller')

bookRoute.get('/', getBooks)
bookRoute.get('/:name', getBookByName)
bookRoute.post('/create-book', createBook)
bookRoute.patch('/update-book/:name', updateBook)
bookRoute.delete('/delete-book/:name', deleteBook)

module.exports = bookRoute