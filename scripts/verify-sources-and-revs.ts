import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const slugs = [
    'brother-hl-l2370dw-wifi-connection-deep-sleep-fix',
    'canon-maxify-mb2720-error',
    'canon-printer-support-code-306',
    'canon-maxify-gx-error-code'
  ];

  for (const slug of slugs) {
    const a = await prisma.article.findUnique({
      where: { slug },
      include: {
        sources: true,
        revisions: { orderBy: { version: 'desc' }, take: 1 }
      }
    });
    console.log(`\n=== ${slug} ===`);
    console.log(`Title: ${a?.title}`);
    console.log(`Latest Revision: Version ${a?.revisions[0]?.version}`);
    console.log(`Sources (${a?.sources.length}):`);
    a?.sources.forEach(s => console.log(` - [${s.sourceType}] ${s.anchorText} (${s.url})`));
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
