import { pool } from "../db";

export async function GET(){

    try{

    const [rows] =await pool.query(`SELECT * 
        FROM ksa_ideas 
        WHERE status = 1;`);

    return Response.json(rows);
    }
    catch(err){
        // return Response.json(err);
        return new Response(JSON.stringify({ error: 'Internal Server Error',error_message:err }), { status: 500 });
    }
    finally{
        if (pool) {
            await pool.end(); // This will close all connections in the pool.
        }
    }

}