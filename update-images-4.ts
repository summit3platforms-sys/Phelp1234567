import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'instax-link-keeps-disconnecting-connected-wont-print', file: 'instax-link-keeps-disconnecting-connected-wont-print.jpg' },
  { slug: 'star-micronics-network-setup-utility-app-static-ip-multiple-printers', file: 'star-micronics-network-setup-utility-app-static-ip-multiple-printers.jpg' },
  { slug: 'fix-pantum-streaky-lines-drum-marks-heavy-paper', file: 'fix-pantum-streaky-lines-drum-marks-heavy-paper.jpg' },
  { slug: 'star-micronics-pos-setup-shopify-square-clover-toast', file: 'star-micronics-pos-setup-shopify-square-clover-toast.jpg' },
  { slug: 'phomemo-printer-wont-connect-bluetooth-app-cant-find', file: 'phomemo-printer-wont-connect-bluetooth-app-cant-find.jpg' },
  { slug: 'pantum-drivers-print-spooler-mac-setup-firmware', file: 'pantum-drivers-print-spooler-mac-setup-firmware.jpg' },
  { slug: 'rollo-printer-calibration-guide-skewed-label-size-fix', file: 'rollo-printer-calibration-guide-skewed-label-size-fix.jpg' },
  { slug: 'polaroid-hi-print-stuck-on-yellow-print-half-printed-fix', file: 'polaroid-hi-print-stuck-on-yellow-print-half-printed-fix.jpg' },
  { slug: 'fix-lexmark-cartridge-chip-errors-1200-1203-1204-120f', file: 'fix-lexmark-cartridge-chip-errors-1200-1203-1204-120f.jpg' },
  { slug: 'fix-lexmark-network-errors-offline-windows-11-web-server', file: 'fix-lexmark-network-errors-offline-windows-11-web-server.jpg' }
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
