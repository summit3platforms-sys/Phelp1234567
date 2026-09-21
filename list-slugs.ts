import { prisma } from './src/lib/prisma';
async function main() {
  const articles = await prisma.article.findMany();
  for (const a of articles) {
    console.log(a.slug);
  }
}
main();
