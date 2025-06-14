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

    const hashedPassword = await bcrypt.hash(password, 10);
    const currDate = new Date().toLocaleString();



    // Perform the database query with await
    const [result] = await db.query('INSERT INTO users (fullname,phone,email,type,hashedPassword,total_loggins,signedupdate,status) VALUES (?,?,?,?,?,?,NOW(),1)', [fullname, phone, email,'website-signup', hashedPassword,0]);
    const insertId = result.insertId;
    const emailSent = await sendMail({
      to: email,
      subject: 'Welcome to Kuwal Sanam Architekts',
      text: ``,
      html: `
      <h4>Hi ${fullname},\n\nThank you for signing up. We're excited to have you on board!</h4>
      <p>Welcome to our website. We are a global collective dedicated to sustainable development, utilizing technology, innovation, and rigorous research to build a better world.</p>
      <p>Explore our projects and gain deeper insights into our work.<br>
      Should you have any questions or wish to discuss potential collaborations with one of our experts, please don't hesitate to contact us.</p>
      <br/>
      <br/>
      <p><strong>Please verify Your Email by Clicking on the following link: <a href="https://visit.kuwalsanamarchitekts.com/api/verify.php?user_id=${insertId}">Verfiy Now</a></strong></p>
      `,
    });
    if (!emailSent) {
      console.warn('Failed to send the email, but user creation was successful.');
    } 

    const adminSend = await sendMail({
      to:process.env.NEXT_PUBLIC_ADMIN_MAIL,
      subject:'New User Signup',
      text:"",
      html:`
        <h2>New User Signup</h2>
        <p>Congratulations, A new user has signed up to KSA.</p>
        <p>Here are the details:</p>
        <p><strong>Full Name:</strong> ${fullname}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Signup Type:</strong> Website Signup</p>
        <p><strong>Date:</strong> ${currDate}</p>
        <br>
      `,
    });

    if(!adminSend){
      console.warn('Failed to send the mail to Admin.');
    }

    // Return success response
    return NextResponse.json({ message: 'User created', userId: result.insertId });
  } catch (error) {
    console.error('Error creating user:', error.message, error.stack);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
  finally{
    // if(db){
    //   await db.end();
    // }
  }
}