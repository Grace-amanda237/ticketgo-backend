const bcrypt = require('bcrypt');
const pool = require('../db');

exports.signup = async (req, res) => {
  const { firstName, lastName, email, gender, password } = req.body;

  try {
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'Email déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (prenoms, nom, email, genre, mot_de_passe) VALUES ($1, $2, $3, $4, $5)',
      [firstName, lastName, email, gender, hashedPassword]
    );

    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });

  } catch (error) {
    console.error('Erreur signup:', error);
    res.status(500).json({ message: 'Erreur serveur interne.' });
  }
};
