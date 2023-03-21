const Folder = require("../models/folderModel");

// Get all folders for a client
const getClientFolders = async (req, res) => {
  try {
    const folders = await Folder.find(req.params.clientId);
    res.status(200).json(folders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new folder for a client
const createClientFolder = async (req, res) => {
  try {
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
      userId,
      clientId,
    } = req.body;
    const newFolder = new Folder({
      folderName,
      nature,
      jurisdictions,
      currency,
      language,
      userId,
      clientId,
      billingMethod,
      applicableRate,
      budgetedAmount,
      fixedExpenses,
      documentsPath,
    });
    const savedFolder = await newFolder.save();
    res.status(201).json(savedFolder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a single folder for a client
const getClientFolder = async (req, res) => {
  try {
    const folder = await Folder.findOne({
      _id: req.params.id,
      clientId: req.params.clientId,
    });
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    res.status(200).json(folder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a folder for a client
const updateClientFolder = async (req, res) => {
  try {
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
    const updatedFolder = await Folder.findOneAndUpdate(
      { _id: req.params.id, clientId: req.params.clientId },
      {
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
      },
      { new: true }
    );
    if (!updatedFolder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    res.status(200).json(updatedFolder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a folder for a client
const deleteClientFolder = async (req, res) => {
  try {
    const deletedFolder = await Folder.findOneAndDelete({
      _id: req.params.id,
      clientId: req.params.clientId,
    });
    if (!deletedFolder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    res.status(200).json(deletedFolder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getClientFolders,
  createClientFolder,
  getClientFolder,
  updateClientFolder,
  deleteClientFolder,
};
