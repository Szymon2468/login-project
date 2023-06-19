import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getEnv } from '@/utils/env';
import { sendMail } from '@/fetches/sendMail';
import { sendEmail } from '../../utils/sendEmail';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { email: true, id: true }
    });

    if (user) {
      const token: string = jwt.sign({ id: user.id }, getEnv('SECRET'));
      await prisma.verificationToken.create({
        data: {
          token,
          expiresAt: new Date(new Date().getTime() + 15 * 6000),
          userId: user.id
        }
      });

      const link = `<p>http://localhost:3000/reset-password/${token}</p>`;

      await sendEmail(email, link);

      return NextResponse.json({ status: 200 });
    } else {
      throw new Error('user not found');
    }
  } catch (err) {
    throw new Error(err as string);
  }
}
