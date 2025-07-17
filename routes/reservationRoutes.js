const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservationModel');
const Trip = require('../models/tripModel');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

// ✅ Créer une réservation
router.post('/', authenticate, async (req, res) => {
  try {
    const reservation = await Reservation.create({
      ...req.body,
      UserId: req.user.userId,
    });
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👤 Mes réservations
router.get('/me', authenticate, async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { UserId: req.user.userId },
      include: Trip,
    });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Valider une réservation (admin)
router.put('/:id/valider', authenticate, isAdmin, async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Non trouvée' });

    reservation.status = 'validée';
    await reservation.save();
    res.json({ message: 'Réservation validée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
