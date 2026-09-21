import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'niimbot-bluetooth-connection-fails-android-gps', file: 'niimbot-bluetooth-connection-fails-android-gps.jpg' },
  { slug: 'rollo-printer-wont-stop-printing-beeping-error-meanings', file: 'rollo-printer-wont-stop-printing-beeping-error-meanings.jpg' },
  { slug: 'xerox-workcentre-versalink-errors-c405-6515-altalink', file: 'xerox-workcentre-versalink-errors-c405-6515-altalink.jpg' },
  { slug: 'polaroid-hi-print-pairs-wont-print-keeps-disconnecting', file: 'polaroid-hi-print-pairs-wont-print-keeps-disconnecting.jpg' },
  { slug: 'nelko-4x6-shipping-label-printer-setup-calibration-blank-labels', file: 'nelko-4x6-shipping-label-printer-setup-calibration-blank-labels.jpg' },
  { slug: 'phomemo-wont-turn-on-wont-charge-battery-drain-fix', file: 'phomemo-wont-turn-on-wont-charge-battery-drain-fix.jpg' },
  { slug: 'xerox-phaser-6510-errors-versalink-c505-vs-c605', file: 'xerox-phaser-6510-errors-versalink-c505-vs-c605.jpg' },
  { slug: 'fix-xerox-network-016-error-web-server-cloud-connections', file: 'fix-xerox-network-016-error-web-server-cloud-connections.jpg' },
  { slug: 'primera-setup-guide-lx610-craft-beer-small-business-church-media', file: 'primera-setup-guide-lx610-craft-beer-small-business-church-media.jpg' },
  { slug: 'citizen-ct-s-series-guide-601-310-651-model-finder', file: 'citizen-ct-s-series-guide-601-310-651-model-finder.jpg' }
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
