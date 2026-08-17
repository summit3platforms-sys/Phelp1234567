import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const missing = await prisma.article.count({
    where: { featuredImage: null }
  });
  const missingArticles = await prisma.article.findMany({
    where: { featuredImage: null },
    select: { slug: true, title: true },
    take: 10
  });
  console.log(`Total missing images: ${missing}`);
  console.log(missingArticles);
}
main().finally(() => prisma.$disconnect());
