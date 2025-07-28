require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('🎫 TicketGo backend est en ligne !');
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
