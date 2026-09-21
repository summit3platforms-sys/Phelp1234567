import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'seiko-slp-networking-serial-adapters-baud-rates-multi-printer', file: 'seiko-slp-networking-serial-adapters-baud-rates-multi-printer.jpg' },
  { slug: 'primera-lx400-vs-lx900-comparison-lx2000-error-codes', file: 'primera-lx400-vs-lx900-comparison-lx2000-error-codes.jpg' },
  { slug: 'niimbot-wont-turn-on-wont-charge-battery-drain', file: 'niimbot-wont-turn-on-wont-charge-battery-drain.jpg' },
  { slug: 'fix-pantum-output-bin-errors-wont-turn-on-factory-reset', file: 'fix-pantum-output-bin-errors-wont-turn-on-factory-reset.jpg' },
  { slug: 'star-micronics-bluetooth-kitchen-setup-mc-print3-sm-l200-sm-t300i', file: 'star-micronics-bluetooth-kitchen-setup-mc-print3-sm-l200-sm-t300i.jpg' },
  { slug: 'primera-printhead-life-percentage-damaged-cartridge-contacts-fix', file: 'primera-printhead-life-percentage-damaged-cartridge-contacts-fix.jpg' },
  { slug: 'star-micronics-printer-wont-cut-double-cut-half-cuts', file: 'star-micronics-printer-wont-cut-double-cut-half-cuts.jpg' },
  { slug: 'fix-xerox-scan-to-email-connectkey-smb-share-errors', file: 'fix-xerox-scan-to-email-connectkey-smb-share-errors.jpg' },
  { slug: 'phomemo-bluetooth-permissions-qr-code-pairing-android-12', file: 'phomemo-bluetooth-permissions-qr-code-pairing-android-12.jpg' },
  { slug: 'citizen-cl-s-series-guide-521-621-631-700', file: 'citizen-cl-s-series-guide-521-621-631-700.jpg' }
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
