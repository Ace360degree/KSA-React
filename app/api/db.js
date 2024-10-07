const mysql = require('mysql2/promise');

// Create a connection pool
export const pool = mysql.createPool({
  host: '119.18.54.56',
  user: 'cosmon1u_ksauser',
  password: `MyOEZ8qjlh()`,
  database: 'cosmon1u_ksa',
  connectionLimit: 100,  // A more reasonable connection limit
  multipleStatements: true,  
  waitForConnections: true,
  queueLimit: 10000,  // Limit queued queries to prevent server overload
});
