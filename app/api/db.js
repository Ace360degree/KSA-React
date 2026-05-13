const mysql = require('mysql2/promise');

// Create a connection pool
export const pool = mysql.createPool({
host: 'localhost', // Usually 'localhost' works on cPanel
user: 'kuwalsan_kuwalsanam',
password: 'KSA@admin1',
database: 'kuwalsan_maindb', // Must match the backend!
  // host: '65.254.81.135',
  // user: 'kuwalsanamarchit_kuwal_mainuser',
  // password: `CZrK^OtQ$33^`,
  // database: 'kuwalsanamarchit_maindb',
  connectionLimit: 100,  // A more reasonable connection limit
  multipleStatements: true,  
  waitForConnections: true,
  queueLimit: 10000,
});
