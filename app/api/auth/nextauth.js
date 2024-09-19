// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { pool as db } from '../db'; // Ensure this path is correct

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [credentials.email]);

          if (rows.length > 0) {
            const user = rows[0];
            const isMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

            if (isMatch) {
              return { id: user.id, email: user.email, username: user.username };
            } else {
              throw new Error('Invalid credentials');
            }
          } else {
            throw new Error('No user found with this email');
          }
        } catch (error) {
          throw new Error(`Authorization error: ${error.message}`);
        }
      },
    }),
    // Add more providers if needed
  ],
  pages: {
    error: '/auth/error', // Custom error page URL
    signIn: '/auth/login', // Custom login page URL
  },
  session: {
    strategy: 'jwt', // Use JWT for session handling
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username; // Include username in JWT token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          // username: token.username, // Include username in session
        };
      }
      console.log(session);
      alert(session);
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET, // Ensure you have a secret set in .env
    encryption: true, // Enable encryption if needed
  },
};

export default NextAuth(authOptions);
