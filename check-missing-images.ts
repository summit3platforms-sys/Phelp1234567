import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const missingCount = await prisma.article.count({
    where: { featuredImage: null }
  });
  const missingArticles = await prisma.article.findMany({
    where: { featuredImage: null },
    select: { slug: true, title: true },
    take: 10
  });
  console.log(`Total missing images: ${missingCount}`);
  console.log(JSON.stringify(missingArticles, null, 2));
}
main().finally(() => prisma.$disconnect());
