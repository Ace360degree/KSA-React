import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool as db } from '../../db'; // Adjust the path to your db file


// Secret key for signing JWT, store this in your environment variables
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

const handler = NextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),

    // Credentials Provider
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Fetch user from the database
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
          throw new Error('No user found with this email');
        }

        const user = rows[0];

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.hashedPassword);

        if (!isMatch) {
          throw new Error('Invalid credentials');
        }

        // update loggedin Details

        await db.query(
          'UPDATE users SET last_loggedin = NOW(), total_loggins = total_loggins + 1 WHERE id = ?',
          [user.id]
        );

        // If successful, return the user object (you can include other user details as needed)
        return {
          id: user.id,
          email: user.email,
          name: user.fullname||user.name,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // If user exists, it means successful login, add user info to token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [user.email]);

        if (rows.length === 0) {
          await db.query(
            'INSERT INTO users (email, fullname, type, signedupdate) VALUES (?, ?, ?, NOW())',
            [user.email, user.name, account.provider]
          );
        }
        else {
          await db.query(
            'UPDATE users SET last_loggedin = NOW(), total_loggins = total_loggins + 1 WHERE email = ?',
            [user.email]
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


export {handler as GET, handler as POST}