import { PrismaClient } from '@prisma/client';

export const checkIfTokenExists = async (token: string): Promise<any> => {
  const prisma = new PrismaClient();
  return await prisma.verificationToken.findUnique({
    where: { token },
    select: { token: true }
  });
};
