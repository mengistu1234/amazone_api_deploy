const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "sucsses!!",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      message: "Amount must be greater than zero",
    });
  }
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("Server is running on port 3000, http://localhost:3000");
});
