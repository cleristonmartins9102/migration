import { PrismaClient } from '@prisma/client';

export async function resetDb (client: PrismaClient) {
  console.log('resetting db');
  const db = await client.$executeRaw`SELECT * FROM current_catalog`;
  await client.$transaction([
    client.contact.deleteMany(),
    client.member.deleteMany(),
    client.wallet.deleteMany(),
    client.location.deleteMany(),
    client.member.deleteMany(),
  ]);
}
