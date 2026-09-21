import { prisma } from '../src/lib/prisma';
import fs from 'fs';

async function fetchArticles() {
  const slugs = [
    "fix-pantum-0x000000709-communication-errors-bm2300-cover",
    "fix-citizen-printer-overheating-cooling-pause-dense-text",
    "nelko-4x6-shipping-label-printer-setup-calibration-blank-labels",
    "dascom-card-printer-setup-streaky-print",
    "fix-seiko-slp-manager-software-printer-not-responding-stuck"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  for (const article of articles) {
    fs.writeFileSync(`${article.slug}.html`, article.content);
  }
}

fetchArticles().catch(console.error).finally(() => prisma.$disconnect());
