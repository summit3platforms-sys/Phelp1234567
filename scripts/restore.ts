import { prisma } from '../src/lib/prisma';
import fs from 'fs';
import path from 'path';

async function restoreArticles() {
  const slugs = [
    "fix-pantum-0x000000709-communication-errors-bm2300-cover",
    "fix-citizen-printer-overheating-cooling-pause-dense-text",
    "nelko-4x6-shipping-label-printer-setup-calibration-blank-labels",
    "dascom-card-printer-setup-streaky-print",
    "fix-seiko-slp-manager-software-printer-not-responding-stuck"
  ];
  
  for (const slug of slugs) {
    const filePath = path.join(__dirname, `${slug}.html`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      await prisma.article.update({
        where: { slug },
        data: { content }
      });
      console.log(`Restored ${slug}`);
    }
  }
}

restoreArticles().catch(console.error).finally(() => prisma.$disconnect());
