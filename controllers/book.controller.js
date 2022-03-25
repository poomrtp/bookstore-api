let mongoose = require('mongoose')
const jwtDecode = require('jwt-decode')

const Book = require('../models/book.schema')

const getBooks = async (req, res) => {
  const search = req.query.search || ''
  try {
    const doc = await Book.find({ status: "active", $or: [ 
      { name: { $regex: search, $options: 'i' } },
      { nameEN: { $regex: search, $options: 'i' } },
      { publisher: { $regex: search, $options: 'i' } }
    ]})
    res.json(doc)
  } catch (error) {
    res.status(404).json({ ...error })
  }
}

const getBookByName = async (req, res) => {
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