import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'instax-mini-link-2-flashing-light-meanings-diagnostic-guide', file: 'instax-mini-link-2-flashing-light-meanings-diagnostic-guide.jpg' },
  { slug: 'nelko-pm220-not-printing-paper-jams-indicator-lights', file: 'nelko-pm220-not-printing-paper-jams-indicator-lights.jpg' },
  { slug: 'fix-lexmark-mobile-print-app-management-errors', file: 'fix-lexmark-mobile-print-app-management-errors.jpg' },
  { slug: 'fix-xerox-041-042-053-codes-fuser-transfer-belt-errors', file: 'fix-xerox-041-042-053-codes-fuser-transfer-belt-errors.jpg' },
  { slug: 'citizen-printer-utility-windows-11-drivers-nicelabel-setup', file: 'citizen-printer-utility-windows-11-drivers-nicelabel-setup.jpg' },
  { slug: 'primera-bravo-se-vs-pro-firmware-update-failed-signature-composer', file: 'primera-bravo-se-vs-pro-firmware-update-failed-signature-composer.jpg' },
  { slug: 'phomemo-printhead-cleaning-guide-faint-lines-residue', file: 'phomemo-printhead-cleaning-guide-faint-lines-residue.jpg' },
  { slug: 'rollo-printer-software-not-available-apple-mac-driver-fix', file: 'rollo-printer-software-not-available-apple-mac-driver-fix.jpg' },
  { slug: 'seiko-slp-650-vs-650se-slp-620-differences-setup', file: 'seiko-slp-650-vs-650se-slp-620-differences-setup.jpg' },
  { slug: 'phomemo-m08f-tattoo-stencil-m832-letter-size-paper-guide', file: 'phomemo-m08f-tattoo-stencil-m832-letter-size-paper-guide.jpg' }
];

async function main() {
  await Promise.all(updates.map(update => 
    prisma.article.update({
      where: { slug: update.slug },
      data: { featuredImage: `/images/articles/${update.file}` }
    })
  ));
  console.log("Updated all 10.");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
