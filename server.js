const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000; // Define the port the server will listen on

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Handle preflight requests
  }
  next();
});

// Example valid coupons
const validCoupons = ["SAVE10", "WELCOME20", "DISCOUNT30"];

// API endpoint to validate the coupon code
app.post("/remoteurl", (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: "Coupon code is required." });
  }

  if (validCoupons.includes(code)) {
    return res.json({ message: `Coupon '${code}' is valid! Enjoy your discount.` });
  } else {
    return res.json({ message: `Coupon '${code}' is invalid. Please try again.` });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
