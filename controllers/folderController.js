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

const getFoldersByClientId = asyncHandler(async (req, res) => {
    const folders = await Folder.find({ clientId: req.params.clientId }).populate(
        "clientId"
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
      userId
  } = req.body;


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
    userId
    });

    if (folder) {
        res.status(201).json({
            _id: folder._id,
            folderName: folder.folderName,
            juridistrictions: folder.juridistrictions,
            currency: folder.currency,
            language: folder.language,
            clientId: folder.clientId,
            billingMethod: folder.billingMethod,
            applicableRate: folder.applicableRate,
            budgetedAmount: folder.budgetedAmount,
            fixedExpenses: folder.fixedExpenses,
            documentsPath: folder.documentsPath,
            userId: folder.userId
        });
    }

    else {
        res.status(400);
        throw new Error("Invalid folder data");
    }

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
    _id: req.params.id,
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

const addDocument = asyncHandler(async (req, res) => {
    const { fileName, filePath } = req.body;
    const { folderId } = req.params;
    const folder = await Folder.findOne({ _id: folderId });

    if (!folder) {
        res.status(404);
        throw new Error("Folder not found");
    }

    folder.documentsPath.push({ name: fileName, path: filePath });
    await folder.save();
    res.status(200).json(folder);
});


const removeDocument = asyncHandler(async (req, res) => {
    const { folderId, fileName } = req.body;
    const folder = await Folder.findOne({ _id: folderId });

    if (!folder) {
        res.status(404);
        throw new Error("Folder not found");
    }

    const updatedPaths = folder.documentsPath.filter(file => file.name !== fileName);
    folder.documentsPath = updatedPaths;
    await folder.save();
    res.status(200).json(folder);
});


module.exports = {
  updateFolderForUser,
  deleteFolder,
  createFolder,
  getFoldersForUsers,
  getAllFolders,
    getFoldersByClientId,
    addDocument,
    removeDocument
};
