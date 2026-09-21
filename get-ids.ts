import { prisma } from './src/lib/prisma';
async function main() {
  const hp = await prisma.brand.findUnique({ where: { slug: 'hp' } });
  const categories = await prisma.category.findMany({ select: { id: true, name: true, slug: true } });
  console.log("HP ID:", hp?.id);
  console.log("Categories:");
  categories.forEach(c => console.log(`  ${c.name} (${c.slug}): ${c.id}`));
}
main().finally(() => prisma.$disconnect());
