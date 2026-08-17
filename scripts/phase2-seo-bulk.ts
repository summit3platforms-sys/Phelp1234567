import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { metaDescription: null },
        { metaDescription: '' },
        { 
          content: {
            not: {
              contains: '<h2>The Quick Answer</h2>'
            }
          }
        }
      ]
    },
    select: { id: true, slug: true, excerpt: true, metaDescription: true, content: true }
  });

  console.log(`Found ${articles.length} articles needing Phase 2 SEO upgrades.`);

  let updatedCount = 0;
  for (const article of articles) {
    let newMeta = article.metaDescription;
    let newContent = article.content;
    let modified = false;

    // 1. Meta Description Fix
    if (!newMeta || newMeta.trim() === '') {
      if (article.excerpt && article.excerpt.trim() !== '') {
        // Use excerpt, truncate to 155 chars nicely
        let truncated = article.excerpt;
        if (truncated.length > 155) {
          truncated = truncated.substring(0, 152) + '...';
        }
        newMeta = truncated;
        modified = true;
      } else {
        newMeta = `Troubleshooting guide and quick fixes for ${article.slug.replace(/-/g, ' ')}. Learn how to resolve this issue quickly and easily.`;
        modified = true;
      }
    }

    // 2. Featured Snippet (The Quick Answer) Injection
    if (newContent && !newContent.includes('<h2>The Quick Answer</h2>')) {
      const snippetText = article.excerpt ? article.excerpt : newMeta;
      const injection = `<h2>The Quick Answer</h2>\n<p><strong>${snippetText}</strong></p>\n\n`;
      newContent = injection + newContent;
      modified = true;
    }

    if (modified) {
      await prisma.article.update({
        where: { id: article.id },
        data: { 
          metaDescription: newMeta,
          content: newContent
        }
      });
      updatedCount++;
      console.log(`✅ Phase 2 SEO Upgrades applied to: ${article.slug}`);
    }
  }

  console.log(`\nSuccessfully applied Phase 2 SEO upgrades to ${updatedCount} articles.`);
  await prisma.$disconnect();
})();
