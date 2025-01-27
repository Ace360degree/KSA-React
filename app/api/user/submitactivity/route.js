import { NextResponse } from "next/server";
import { pool } from "../../db";

export async function POST(req,res){
    
    try{
        const body = await req.formData();
        const userID = body.get('user_id');
        const pathname = body.get('pathname');

        const submit = await pool.query(`INSERT INTO useractivities (user_id,pathname) VALUES (?,?)`,[userID,pathname]); 

        return NextResponse.json({'status':'success','user-data-inserted':true});

    }
    catch(err){
        console.log('Could not Insert User Data',err);
    }
    
}
