import { pool } from "../db";
export const dynamic = 'force-dynamic';

export async function GET() {
  let connection;
  
  try {
    // Get a connection from the pool
    connection = await pool.getConnection();

    // Execute the query
    const [rows] = await connection.query('SELECT * FROM categories WHERE status=1');
    
    // Return the rows as a response
    return Response.json(rows);
  } catch (err) {
    // Handle errors and return a response with a status of 500
    return Response.json({ message: 'Internal Server Error', error_message: err.message }, { status: 500 });
  } finally {
    // Release the connection back to the pool if it was acquired
    if (connection) {
      connection.release();
    }
  }
}
