const express = require('express')
const userRoute = express.Router()

const { createUser } = require('../controllers/user.controller')

userRoute.post('/create', createUser)

module.exports = userRoute