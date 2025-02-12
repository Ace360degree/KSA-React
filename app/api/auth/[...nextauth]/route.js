import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool as db } from '../../db'; // Adjust the path to your db file
import { sendMail } from '../../mail/sendMail';

// Secret key for signing JWT, store this in your environment variables
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

const handler = NextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      // clientId: '470557745983-j6mbjmj8g78nbsfjfnojtqmrg7odsn6e.apps.googleusercontent.com',
      // clientSecret: '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',
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const [blacklistRows] = await db.query('SELECT * FROM blacklisted_users WHERE email = ?', [email]);
        if (blacklistRows.length > 0) {
          throw new Error('Error: Something went wrong! Please try again.');
        }

        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
          throw new Error('No user found with this email');
        }

        const user = rows[0];

        if(!user.status){
          throw new Error('Email ID not Verified.');
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
          throw new Error('Invalid credentials');
        }

        // Update logged-in details
        await db.query(
          'UPDATE users SET last_loggedin = NOW(), total_loggins = total_loggins + 1 WHERE id = ?',
          [user.id]
        );

        return {
          id: user.id,
          email: user.email,
          name: user.fullname || user.name,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
    updateAge: 0,
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: null,
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userid = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.userid = token.userid;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
    async signIn({ user, account }) {
      const email = user.email;

      // Check if the email is blacklisted
      const [blacklistRows] = await db.query('SELECT * FROM blacklisted_users WHERE email = ?', [email]);
      if (blacklistRows.length > 0) {
        // throw new Error('Your email has been blacklisted. Please contact support.');
        return `/auth/error`;
      }

      if (account.provider === 'google') {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
          await db.query(
            'INSERT INTO users (email, fullname, type, total_loggins, signedupdate,status) VALUES (?, ?, ?, ?, NOW(),1)',
            [email, user.name, account.provider, 0]
          );

          await sendMail({
            to: process.env.NEXT_PUBLIC_ADMIN_MAIL,
            subject: 'New User Signup',
            html: `
              <h2>New User Signup</h2>
              <p>A new user has signed up.</p>
              <p><strong>Full Name:</strong> ${user.name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Signup Type:</strong> Google Signin</p>
            `,
          });
        } else {
          await db.query(
            'UPDATE users SET last_loggedin = NOW(), total_loggins = total_loggins + 1 WHERE email = ?',
            [email]
          );
        }
      }

      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: JWT_SECRET,
});

export { handler as GET, handler as POST };
