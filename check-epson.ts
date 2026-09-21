import { prisma } from './src/lib/prisma';

async function main() {
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { title: { contains: '4760', mode: 'insensitive' } },
        { title: { contains: '2750', mode: 'insensitive' } },
        { title: { contains: '2800', mode: 'insensitive' } }
      ]
    },
    select: { slug: true, title: true }
  });
  console.log(articles);
}
main().finally(() => prisma.$disconnect());
