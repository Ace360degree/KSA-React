export const pool = mysql.createPool({
  host: 'localhost', // Use 'localhost' instead of the IP
  user: 'kuwalsan_kuwalsanam',
  password: 'KSA@admin1',
  database: 'kuwalsan_maindb',
  connectionLimit: 100,
  multipleStatements: true,  
  waitForConnections: true,
  queueLimit: 10000,
});
