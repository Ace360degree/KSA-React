// app/api/auth/logout/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '../nextauth'; // Ensure this path is correct
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
// export const dynamic = 'force-dynamic';


export async function POST(req) {
  // const session = await getServerSession(authOptions);
  try{
    // Perform any additional logout logic here if needed (e.g., log events, revoke tokens, etc.)
    cookies().set('isLogin', '', { expires: new Date(0) });
    cookies().set('authToken', '', { expires: new Date(0) });
    return NextResponse.json({ message: 'Logged out successfully' });
  }
  catch(err){
    return NextResponse.json({ message: 'Internal Server error', err_message:err },{status:500});
  }

  // return NextResponse.json({ error: 'No active session' }, { status: 400 });
}
