const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.URI;

async function connectToDB() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = {
  connectToDB
};
