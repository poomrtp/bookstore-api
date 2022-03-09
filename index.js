let express = require('express')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let cors = require('cors')
let dotenv = require('dotenv')

const app = express();
dotenv.config();

const bookAPI = require('./routes/book.route')
const cartAPI = require('./routes/cart.route')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cors());

app.use('/api/products', bookAPI)
app.use('/api/carts', cartAPI)

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => app.listen(PORT, () => console.log(`PORT : ${PORT}`)))
  .catch((error) => console.error(error.message));