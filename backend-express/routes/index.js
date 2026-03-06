var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Authorization middleware
const authorize = (req, res, next) => {
  const authorization = req.headers.authorization;
  let token = null;

  // Retrieve token
  if (authorization && authorization.split(" ").length === 2) {
    token = authorization.split(" ")[1];
    console.log("Token: ", token);
  } else {
    console.log("Unauthorized user");
    return res.status(401).json({ Message: "Unauthorized" });
  }

  // Verify JWT and check expiration
  try {
    const secretKey = "secret key";
    const decoded = jwt.verify(token, secretKey);
    if (decoded.exp < Date.now()) {
      console.log("Token has expired");
      return res.status(401).json({ Message: "Token expired" });
    }
    next();
  } catch (e) {
    console.log("Token is not valid: ", e);
    return res.status(401).json({ Message: "Invalid token" });
  }
};

// Example protected update endpoint (you can rename or modify this)
router.post("/api/update", authorize, function (req, res) {
  // Replace with actual business logic
  res.status(200).json({ Message: "Update endpoint reached with auth." });
});

module.exports = router;
