import { pool } from "../db";
export const dynamic = 'force-dynamic';


export async function GET(){

    try{
    const [rows] = await pool.query('SELECT * FROM categories WHERE status=1');
    return Response.json(rows);
    }
    catch(err){
        return Response.json({message:'Internal Server Error',error_message:err},{ status: 500 });
    }
    finally{
        if(pool){
            await pool.end();
        }
    }

}