// app/api/auth/signup/route.js
import bcrypt from 'bcrypt';
import { pool as db } from '../../db'; // Adjust the path to your db file
import { NextResponse } from 'next/server';
// export const dynamic = 'force-dynamic';


export async function POST(req) {
  try {
    // Parse the incoming request
    const { email, password } = await req.json(); // Ensure you parse the request properly

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Perform the database query with await
    const [result] = await db.query('INSERT INTO users (email, hashedPassword) VALUES (?, ?)', [email, hashedPassword]);

    // Return success response
    return NextResponse.json({ message: 'User created', userId: result.insertId });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
  finally{
    if(db){
      await db.end();
    }
  }
}
