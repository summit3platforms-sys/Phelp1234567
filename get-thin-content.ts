import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      wordCount: true,
      content: true,
      brand: {
        select: { name: true }
      }
    }
  });

  const thinArticles = [];

  for (const article of articles) {
    // Basic word count logic: strip HTML tags and split by whitespace
    const strippedContent = article.content.replace(/<[^>]+>/g, ' ');
    const realWordCount = strippedContent.trim().split(/\s+/).length;

    // We consider anything under 600 words as "thin" content for an SEO guide
    if (realWordCount < 600) {
      thinArticles.push({
        id: article.id,
        brand: article.brand?.name || 'Unknown',
        title: article.title,
        slug: article.slug,
        dbWordCount: article.wordCount,
        realWordCount: realWordCount
      });
    }
  }

  // Sort by lowest word count
  thinArticles.sort((a, b) => a.realWordCount - b.realWordCount);

  console.log(`Found ${thinArticles.length} articles with thin content (<600 words):`);
  console.log("---------------------------------------------------------");
  
  // Show top 20 thinnest
  for (const a of thinArticles.slice(0, 20)) {
    console.log(`[${a.brand}] ${a.title}`);
    console.log(`   -> Real: ${a.realWordCount} words (DB: ${a.dbWordCount})`);
    console.log(`   -> Slug: ${a.slug}`);
    console.log("");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
