import pool,{query} from "../db";

export async function GET(){

    const [rows] = await pool.query(`SELECT projects.*, projects.id AS projectid, categories.*
    FROM projects
    LEFT JOIN categories ON categories.id = projects.category;
    SELECT category
    FROM categories
    WHERE status = 1;`)

    const projects = rows[0];  // First query result
    const categories = rows[1];  // Second query result

    return Response.json({projects, categories});


}