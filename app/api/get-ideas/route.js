import { pool } from "../db";

export async function GET(){


    const [rows] =await pool.query(`SELECT * 
FROM ksa_ideas 
WHERE status = 1;`);

    return Response.json(rows);


}