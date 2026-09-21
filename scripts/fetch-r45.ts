import { prisma } from '../src/lib/prisma';
import fs from 'fs';

async function main() {
  const slugs = ["brother-printer-wont-connect-to-wlan-access-point", "dymo-labelwriter-450-turbo-setup-not-printing", "star-micronics-tsp143-series-iii-vs-iv-wifi-ethernet-setup", "nelko-pm220-not-printing-paper-jams-indicator-lights", "fix-pantum-toner-not-recognized-chip-resets-spring-contacts"];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } },
    select: { id: true, slug: true, content: true }
  });
  fs.writeFileSync('r45-articles.json', JSON.stringify(articles, null, 2));
}

main().catch(console.error);
