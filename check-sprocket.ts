import { prisma } from './src/lib/prisma';

async function main() {
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { title: { contains: 'sprocket', mode: 'insensitive' } },
        { title: { contains: 'hp instant', mode: 'insensitive' } },
        { title: { contains: 'zink', mode: 'insensitive' } },
        { brand: { name: { contains: 'HP' } }, title: { contains: 'bluetooth', mode: 'insensitive' } },
        { brand: { name: { contains: 'HP' } }, title: { contains: 'portable', mode: 'insensitive' } },
      ]
    },
    include: { brand: true }
  });

  console.log(`Found ${articles.length} potentially related HP Sprocket articles:`);
  articles.forEach(a => console.log(`  - [${a.brand?.name}] ${a.title} (slug: ${a.slug})`));
}

main().finally(() => prisma.$disconnect());
