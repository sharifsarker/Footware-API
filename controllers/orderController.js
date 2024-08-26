const mongoose = require("mongoose");
const Order = require("../models/Order");

const formatDate = date => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

const placeOrder = async (req, res) => {
  const { userId, products, totalAmount, shippingAddress } = req.body;

  if (!userId || !products || products.length === 0 || typeof totalAmount !== "number") {
    return res.status(400).json({ error: "Invalid order details" });
  }

  const newOrder = new Order({
    userId,
    products,
    totalAmount,
    orderDate: new Date(),
    shippingAddress
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json({
      ...savedOrder.toObject(),
      orderDate: formatDate(savedOrder.orderDate)
    });
  } catch (error) {
    console.error("Failed to place order", error);
    res.status(500).json({ error: "Failed to place order" });
  }
};

// Fetch orders (and filter by userId if provided)
const getOrders = async (req, res) => {
  const { userId } = req.query;

  try {
    let orders;
    if (userId) {
      orders = await Order.find({ userId: new mongoose.Types.ObjectId(userId) });
    } else {
      orders = await Order.find();
    }

    const formattedOrders = orders.map(order => ({
      ...order.toObject(),
      orderDate: formatDate(order.orderDate)
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Failed to fetch orders", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

module.exports = {
  placeOrder,
  getOrders
};
