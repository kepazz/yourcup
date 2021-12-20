import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Stripe from "stripe";
import cors from 'cors'

import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import productRouter from "./routers/productRouter.js";
import articleRouter from "./routers/articleRouter.js";
import brandRouter from "./routers/brandRouter.js";
import path from 'path';

dotenv.config();


const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json({limit: "30mb",extended:true}));
app.use(express.urlencoded({limit: "30mb",extended:true}));
app.use(cors())

const calculateOrderAmount = (items) => {
  return items.reduce((a, c) => a + c.price * c.qty, 0) * 100 || 50;
};

if(process.env.NODE_ENV === "production"){
  mongoose.connect(process.env.MONGO_URL)
} else {
  mongoose.connect("mongodb://localhost/yourcup");
}
//mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/yourcup");
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/articles", articleRouter);
app.use("/api/brand", brandRouter);

const __dirname = path.resolve()

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, '/front/build')))

  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, '/front/build/index.html'));
  })
} else {
  app.get('/', (req,res)=>{
    res.send('api running')
  })
}




app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});


app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    payment_method_types: ["card"],
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const port = process.env.PORT || 5000;
app.listen(port);
