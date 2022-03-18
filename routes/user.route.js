const express = require('express')
const userRoute = express.Router()

const { createUser, login, getUser, logout } = require('../controllers/user.controller')

userRoute.post('/getuser', getUser)
userRoute.post('/create', createUser)
userRoute.post('/login', login)
userRoute.post('/logout', logout)

module.exports = userRoute