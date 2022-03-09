const express = require('express')
const cartRoute = express.Router()

const { findCart, addToCart } = require('../controllers/cart.controller')

cartRoute.get('/', findCart)
cartRoute.post('/add-to-cart', addToCart)

module.exports = cartRoute