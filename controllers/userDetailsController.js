const UserDetails = require("../models/UserDetails");
const validator = require("validator");

// Function to validate input data
function validateUserDetails(data) {
  const {
    firstName,
    lastName,
    county,
    streetAddress,
    townCity,
    zipCode,
    phoneNumber,
    email,
    userId
  } = data;

  if (
    !firstName ||
    !lastName ||
    !county ||
    !streetAddress ||
    !townCity ||
    !zipCode ||
    !phoneNumber ||
    !email ||
    !userId
  ) {
    throw new Error("All fields are required.");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format.");
  }
}

async function addUserDetails(req, res) {
  const {
    firstName,
    lastName,
    county,
    streetAddress,
    townCity,
    zipCode,
    phoneNumber,
    email,
    userId
  } = req.body;

  console.log(req.body);

  try {
    // Validate data
    validateUserDetails(req.body);

    // Check if user details already exist
    const existingUserDetails = await UserDetails.findOne({ userId: userId });

    if (existingUserDetails) {
      // If user details already exist, update them
      await UserDetails.updateOne(
        { userId: userId },
        {
          $set: {
            firstName,
            lastName,
            county,
            streetAddress,
            townCity,
            zipCode,
            phoneNumber,
            email
          }
        }
      );
      res.send({ message: "User details updated successfully" });
    } else {
      // If user details do not exist, insert new details
      const userDetails = new UserDetails({
        firstName,
        lastName,
        county,
        streetAddress,
        townCity,
        zipCode,
        phoneNumber,
        email,
        userId
      });
      await userDetails.save();
      res.status(201).send({ message: "User details added successfully" });
    }
  } catch (error) {
    console.error("Failed to add or update user details", error);
    res.status(400).send({ error: error.message });
  }
}

async function getUserDetailsById(req, res) {
  const userId = req.params.userId;

  try {
    const userDetails = await UserDetails.findOne({ userId });

    if (!userDetails) {
      return res.status(404).send({ error: `No user details found with email: ${userId}` });
    }

    res.send(userDetails);
  } catch (error) {
    console.error("Failed to retrieve user details", error);
    res.status(500).send({ error: "Failed to retrieve user details" });
  }
}

module.exports = {
  addUserDetails,
  getUserDetailsById
};
