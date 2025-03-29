
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    const post1 = await prisma.post.upsert({
        where: { id: 1 }, 
        update: {},
        create: {
          title: 'Prisma Adds Support for MongoDB',
          content: 'Support for MongoDB has been one of the most requested features since the initial release of...',
          
        },
      });

  const post2 = await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      content: "Bakr with 7gen",
      }
    },
  );

  console.log({ post1, post2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

