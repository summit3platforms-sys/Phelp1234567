import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const article = await prisma.article.findUnique({where: {slug: "canon-maxify-gx-error-code"}});
  console.log(article?.content.substring(0, 1000));
}
main().finally(() => prisma.$disconnect());
