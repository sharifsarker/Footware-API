const mongoose = require("mongoose");
const Product = require("../models/Product");

// Function to validate product data
function validateProductData(data) {
  const { userId, images, name, price, oldPrice, sizes, colors, brand,description } = data;

  if (
    !userId ||
    !images ||
    images.length === 0 ||
    !name ||
    !price ||
    !oldPrice ||
    !sizes ||
    sizes.length === 0 ||
    !colors ||
    colors.length === 0 ||
    !brand ||
    !description 
  ) {
    throw new Error("All fields are required and must not be empty.");
  }
}

async function addProduct(req, res) {
  const { userId, images, name, price, oldPrice, sizes, colors, brand,description } = req.body;

  try {
    // Validate data
    validateProductData(req.body);

    // Create a new product
    const product = new Product({ userId, images, name, price, oldPrice, sizes, colors, brand,description });
    await product.save();
    res.status(201).send({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Failed to add product", error);
    res.status(400).send({ error: error.message });
  }
}

// Function to get all products
// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Failed to fetch products", error);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// };

// Function to get all products with optional filters
const getAllProducts = async (req, res) => {
  const { brand, minPrice, maxPrice, color, size } = req.query;
  let filter = {};

  if (brand) filter.brand = brand;
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);
  if (color) filter.colors = { $in: [color] }; // Match any product containing this color
  if (size) filter.sizes = { $in: [size] }; // Match any product containing this size

  try {
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to fetch products", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Function to get a product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  // Validate the ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    // Convert the string id to a MongoDB ObjectId
    // Convert the string id to a MongoDB ObjectId
    const objId = new mongoose.Types.ObjectId(id);
    const product = await Product.findById(objId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Failed to fetch product", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Function to search products by title
const searchProductByTitle = async (req, res) => {
  const { name } = req.query;

  // Log the incoming request for debugging
  console.log(`Search request for title: ${name}`);

  if (!name) {
    return res.status(400).json({ error: "Title query parameter is required" });
  }

  try {
    const products = await Product.find({ name: new RegExp(name, "i") }); // 'i' for case-insensitive

    if (!products.length) {
      return res.status(404).json({ error: "No products found with the given title" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to search products", error);
    res.status(500).json({ error: "Failed to search products" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  searchProductByTitle
};
