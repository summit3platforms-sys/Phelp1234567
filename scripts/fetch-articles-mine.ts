import { prisma } from '../src/lib/prisma';
import fs from 'fs';

async function main() {
  const slugs = [
    "rollo-printer-calibration-guide-skewed-label-size-fix",
    "xerox-workcentre-versalink-errors-c405-6515-altalink",
    "hp-neverstop-laser-refill-not-printing",
    "dymo-connect-not-detecting-printer",
    "rollo-printer-label-jam-not-feeding-platen-roller-cleaning"
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  fs.writeFileSync('my_articles.json', JSON.stringify(articles, null, 2));
  console.log('Saved to my_articles.json');
}

main().catch(console.error).finally(() => prisma.$disconnect());
