import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'instax-mini-vs-square-vs-wide-film-compatibility-guide', file: 'instax-mini-vs-square-vs-wide-film-compatibility-guide.jpg' },
  { slug: 'fix-lexmark-service-engine-controller-card-980-scanner-lamp-820', file: 'fix-lexmark-service-engine-controller-card-980-scanner-lamp-820.jpg' },
  { slug: 'phomemo-pm241-bt-shipping-label-setup-vs-rollo-comparison', file: 'phomemo-pm241-bt-shipping-label-setup-vs-rollo-comparison.jpg' },
  { slug: 'fix-citizen-faded-print-streaky-lines-ribbon-tension', file: 'fix-citizen-faded-print-streaky-lines-ribbon-tension.jpg' },
  { slug: 'niimbot-paper-loading-baffle-guide-lid-not-closing', file: 'niimbot-paper-loading-baffle-guide-lid-not-closing.jpg' },
  { slug: 'fix-xerox-024-toner-codes-third-party-chips-developer-errors', file: 'fix-xerox-024-toner-codes-third-party-chips-developer-errors.jpg' },
  { slug: 'niimbot-rfid-chip-fault-non-universal-labels-error', file: 'niimbot-rfid-chip-fault-non-universal-labels-error.jpg' },
  { slug: 'primera-print-job-disappears-ptpublisher-not-printing-firmware', file: 'primera-print-job-disappears-ptpublisher-not-printing-firmware.jpg' },
  { slug: 'pantum-cartridge-errors-anti-counterfeit-door-latch-refill', file: 'pantum-cartridge-errors-anti-counterfeit-door-latch-refill.jpg' },
  { slug: 'rollo-printer-wifi-disconnecting-network-not-found-fix', file: 'rollo-printer-wifi-disconnecting-network-not-found-fix.jpg' }
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
