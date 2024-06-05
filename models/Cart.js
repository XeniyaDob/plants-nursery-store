const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    addedByUser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "A user is required"],
    },
    item: {
      type: mongoose.Types.ObjectId,
      ref: "Item",
      required: [true, "An item is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
