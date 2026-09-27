import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const slugs = [
    'brother-hl-l2370dw-wifi-connection-deep-sleep-fix',
    'brother-hl-l2390dw-wifi-connection-deep-sleep-fix',
    'canon-maxify-mb2720-error',
    'canon-printer-support-code-306',
    'canon-maxify-gx-error-code'
  ];

  for (const slug of slugs) {
    const a = await prisma.article.findFirst({
      where: { slug },
      select: { id: true, slug: true, status: true, title: true, content: true, wordCount: true }
    });
    console.log(slug, '->', a ? { id: a.id, status: a.status, length: a.content?.length, wordCount: a.wordCount } : 'NOT FOUND');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
