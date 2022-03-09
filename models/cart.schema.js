const mongoose = require('mongoose')
const Schema = mongoose.Schema


const typeSchema = new Schema({
  name: {
    type: String
  },
  nameTH: {
    type: String
  },
  price: {
    type: Number
  }
})

const CartItemSchema = new Schema({
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
  categoty: {
    type: String
  },
  productType: {
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
  weight: {
    type: Number
  },
  images: {
    type: [String]
  },
  quantity: {
    type: Number
  },
  type: {
    type: typeSchema
  },
  totalPrice: {
    type: Number
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
}, { _id: false })

const cartSchema = new Schema({
  cartItems: {
    type: [CartItemSchema],
    default: []
  },
  totalItem: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  createdBy: {
    type: {
      name: String
    },
    default: {}
  },
  updatedBy: {
    type: {
      name: String
    },
    default: {}
  }

}, { timeseries: true })

module.exports = mongoose.model('Cart', cartSchema)