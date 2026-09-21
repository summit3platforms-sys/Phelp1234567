import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'rollo-printer-not-showing-up-mac-ventura-sequoia-fix', file: 'rollo-printer-not-showing-up-mac-ventura-sequoia-fix.jpg' },
  { slug: 'fix-xerox-easy-assist-centreware-scan-experience-app-errors', file: 'fix-xerox-easy-assist-centreware-scan-experience-app-errors.jpg' },
  { slug: 'xerox-error-code-format-explained-how-to-read-xxx-yyy-faults', file: 'xerox-error-code-format-explained-how-to-read-xxx-yyy-faults.jpg' },
  { slug: 'instax-mini-link-bluetooth-connection-pairing-failed', file: 'instax-mini-link-bluetooth-connection-pairing-failed.jpg' },
  { slug: 'fix-pantum-app-not-printing-wifi-setup-offline-windows', file: 'fix-pantum-app-not-printing-wifi-setup-offline-windows.jpg' },
  { slug: 'phomemo-no-paper-light-cover-open-error-feed-calibration', file: 'phomemo-no-paper-light-cover-open-error-feed-calibration.jpg' },
  { slug: 'nelko-battery-drains-fast-overheating-charging-light-meaning', file: 'nelko-battery-drains-fast-overheating-charging-light-meaning.jpg' },
  { slug: 'niimbot-label-recognition-errors-exceeded-chip-limits', file: 'niimbot-label-recognition-errors-exceeded-chip-limits.jpg' },
  { slug: 'fix-xerox-imaging-drum-codes-091-092-093-errors', file: 'fix-xerox-imaging-drum-codes-091-092-093-errors.jpg' },
  { slug: 'fix-lexmark-fuser-errors-920-921-922-923-925', file: 'fix-lexmark-fuser-errors-920-921-922-923-925.jpg' }
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
