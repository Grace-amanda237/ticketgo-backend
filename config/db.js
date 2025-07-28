const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',              // Ton utilisateur PostgreSQL
  host: '192.168.1.186',             // Ou ton IP locale : 192.168.X.X
  database: 'ticketgo_db',       // Nom de ta base de données
  password: 'loevan20',  // Ton mot de passe PostgreSQL
  port: 5432,
});

module.exports = pool;
