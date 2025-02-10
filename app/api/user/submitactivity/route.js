import { NextResponse } from "next/server";
import { pool } from "../../db";

export async function POST(req) {
    try {
        // Parsing form data
        const body = await req.formData();
        const userID = body.get('user_id');
        const pathname = body.get('pathname');
        const timeSpent = body.get('duration');
        const IpAddress = body.get('ip_address');
        const Location = body.get('location');
        const device = body.get('device');

        // Perform the database insert query
        const submit = await pool.query(
            `INSERT INTO useractivities (email, pathname,time_spent,ipaddress,location,device) VALUES (?,?,?,?,?,?)`,
            [userID, pathname,timeSpent,IpAddress,Location,device]
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
