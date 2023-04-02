const express = require('express');
const {registerUser, loginUser, getMe, getUserById, getAllUsers, updateUser} = require("../controllers/userController");

const router = express.Router();
const {protect} = require("../middleware/authMiddleware");


// @desc: Register a new user
router.post('/', registerUser);
// @desc: Login a user
router.post('/login', loginUser);
// @desc: Get current logged in user
router.get('/me',protect, getMe);
// @desc: Get user by id
router.get('/:userId', getUserById);
// @desc: Get all users
router.get('/', getAllUsers);
// @desc: Update user profile
router.put('/:userId', updateUser);



module.exports = router;