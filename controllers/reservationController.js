const pool = require('../db');

exports.createReservation = async (req, res) => {
  try {
    const {
      fullName, phone, cniNumber, seatNumber,
      loadType, placeCount, tripType,
      departureDate, departureHour
    } = req.body;

    await pool.query(
      `INSERT INTO reservations (
        full_name, phone, cni_number, seat_number,
        load_type, place_count, trip_type,
        departure_date, departure_hour
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        fullName, phone, cniNumber, seatNumber,
        loadType, placeCount, tripType,
        departureDate, departureHour
      ]
    );

    res.status(201).json({ message: 'Réservation enregistrée ✅' });
  } catch (err) {
    console.error('❌ Erreur lors de la réservation :', err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
