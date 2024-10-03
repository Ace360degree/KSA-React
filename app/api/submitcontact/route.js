import { NextResponse } from "next/server";
import { pool } from "../db";

export async function POST(req){
    try{    const formData = await req.formData()
    const name = formData.get('name');
    const email = formData.get('email');
    const description = formData.get('description');

    const formStatus =1;
    const sql = 'INSERT INTO contact_submissions (name, email, description, status) VALUES (?, ?, ?, ?)';
    pool.query(sql, [name, email, description,formStatus]);
    return Response.json({ message: 'Form submitted successfully!'},{ status: 200 } )
}
catch(err){
    return Response.json({ message: 'Server Error!',error_message:err},{ status: 500 } )
}
finally{
    if(pool){
        await pool.end();
    }
}
}   