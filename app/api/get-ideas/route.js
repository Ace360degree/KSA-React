import { pool } from "../db";
export const dynamic = 'force-dynamic';

export async function GET() {
    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Execute the query to fetch ideas
        const [ideas] = await connection.query(`
            SELECT * 
            FROM ksa_ideas 
            WHERE status = 1;
        `);

        // Execute the query to fetch categories
        const [categories] = await connection.query(`
            SELECT * 
            FROM ideas_categories 
            WHERE status = 1;
        `);

        // Return both ideas and categories as a JSON response
        return new Response(JSON.stringify({ ideas, categories }), { status: 200 });

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
