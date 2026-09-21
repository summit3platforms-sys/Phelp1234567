import { prisma } from '../src/lib/prisma';
import * as fs from 'fs';

async function main() {
  const slugs = ["hp-laserjet-m209dwe-keeps-going-offline", "zebradesigner-not-printing-browser-print-not-working-fix", "hp-envy-6055e-blinking-purple-light", "canon-ij-scan-utility-not-working", "bixolon-spp-r310-bluetooth-pairing"];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  fs.writeFileSync('articles_dump.json', JSON.stringify(articles, null, 2));
  console.log("Articles saved to articles_dump.json");
}

main().catch(console.error).finally(() => prisma.$disconnect());
