import bcrypt from 'bcrypt';
import { pool as db } from '../../db'; // Adjust the path to your db file
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { sendMail } from '../../mail/sendMail';

export async function POST(req) {
  try {
    console.log("Received signup request");

    const { fullname, phone, email, password } = await req.json();
    console.log("Parsed request body:", { fullname, phone, email });

    if (!fullname || !phone || !email || !password) {
      console.warn("Missing required fields");
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    const currDate = new Date().toLocaleString();
    let insertId;

    try {
      const [result] = await db.query(
        'INSERT INTO users (fullname, phone, email, type, hashedPassword, total_loggins, signedupdate, status) VALUES (?, ?, ?, ?, ?, ?, NOW(), 1)',
        [fullname, phone, email, 'website-signup', hashedPassword, 0]
      );
      insertId = result.insertId;
      console.log("User inserted into DB with ID:", insertId);
    } catch (dbError) {
      console.error("Database insertion failed:", dbError.message, dbError.stack);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    try {
      const emailSent = await sendMail({
        to: email,
        subject: 'Welcome to Kuwal Sanam Architekts',
        text: ``,
        html: `
          <h4>Hi ${fullname},</h4>
          <p>Thank you for signing up. We're excited to have you on board!</p>
          <p>Welcome to our website. We are a global collective dedicated to sustainable development, utilizing technology, innovation, and rigorous research to build a better world.</p>
          <p>Explore our projects and gain deeper insights into our work.<br>
          Should you have any questions or wish to discuss potential collaborations with one of our experts, please don't hesitate to contact us.</p>
          <br/>
          <p><strong>Please verify your email by clicking the following link: <a href="https://visit.kuwalsanamarchitekts.com/api/verify.php?user_id=${insertId}">Verify Now</a></strong></p>
        `,
      });
      console.log("Welcome email sent:", emailSent);
    } catch (mailError) {
      console.error("Error sending welcome email:", mailError.message);
    }

    if (!process.env.NEXT_PUBLIC_ADMIN_MAIL) {
      console.warn("Environment variable NEXT_PUBLIC_ADMIN_MAIL is missing.");
    } else {
      try {
        const adminSend = await sendMail({
          to: process.env.NEXT_PUBLIC_ADMIN_MAIL,
          subject: 'New User Signup',
          text: '',
          html: `
            <h2>New User Signup</h2>
            <p>Congratulations, a new user has signed up to KSA.</p>
            <p><strong>Full Name:</strong> ${fullname}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Signup Type:</strong> Website Signup</p>
            <p><strong>Date:</strong> ${currDate}</p>
          `,
        });
        console.log("Admin email sent:", adminSend);
      } catch (adminMailError) {
        console.error("Error sending admin email:", adminMailError.message);
      }
    }

    return NextResponse.json({ message: 'User created', userId: insertId });

  } catch (error) {
    console.error('Unexpected error in signup route:', error.message, error.stack);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
