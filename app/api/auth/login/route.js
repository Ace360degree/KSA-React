import bcrypt from 'bcrypt';
import { pool as db } from '../../db'; // Adjust the path to your db file
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Secret key for signing JWT, store this in your environment variable
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function POST(req) {
  try {
    // Parse the incoming request
    const { email, password } = await req.json();

    // Fetch user details from the database
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'No user found with this email' }, { status: 404 });
    }

    const user = rows[0];

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // If password matches, generate a JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: '1d' } // Token valid for 1 day
    );

    // Create an array of cookie data including isLogin
    const cookiesToSet = [
      {
        name: 'authToken',
        value: token,
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 86400, // 1 day expiration
        },
      },
      {
        name: 'userEmail',
        value: user.email,
        options: {
          path: '/',
          maxAge: 3600, // 1 hour expiration
        },
      },
      {
        name: 'userName',
        value: user.name,
        options: {
          path: '/',
          maxAge: 3600, // 1 hour expiration
        },
      },
      {
        name: 'isLogin',
        value: true, // Setting isLogin to true
        options: {
          path: '/',
          maxAge: 86400, // 1 day expiration
        },
      },
    ];

    // Initialize the response
    const response = NextResponse.json({
      message: 'Login successful',
      userId: user.id,
      token, // Include the generated JWT token
      isLogin: true, // Include the isLogin boolean in the response
    });

    // Set the cookies from the array
    cookiesToSet.forEach((cookie) => {
      response.cookies.set(cookie.name, cookie.value, cookie.options);
    });

    return response;

  } catch (error) {
    console.error('Error during login:', error.message, error.stack);
    return NextResponse.json({ error: 'Error during login',error_message:error.message }, { status: 500 });
  }
  finally{
    if(db){
      await db.end();
    }
  }
}
