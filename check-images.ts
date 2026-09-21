import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const total = await prisma.article.count();
  const withoutImage = await prisma.article.count({
    where: {
      OR: [
        { featuredImage: null },
        { featuredImage: '' }
      ]
    }
  });
  
  const withoutImageByBrand = await prisma.article.groupBy({
    by: ['brandId'],
    where: {
      OR: [
        { featuredImage: null },
        { featuredImage: '' }
      ]
    },
    _count: {
      id: true
    }
  });

  const brands = await prisma.brand.findMany();
  
  console.log(`Total Articles: ${total}`);
  console.log(`Articles Without Images: ${withoutImage}`);
  console.log('--- Breakdown by Brand ---');
  
  for (const group of withoutImageByBrand) {
    const brand = brands.find(b => b.id === group.brandId);
    console.log(`${brand?.name || 'Unknown'}: ${group._count.id} articles`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
