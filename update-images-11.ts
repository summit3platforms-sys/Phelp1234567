import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'instax-square-link-wide-errors-film-loading-guide', file: 'instax-square-link-wide-errors-film-loading-guide.jpg' },
  { slug: 'rollo-printer-blank-faint-light-uneven-print-density-fix', file: 'rollo-printer-blank-faint-light-uneven-print-density-fix.jpg' },
  { slug: 'fix-seiko-smart-label-printer-windows-11-10-driver', file: 'fix-seiko-smart-label-printer-windows-11-10-driver.jpg' },
  { slug: 'fix-seiko-slp-manager-software-printer-not-responding-stuck', file: 'fix-seiko-slp-manager-software-printer-not-responding-stuck.jpg' },
  { slug: 'fix-lexmark-paper-jam-codes-error-200-243-244-tray', file: 'fix-lexmark-paper-jam-codes-error-200-243-244-tray.jpg' },
  { slug: 'fix-citizen-printer-cutter-lock-auto-cutter-errors', file: 'fix-citizen-printer-cutter-lock-auto-cutter-errors.jpg' },
  { slug: 'instax-mini-link-3-not-printing-battery-drain-fix', file: 'instax-mini-link-3-not-printing-battery-drain-fix.jpg' },
  { slug: 'fix-star-micronics-wifi-disconnecting-mac-address-offline-errors', file: 'fix-star-micronics-wifi-disconnecting-mac-address-offline-errors.jpg' },
  { slug: 'fix-citizen-printer-overheating-cooling-pause-dense-text', file: 'fix-citizen-printer-overheating-cooling-pause-dense-text.jpg' },
  { slug: 'polaroid-zip-gl10-mobile-printer-setup-troubleshooting', file: 'polaroid-zip-gl10-mobile-printer-setup-troubleshooting.jpg' }
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
