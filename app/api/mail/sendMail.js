import nodemailer from "nodemailer";

export async function sendMail({ to, subject, text, html }) {
  try {
    const transporter = nodemailer.createTransport({
      host: "mail.admin.kuwalsanamarchitekts.com",

      port: 465,
      secure: true,

      auth: {
        user: "mailer@admin.kuwalsanamarchitekts.com",
        pass: process.env.MAIL_PASSWORD,
      },

      tls: {
        rejectUnauthorized: false,
      },
    });

    // IMPORTANT
    await transporter.verify();

    console.log("SMTP Connected");

    const info = await transporter.sendMail({
      from: '"Kuwal Sanam Architekts" <mailer@admin.kuwalsanamarchitekts.com>',
      to,
      subject,
      text,
      html,
    });

    console.log("Mail Sent:", info);

    return true;
  } catch (err) {
    console.error("FULL MAIL ERROR:", err);

    return false;
  }
}
