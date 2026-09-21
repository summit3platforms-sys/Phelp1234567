import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const slugs = ["hp-envy-6055e-paper-jam-no-paper", "niimbot-d11-vs-d110-d101-setup-guides", "fix-xerox-network-016-error", "dymo-labelwriter-calibration-feed-size-mismatch", "hp-laserjet-50-2-fuser-error"];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  console.log(JSON.stringify(articles, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
