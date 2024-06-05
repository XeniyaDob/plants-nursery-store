const Item = require("../models/Item");
const Cart = require("../models/Cart");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const addToCartItem = async (req, res) => {
  console.log(req.body, "!!!");
  res.status(200).json({ message: "Added to cart" });
};

module.exports = {
  addToCartItem,
};
