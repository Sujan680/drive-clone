const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");

// Importing the bcrypt library
const bcrypt = require("bcrypt");

// jwt library for creating tokens
const jwt = require("jsonwebtoken");





// /users/test --> GET request to /test route
router.get("/register", (req, res) => {
  res.render("register");
});

// /users/register --> POST request to /register route
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

// /users/login --> GET request to /login route
router.get('/login', (req, res) => {
  res.render('login');  
})

router.post('/login',
  // express validator 
  body('username').trim().isLength({min:4}).withMessage('Invalid username'),
  body('password').trim().isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
  async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        message: "Invalid data",
      })
    }

    const {username, password} = req.body;

    // Find the user with the given username

    const user = await userModel.findOne({
      username: username
    })

    if(!user) {
      return res.status(404).json({
        message: "username or password is incorrect"
      })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch) {
      return res.status(400).json({
        message: "username or password is incorrect"
      })
    }
  
    // Create a token (jwt--> json web token)

    const token = jwt.sign({
      userId: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
  )
  
  
  // we can store this token in the cookies 

  res.cookie('token', token);
  res.send('User logged in successfully');

  // Send the token as a response
  // res.json({
  //   message: "User logged in successfully",
  //   token: token,
  // })

})

module.exports = router;
