import { prisma } from '../src/lib/prisma';

async function fetchArticles() {
  const slugs = [
    "hp-laserjet-pro-m404dn-fuser-error",
    "rollo-printer-static-ip-setup-windows-offline-fix",
    "munbyn-printer-offline-windows-11",
    "instax-link-wont-turn-on-charge-battery-fix",
    "hp-envy-6055e-paper-jam-no-paper"
  ];

  for (const slug of slugs) {
    const article = await prisma.article.findUnique({
      where: { slug }
    });
    console.log(`\n--- ARTICLE: ${slug} ---\n`);
    console.log(article?.content);
  }
}

fetchArticles()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
