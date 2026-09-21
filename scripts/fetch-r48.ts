import { prisma } from '../src/lib/prisma';
import * as fs from 'fs';

async function main() {
  const slugs = [
    "zebra-zd220-not-printing-zd888-troubleshooting",
    "dascom-pos-printer-offline-esc-pos-driver",
    "brother-printer-error-ts-02",
    "polaroid-printer-paper-jam-no-jam-visible-blank-fix",
    "fix-citizen-paper-cover-open-print-head-alarm-lever"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  fs.writeFileSync('r48-articles.json', JSON.stringify(articles, null, 2));
  console.log('Saved to r48-articles.json');
}

main().catch(console.error);
