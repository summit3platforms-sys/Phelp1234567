import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'fix-lexmark-firmware-error-900-p128-updates', file: 'fix-lexmark-firmware-error-900-p128-updates.jpg' },
  { slug: 'phomemo-printer-feeds-prints-blank-paper-orientation', file: 'phomemo-printer-feeds-prints-blank-paper-orientation.jpg' },
  { slug: 'primera-lx-series-nozzle-check-printhead-alignment-calibration', file: 'primera-lx-series-nozzle-check-printhead-alignment-calibration.jpg' },
  { slug: 'fix-seiko-label-printer-feed-errors-faded-print-loading-jams', file: 'fix-seiko-label-printer-feed-errors-faded-print-loading-jams.jpg' },
  { slug: 'primera-bravo-disc-publisher-not-printing-burns-disc-but-wont', file: 'primera-bravo-disc-publisher-not-printing-burns-disc-but-wont.jpg' },
  { slug: 'seiko-slp-advanced-driver-fixes-registry-idle-polling-silent-install', file: 'seiko-slp-advanced-driver-fixes-registry-idle-polling-silent-install.jpg' },
  { slug: 'instax-connect-ar-print-not-working-troubleshooting', file: 'instax-connect-ar-print-not-working-troubleshooting.jpg' },
  { slug: 'fix-citizen-printer-communication-errors-usb-not-detected', file: 'fix-citizen-printer-communication-errors-usb-not-detected.jpg' },
  { slug: 'star-micronics-tsp143-series-iii-vs-iv-wifi-ethernet-setup', file: 'star-micronics-tsp143-series-iii-vs-iv-wifi-ethernet-setup.jpg' },
  { slug: 'instax-link-app-crashing-compatibility-permissions-fix', file: 'instax-link-app-crashing-compatibility-permissions-fix.jpg' }
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
