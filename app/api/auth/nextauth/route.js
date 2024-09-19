// app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { pool as db } from '../../db';

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
              return { id: user.id, email: user.email };
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
  ],
  pages: {
    error: '/auth/error',
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
        };
      }
      
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  },
};

// Named export for HTTP POST method
export async function POST(req) {
  return NextAuth(req, authOptions);
}
