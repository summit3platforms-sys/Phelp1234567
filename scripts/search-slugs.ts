import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const all = await prisma.article.findMany({ select: { slug: true } });
  
  const search = (q) => {
    console.log(`Searching for ${q}:`);
    console.log(all.filter(a => a.slug.toLowerCase().includes(q.toLowerCase())).map(m => m.slug));
  }
  
  search("chromebook");
  search("slowly");
  search("bixolon");
  search("carriage");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
