const express = require('express')
const orderRoute = express.Router()

const { createOrder, checkoutOrder, getOrderByUser, getOrders } = require('../controllers/order.controller')

orderRoute.get('/getall', getOrders)
orderRoute.get('/get-order', getOrderByUser)
orderRoute.post('/create', createOrder)
orderRoute.patch('/checkout', checkoutOrder)

module.exports = orderRoute