import { prisma } from '../src/lib/prisma';

async function main() {
  const articles = await prisma.article.findMany({ 
    where: { slug: { contains: 'bixolon' } },
    select: { slug: true }
  });
  console.log("Bixolon articles:", articles);
}

main().catch(console.error).finally(() => prisma.$disconnect());
