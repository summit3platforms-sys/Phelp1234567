import { prisma } from '../src/lib/prisma';
async function main() {
  const all = await prisma.article.findMany({ select: { slug: true } });
  console.log(all.map(a => a.slug));
}
main().catch(console.error);
