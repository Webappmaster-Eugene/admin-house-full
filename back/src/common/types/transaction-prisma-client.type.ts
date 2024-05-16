import { DefaultArgs } from '.prisma/client/runtime/library';
import { Prisma, PrismaClient } from '.prisma/client';

export type TransactionDbClient = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
