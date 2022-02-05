let mongoose = require('mongoose')

const Book = require('../models/book.schema')

const getBook = async (req, res) => {
  try {
    await Book.find((error, data) => {
      res.json(data)
    });
  } catch (error) {
    res.status(404).json(error)
  }
}

const createBook = async (req, res) => {
  try {
    await Book.create(req.body, (data) => { 
      res.json(data)
    });
  } catch (error) {
    res.status(404).json({ ...error })
  }
}

export default {
  getBook,
  createBook
}