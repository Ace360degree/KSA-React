// app/api/auth/signup/route.js
import bcrypt from 'bcrypt';
import { pool as db } from '../../db'; // Adjust the path to your db file
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { sendMail } from '../../mail/sendMail';


export async function POST(req) {
  try {
    // Parse the incoming request
    const { fullname,phone,email, password } = await req.json(); // Ensure you parse the request properly

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const currDate = new Date().toISOString().slice(0, 19).replace('T', ' ');


    // Perform the database query with await
    const [result] = await db.query('INSERT INTO users (fullname,phone,email,type,hashedPassword,last_loggedin) VALUES (?,?,?,?,?,?)', [fullname, phone, email,'webiste-signup', hashedPassword, currDate]);

    const emailSent = await sendMail({
      to: email,
      subject: 'Welcome to Kuwal Sanam Architekts',
      text: ``,
      html: `
      <h4>Hi ${fullname},\n\nThank you for signing up. We're excited to have you on board!</h4>
      <p>Welcome to our website. We are a global collective dedicated to sustainable development, utilizing technology, innovation, and rigorous research to build a better world.</p>
      <p>Explore our projects and gain deeper insights into our work.<br>
      Should you have any questions or wish to discuss potential collaborations with one of our experts, please don't hesitate to contact us.</p>`,
    });

    if (!emailSent) {
      console.warn('Failed to send the email, but user creation was successful.');
    }

    // Return success response
    return NextResponse.json({ message: 'User created', userId: result.insertId });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
  finally{
    // if(db){
    //   await db.end();
    // }
  }
}