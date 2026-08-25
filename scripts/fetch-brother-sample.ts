import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const slugs = [
    'brother-printer-network-configuration-page-how-to-print',
    'brother-mfc-scanner-error-e52',
    'brother-printer-error-42-temperature',
    'brother-printer-error-30-unable-to-print',
    'brother-printer-error-ts-07',
    'brother-printer-error-35-fix',
    'brother-error-code-e50-vs-e51-difference'
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } },
    select: { id: true, slug: true, title: true, content: true }
  });

  for (const a of articles) {
    console.log(`=== ${a.slug} ===`);
    console.log(a.content?.substring(0, 300));
    console.log('...\n');
  }
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); });
