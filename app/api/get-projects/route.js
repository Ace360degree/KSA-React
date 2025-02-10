import { NextResponse } from "next/server";
import { pool } from "../db";  // Make sure pool is properly initialized
export const dynamic = 'force-dynamic';

export async function GET() {
    let connection; // Declare connection variable

    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Execute both queries
        const [projectsRows] = await connection.query(`
            SELECT projects_beta.*, projects_beta.id AS projectid, categories.*
            FROM projects_beta
            LEFT JOIN categories ON categories.id = projects_beta.category ORDER BY projects_beta.sequence;
        `);
        
        const [categoriesRows] = await connection.query(`
            SELECT category
            FROM categories
            WHERE status = 1;
        `);

        const projects = projectsRows;  // First query result
        const categories = categoriesRows;  // Second query result

        const response = NextResponse.json({ projects, categories });

        // Set cache-control headers to prevent caching
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

        return response;

    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({ error: 'Error fetching data', error_message: error.message }, { status: 500 });
    } finally {
        // Ensure the connection is released back to the pool
        if (connection) {
           await connection.release();  // Release the connection back to the pool
        }
    }
}
