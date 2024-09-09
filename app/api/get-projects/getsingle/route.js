import { pool } from '../../db';

export async function POST(request) {
    try {
        // Parse the JSON body of the request
        const reqBody = await request.json();
        const slug = reqBody.slug;

        // Check if slug is provided
        if (!slug) {
            return new Response(JSON.stringify({ error: 'Slug is required' }), { status: 400 });
        }

        // Use parameterized query to prevent SQL injection
        const [rows] = await pool.query(`SELECT * FROM projects WHERE url_slug = ?`, [slug]);

        // Check if the project was found
        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });
        }

        // Return the found project
        return new Response(JSON.stringify(rows[0]), { status: 200 });
    } catch (error) {
        // Handle errors
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}