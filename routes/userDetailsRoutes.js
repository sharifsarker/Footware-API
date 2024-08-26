const express = require("express");
const router = express.Router();
const { addUserDetails, getUserDetailsById } = require("../controllers/userDetailsController");

router.post("/", addUserDetails);
router.get("/:userId", getUserDetailsById);

module.exports = router;
