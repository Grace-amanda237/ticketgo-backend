const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

// Routes → Regroupe-les toutes ici !
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Utilisation des routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/reservations', reservationRoutes);

// Connexion à PostgreSQL
sequelize.authenticate()
  .then(() => console.log('✅ Connexion à PostgreSQL réussie'))
  .catch(err => console.error('❌ Erreur de connexion PostgreSQL :', err));

sequelize.sync()
  .then(() => console.log('🗄️ Modèles synchronisés'))
  .catch(err => console.error('❌ Erreur de synchronisation :', err));

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend Ticketgo lancé sur http://localhost:${PORT}`);
});
