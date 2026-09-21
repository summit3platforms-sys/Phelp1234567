import { prisma } from './src/lib/prisma';
import fs from 'fs';

async function main() {
  const content = fs.readFileSync('brother-content.txt', 'utf8').trim();
  const excerpt = fs.readFileSync('brother-excerpt.txt', 'utf8').trim();
  const metaDescription = fs.readFileSync('brother-meta.txt', 'utf8').trim();
  const wordCount = parseInt(fs.readFileSync('brother-words.txt', 'utf8').trim(), 10);
  
  const alexId = '88e8d061-e1be-406d-8fa1-a53f108cc624';
  const brotherId = '932bf0f5-0256-4fb6-ad10-3098241e0ec1';
  const catId = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';

  const models = ['HL-L2390DW', 'HL-L2370DW'];
  for (const model of models) {
    await prisma.article.create({
      data: {
        title: `Brother ${model} Wi-Fi Connection & Deep Sleep Offline Fix`,
        slug: `brother-${model.toLowerCase()}-wifi-connection-deep-sleep-fix`,
        content: content.replace(/HL-L2300 Series/gi, model).replace(/HL-L2390DW, HL-L2370DW/gi, model),
        brandId: brotherId,
        categoryId: catId,
        status: 'published',
        wordCount: wordCount,
        publishedAt: new Date(),
        excerpt: excerpt,
        metaDescription: metaDescription,
        authorId: alexId,
      }
    });
    console.log(`Created separate Brother article for ${model} in REAL DB.`);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
