import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const totalArticles = await prisma.article.count();
  console.log(`Total Articles: ${totalArticles}`);
  
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { articles: true }
      }
    }
  });
  
  console.log('\n--- Categories ---');
  for (const cat of categories) {
    console.log(`${cat.name}: ${cat._count.articles} articles`);
  }
  
  const brands = await prisma.brand.findMany({
    include: {
      _count: {
        select: { articles: true }
      }
    }
  });
  
  console.log('\n--- Brands ---');
  for (const brand of brands) {
    console.log(`${brand.name}: ${brand._count.articles} articles`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
