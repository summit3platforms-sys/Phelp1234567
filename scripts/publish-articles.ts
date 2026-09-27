import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('--- Publishing Articles ---');

  // 1. Publish #1 (brother-hl-l2370dw-wifi-connection-deep-sleep-fix)
  // Remove 'noindex' tag so it gets indexed now that body is full and published
  const art1 = await prisma.article.findUnique({
    where: { slug: 'brother-hl-l2370dw-wifi-connection-deep-sleep-fix' }
  });
  if (art1) {
    const cleanTags = (art1.tags || '')
      .split(',')
      .map(t => t.trim())
      .filter(t => t.toLowerCase() !== 'noindex')
      .join(', ');

    await prisma.article.update({
      where: { id: art1.id },
      data: {
        status: 'published',
        tags: cleanTags
      }
    });
    console.log('✅ #1 Published: brother-hl-l2370dw-wifi-connection-deep-sleep-fix');
  }

  // 2. Publish #3 (canon-maxify-mb2720-error)
  await prisma.article.update({
    where: { slug: 'canon-maxify-mb2720-error' },
    data: { status: 'published' }
  });
  console.log('✅ #3 Published: canon-maxify-mb2720-error');

  // 3. Publish #4 (canon-printer-support-code-306)
  await prisma.article.update({
    where: { slug: 'canon-printer-support-code-306' },
    data: { status: 'published' }
  });
  console.log('✅ #4 Published: canon-printer-support-code-306');

  // 4. Publish #5 (canon-maxify-gx-error-code)
  await prisma.article.update({
    where: { slug: 'canon-maxify-gx-error-code' },
    data: { status: 'published' }
  });
  console.log('✅ #5 Published: canon-maxify-gx-error-code');

  // Verify #2 redirect status
  const redir = await prisma.redirect.findUnique({
    where: { oldUrl: '/brother/connectivity-issues/brother-hl-l2390dw-wifi-connection-deep-sleep-fix' }
  });
  console.log('ℹ️ #2 Redirect state:', redir);
}

main().catch(console.error).finally(() => prisma.$disconnect());
