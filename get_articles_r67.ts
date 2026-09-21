import { prisma } from './src/lib/prisma';
import fs from 'fs';

async function main() {
  const slugs = [
    "brother-printer-error-42-temperature",
    "hp-envy-photo-7855-paper-jam-error",
    "zebra-zd421-cancel-button-not-working-zd620-error-light",
    "niimbot-rfid-chip-fault-non-universal-labels-error",
    "fix-lexmark-service-engine-controller-card-980-scanner-lamp-820"
  ];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true, content: true }
  });
  fs.writeFileSync('r67_articles.json', JSON.stringify(articles, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
