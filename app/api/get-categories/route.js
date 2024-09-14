import { pool } from "../db";

export async function GET(){

    const [rows] = await pool.query('SELECT * FROM categories WHERE status=1');
    return Response.json(rows);

}