import { NextResponse } from "next/server";
import { pool } from "../../db";
export const dynamic = 'force-dynamic';


export async function GET(req) {
    const params = req.nextUrl.searchParams;
    const urlSlug = params.get('id');

    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Execute the first query to fetch idea details
        const [ideaRows] = await connection.query(`
            SELECT *
            FROM ksa_ideas 
            WHERE url_slug = ?`, [urlSlug]);

        const idea = ideaRows[0]; // Extract the first result

        // Check if the idea exists before querying images
        if (idea) {
            // Execute the second query to fetch images related to the idea
            const [ideasImagesRows] = await connection.query(`
                SELECT * 
                FROM ideas_images 
                WHERE idea_id = ?`, [idea.id]);

            const ideasContent = ideasImagesRows; // Assign image rows to ideasContent

            // Return both idea and its related images as a JSON response
            return NextResponse.json({ idea, ideasContent });
        } else {
            // Return an error if the idea doesn't exist
            return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
        }

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        // Ensure the connection is released back to the pool
        if (connection) {
            connection.release(); // Release the connection back to the pool
        }
    }
}
