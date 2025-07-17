const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',           // Ton nom d'utilisateur PostgreSQL
  host: 'localhost',          // Adresse du serveur
  database: 'ticketgo_db',    // Nom de ta base
  password: 'ton_mot_de_passe', // Ton mot de passe PostgreSQL
  port: 5432,                 // Port par défaut
});

module.exports = pool;
