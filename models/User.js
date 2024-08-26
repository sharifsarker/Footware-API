const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

// Define the User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email address"]
  },
  userRole: {
    type: String,
    required: true
  }
});

// Create the User Model
const User = mongoose.model("User", userSchema);

module.exports = User;
