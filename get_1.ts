import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const article = await prisma.article.findUnique({ where: { slug: "hp-printer-not-showing-up-on-macos-sequoia" } });
  console.log(article?.content);
}
main().catch(console.error).finally(() => prisma.$disconnect());
