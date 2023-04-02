const asyncHandler = require('express-async-handler');
const Client = require('../models/clientModel');
const User = require('../models/userModel');

// @desc Add a new folder to a client
// @route POST /api/clients/:clientId/folders
// @access Private
const addFolderToClient = asyncHandler(async (req, res) => {
  const {
    folderName,
    nature,
    jurisdictions,
    currency,
    language,
    billingMethod,
    applicableRate,
    budgetedAmount,
    fixedExpenses,
    documentsPath,
    clientId,
    userId
  } = req.body;

  const user = await User.findById(userId);
  const client = await Client.findById(clientId);

  if (client) {
    const folder = {
      folderName,
      nature,
      jurisdictions,
      currency,
      language,
      billingMethod,
      applicableRate,
      budgetedAmount,
      fixedExpenses,
      documentsPath,
      clientId
    };

    client.folders.push(folder);

    await client.save();

    res.status(201).json(folder);
  } else {
    res.status(404);
    throw new Error('Client or User not found');
  }
});

// @desc Get folders for a client
// @route GET /api/clients/:clientId/folders
// @access Private
const getFoldersForClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.clientId);

  if (client) {
    res.status(200).json(client.folders);
  } else {
    res.status(404);
    throw new Error('Client not found');
  }
});

// @desc Get a single folder for a client
// @route GET /api/clients/:clientId/folders/:folderId
// @access Private
const getFolderFromClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.clientId);

  if (client) {
    const folder = client.folders.find((folder) => folder._id.toString() === req.params.folderId);

    if (folder) {
      res.status(200).json(folder);
    } else {
      res.status(404);
      throw new Error('Folder not found');
    }
  } else {
    res.status(404);
    throw new Error('Client not found');
  }
});

// @desc Update a folder for a client
// @route PUT /api/clients/:clientId/folders/:folderId
// @access Private
const updateFolderForClient = asyncHandler(async (req, res) => {
  const {
    folderName,
    nature,
    jurisdictions,
    currency,
    language,
    billingMethod,
    applicableRate,
    budgetedAmount,
    fixedExpenses,
    documentsPath,
  } = req.body;

  const client = await Client.findById(req.params.clientId);

  if (client) {
    const folderIndex = client.folders.findIndex((f) => f.id === folderId);
    if (folderIndex !== -1) {
      client.folders[folderIndex].folderName = folderName || client.folders[folderIndex].folderName;
      client.folders[folderIndex].nature = nature || client.folders[folderIndex].nature;
      client.folders[folderIndex].jurisdictions = jurisdictions || client.folders[folderIndex].jurisdictions;
      client.folders[folderIndex].currency = currency || client.folders[folderIndex].currency;
      client.folders[folderIndex].language = language || client.folders[folderIndex].language;
      client.folders[folderIndex].billing = billing || client.folders[folderIndex].billing;
      // burada folderın güncellendiği ve yeni halinin döndürüldüğüne dair bir bildirim veya loglama yapılabilir
      return client.folders[folderIndex];
    } else {
      // eğer folderId'ye karşılık gelen bir folder yoksa hata döndürülebilir
      throw new Error(`Folder with id ${folderId} not found for client ${clientId}.`);
    }
  } else {
    // eğer clientId'ye karşılık gelen bir client yoksa hata döndürülebilir
    throw new Error(`Client with id ${clientId} not found.`);
  }
});

module.exports = {
    addFolderToClient,
    getFoldersForClient,
    getFolderFromClient,
    updateFolderForClient
}