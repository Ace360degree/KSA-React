// app/api/auth/signup/route.js
import { pool as db } from '../../db'; // Adjust the path to your db file
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    // Parse the incoming request
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Perform database queries with parameterized input to prevent SQL injection
    const [userRows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const [blacklistRows] = await db.query('SELECT * FROM blacklisted_users WHERE email = ?', [email]);

    // Check if the email exists in either table
    const accountExists = userRows.length > 0;
    const isBlacklisted = blacklistRows.length > 0;

    if (isBlacklisted) {
      return NextResponse.json({ message: 'Email is blacklisted' });
    }

    // Return appropriate response
    return NextResponse.json({ account: !accountExists });

  } catch (error) {
    console.error('Error checking email:', error);
    return NextResponse.json({ error: 'Error fetching email' }, { status: 500 });
  }
}
