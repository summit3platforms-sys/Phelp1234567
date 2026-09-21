import { prisma } from '../src/lib/prisma';

async function main() {
  const articles = await prisma.article.findMany({ select: { slug: true } });
  console.log(articles.map(a => a.slug));
}

main().catch(console.error).finally(() => prisma.$disconnect());
