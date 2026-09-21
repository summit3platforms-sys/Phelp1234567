import { prisma } from '../src/lib/prisma';
import fs from 'fs';

async function main() {
  const slugs = [
    "hp-printer-cartridge-sensor-failure",
    "niimbot-bluetooth-connection-fails-android-gps",
    "phomemo-no-paper-light-cover-open-error-feed-calibration",
    "canon-pixma-mg3620-offline-reconnect-wifi",
    "dymo-labelwriter-label-jam-removal-clean-sensor"
  ];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true, content: true }
  });
  fs.writeFileSync('fetched_5.json', JSON.stringify(articles, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
