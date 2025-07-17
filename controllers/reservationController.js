exports.getReservationsByPhone = async (req, res) => {
    const { phone } = req.query;
  
    try {
      const result = await pool.query(
        'SELECT * FROM reservations WHERE phone = $1 ORDER BY departure_date DESC',
        [phone]
      );
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };
  