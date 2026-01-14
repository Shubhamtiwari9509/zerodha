const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 8080;
const url = process.env.MONGO_URL;

const authRoutes = require("./routes/auth");

const Holding = require("./schemas/holdingSchema");
const Position = require("./schemas/positionSchema");
const Order = require("./schemas/orderSchema");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: [process.env.FRONTEND_URL , process.env.DASHBOARD_URL], credentials: true }));

// Routes
app.use("/", authRoutes);

//  Holdings route
app.get("/allholdings", async (req, res) => {
  try {
    const holdings = await Holding.find({});
    res.json(holdings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

//  Positions route
app.get("/allpositions", async (req, res) => {
  try {
    const allpositions = await Position.find({});
    res.json(allpositions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

//  New order route
app.post("/newOrder", async (req, res) => {
  try {
    const newOrder = new Order({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });
    await newOrder.save();
    res.send("Order saved!");
  } catch (err) {
    res.status(500).json({ error: "Failed to save order" });
  }
});

//  Connect DB first, then start server
mongoose
  .connect(url)
  .then(() => {
    console.log("DB connected!");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });