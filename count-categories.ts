import { prisma } from './src/lib/prisma';

async function main() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { articles: true },
      },
    },
  });

  const sortedCategories = categories.sort((a, b) => a._count.articles - b._count.articles);

  console.log("Categories with the lowest number of articles:");
  console.log("----------------------------------------------");
  
  for (let i = 0; i < Math.min(20, sortedCategories.length); i++) {
    const cat = sortedCategories[i];
    console.log(`${i+1}. ${cat.name} - ${cat._count.articles} articles`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
