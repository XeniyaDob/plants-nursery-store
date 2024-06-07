const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authentication");
const { addToCartItem, getAllCArtItems } = require("../controllers/cart");


router.route("/").get(auth, getAllCArtItems).post(auth, addToCartItem);
module.exports = router;
