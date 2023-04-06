const express = require("express");
const Folder = require("../models/folderModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const getAllFolders = asyncHandler(async (req, res) => {
  const folders = await Folder.find({});
  res.status(200).json(folders);
});

const getFoldersForUsers = asyncHandler(async (req, res) => {
  const folders = await Folder.find({ userId: req.params.userId }).populate(
    "userId"
  );
  res.status(200).json(folders);
});

const createFolder = asyncHandler(async (req, res) => {
  const {
    folderName,
    juridistrictions,
    currency,
    language,
    clientId,
    billingMethod,
    applicableRate,
    budgetedAmount,
    fixedExpenses,
    documentsPath,
  } = req.body;

  if (!folderName) {
    res.status(400);
    throw new Error("Please provide a task name");
  }

  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // crate folder and push to user folders array
  const folder = await Folder.create({
    folderName,
    juridistrictions,
    currency,
    language,
    clientId,
    billingMethod,
    applicableRate,
    budgetedAmount,
    fixedExpenses,
    documentsPath,
    userId: req.params.userId,
  });

  user.folders.push(folderName);
  await user.save();

  res.status(201).json(folder);
});

const deleteFolder = asyncHandler(async (req, res) => {
  const folder = await Folder.findOne({
    userId: req.params.userId,
    folderName: req.body.folderName,
  });

  if (!folder) {
    res.status(404);
    throw new Error("Task not found");
  }

  await folder.remove();
  res.status(200).json({ message: "Task removed" });
});

const updateFolderForUser = asyncHandler(async (req, res) => {
  const folder = await Folder.findOne({
    folderName: req.body.folderName,
    userId: req.params.userId,
  });

  if (!folder) {
    res.status(404);
    throw new Error("Folder not found");
  }

  folder.folderName = req.body.folderName || folder.folderName;
  folder.currency = req.body.currency || folder.currency;
  folder.language = req.body.language || folder.language;
  folder.clientId = req.body.clientId || folder.clientId;
  folder.billingMethod = req.body.billingMethod || folder.billingMethod;
  folder.applicableRate = req.body.applicableRate || folder.applicableRate;
  folder.budgetedAmount = req.body.budgetedAmount || folder.budgetedAmount;
  folder.fixedExpenses = req.body.fixedExpenses || folder.fixedExpenses;
  folder.documentsPath = req.body.documentsPath || folder.documentsPath;

  const updatedFolder = await folder.save();
  res.status(200).json(updatedFolder);
});

module.exports = {
  updateFolderForUser,
  deleteFolder,
  createFolder,
  getFoldersForUsers,
  getAllFolders,
};
