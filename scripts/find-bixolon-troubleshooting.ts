import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    select: {
      title: true,
      slug: true,
      category: {
        select: {
          name: true,
          slug: true
        }
      },
      brand: { select: { name: true } }
    }
  });
  console.log("All articles:", JSON.stringify(articles, null, 2));
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
