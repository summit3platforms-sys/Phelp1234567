import { prisma } from '../src/lib/prisma';
import * as fs from 'fs';

async function main() {
  const slugs = ["kodak-verite-printer-offline-wireless-setup", "phomemo-m08f-tattoo-stencil-m832-letter-size-paper-guide", "hp-printer-paper-curling-out-of-tray", "seiko-slp-self-test-calibration-flashing-light-error", "polaroid-hi-print-sticker-backing-peeling-storage-tips"];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  fs.writeFileSync('articles-to-rewrite.json', JSON.stringify(articles, null, 2));
  console.log(`Fetched ${articles.length} articles.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
