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

const getBookById = async (req, res) => {
  const { id: _id } = req.params
  try {
    const doc = await Book.findOne({ _id: _id })
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
  const { id: _id } = req.params
  const payload = req.body

  try {
    // const doc = await Book.findByIdAndUpdate(_id, { ...payload, _id }, { new: true })
    // res.json(doc)
    const doc = await Book.findOne({ _id: _id })
    doc.set({ ...payload }).save()
    res.json(doc)
  } catch (error) {
    res.status(404).json({ ...error })
  }
}

const deleteBook = async (req, res) => {
  const { id: _id } = req.params
  const payload = req.body

  try {
    const doc = await Book.findOne({ _id: _id })
    doc.set({ status: "inactive" }).save()
    res.json(doc)
  } catch (error) {
    res.status(404).json({ ...error })
  }
}

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
}