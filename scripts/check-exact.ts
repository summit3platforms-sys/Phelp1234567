import { prisma } from '../src/lib/prisma';
async function main() {
  const slugs = ["hp-printer-error-13-20-paper-jam", "hp-officejet-pro-9130e-error"];
  for (const s of slugs) {
    const a = await prisma.article.findUnique({ where: { slug: s } });
    console.log(`${s}: ${a ? 'FOUND' : 'MISSING'}`);
  }
}
main().catch(console.error);
