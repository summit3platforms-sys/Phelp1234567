import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { contains: "m15w" } },
    select: { slug: true }
  });
  console.log(articles);
}
main().catch(console.error).finally(() => prisma.$disconnect());
