const mongoose = require('mongoose')

const Cart = require('../models/cart.schema')
const Book = require('../models/book.schema')


const checkProductQuantity = (cart, product) => {
  if (cart.type.name === 'e-book') return
  if (cart.quantity > product.quantity) {
    console.log('error -> quantity')
    throw new Error("cart.quantity > product.quantity")
  }
  return
}

const findProductByName = (cart, productData) => {
  const result = cart.cartItems.findIndex(item => {
    return item.name + '-' + item.type.name === productData.name + '-' + productData.type.name
  })
  return result
}

const calculateTotalPrice = (cart) => {

}

exports.findCart = async (req, res) => {
  try {
    const doc = await Cart.findOne({ "createdBy.name": req.headers.authorization })
    res.json(doc)
  } catch (error) {
    res.status(404).json({ ...error })
  }
}

exports.addToCart = async (req, res) => {
  try {
    const { name, quantity } = req.body
    const doc = await Cart.findOne({ "createdBy.name": req.headers.authorization })
    const product = await Book.findOne({ name: name })

    if (doc) {
      const index = findProductByName(doc, req.body)
      const newQuantity = doc.cartItems[index]?.quantity ? doc.cartItems[index]?.quantity + quantity : quantity
      let cartItems = [ ...doc.cartItems ]
      if (index === -1) {
        cartItems.push({
          ...req.body,
          quantity: quantity,
          totalPrice: req.body.type.price * quantity
        })
      } else {
        cartItems[index] = {
          ...req.body,
          quantity: newQuantity,
          totalPrice: req.body.type.price * newQuantity
        }
      }
      // console.log(doc)
      const payload = {
        cartItems: cartItems,
        totalPrice: req.body.type.price * newQuantity,
        totalItem: newQuantity,
        createdBy: { name: req.headers.authorization },
        updatedBy: { name: req.headers.authorization }
      }
      await doc.set({ ...payload }).save()
      res.json(doc)
    } else {
      checkProductQuantity(req.body, product)
      const payload = {
        cartItems: { ...req.body, totalPrice: req.body.type.price * req.body.quantity },
        totalPrice: req.body.type.price * req.body.quantity,
        totalItem: req.body.quantity,
        createdBy: { name: req.headers.authorization },
        updatedBy: { name: req.headers.authorization }
      }
      console.log('AUTH', req.headers.authorization)
  
      const cartDoc = new Cart(payload)
      await cartDoc.save()
      res.json(cartDoc)
    }

  } catch (error) {
    console.log('error', error)
    res.status(404).json(error)
  }
}

