const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProductById,
  searchProductByTitle
} = require("../controllers/productController");
const router = express.Router();

// Route to add a product
router.post("/add", addProduct);
router.get("/search", searchProductByTitle);

// Route to get all products
router.get("/", getAllProducts);

// Route to get a product by ID
router.get("/:id", getProductById);

module.exports = router;
