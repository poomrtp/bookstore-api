const mongoose = require('mongoose')

const Cart = require('../models/cart.schema')
const Book = require('../models/book.schema')
const Order = require('../models/order.schema')

const checkProductQuantity = (cart, product) => {
  const nonEbookItems = cart.orders.filter(item => item.seller !== 'e-book')
  nonEbookItems.forEach(item => {
    if (item.quantity > product.quantity) {
      console.log('error -> quantity')
      throw new Error("cart.quantity > product.quantity")
    }
    return
  })
  return nonEbookItems
}
const splitEbook = (cart) => {
  return cart.orders.filter(item => item.seller !== 'e-book')
}

exports.createOrder = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      createdBy: { name: req.headers.authorization },
      updatedBy: { name: req.headers.authorization }
    }
    const doc = new Order(payload)
    await doc.save()
    res.json(doc)
  } catch (error) {
    res.status(400).json(error)
  }
}

exports.checkoutOrder = async (req, res) => {
  try {
    const orderDoc = await Order.findOne({ "createdBy.name": req.headers.authorization, paymentStatus: 'pending' })
    const errorData = []
    if (!orderDoc) {
      return res.status(400).json('รายการสินค้าผิดพลาด')
    }
    const books = splitEbook(orderDoc)
    for await (const itemBySeller of books) {
      for await (item of itemBySeller.items) {
        const bookDoc =  await Book.findOne({ status: 'active', name: item.name, quantity: { $gte: item.quantity } })
        if (bookDoc) {
          await bookDoc.set({ quantity: bookDoc.quantity - item.quantity }).save()
        } else {
          errorData.push({ error: `${item.name} สินค้าไม่พอ` })
        }
      }
    }
    if (errorData.length > 0) {
      return res.status(400).json(errorData)
    }
    const orderResult = await orderDoc.set({ paymentStatus: 'paid' }).save()
    await deleteBook(req)
    const deleteResult = await Cart.deleteOne({ "createdBy.name": req.headers.authorization })
    if(deleteResult) console.log('delete success')
    return res.json(orderResult)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}
const deleteBook = async (req, res) => {
  const payload = req.body
  try {
    const doc = await cart.deleteOne({ "createdBy.name": req.headers.authorization })
    console.log('delete success')
    // res.json(doc)
  } catch (error) {
    // res.status(404).json({ ...error })
  }
}

  