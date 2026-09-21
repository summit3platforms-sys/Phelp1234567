import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'nelko-printer-faint-print-streaky-lines-garbled-text', file: 'nelko-printer-faint-print-streaky-lines-garbled-text.jpg' },
  { slug: 'rollo-printer-reset-printing-system-airprint-setup-mac', file: 'rollo-printer-reset-printing-system-airprint-setup-mac.jpg' },
  { slug: 'primera-label-jam-label-cut-not-printed-error', file: 'primera-label-jam-label-cut-not-printed-error.jpg' },
  { slug: 'instax-link-charging-light-led-colors-meaning', file: 'instax-link-charging-light-led-colors-meaning.jpg' },
  { slug: 'nelko-app-crashing-android-14-errors-ios-updates', file: 'nelko-app-crashing-android-14-errors-ios-updates.jpg' },
  { slug: 'instax-link-wide-bluetooth-setup-connection-guide', file: 'instax-link-wide-bluetooth-setup-connection-guide.jpg' },
  { slug: 'instax-link-streaks-lines-film-ejects-without-printing', file: 'instax-link-streaks-lines-film-ejects-without-printing.jpg' },
  { slug: 'polaroid-hi-print-firmware-update-factory-reset-guide', file: 'polaroid-hi-print-firmware-update-factory-reset-guide.jpg' },
  { slug: 'lexmark-fuser-kits-128-121-errors-overheating', file: 'lexmark-fuser-kits-128-121-errors-overheating.jpg' },
  { slug: 'rollo-x1038-vs-x1040-driver-print-density-speed-settings', file: 'rollo-x1038-vs-x1040-driver-print-density-speed-settings.jpg' }
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
