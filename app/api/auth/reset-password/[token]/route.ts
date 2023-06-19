import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  console.log('yooooooooooooo jestem ze slunska');
  const { newPassword } = await req.json();
  const token = params.token;

  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      select: { userId: true }
    });

    const userId = verificationToken?.userId;

    await prisma.user.update({
      where: { id: userId },
      data: { password: await bcrypt.hash(newPassword, 10) }
    });

    await prisma.verificationToken.delete({ where: { token } });
    await prisma.verificationToken.deleteMany({
      where: { expiresAt: { lt: new Date() } }
    });

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.log('Error', err);
  }
}
