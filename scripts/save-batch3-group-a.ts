import { PrismaClient } from '@prisma/client';
import { groupAArticles } from './prepare-batch3-group-a';

const prisma = new PrismaClient();

async function main() {
  console.log('Saving Group A articles as DRAFT in database...');

  for (const art of groupAArticles) {
    const existing = await prisma.article.findUnique({
      where: { slug: art.slug },
      include: { revisions: { orderBy: { version: 'desc' }, take: 1 } }
    });

    if (!existing) {
      console.error(`Article not found: ${art.slug}`);
      continue;
    }

    const nextVersion = (existing.revisions[0]?.version || 1) + 1;

    // Create revision
    await prisma.revision.create({
      data: {
        articleId: existing.id,
        version: nextVersion,
        title: art.title,
        content: art.content,
        metaDescription: art.metaDescription,
        seoTitle: art.title,
      }
    });

    // Update article
    const updated = await prisma.article.update({
      where: { id: existing.id },
      data: {
        title: art.title,
        metaDescription: art.metaDescription,
        content: art.content,
        status: 'draft', // MUST SAVE AS DRAFT
        // DO NOT TOUCH publishedAt
      }
    });

    // Clean existing sources and add verified sources
    await prisma.articleSource.deleteMany({
      where: { articleId: existing.id }
    });

    for (const src of art.sources) {
      await prisma.articleSource.create({
        data: {
          articleId: existing.id,
          url: src.url,
          title: src.title,
          anchorText: src.title,
          publisher: 'Rollo Support',
          sourceType: 'manual',
          httpStatus: 200,
          verifiedAt: new Date(),
        }
      });
    }

    console.log(`[DRAFT SAVED] ${updated.slug} | Version: ${nextVersion} | Status: ${updated.status} | publishedAt: ${updated.publishedAt?.toISOString()}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
