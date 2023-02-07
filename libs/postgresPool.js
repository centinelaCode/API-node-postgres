const { Pool } = require('pg');

const { config } = require('../config/config')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgresql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({ connectionString: URI });
console.log('Connected DB Postgres!')

module.exports = pool;
