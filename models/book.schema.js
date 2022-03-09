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
  category: {
    type: String
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
  types: [
    {
      name: String,
      nameTH: String,
      price: Number
    }
  ],
  weight: {
    type: Number
  },
  images: {
    type: [String]
  },
  quantity: {
    type: Number
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