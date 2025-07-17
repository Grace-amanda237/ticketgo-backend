const express = require('express');
const router = express.Router();
const { getReservationsByPhone } = require('../controllers/authController');

router.get('/my-reservations', getReservationsByPhone);

module.exports = router;
