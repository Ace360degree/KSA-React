import { NextResponse } from "next/server";
import { pool } from "../../db";

export async function POST(req) {
    try {
        // Parsing form data
        const body = await req.formData();
        const userID = body.get('user_id');
        const pathname = body.get('pathname');

        // Perform the database insert query
        const submit = await pool.query(
            `INSERT INTO useractivities (user_id, pathname) VALUES (?, ?)`,
            [userID, pathname]
        );

        // Return success response
        return NextResponse.json({
            status: 'success',
            user_data_inserted: true
        });
    } catch (err) {
        // Log the error and return a failure response
        console.error('Could not Insert User Data', err);
        return NextResponse.json({
            status: 'error',
            message: 'Could not insert user data',
        }, { status: 500 });
    }
}
