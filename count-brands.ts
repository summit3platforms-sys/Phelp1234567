import { prisma } from './src/lib/prisma';

async function main() {
  const brands = await prisma.brand.findMany({
    include: {
      _count: {
        select: { articles: true },
      },
    },
  });

  const sortedBrands = brands.sort((a, b) => a._count.articles - b._count.articles);

  console.log("Printer Brands with the lowest number of articles:");
  console.log("----------------------------------------------");
  
  for (let i = 0; i < sortedBrands.length; i++) {
    const brand = sortedBrands[i];
    console.log(`${i+1}. ${brand.name} - ${brand._count.articles} articles`);
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
