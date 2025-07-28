const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

// Route pour obtenir tous les voyages
router.get('/trips', tripController.getTrips);

module.exports = router;
