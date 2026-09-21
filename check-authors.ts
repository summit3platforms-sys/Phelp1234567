import { prisma } from './src/lib/prisma';
async function main() {
  const authors = await prisma.author.findMany({ select: { id: true, name: true, slug: true } });
  console.log(authors);
}
main().finally(() => prisma.$disconnect());
