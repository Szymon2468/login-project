import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import credentialsProvider from 'next-auth/providers/credentials';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  secret: process.env.SECRET,
  providers: [
    credentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials, req) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findFirst({
          where: { email }
        });

        if (user) {
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (isPasswordValid) {
            return user;
          } else {
            throw new Error('inavlid password');
          }
        } else {
          throw new Error('User not found');
        }
      }
    })
  ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
