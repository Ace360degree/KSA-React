import { NextResponse } from "next/server";
import { pool } from "../db";
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Execute both queries
        const [projectsRows] = await pool.query(`
            SELECT projects_beta.*, projects_beta.id AS projectid, categories.*
            FROM projects_beta
            LEFT JOIN categories ON categories.id = projects_beta.category;
        `);
        
        const [categoriesRows] = await pool.query(`
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
        return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
    } finally {
        // Close the pool connection
        await pool.end();
    }
}
