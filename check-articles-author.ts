import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const countNoAuthor = await prisma.article.count({ where: { authorId: null } });
  console.log(`Articles with NO author: ${countNoAuthor}`);
}

main().finally(() => prisma.$disconnect());
