const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");

const {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/items");

router.route("/").get(getAllItems);
router.route("/:id").get(getItem);
//TODO : implement user is an admin or not
router.route("/").post(authenticateUser, createItem); // Only admin can POST, PATCH, and DELETE items
router
  .route("/:id")
  .delete(authenticateUser, deleteItem)
  .patch(authenticateUser, updateItem);

module.exports = router;
