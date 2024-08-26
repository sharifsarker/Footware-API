const User = require("../models/User");
const validator = require("validator");


function validateUserData(data) {
  const { name, email, userRole } = data;

  if (!name || !email || !userRole) {
    throw new Error("Name, email, and userRole are required fields.");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format.");
  }

  const validRoles = ["admin", "user"]; // Add based on your roles
  if (!validRoles.includes(userRole.toLowerCase())) {
    throw new Error("Invalid user role.");
  }
}

async function addUser(req, res) {
  const { name, email, userRole } = req.body;

  try {
    // Validate data
    validateUserData(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).send({ error: "User already exists with this email." });
    }

    // Create a new user
    const user = new User({ name, email, userRole });
    await user.save();
    res.status(201).send({ message: "User added successfully", user });
  } catch (error) {
    console.error("Failed to add user", error);
    res.status(400).send({ error: error.message });
  }
}

async function getUserByEmail(req, res) {
  const email = req.params.email;

  try {
    if (!validator.isEmail(email)) {
      return res.status(400).send({ error: "Invalid email format." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: `No user found with email: ${email}` });
    }

    res.send(user);
  } catch (error) {
    console.error("Failed to retrieve user", error);
    res.status(500).send({ error: "Failed to retrieve user" });
  }
}

module.exports = {
  addUser,
  getUserByEmail
};
