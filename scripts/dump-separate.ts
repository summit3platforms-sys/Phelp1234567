import { prisma } from '../src/lib/prisma';
import fs from 'fs';

async function main() {
  const slugs = [
    "nelko-third-party-labels-size-errors-authentication-stickers",
    "phomemo-bluetooth-permissions-qr-code-pairing-android-12",
    "fix-xerox-scan-to-email-connectkey-smb-share-errors",
    "phomemo-wont-turn-on-wont-charge-battery-drain-fix",
    "fix-xerox-imaging-drum-codes-091-092-093-errors"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  for (const article of articles) {
    fs.writeFileSync(`article_${article.slug}.html`, article.content);
  }
  console.log("Dumped 5 articles");
}

main().catch(console.error).finally(() => prisma.$disconnect());
