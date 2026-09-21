import { prisma } from './src/lib/prisma';

async function main() {
  const articles = await prisma.article.findMany({
    where: { brand: { name: 'HP' } },
    select: { title: true, slug: true },
    orderBy: { title: 'asc' }
  });

  console.log(`Total HP articles: ${articles.length}`);
  articles.forEach(a => console.log(`  - ${a.title}`));
}

main().finally(() => prisma.$disconnect());
