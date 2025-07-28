const pool = require('../config/db');

const getTrips = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM trips');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erreur dans getTrips :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getTrips,
};
