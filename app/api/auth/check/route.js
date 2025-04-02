import { NextResponse } from "next/server";
import { pool } from "../../db";

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const {email} = await req.json();

    const [data] = await pool.query(`SELECT id,email,status FROM users WHERE email = '${email}'`);

    return NextResponse.json({ data: data[0] });
  } catch (error) {
    console.error("Error parsing JSON:", error);1
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
}
