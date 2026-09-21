import { prisma } from './src/lib/prisma';
import fs from 'fs';
async function main() {
  const slugs = ["dymo-labelwriter-network-setup-lan-wi-fi", "hp-printer-not-appearing-airprint-list-iphone"];
  const articles = await prisma.article.findMany({ where: { slug: { in: slugs } } });
  for (const a of articles) {
    fs.writeFileSync(a.slug + '.txt', a.content);
  }
}
main();
