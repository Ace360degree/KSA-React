// app/api/auth/signup/route.js
import { pool as db } from '../../db'; // Adjust the path to your db file
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';


export async function POST(req) {
  try {
    // Parse the incoming request
    const { email } = await req.json(); // Ensure you parse the request properly

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
      }
  
      // Perform the database query with parameterized input to prevent SQL injection
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  
      // Check if a user with the provided email exists
      const accountExists = rows.length > 0;
  
      // Return appropriate response
      return NextResponse.json({ account: !accountExists });
  
} catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error fetching Email' }, { status: 500 });
  }
  finally{
    // if(db){
    //   await db.end();
    // }
  }
}