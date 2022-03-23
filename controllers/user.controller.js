const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')
// const cookieParser = require('cookie-parser')

const User = require('../models/user.schema')

exports.createUser = async (req, res) => {
  const userDoc = await User.findOne({ username: req.body.username })
  if (userDoc) {
    return res.status(400).json({ message: 'user already exists' })
  }
  try {
    const doc = new User(req.body)
    await doc.save()
    return res.json({ message: 'Create Account Success' })
  } catch (error) {
    return res.status(400).json(error)
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  const userDoc = await User.findOne({ username: username })
  if (!userDoc) {
    return res.status(404).json({ message: 'user not found' })
  }
  if (userDoc.password !== password) {
    return res.status(404).json({ message: 'username or password invalid' })
  }
  try {
    const token = jwt.sign({ _id: userDoc._id, username: userDoc.username }, "bookstoreSecret")
    // res.cookie('jwt', token, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000
    // })
    return res.send(token)
  } catch (error) {
    return res.status(400).json({ errors: error })
  }
}

exports.logout = async (req, res) => {
  try {
    res.cookie('jwt', '', {
      maxAge: 0
    })
    return res.send({ message: 'logout success' })
  } catch (error) {
    return res.status(400).json({ errors: error })
  }
}

exports.getUser = async (req, res) => {
  const auth = req.headers.authorization
  const { username } = jwtDecode(auth)
  try {
    const userDoc = await User.findOne({ username: username })
    const result = {
      username: userDoc.username,
      fullname: userDoc.fullname,
      email: userDoc.email
    }
    return res.json(result)
  } catch (error) {
    return res.status(400).json({ message: 'username not exists' })
  }
}


  