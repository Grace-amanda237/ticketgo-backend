require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Configuration CORS pour Flutter local + Render hébergé
const corsOptions = {
  origin: ['http://localhost:55143', 'https://ticketgo-backend.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

// 🔐 Middleware JWT
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Token invalide' });
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: 'Token manquant' });
  }
}

// 🔗 Routes
app.use('/api', authRoutes);
app.use('/api/users', verifyToken, userRoutes);

app.get('/', (req, res) => {
  res.send('🎫 TicketGo backend est en ligne !');
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
