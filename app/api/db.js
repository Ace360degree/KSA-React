import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: '66.116.237.145', 
  user: 'kuwalsan_kuwalsanam',
  password: 'KSA@admin1',
  database: 'kuwalsan_maindb',
  connectionLimit: 100,
  multipleStatements: true,  
  waitForConnections: true,
  queueLimit: 10000,
});
