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

        // If successful, return the user object (you can include other user details as needed)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
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
      // Add token details to the session object
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
    error: '/auth/error', // Error page
  },
  secret: JWT_SECRET, // Add a secret for signing JWTs
});


export {handler as GET, handler as POST}