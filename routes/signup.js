const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/signupController');

router.post('/', registerUser);

module.exports = router;
