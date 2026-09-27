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
    const a = await prisma.article.findUnique({
      where: { slug },
      select: { slug: true, status: true, title: true, wordCount: true, tags: true }
    });
    console.log(slug, '->', a);
  }

  const redir = await prisma.redirect.findUnique({
    where: { oldUrl: '/brother/connectivity-issues/brother-hl-l2390dw-wifi-connection-deep-sleep-fix' }
  });
  console.log('\nRedirect verified:', redir);
}

main().catch(console.error).finally(() => prisma.$disconnect());
