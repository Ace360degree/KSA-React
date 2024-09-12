
const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: '162.215.254.94',
  user: 'clients_ksauser',
  password: 'MyOEZ8qjlh()',
  database: 'clients_ksa',
  connectionLimit: 100000, // Adjust this value based on your needs
  multipleStatements: true,  
});

// Export the pool to be used in other modules
module.exports = pool;