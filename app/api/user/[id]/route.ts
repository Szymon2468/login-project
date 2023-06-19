import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const { userId, name, email } = await req.json();

    await prisma.user.update({ where: { id: userId }, data: { name, email } });

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json({ message: `${err}` }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();
    await prisma.user.delete({ where: { id: userId } });

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json({ message: `${err}` }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const selectedUser: any = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true }
    });

    delete selectedUser.password;
    return selectedUser;
  } catch (err) {
    NextResponse.json({ success: false, message: `${err}` }, { status: 404 });
  }
}
