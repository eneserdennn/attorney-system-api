const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  updateFolderForUser,
  deleteFolder,
  createFolder,
  getFoldersForUsers,
  getAllFolders,
  getFoldersByClientId,
  addDocument,
  removeDocument
} = require("../controllers/folderController");

router.route("/").get(protect, getAllFolders);
router.route("/:userId").get(protect, getFoldersForUsers);
router.route("/client/:clientId").get(protect, getFoldersByClientId);
router.route("/").post(protect, createFolder);
router.route("/:id").put(protect, updateFolderForUser);
router.route("/:id").delete(protect, deleteFolder);
router.route("/:folderId/document").post(protect, addDocument);
router.route("/:folderId/document/:fileName").delete(protect, removeDocument);

module.exports = router;
