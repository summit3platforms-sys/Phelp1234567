import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'niimbot-model-comparison-m2-m3-k2-k3-c1-tube', file: 'niimbot-model-comparison-m2-m3-k2-k3-c1-tube.jpg' },
  { slug: 'polaroid-hi-print-first-time-setup-cartridge-loading-cleaning-guide', file: 'polaroid-hi-print-first-time-setup-cartridge-loading-cleaning-guide.jpg' },
  { slug: 'primera-windows-11-driver-logo-testing-usb-communication', file: 'primera-windows-11-driver-logo-testing-usb-communication.jpg' },
  { slug: 'nelko-printer-wont-turn-on-wont-charge-fast-charger-fix', file: 'nelko-printer-wont-turn-on-wont-charge-fast-charger-fix.jpg' },
  { slug: 'star-micronics-led-error-codes-beeping-factory-reset-guide', file: 'star-micronics-led-error-codes-beeping-factory-reset-guide.jpg' },
  { slug: 'niimbot-app-crashing-sync-errors-permissions-fix', file: 'niimbot-app-crashing-sync-errors-permissions-fix.jpg' },
  { slug: 'phomemo-label-off-center-size-not-recognized-roller-guide', file: 'phomemo-label-off-center-size-not-recognized-roller-guide.jpg' },
  { slug: 'nelko-pm220-vs-pm230-small-business-setup-bluetooth-pairing', file: 'nelko-pm220-vs-pm230-small-business-setup-bluetooth-pairing.jpg' },
  { slug: 'fix-lexmark-standard-bin-full-false-error-exit-flag', file: 'fix-lexmark-standard-bin-full-false-error-exit-flag.jpg' },
  { slug: 'nelko-p21-vs-pl70e-difference-setup-guide-tape-not-feeding', file: 'nelko-p21-vs-pl70e-difference-setup-guide-tape-not-feeding.jpg' }
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
