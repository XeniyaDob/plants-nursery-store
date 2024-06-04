const express = require("express");
const router = express.Router();
const { auth, authorizeAdmin } = require("../middleware/authentication");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/src/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/items");

router.route("/").get(getAllItems);
router.route("/:id").get(getItem);

router
  .route("/")
  .post(auth, authorizeAdmin, upload.single("image"), createItem);
router
  .route("/:id")
  .delete(auth, authorizeAdmin, deleteItem)
  .patch(auth, authorizeAdmin, updateItem);

module.exports = router;
