const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

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
