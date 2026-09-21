import { prisma } from './src/lib/prisma';
async function main() {
  const articles = await prisma.article.findMany({
    where: { title: { contains: 'brother', mode: 'insensitive' } },
    select: { slug: true, title: true }
  });
  console.log(articles);
}
main().finally(() => prisma.$disconnect());
