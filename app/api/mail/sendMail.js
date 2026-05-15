// app/api/mail/sendMail.js
import nodemailer from "nodemailer";

// Main function to send any email
export async function sendMail({ to, subject, text, html }) {
  try {
    const transporter = nodemailer.createTransport({
      host: "mail.admin.kuwalsanamarchitekts.com",
      port: 465,
      secure: true,
      auth: {
        user: "mailer@admin.kuwalsanamarchitekts.com",
        pass: process.env.MAIL_PASSWORD, // NEVER hardcode passwords
      },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: '"Kuwal Sanam Architekts" <mailer@admin.kuwalsanamarchitekts.com>',
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

// NEW helper to send both user autoresponse + admin notification
export async function sendContactNotification({ userName, userEmail, message }) {
  // 1️⃣ Send confirmation to user
  await sendMail({
    to: userEmail,
    subject: "We received your message",
    text: `Hi ${userName},\n\nThank you for reaching out! We received your message:\n"${message}"\n\nWe will get back to you soon.`,
    html: `<p>Hi <strong>${userName}</strong>,</p>
           <p>Thank you for reaching out! We received your message:</p>
           <blockquote>${message}</blockquote>
           <p>We will get back to you soon.</p>`,
  });

  // 2️⃣ Notify admin
  await sendMail({
    to: "Office@ksarchitekts.com", // Replace with your admin email
    subject: "New Contact Form Submission",
    text: `New message received from ${userName} (${userEmail}):\n\n${message}`,
    html: `<p><strong>New Contact Form Submission:</strong></p>
           <p><strong>Name:</strong> ${userName}</p>
           <p><strong>Email:</strong> ${userEmail}</p>
           <p><strong>Message:</strong><br>${message}</p>`,
  });

  console.log("User and admin notified.");
}
