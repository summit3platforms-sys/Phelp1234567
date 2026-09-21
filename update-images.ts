import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'rollo-printer-usb-not-detected-disconnecting-port-fix', file: 'rollo-printer-usb-not-detected-disconnecting-port-fix.jpg' },
  { slug: 'fix-xerox-010-paper-jams-duplex-errors-door-jams', file: 'fix-xerox-010-paper-jams-duplex-errors-door-jams.jpg' },
  { slug: 'fix-citizen-label-gap-not-detected-reflective-media-feeding', file: 'fix-citizen-label-gap-not-detected-reflective-media-feeding.jpg' },
  { slug: 'rollo-printer-etsy-ebay-shipping-labels-setup', file: 'rollo-printer-etsy-ebay-shipping-labels-setup.jpg' },
  { slug: 'instax-mini-link-setup-guide-film-loading', file: 'instax-mini-link-setup-guide-film-loading.jpg' },
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
