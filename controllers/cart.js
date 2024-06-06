const Cart = require("../models/Cart");
const { StatusCodes } = require("http-status-codes");

const addToCartItem = async (req, res) => {
  req.body.addedByUser = req.user.userId;
  req.body.item = req.body.itemId;

  const cartItem = await Cart.create(req.body);

  res.status(StatusCodes.CREATED).json({ cartItem });
};

module.exports = {
  addToCartItem,
};
