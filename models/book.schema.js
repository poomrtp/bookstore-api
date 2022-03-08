const mongoose = require('mongoose')
const Schema = mongoose.Schema

let bookSchema = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  nameEN: {
    type: String
  },
  author: {
    type: [String]
  },
  illustrator: {
    type: [String]
  },
  description: {
    type: String
  },
  publisher: {
    type: String
  },
  genres: {
    type: [String]
  },
  publishedAt: {
    type: Date
  },
  price: {
    type: Number
  },
  digitalPrice: {
    type: Number
  },
  weight: {
    type: Number
  },
  images: {
    type: [String]
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }
}, {
  collection: 'books'
})

module.exports = mongoose.model('Book', bookSchema)