const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register new user
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Request body incomplete - email and password needed",
    });
  }

  try {
    // Check if user exists
    const users = await req.db("users").select("*").where({ email });
    if (users.length > 0) {
      return res.status(409).json({
        error: true,
        message: "User already exists",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    // Insert user
    await req.db("users").insert({ email, hash });

    // *** Generate JWT token after successful registration ***
    const secretKey = "secret key"; // Replace with env variable in prod
    const expires_in = 60 * 60 * 24; // 1 day in seconds
    const exp = Math.floor(Date.now() / 1000) + expires_in;
    const token = jwt.sign({ email, exp }, secretKey);

    // *** Return token and expiry along with success message ***
    return res.status(201).json({
      success: true,
      message: "User created",
      token_type: "Bearer",
      token,
      expires_in,
    });
  } catch (err) {
    console.error("Error in /register:", err);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Request body incomplete - email and password needed",
    });
  }

  try {
    const users = await req.db("users").select("*").where({ email });
    if (users.length === 0) {
      return res.status(401).json({
        error: true,
        message: "User does not exist",
      });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.hash);
    if (!match) {
      return res.status(401).json({
        error: true,
        message: "Invalid password",
      });
    }

    const secretKey = "secret key"; // Replace with env variable in prod
    const expires_in = 60 * 60 * 24; // 1 day in seconds
    const exp = Math.floor(Date.now() / 1000) + expires_in;

    const token = jwt.sign({ email, exp }, secretKey);

    return res.json({
      token_type: "Bearer",
      token,
      expires_in,
    });
  } catch (err) {
    console.error("Error in /login:", err);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
});

module.exports = router;
