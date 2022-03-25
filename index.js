let express = require('express')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let cors = require('cors')
let dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const app = express();
dotenv.config();

app.use('*', cors({
  origin: '*',
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
}));
const bookAPI = require('./routes/book.route')
const cartAPI = require('./routes/cart.route')
const orderAPI = require('./routes/order.route')
const userAPI = require('./routes/user.route')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())

app.use('/api/products', bookAPI)
app.use('/api/carts', cartAPI)
app.use('/api/orders', orderAPI)
app.use('/api/user', userAPI)

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => app.listen(PORT, () => console.log(`PORT : ${PORT}`)))
  .catch((error) => console.error(error.message));