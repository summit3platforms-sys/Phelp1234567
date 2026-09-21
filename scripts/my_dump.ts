import { PrismaClient } from '@prisma/client';
import fs from 'fs';
const prisma = new PrismaClient();
async function main() {
  const slugs = ["canon-pixma-ts3522-not-printing", "hp-printer-ghosting-duplicate-faint-image", "polaroid-hi-print-wont-turn-on-charge-port-fix", "rollo-printer-etsy-ebay-shipping-labels-setup", "star-micronics-printer-wont-cut-double-cut-half-cuts"];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  fs.writeFileSync('my_articles.json', JSON.stringify(articles, null, 2));
}
main().finally(() => prisma.$disconnect());
