import { pool } from "../db";

export async function GET() {
    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Execute the query to fetch ideas
        const [rows] = await connection.query(`SELECT * 
            FROM ksa_ideas 
            WHERE status = 1;`);

        // Return the rows as a JSON response
        return new Response(JSON.stringify(rows), { status: 200 });

    } catch (err) {
        console.error(err); // Log the error for debugging
        return new Response(JSON.stringify({ error: 'Internal Server Error', error_message: err.message }), { status: 500 });
    } finally {
        // Ensure the connection is released back to the pool
        if (connection) {
            await connection.release(); // Release the connection back to the pool
        }
    }
}
