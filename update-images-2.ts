import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'niimbot-misaligned-print-faded-text-partial-labels', file: 'niimbot-misaligned-print-faded-text-partial-labels.jpg' },
  { slug: 'primera-die-cut-vs-black-mark-sensing-media-sensor-dust-fix', file: 'primera-die-cut-vs-black-mark-sensing-media-sensor-dust-fix.jpg' },
  { slug: 'nelko-third-party-labels-size-errors-authentication-stickers', file: 'nelko-third-party-labels-size-errors-authentication-stickers.jpg' },
  { slug: 'phomemo-d30-q30-vs-q30s-a30-p15-setup-guide', file: 'phomemo-d30-q30-vs-q30s-a30-p15-setup-guide.jpg' },
  { slug: 'rollo-printer-streaky-lines-ghosting-barcode-scan-fix', file: 'rollo-printer-streaky-lines-ghosting-barcode-scan-fix.jpg' },
];

async function main() {
  for (const update of updates) {
    await prisma.article.update({
      where: { slug: update.slug },
      data: { featuredImage: `/images/articles/${update.file}` }
    });
    console.log(`Updated ${update.slug}`);
  }
}

main().finally(() => prisma.$disconnect());
