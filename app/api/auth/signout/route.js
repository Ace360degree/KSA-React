// app/api/auth/logout/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '../nextauth'; // Ensure this path is correct
import { NextResponse } from 'next/server';

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (session) {
    // Perform any additional logout logic here if needed (e.g., log events, revoke tokens, etc.)
    
    return NextResponse.json({ message: 'Logged out successfully' });
  }

  return NextResponse.json({ error: 'No active session' }, { status: 400 });
}
