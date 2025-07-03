require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./utils/db');
const connectCloudinary = require('./utils/cloudinary');
const userRoutes = require('./router/userRoutes');
const prodcutRoutes = require('./router/product-routes');
const cartRoutes = require('./router/cart-routes');
const orderRoutes = require('./router/order-routes');

// app config //

const app = express();
const port = 5000;
connectCloudinary();

// let tackel the cors //

// var corsOptions = {
//     origin:['http://localhost:5173', 'http://localhost:5174', 'https://forever-admin-five-rho.vercel.app'],
//     methods:'GET, POST, DELETE, PATCH, HEAD',
//     Credential:true,
// }

// middleware //

app.use(express.json());
app.use(cors());

// api endpoint //

app.use("/api/user", userRoutes);
app.use("/api/product", prodcutRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.get('/',(req, res) => {
    res.status(200).send('api is working');
})

connectDb().then(()=> {
    app.listen(port, () => console.log("server started.")
)
});

