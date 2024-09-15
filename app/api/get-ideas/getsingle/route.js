import { NextResponse } from "next/server";
import { pool } from "../../db";


export async function GET(req){

    const params = req.nextUrl.searchParams;
    const urlSlug = params.get('id');

    try{

        // Execute the first query to fetch idea details
    const [ideaRows] = await pool.query(`
        SELECT * 
        FROM ksa_ideas 
        WHERE url_slug = ?`, [urlSlug]);

    const idea = ideaRows[0]; // Extract the first result

    // Check if the idea exists before querying images
        if (idea) {
    // Execute the second query to fetch images related to the idea
    const [ideasImagesRows] = await pool.query(`
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


    }catch(err){
        return NextResponse.json(err);
    }

}