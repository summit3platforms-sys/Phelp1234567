import { prisma } from './src/lib/prisma';
import fs from 'fs';

const slugs = [
  "kodak-luma-projector-wifi-connection-fix",
  "dascom-thermal-printer-paper-feed-error",
  "star-micronics-led-error-codes-beeping-factory-reset-guide",
  "hp-envy-inspire-7255e-setup-stuck",
  "phomemo-label-off-center-size-not-recognized-roller-guide"
];

async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true, content: true }
  });
  fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
