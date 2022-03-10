let mongoose = require('mongoose')

const Book = require('../models/book.schema')

const getBooks = async (req, res) => {
  try {
    const doc = await Book.find({ status: "active" })
    res.json(doc)
  } catch (error) {
    res.status(404).json({ ...error })
  }
}

const getBookByName = async (req, res) => {
  // console.log('req.params', req.params)
  const { name: name } = req.params
  try {
    const doc = await Book.findOne({ name: name })
    res.json(doc)
  } catch (error) {
    res.status(404).json({ ...error })
  }
}

const createBook = async (req, res) => {
  const doc = new Book(req.body)
  try {
    await doc.save()
    res.json(doc)
  } catch (error) {
    res.status(404).json({ ...error })
  }
}

const updateBook = async (req, res) => {
  const { name: name } = req.params
  const payload = req.body

  try {
    const doc = await Book.findOne({ name: name })
    doc.set({ ...payload }).save()
    res.json(doc)
  } catch (error) {
    res.status(404).json({ error })
  }
}

const deleteBook = async (req, res) => {
  const { name: name } = req.params
  const payload = req.body

  try {
    const doc = await Book.findOne({ name: name })
    doc.set({ status: "inactive" }).save()
    res.json(doc)
  } catch (error) {
    res.status(404).json({ ...error })
  }
}

module.exports = {
  getBooks,
  getBookByName,
  createBook,
  updateBook,
  deleteBook
}