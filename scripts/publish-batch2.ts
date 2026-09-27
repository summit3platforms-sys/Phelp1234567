import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const publishSlugs = [
  'epson-ecotank-et-4760-wifi-setup-connection-fixes',
  'epson-ecotank-et-2800-wifi-setup-connection-fixes',
  'epson-ecotank-et-2750-wifi-setup-connection-fixes',
  'canon-printer-5b00-vs-1700-difference',
  'canon-pixma-ts3522-not-printing',
  'instax-connect-ar-print-not-working-troubleshooting',
  'instax-link-app-crashing-compatibility-permissions-fix',
  'fix-seiko-slp-manager-software-printer-not-responding-stuck',
  'fix-citizen-printer-overheating-cooling-pause-dense-text',
];

async function main() {
  console.log('Publishing approved Batch 2 articles...');

  for (const slug of publishSlugs) {
    const existing = await prisma.article.findUnique({
      where: { slug },
      select: { id: true, title: true, status: true, publishedAt: true }
    });

    if (!existing) {
      console.error(`Article not found: ${slug}`);
      continue;
    }

    const updated = await prisma.article.update({
      where: { slug },
      data: {
        status: 'published',
      },
      select: {
        id: true,
        slug: true,
        status: true,
        publishedAt: true,
      }
    });

    console.log(`[PUBLISHED] ${updated.slug} | Status: ${updated.status} | publishedAt: ${updated.publishedAt?.toISOString()}`);
  }

  // Double check #9 remains draft
  const mergedArticle = await prisma.article.findUnique({
    where: { slug: 'seiko-slp-advanced-driver-fixes-registry-idle-polling-silent-install' },
    select: { slug: true, status: true, tags: true }
  });
  console.log(`[MERGED DRAFT CHECK] ${mergedArticle?.slug} | Status: ${mergedArticle?.status} | Tags: ${mergedArticle?.tags}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
