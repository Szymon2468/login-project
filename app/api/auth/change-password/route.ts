import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import { decode } from 'next-auth/jwt';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const token = req.cookies.get('next-auth.session-token')?.value || '';
  const decoded = await decode({
    token: token,
    secret: process.env.SECRET || ''
  });

  if (decoded) {
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub }
    });

    const { newPassword, oldPassword } = await req.json();
    const newPasswordHashed = await bcrypt.hash(newPassword, 10);

    try {
      if (await bcrypt.compare(oldPassword, user?.password || '')) {
        const user = await prisma.user.update({
          where: { id: decoded.sub },
          data: { password: newPasswordHashed }
        });

        return NextResponse.json({ status: 200 });
      } else {
        return NextResponse.json(
          { message: 'Password is not valid' },
          { status: 400 }
        );
      }
    } catch (err) {
      return NextResponse.json({ message: `${err}` }, { status: 400 });
    }
  }
}
