import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    take: 5,
    select: { slug: true, content: true }
  });
  
  articles.forEach(a => {
    console.log(`\n--- ${a.slug} ---`);
    const h2s = a.content.match(/<h2.*?>(.*?)<\/h2>/g);
    console.log(h2s);
  });
}

main().finally(() => prisma.$disconnect());
