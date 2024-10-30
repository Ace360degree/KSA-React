import { pool } from "../../db";
export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";

export async function GET(){
    let connection;

    try{

        connection = await pool.getConnection();

        const [rows]= await connection.query('SELECT * FROM home_project_images WHERE status = 1');

        return NextResponse.json({rows}, { status: 200 })
    }
    catch(err){
        
        return NextResponse.json({ message:'Soemthing went wrong', error:err }, { status: 500 })
    }
    finally{
        if (connection) {
            await connection.release(); // Release the connection back to the pool
        }
    }

}
