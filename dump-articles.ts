import { prisma } from './src/lib/prisma';
import fs from 'fs';
async function main() {
  const slugs = ["hp-laserjet-p4015-error-49-4c02", "dymo-labelwriter-lan-network-setup-guide", "hp-printer-not-in-airprint-list-iphone", "zebra-thermal-transfer-vs-direct-thermal-smudging-fix", "hp-printer-burning-smell"];
  const articles = await prisma.article.findMany({ where: { slug: { in: slugs } } });
  fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2));
  console.log("Done");
}
main().catch(console.error);
