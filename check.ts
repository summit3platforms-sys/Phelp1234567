import { prisma } from './src/lib/prisma';
async function main() {
  const a = await prisma.article.findUnique({where: {slug: "hp-envy-4520-print-quality-lines"}});
  console.log(a.content.substring(0, 1000));
}
main();
