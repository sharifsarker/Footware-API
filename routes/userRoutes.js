const express = require("express");
const router = express.Router();
const { addUser, getUserByEmail } = require("../controllers/userController");

router.post("/", addUser);
router.get("/:email", getUserByEmail);

module.exports = router;
