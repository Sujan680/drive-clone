const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// /users/test
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), message: "Invalid data" });
    }
    res.send(errors);
  }
);

module.exports = router;
