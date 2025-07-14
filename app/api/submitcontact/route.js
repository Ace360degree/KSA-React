import { NextResponse } from "next/server";
import { pool } from "../db";
import nodemailer from "nodemailer";
import { sendMail } from "../mail/sendMail";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const description = formData.get('description');

    const formStatus = 1;
    const sql = 'INSERT INTO contact_submissions (name, phone, email, description, status) VALUES (?, ?, ?, ?, ?)';

    // Use a connection from the pool and release it automatically after the query
    const connection = await pool.getConnection(); // Get a connection from the pool
    await connection.query(sql, [name, phone, email, description, formStatus]);

    connection.release(); // Release the connection back to the pool

    // Send email to admin
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_MAIL; // Replace with the admin's email address
    const adminSubject = "KSA Website Submissions";
    const adminMessage = `
      <h1>New Contact Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Description:</strong> ${description}</p>
    `;

    // Send email to user
    const userSubject = "Confirmation of Your Submission";
    const userMessage = `
      <h1>Thank You for Your Submission</h1>
      <p>Dear ${name},</p>
      <p>Thank you for reaching out to us. We have received your message:</p>
      <p><strong>${description}</strong></p>
      <p>We will get back to you shortly.</p>
    `;

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: "admin.kuwalsanamarchitekts.com", 
      port: 587, 
      secure: false, 
      auth: {
        user: "mailer@admin.kuwalsanamarchitekts.com", 
        pass: "dDqV$s_q*tM!", 
      },
    });
    
     // Send email to admin
    const sendAdminMail = await sendMail({
      from: `"Kuwal Sanam Architekts" <${process.env.NEXT_PUBLIC_ADMIN_MAIL}>`, 
      to: adminEmail,
      subject: adminSubject,
      html: adminMessage,
    })

    if(!sendAdminMail){
      console.warn('Admin mail not sent');
    }
   

    // Send email to user
    const senduserMail  = await sendMail({
      from: `"Kuwal Sanam Architekts" <${process.env.NEXT_PUBLIC_ADMIN_MAIL}>`, 
      to: email,
      subject: userSubject,
      html: userMessage,
    });
    
    if(!sendAdminMail){
      console.warn('User mail not sent');
    }

    return NextResponse.json({ message: 'Form submitted successfully and emails sent!' }, { status: 200 });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return NextResponse.json({ message: 'Server Error!', error_message: err.message }, { status: 500 });
  }
}
