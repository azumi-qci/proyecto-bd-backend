'use strict';

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
});

pool.on('error', (error, client) => {
  console.error('Se generó un error con el cliente de PostgreSQL', error);
});

module.exports = { pool };
