const mysql = require('mysql2/promise');

// Create a connection pool
export const pool = mysql.createPool({
  host: '65.254.81.135',
  user: 'kuwalsanamarchit_kuwal_mainuser',
  password: `CZrK^OtQ$33^`,
  database: 'kuwalsanamarchit_maindb',
  connectionLimit: 100,  // A more reasonable connection limit
  multipleStatements: true,  
  waitForConnections: true,
  queueLimit: 10000,
});