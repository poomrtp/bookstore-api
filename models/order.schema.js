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
  },
})

const shipmentSchema = new Schema({
  name: {
    type: String
  },
  nameTH: {
    type: String
  },
  price: {
    type: Number
  },
})

const itemSchema = new Schema({
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
  }
})

const order = new Schema({
  seller: {
    type: String
  },
  items: {
    type: [itemSchema]
  },
  description: {
    type: String,
    default: ''
  },
  shipment: {
    type: shipmentSchema,
    default: null
  },
  totalPrice: {
    type: Number
  },
  quantity: {
    type: Number
  }
})

const orderSchema = new Schema({
  orders: {
    type: [order]
  },
  totalPrice: {
    type: Number
  },
  totalItem: {
    type: Number
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "pending", "canceled"],
    default: "pending"
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
})

module.exports = mongoose.model('Order', orderSchema)