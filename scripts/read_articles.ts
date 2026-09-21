import { prisma } from '../src/lib/prisma';

async function main() {
  const slugs = ["brother-mfc-scanner-error-e52", "zebra-sensor-profile-explained-cleaning-manual-calibration", "dascom-tractor-feed-paper-jam-alignment", "hp-utility-not-opening-mac", "fix-xerox-041-042-053-codes-fuser-transfer-belt-errors"];
  
  for (const slug of slugs) {
    const article = await prisma.article.findUnique({ where: { slug } });
    if (article) {
      console.log(`--- SLUG: ${slug} ---`);
      console.log(article.content);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
