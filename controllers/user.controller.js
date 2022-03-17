const mongoose = require('mongoose')

const User = require('../models/user.schema')

exports.createUser = async (req, res) => {
  const userDoc = await User.findOne({ email: req.body.email })
  if (userDoc) {
    return res.status(400).json({ message: 'user already exists' })
  }
  try {
    const doc = new User(req.body)
    await doc.save()
    return res.json(doc)
  } catch (error) {
    return res.status(400).json(error)
  }
}

  