
const mysql = require('mysql2/promise');

// Create a connection pool
// export const pool = mysql.createPool({
//   host: '162.215.254.94',
//   user: 'clients_ksauser',
//   password: 'MyOEZ8qjlh()',
//   database: 'clients_ksa',
//   connectionLimit: 100000, // Adjust this value based on your needs
//   multipleStatements: true,  
// });

export const pool = mysql.createPool({
  host: '119.18.54.56',
  user: 'cosmon1u_ksauser',
  password: `MyOEZ8qjlh()`,
  database: 'cosmon1u_ksa',
  connectionLimit: 5000000000, // Adjust this value based on your needs
  multipleStatements: true,  
});

// Export the pool to be used in other modules
// module.exports = pool;