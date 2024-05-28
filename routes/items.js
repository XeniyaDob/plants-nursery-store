const express = require("express");
const router = express.Router();
const { auth, authorizeAdmin } = require("../middleware/authentication");

const {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/items");

router.route("/").get(getAllItems);
router.route("/:id").get(getItem);

router.route("/").post(createItem); // Only admin can POST, PATCH, and DELETE items
router
  .route("/:id")
  .delete(auth, authorizeAdmin, deleteItem)
  .patch(auth, authorizeAdmin, updateItem);

module.exports = router;
