const mongoose = require('mongoose')
const Schema = mongoose.Schema

let bookSchema = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  author: {
    type: [String]
  },
  illustrator: {
    type: [String]
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
  weight: {
    type: Number
  },
  image: {
    type: String
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