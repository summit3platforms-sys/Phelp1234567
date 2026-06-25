import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const article = await prisma.article.findUnique({
    where: { slug: 'printer-wont-connect' },
    select: {
      content: true
    }
  });
  console.log("CONTENT START:");
  console.log(article?.content.substring(0, 2000));
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
