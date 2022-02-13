const mongoose = require('mongoose')

const Cart = require('../models/cart.schema')

const getCarts = async (req, res) => {
  try {
    const doc = await Cart.find({ status: "active" })
    res.json(doc)
  } catch (error) {
    res.status(404).json({ ...error })
  }
}

const getCartById = async (req, res) => {
  const { name: name } = req.params
  try {
    const doc = await Cart.findOne({ name: name })
    res.json(doc)
  } catch (error) {
    res.status(404).json({ ...error })
  }
}

const createCart = async (req, res) => {
  const doc = new Cart(req.body)
  try {
    await doc.save()
    res.json(doc)
  } catch (error) {
    res.status(404).json({ ...error })
  }
}

const updateCart = async (req, res) => {
  const { name: name } = req.params
  const payload = req.body

  try {
    const doc = await Cart.findOne({ name: name })
    doc.set({ ...payload }).save()
    res.json(doc)
  } catch (error) {
    res.status(404).json({ ...error })
  }
}

const deleteCart = async (req, res) => {
  const { name: name } = req.params
  const payload = req.body

  try {
    const doc = await Cart.findOne({ name: name })
    doc.set({ status: "inactive" }).save()
    res.json(doc)
  } catch (error) {
    res.status(404).json({ ...error })
  }
}

module.exports = {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart
}