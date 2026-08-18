import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const articles = await prisma.article.findMany({
    where: { featuredImage: null },
    take: 10,
    select: { slug: true, title: true }
  });
  const total = await prisma.article.count({ where: { featuredImage: null }});
  console.log(`Total missing: ${total}`);
  console.log(JSON.stringify(articles, null, 2));
}
main().finally(() => prisma.$disconnect());
