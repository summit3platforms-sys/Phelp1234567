import { prisma } from './src/lib/prisma';

async function main() {
  const epson = await prisma.brand.findUnique({ where: { slug: 'epson' } });
  const brother = await prisma.brand.findUnique({ where: { slug: 'brother' } });
  const cat = await prisma.category.findUnique({ where: { slug: 'connectivity-issues' } });

  console.log(`Epson ID: ${epson?.id}`);
  console.log(`Brother ID: ${brother?.id}`);
  console.log(`Connectivity Category ID: ${cat?.id}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
