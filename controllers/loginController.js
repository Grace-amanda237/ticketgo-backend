const bcrypt = require('bcrypt');
const pool = require('../config/db');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔍 Vérifie si l'utilisateur existe
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const user = result.rows[0];

    // 🔐 Vérifie le mot de passe
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // ✅ Connexion réussie
    res.status(200).json({ message: 'Connexion réussie', user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      gender: user.gender
    }});
  } catch (error) {
    console.error('Erreur dans login :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  login,
};
