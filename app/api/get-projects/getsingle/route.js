import { NextResponse } from 'next/server';
import { pool } from '../../db';

export async function GET(req) {
    try {
        // Extract URL slug from the query parameters
        const params = req.nextUrl.searchParams;
        const urlSlug = params.get('id');

        if (!urlSlug) {
            return new Response(JSON.stringify({ error: 'URL slug is required' }), { status: 400 });
        }

        // Query to fetch the project details
        const [projectRows] = await pool.query(
            `SELECT pb.*, c.category 
             FROM projects_beta pb
             LEFT JOIN categories c ON pb.category = c.id
             WHERE pb.url_slug = ?`,
            [urlSlug]
        );
        

        if (projectRows.length === 0) {
            return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });
        }

        const project = projectRows[0];

        // Query to fetch tabs (sections) related to the project
        const [tabsRows] = await pool.query(
            'SELECT * FROM projects_sections WHERE project_id = ? ORDER BY sequence ASC',
            [project.id]
        );

        // Query to fetch attributes related to the project
        const [attributesRows] = await pool.query(
            'SELECT * FROM projects_attributes WHERE project_id = ?',
            [project.id]
        );

        // Query to fetch highlights points related to the project
        const [pointsRows] = await pool.query(
            'SELECT * FROM project_highlights_points WHERE project_id = ?',
            [project.id]
        );

        // Initialize slides array
        const slidesData = [];

        // Fetch slides for each tab
        for (const tab of tabsRows) {
            const [slidesRows] = await pool.query(
                'SELECT * FROM projects_slides WHERE project_id = ? AND section_id = ?',
                [project.id, tab.id]
            );
            slidesData.push({ section_id: tab.id, slides: slidesRows });
        }

        // Assemble the final data object
        const data = {
            project,
            tabs: tabsRows,
            attributes: attributesRows,
            points: pointsRows,
            slides: slidesData,
        };

        // Return the JSON response
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        // Handle errors
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
