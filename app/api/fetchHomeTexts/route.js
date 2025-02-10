import { pool } from "../db";
export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";

export async function GET(){
    let connection;
    try{
        connection = await pool.getConnection();
        const [data] = await connection.query('SELECT * FROM home_animated_texts WHERE id = 1');
        return NextResponse.json({data},{status:200});
    }catch(err){
        return NextResponse.json({message:'Something went Wrong',Error:err},{status:500});
    }
    finally{
        if (connection) {
            await connection.release(); // Release the connection back to the pool
        }
    }

}