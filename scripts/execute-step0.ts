import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('--- Step 0: Updating #1 and #2 to draft and noindex ---');

  const article1 = await prisma.article.findUnique({
    where: { slug: 'brother-hl-l2370dw-wifi-connection-deep-sleep-fix' }
  });
  if (article1) {
    const existingTags = article1.tags ? article1.tags.split(',').map(t => t.trim()) : [];
    if (!existingTags.includes('noindex')) existingTags.push('noindex');
    await prisma.article.update({
      where: { id: article1.id },
      data: {
        status: 'draft',
        tags: existingTags.join(', ')
      }
    });
    console.log('✅ Article #1 set to draft + noindex');
  }

  const article2 = await prisma.article.findUnique({
    where: { slug: 'brother-hl-l2390dw-wifi-connection-deep-sleep-fix' }
  });
  if (article2) {
    const existingTags = article2.tags ? article2.tags.split(',').map(t => t.trim()) : [];
    if (!existingTags.includes('noindex')) existingTags.push('noindex');
    await prisma.article.update({
      where: { id: article2.id },
      data: {
        status: 'draft',
        tags: existingTags.join(', ')
      }
    });
    console.log('✅ Article #2 set to draft + noindex');
  }

  // 301 Redirect from #2 to #1
  const oldUrl = '/brother/connectivity-issues/brother-hl-l2390dw-wifi-connection-deep-sleep-fix';
  const newUrl = '/brother/connectivity-issues/brother-hl-l2370dw-wifi-connection-deep-sleep-fix';

  await prisma.redirect.upsert({
    where: { oldUrl },
    update: { newUrl },
    create: { oldUrl, newUrl }
  });
  console.log(`✅ 301 Redirect added: ${oldUrl} -> ${newUrl}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
