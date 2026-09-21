import { prisma } from '../src/lib/prisma';
import fs from 'fs';

async function main() {
  const slugs = [
    "niimbot-wont-turn-on-wont-charge-battery-drain",
    "hp-scanner-says-door-open-when-closed",
    "brother-printer-error-49-too-cold",
    "niimbot-b1-vs-b21-b3s-b4-comparison-troubleshooting",
    "primera-printer-offline-error-state-ptstatus-wont-open"
  ];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true, content: true }
  });
  fs.writeFileSync('target-articles.json', JSON.stringify(articles, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
