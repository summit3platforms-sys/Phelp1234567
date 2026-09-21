import { prisma } from '../src/lib/prisma';
import fs from 'fs';

async function main() {
  const slugs = ["hp-printer-error-0xc4eb827f", "fix-xerox-scan-to-email-connectkey-smb-share-errors", "dymo-labelwriter-4xl-5xl-setup-driver-guide", "hp-printer-wont-turn-on-no-light", "polaroid-zip-gl10-mobile-printer-setup-troubleshooting"];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  fs.writeFileSync('r32-articles.json', JSON.stringify(articles, null, 2));
  console.log("Done");
}
main();
