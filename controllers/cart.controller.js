const mongoose = require('mongoose')
const jwtDecode = require('jwt-decode')

const Cart = require('../models/cart.schema')
const Book = require('../models/book.schema')

const decodeToken = (token) => {
  try {
    return jwtDecode(token)
  } catch {
    return ''
  }
}

const findProductByName = (cart, productData) => {
  const result = cart.cartItems.findIndex(item => {
    return item.name + '-' + item.type.name === productData.name + '-' + productData.type.name
  })
  return result
}

const calculateGrandTotal = (cart) => {
  return cart.reduce((prev, curr) => {
    prev.quantity += curr.quantity
    prev.totalPrice += curr.totalPrice
    return prev
  }, { quantity: 0, totalPrice: 0 })
}

const groupItemByPublisher = (cartItems) => {
  const itemGroup = []
  cartItems.reduce((prev, curr) => {
    if(curr.type.name === 'e-book') {
      if(!prev[curr.type.name]) {
        prev[curr.type.name] = { seller: 'e-book', items: [], description: '', totalPrice: 0, quantity: 0 }
        itemGroup.push(prev[curr.type.name])
      }
      prev[curr.type.name].items.push(curr)
      prev[curr.type.name].totalPrice += curr.totalPrice
      prev[curr.type.name].quantity += curr.quantity
      return prev
    }
    if(!prev[curr.publisher]) {
      prev[curr.publisher] = { seller: curr.publisher, items: [], description: '', totalPrice: 0, quantity: 0 }
      itemGroup.push(prev[curr.publisher])
    }
    prev[curr.publisher].items.push(curr)
    prev[curr.publisher].totalPrice += curr.totalPrice
    prev[curr.publisher].quantity += curr.quantity
    return prev
  }, {})
  return itemGroup
}

exports.findCart = async (req, res) => {
  const { username } = decodeToken(req.headers.authorization)
  if (!username) {
    return res.json({ message: 'please login' })
  }
  try {
    const doc = await Cart.findOne({ "createdBy.name": username })
    res.json(doc)
  } catch (error) {
    res.status(404).json(error)
  }
}

exports.findFinalCart = async (req, res) => {
  const { username } = decodeToken(req.headers.authorization)
  if (!username) {
    return res.json({ message: 'please login' })
  }
  try {
    const doc = await Cart.findOne({ "createdBy.name": username })
    const groupItem = groupItemByPublisher(doc.cartItems)
    const grandTotal = calculateGrandTotal(groupItem)
    const response = {
      orders: groupItem,
      totalPrice: grandTotal.totalPrice,
      totalItem: grandTotal.quantity
    }
    res.json(response)
  } catch (error) {
    res.status(404).json(error)
  }
}

exports.addToCart = async (req, res) => {
  const { username } = decodeToken(req.headers.authorization)
  if (!username) {
    return res.json({ message: 'please login' })
  }
  try {
    const { name, quantity, type } = req.body
    const doc = await Cart.findOne({ "createdBy.name": username, "type.name": type.name })
    const product = await Book.findOne({ status: 'active', name: name, quantity: { $gte: quantity } })
    if (!product) {
      return res.json({ message: 'out of stock' })
    }
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
      const grandTotal = calculateGrandTotal(cartItems)
      const payload = {
        cartItems: cartItems,
        totalPrice: grandTotal.totalPrice,
        totalItem: grandTotal.quantity,
        createdBy: { name: username },
        updatedBy: { name: username }
      }
      await doc.set({ ...payload }).save()
      res.json(doc)
    } else {
      const payload = {
        cartItems: { ...req.body, totalPrice: req.body.type.price * req.body.quantity },
        totalPrice: req.body.type.price * req.body.quantity,
        totalItem: req.body.quantity,
        createdBy: { name: username },
        updatedBy: { name: username }
      }
      const cartDoc = new Cart(payload)
      await cartDoc.save()
      res.json(cartDoc)
    }
  } catch (error) {
    console.log('error', error)
    res.status(404).json(error)
  }
}

exports.editCart = async (req, res) => {
  const { username } = decodeToken(req.headers.authorization)
  if (!username) {
    return res.json({ message: 'please login' })
  }
  try {
    const { name, quantity } = req.body
    const doc = await Cart.findOne({ "createdBy.name": username })
    const product = await Book.findOne({ name: name })

    if (doc) {
      const index = findProductByName(doc, req.body)
      const newQuantity = quantity
      let cartItems = [...doc.cartItems]
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
      const grandTotal = calculateGrandTotal(cartItems)
      const payload = {
        cartItems: cartItems,
        totalPrice: grandTotal.totalPrice,
        totalItem: grandTotal.quantity,
        createdBy: { name: username },
        updatedBy: { name: username }
      }
      await doc.set({ ...payload }).save()
      res.json(doc)
    }
  } catch (error) {
    console.log('error', error)
    res.status(404).json(error)
  }
}

exports.removeItem = async (req, res) => {
  const { username } = decodeToken(req.headers.authorization)
  if (!username) {
    return res.json({ message: 'please login' })
  }
  try {
    const { name, quantity } = req.body
    const doc = await Cart.findOne({ "createdBy.name": username })
    const product = await Book.findOne({ name: name })

    if (doc) {
      const index = findProductByName(doc, req.body)
      const newQuantity = quantity
      let cartItems = [...doc.cartItems]
      if (index !== -1) {
        cartItems.splice(index, 1)
      } else {
        res.status(404).json({ error: 'item not found' })
      }
      const grandTotal = calculateGrandTotal(cartItems)
      const payload = {
        cartItems: cartItems,
        totalPrice: grandTotal.totalPrice,
        totalItem: grandTotal.quantity,
        createdBy: { name: username },
        updatedBy: { name: username }
      }
      await doc.set({ ...payload }).save()
      res.json(doc)
    }
  } catch (error) {
    console.log('error', error)
    res.status(404).json(error)
  }
}



  