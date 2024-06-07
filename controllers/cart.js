const Cart = require("../models/Cart");
const { StatusCodes } = require("http-status-codes");

const getAllCArtItems = async (req, res) => {
  // Find all cartItems added by a user and populate the item details
  const cartItems = await Cart.find({ addedByUser: req.user.userId })
    .sort("createdAt")
    .populate({
      path: "item",
      model: "Item",
      select: "-_id -__v", // Exclude _id and __v fields from the result
    });

  res.status(StatusCodes.OK).json({ cartItems, count: cartItems.length });
};

const addToCartItem = async (req, res) => {
  req.body.addedByUser = req.user.userId;
  req.body.item = req.body.itemId;

  const cartItem = await Cart.create(req.body);

  res.status(StatusCodes.CREATED).json({ cartItem });
};

module.exports = {
  getAllCArtItems,
  addToCartItem,
};
