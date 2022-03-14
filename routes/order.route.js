const express = require('express')
const orderRoute = express.Router()

const { createOrder, checkoutOrder } = require('../controllers/order.controller')

orderRoute.post('/create', createOrder)
orderRoute.patch('/checkout', checkoutOrder)

module.exports = orderRoute