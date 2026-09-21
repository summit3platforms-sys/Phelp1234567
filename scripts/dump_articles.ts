import { prisma } from '../src/lib/prisma';
import fs from 'fs';

async function main() {
  const slugs = [
    "primera-bravo-disc-publisher-not-printing-burns-disc-but-wont",
    "hp-printer-802-1x-authentication-failed",
    "polaroid-hi-print-cartridge-door-wont-open-close-fix",
    "dascom-2600-2610-error-not-printing",
    "rollo-printer-wifi-disconnecting-network-not-found-fix"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  fs.writeFileSync('target-5-articles.json', JSON.stringify(articles, null, 2));
  console.log("Dumped " + articles.length + " articles.");
}
main().catch(console.error);
