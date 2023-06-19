import { newUserSchema } from '@/yup/newUserSchema';
import { Prisma, PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { Request } from 'node-fetch';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data: any = await req.json();
    const { password, email, name } = data;

    await newUserSchema.validate(data);

    const newUser: any = await prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(password, 10)
      }
    });
    delete newUser.password;

    return NextResponse.json({
      data,
      success: true,
      status: 200
    });
  } catch (err: Prisma.PrismaClientKnownRequestError | any) {
    console.log(err);
    if (err.code === 'P2002') {
      return NextResponse.json(
        {
          message: `The user cannot be created with this ${err.meta.target[0]}.`
        },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: { email: true, name: true }
    });
    return NextResponse.json(users, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 404 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await prisma.user.deleteMany();
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: `${err}`
      },
      { status: 400 }
    );
  }
}
