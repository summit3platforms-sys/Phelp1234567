import { prisma } from '../src/lib/prisma';
import fs from 'fs';

async function main() {
  const slugs = ["hp-smart-app-cant-find-printer-windows-11", "hp-deskjet-2755e-paper-jam-no-paper", "niimbot-label-recognition-errors-exceeded-chip-limits", "hp-printer-banding-horizontal-stripes", "brother-machine-error-maintenance-mode"];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  fs.writeFileSync('articles5.json', JSON.stringify(articles, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
