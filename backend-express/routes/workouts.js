const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// This is the API to log exercise data to the server and retrieve this data

// Authorization middleware
const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const secretKey = "secret key";
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Add new workout log
router.post("/", authorize, async (req, res) => {
  const { event, duration, timestamp } = req.body;
  const email = req.user.email;

  if (!event || !duration || !timestamp) {
    return res.status(400).json({
      error: true,
      message: "Missing required fields: event, duration, timestamp",
    });
  }

  try {
    // Get user_id by email
    const user = await req.db("users").where({ email }).first();
    if (!user)
      return res.status(404).json({ error: true, message: "User not found" });

    await req.db("workout_log").insert({
      idusers: user.idusers, 
      event,
      duration,
      timestamp,
    });

    return res.status(201).json({ success: true, message: "Workout log saved" });
  } catch (err) {
    console.error("Error inserting workout log:", err);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
});

// Get all logs for current user
router.get("/", authorize, async (req, res) => {
  const email = req.user.email;

  try {
    const user = await req.db("users").where({ email }).first();
    if (!user)
      return res.status(404).json({ error: true, message: "User not found" });

    const logs = await req.db("workout_log")
      .select("*")
      .where({ idusers: user.idusers })  
      .orderBy("timestamp", "desc");

    return res.json(logs);
  } catch (err) {
    console.error("Error fetching workout logs:", err);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
});

module.exports = router;
