import { PrismaClient } from '@prisma/client';
import { seedUsers } from './users';

const prisma = new PrismaClient();

async function main() {
  for (const user of seedUsers) {
    const createdUser = await prisma.user.create({ data: user });
    await prisma.list.create({
      data: {
        name: 'Currently watching',
        user: {
          connect: { id: createdUser.id },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
