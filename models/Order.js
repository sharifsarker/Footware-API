const mongoose = require("mongoose");

const ProductDetailSchema = new mongoose.Schema({
  name: String,
  color: String,
  size: String,
  brand: String,
  quantity: Number,
  price: Number,
  image: String,
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  }
});

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  products: [ProductDetailSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  shippingAddress: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model("Order", OrderSchema);
