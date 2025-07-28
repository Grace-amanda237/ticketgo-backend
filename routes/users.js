const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userController');

// 🔍 Route GET pour lister tous les utilisateurs
router.get('/', getAllUsers);

module.exports = router;
