import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'fix-lexmark-toner-errors-code-32-88-cartridge-not-recognized', file: 'fix-lexmark-toner-errors-code-32-88-cartridge-not-recognized.jpg' },
  { slug: 'fix-lexmark-tray-gears-duplex-jams-error-943', file: 'fix-lexmark-tray-gears-duplex-jams-error-943.jpg' },
  { slug: 'instax-mini-link-vs-mini-link-2-vs-square-link-comparison', file: 'instax-mini-link-vs-mini-link-2-vs-square-link-comparison.jpg' },
  { slug: 'rollo-printer-label-jam-not-feeding-platen-roller-cleaning', file: 'rollo-printer-label-jam-not-feeding-platen-roller-cleaning.jpg' },
  { slug: 'troubleshooting-legacy-seiko-slp-440-420-240-100-200', file: 'troubleshooting-legacy-seiko-slp-440-420-240-100-200.jpg' },
  { slug: 'fix-xerox-077-finisher-errors-stapler-jams-sorter-faults', file: 'fix-xerox-077-finisher-errors-stapler-jams-sorter-faults.jpg' },
  { slug: 'primera-lx900-missing-colors-banding-streaks-faded-print', file: 'primera-lx900-missing-colors-banding-streaks-faded-print.jpg' },
  { slug: 'nelko-bluetooth-disconnecting-permissions-pc-connection', file: 'nelko-bluetooth-disconnecting-permissions-pc-connection.jpg' },
  { slug: 'rollo-printer-static-ip-setup-windows-offline-fix', file: 'rollo-printer-static-ip-setup-windows-offline-fix.jpg' },
  { slug: 'nelko-p21-wont-print-bluetooth-errors-app-compatibility', file: 'nelko-p21-wont-print-bluetooth-errors-app-compatibility.jpg' }
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
