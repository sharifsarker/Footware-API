const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDB } = require("./db/db");
const userRoutes = require("./routes/userRoutes");
const userDetailsRoutes = require("./routes/userDetailsRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// user routes
app.use("/users", userRoutes);
app.use("/user-details", userDetailsRoutes);
// Product routes
app.use("/products", productRoutes);
// order routes
app.use("/orders", orderRoutes);
app.use("/payment", paymentRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Elegant Footwear API!");
});

// Connect to MongoDB and start the server
connectToDB()
  .then(() => {
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch(error => {
    console.error("Failed to connect to the database", error);
  });
