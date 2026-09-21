import { prisma } from './src/lib/prisma';
import fs from 'fs';

async function main() {
  const slugs = [
    "fix-seiko-label-printer-feed-errors-faded-print-loading-jams",
    "fix-lexmark-tray-gears-duplex-jams-error-943",
    "hp-officejet-200-mobile-printer-not-charging",
    "zebra-printer-wont-calibrate-labels-gap-not-detected-fix",
    "canon-pixma-ts6420-error-code"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  fs.writeFileSync('articles_content.json', JSON.stringify(articles.map(a => ({slug: a.slug, content: a.content, wordCount: a.wordCount})), null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
