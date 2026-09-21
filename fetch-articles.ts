import { prisma } from './src/lib/prisma';
async function main() {
  const slugs = ["hp-laserjet-p4015-error-49-4c02", "dymo-labelwriter-lan-network-setup-guide", "hp-printer-not-in-airprint-list-iphone", "zebra-thermal-transfer-vs-direct-thermal-smudging-fix", "hp-printer-burning-smell"];
  const articles = await prisma.article.findMany({ where: { slug: { in: slugs } } });
  for (const article of articles) {
    console.log(`\n\n--- SLUG: ${article.slug} ---`);
    console.log(article.content);
  }
}
main().catch(console.error);
