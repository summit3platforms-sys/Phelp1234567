import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const articles = await prisma.article.findMany({
    select: { slug: true }
  });
  console.log(articles.map(a => a.slug).join('\n'));
}
main().catch(console.error).finally(() => prisma.$disconnect());
