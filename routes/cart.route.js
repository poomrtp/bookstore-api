const express = require('express')
const cartRoute = express.Router()

const { findCart, addToCart, editCart, removeItem, findFinalCart, createOrder } = require('../controllers/cart.controller')

cartRoute.get('/', findCart)
cartRoute.get('/getfull', findFinalCart)
cartRoute.post('/add-to-cart', addToCart)
cartRoute.patch('/edit', editCart)
cartRoute.patch('/remove', removeItem)

module.exports = cartRoute