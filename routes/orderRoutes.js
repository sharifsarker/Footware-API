const express = require("express");
const { placeOrder, getOrders } = require("../controllers/orderController");

const router = express.Router();

// Route to place an order
router.post("/place-order", placeOrder);

// Route to get orders
router.get("/get-orders", getOrders);

module.exports = router;
