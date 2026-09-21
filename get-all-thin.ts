import { PrismaClient } from '@prisma/client';
import fs from 'fs';

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
    const strippedContent = article.content.replace(/<[^>]+>/g, ' ');
    const realWordCount = strippedContent.trim().split(/\s+/).length;

    if (realWordCount < 600) {
      thinArticles.push({
        brand: article.brand?.name || 'Unknown',
        title: article.title,
        slug: article.slug,
        dbWordCount: article.wordCount,
        realWordCount: realWordCount
      });
    }
  }

  thinArticles.sort((a, b) => a.realWordCount - b.realWordCount);

  let md = `# Thin Content Report\n\nFound **${thinArticles.length}** articles with less than 600 words of real content (ignoring HTML). Note how the database \`wordCount\` column is often wildly inaccurate.\n\n| Brand | Article Title | Real Word Count | Fake DB Word Count |\n|---|---|---|---|\n`;
  
  for (const a of thinArticles) {
    md += `| ${a.brand} | [${a.title}](/${a.brand.toLowerCase()}/category/${a.slug}) | **${a.realWordCount}** | ${a.dbWordCount} |\n`;
  }

  fs.writeFileSync('/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346/thin_content_report.md', md);
}

main().catch(console.error).finally(() => prisma.$disconnect());
