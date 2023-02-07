const { Pool } = require('pg');

const pool = new Pool({
   host: 'localhost',
   port: 5432,
   user: 'cbx',
   password: '123456',
   database: 'my_store'
});

module.exports = pool;
