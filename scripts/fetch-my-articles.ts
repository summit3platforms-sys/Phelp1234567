import { prisma } from '../src/lib/prisma';
import * as fs from 'fs';

async function main() {
  const slugs = [
    "bixolon-spp-r200-error",
    "rollo-wireless-printer-wifi-bluetooth-setup-guide",
    "hp-envy-7855-duplex-printing-not-working",
    "niimbot-d11-vs-d110-d101-setup-guides",
    "brother-printer-network-configuration-page-how-to-print"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  fs.writeFileSync('articles_out.json', JSON.stringify(articles, null, 2));
  console.log(`Fetched ${articles.length} articles.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
