import { PrismaClient } from '@prisma/client';

/**
 * PrismaClient Singleton Pattern
 * * In development, Next.js hot-reloading creates new Prisma instances 
 * which exhausts database connections. This pattern ensures only ONE 
 * instance is used across the entire application on Vercel.
 */

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
