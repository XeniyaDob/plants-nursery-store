const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authentication");
const { addToCartItem } = require("../controllers/cart");

router.route("/").post(auth, addToCartItem);
module.exports = router;
