const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

// Define the UserDetails Schema
const userDetailsSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  county: {
    type: String,
    required: true
  },
  streetAddress: {
    type: String,
    required: true
  },
  townCity: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Invalid email address"]
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User"
  }
});

// Create the UserDetails Model
const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

module.exports = UserDetails;
