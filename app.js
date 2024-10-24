require('dotenv').config()
require('express-async-errors')

// async errors

const express = require('express');
const app = express();

const connect = require('./db/connect')

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const productsRoute = require('./routes/products')

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("<h1>Store API</h2><a href='/api/v1/products'>Products Route</a>")
})

app.use('/api/v1/products', productsRoute)

// Products Route
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        //connect Db
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listenting port ${port}...`)
        )
    } catch (error) {
        console.log(error);
    }
}

start()