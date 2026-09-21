import { prisma } from './src/lib/prisma';

async function main() {
  const brands = await prisma.brand.findMany({
    select: { name: true }
  });
  console.log("Existing Brands:");
  console.log(brands.map(b => b.name).join(", "));
}

main().catch(console.error).finally(() => prisma.$disconnect());
