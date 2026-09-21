import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const articles = await prisma.article.findMany({
    where: { OR: [{ featuredImage: null }, { featuredImage: '' }] },
    take: 10,
    select: { id: true, slug: true, title: true, brand: { select: { name: true } } }
  });
  console.log(JSON.stringify(articles, null, 2));
}
main().finally(() => prisma.$disconnect());
