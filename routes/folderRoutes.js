const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  updateFolderForUser,
  deleteFolder,
  createFolder,
  getFoldersForUsers,
  getAllFolders,
} = require("../controllers/nFolderController");

router.route("/").get(getAllFolders);

router
  .route("/:id")
  .post(protect, createFolder)
  .delete(protect, deleteFolder)
  .put(protect, updateFolderForUser);

module.exports = router;
