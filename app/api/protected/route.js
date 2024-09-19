// app/api/protected/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
  const authHeader = req.headers.get('Authorization');
  
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header missing' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Token is valid, proceed with your logic
    return NextResponse.json({ message: 'Protected content', user: decoded });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}
