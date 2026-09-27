import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    where: {
      brand: { name: { contains: 'Brother', mode: 'insensitive' } },
      status: 'published'
    },
    select: { slug: true, title: true, category: { select: { slug: true } } }
  });
  console.log(`Found ${articles.length} published Brother articles:`);
  articles.forEach(a => console.log(`- /brother/${a.category?.slug}/${a.slug} (${a.title})`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
