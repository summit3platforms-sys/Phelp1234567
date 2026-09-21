import { prisma } from './src/lib/prisma';

async function main() {
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { title: { contains: 'wi-fi', mode: 'insensitive' } },
        { title: { contains: 'wifi', mode: 'insensitive' } },
        { title: { contains: 'connect', mode: 'insensitive' } },
        { title: { contains: 'network', mode: 'insensitive' } },
        { title: { contains: 'offline', mode: 'insensitive' } },
      ]
    },
    include: {
      brand: true
    }
  });

  console.log(`Found ${articles.length} existing articles about Wi-Fi/Connectivity:`);
  console.log("-------------------------------------------------------------------");
  
  articles.forEach(a => {
    console.log(`[${a.brand?.name}] ${a.title}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
