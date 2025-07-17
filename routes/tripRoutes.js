const express = require('express');
const router = express.Router();
const Trip = require('../models/tripModel');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

// 🆕 Ajouter un trajet
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📋 Tous les trajets
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Modifier un trajet
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trajet non trouvé' });

    await trip.update(req.body);
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Supprimer un trajet
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trajet non trouvé' });

    await trip.destroy();
    res.json({ message: 'Trajet supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
