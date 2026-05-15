// app/api/mail/sendMail.js
import nodemailer from 'nodemailer';

export async function sendMail({ to, subject, text, html }) {
  try {
    // Configure the mail transporter
    const transporter = nodemailer.createTransport({
      host: 'mail.admin.kuwalsanamarchitekts.com', // Replace with your SMTP server
      port: 465, // Common SMTP port
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'mailer@admin.kuwalsanamarchitekts.com', // Replace with your email
        pass: 'touRtjOLXa37L=O.', // Replace with your email password
      },
    });

    // Define the mail options
    const mailOptions = {
      from: '"Kuwal Sanam Architekts" mailer@admin.kuwalsanamarchitekts.com', // Replace with your sender email
      to,
      subject,
      text,
      html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
