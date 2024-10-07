import { NextResponse } from "next/server";
import { pool } from "../db";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const description = formData.get('description');

    const formStatus = 1;
    const sql = 'INSERT INTO contact_submissions (name, email, description, status) VALUES (?, ?, ?, ?)';

    // Use a connection from the pool and release it automatically after the query
    const connection = await pool.getConnection(); // Get a connection from the pool
    await connection.query(sql, [name, email, description, formStatus]);

    connection.release(); // Release the connection back to the pool

    return NextResponse.json({ message: 'Form submitted successfully!' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Server Error!', error_message: err.message }, { status: 500 });
  }
}
