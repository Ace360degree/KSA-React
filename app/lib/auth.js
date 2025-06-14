import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import { pool as db } from '../api/db';
import { sendMail } from '../api/mail/sendMail';

// Secret key for signing JWT, store this in your environment variables
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export const authOptions = {
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
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
          await sendMail({
            to: process.env.NEXT_PUBLIC_ADMIN_MAIL,
            subject: 'Blacklisted Login Attempt',
            html: `
              <h2>Blacklisted user login</h2>
              <p><strong>${email}</strong> has attempted login through prohibited Email through Credential Login.</p>
            `,
          });
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

        await sendMail({
          to:process.env.NEXT_PUBLIC_ADMIN_MAIL,
          subject:'Activity: Website Login',
          html:`
              <h2>User Activity: User Logged in</h2>
              <p>Hi, ${process.env.NEXT_PUBLIC_ADMIN_NAME}.</p>
              <p>The user <strong>${user.fullname}</strong> has successfully logged into the website. Their registered email address is <strong>${email}</strong>.</p>  
              <p>Please review if any further action is required.</p>
          `,
        });

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
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.id = user.id;
    //     token.userid = user.id;
    //     token.email = user.email;
    //     token.name = user.name;
    //   }
    //   return token;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userid = user.id;
        token.email = user.email;
        token.name = user.name;
      } else if (token?.email && !token.id) {
        const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [token.email]);
        if (rows.length > 0) {
          token.id = rows[0].id;
          token.userid = rows[0].id;
        }
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
        await sendMail({
          to: process.env.NEXT_PUBLIC_ADMIN_MAIL,
          subject: 'Blacklisted Login Attempt',
          html: `
            <h2>Blacklisted user login</h2>
            <p><strong>${email}</strong> has attempted login through prohibited Email through Google Login.</p>
          `,
        });
        return `/auth/error`;
      }

      if (account.provider === 'google') {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        let dbId;

        if (rows.length === 0) {
          const [result] = await db.query(
            'INSERT INTO users (email, fullname, type, total_loggins, last_loggedin, signedupdate,status) VALUES (?, ?, ?, ?,NOW(),NOW(),1)',
            [email, user.name, account.provider, 1]
          );
          dbId = result.insertId;

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
          dbId = rows[0].id;
          await db.query(
            'UPDATE users SET last_loggedin = NOW(), total_loggins = total_loggins + 1 WHERE email = ?',
            [email]
          );
          await sendMail({
            to:process.env.NEXT_PUBLIC_ADMIN_MAIL,
            subject:'Activity: Website Login',
            html:`
                <h2>User Activity: User Logged in</h2>
                <p>Hi, ${process.env.NEXT_PUBLIC_ADMIN_NAME}.</p>
                <p>The user <strong>${user.name}</strong> has successfully logged into the website. Their registered email address is <strong>${email}</strong> via Google Login.</p>
                <p>Please review if any further action is required.</p>
            `,
          });
        }

        // Ensure the user object contains the numeric database ID
        user.id = dbId;
      }

      return true;
    },
    async signOut({ token }) {
      try {
        if (token?.id) {
          // Update user's online status to 0
          await db.query(
            'UPDATE users SET is_online = 0 WHERE id = ?',
            [token.id]
          );
          
          // Send logout notification email
          await sendMail({
            to: process.env.NEXT_PUBLIC_ADMIN_MAIL,
            subject: 'Activity: User Logged Out',
            html: `
              <h2>User Activity: User Logged Out</h2>
              <p>Hi, ${process.env.NEXT_PUBLIC_ADMIN_NAME}.</p>
              <p>The user <strong>${token.name}</strong> has logged out of the website.</p>
              <p>Their email address is <strong>${token.email}</strong>.</p>
            `,
          });
        }
      } catch (error) {
        console.error('Error during signOut:', error);
      }
      return true;
    },
  },
  events: {
    async signOut({ token }) {
      try {
        if (token?.id) {
          await db.query(
            'UPDATE users SET is_online = 0 WHERE id = ?',
            [token.id]
          );
        }
      } catch (error) {
        console.error('Error in signOut event:', error);
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: JWT_SECRET,
}; 