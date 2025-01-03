const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");

// Importing the bcrypt library
const bcrypt = require("bcrypt");

// /users/test --> GET request to /test route
router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("username")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long"),
  body("email").trim().isEmail().withMessage("Invalid email"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Invalid data" });
    }
    const { username, email, password } = req.body;

    // Encrypt the password with bcrypt before saving it to the database
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email,
      username,
      password: hashPassword,
    });

    // send the newly created user as a response in JSON format
    res.json(newUser);
  }
);

module.exports = router;
