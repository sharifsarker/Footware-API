const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Image Schema
const imageSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  }
});

// Define the Product Schema
const productSchema = new Schema({
  images: [imageSchema],
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  oldPrice: {
    type: Number,
    required: true
  },
  sizes: {
    type: Array,
    required: true
  },
  colors: {
    type: Array,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

// Create the Product Model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
