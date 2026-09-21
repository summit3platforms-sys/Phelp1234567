import { prisma } from '../src/lib/prisma';
import fs from 'fs';

async function main() {
  const slugs = [
    "primera-printhead-life-percentage-damaged-cartridge-contacts-fix",
    "rollo-printer-wont-stop-printing-beeping-error-meanings",
    "instax-link-charging-light-led-colors-meaning",
    "tally-dascom-2800-series-setup-guide",
    "hp-sprocket-app-not-printing-fix"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  fs.writeFileSync('dump.json', JSON.stringify(articles, null, 2));
}

main().catch(console.error);
