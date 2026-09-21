import { PrismaClient } from '@prisma/client';
import fs from 'fs';
const prisma = new PrismaClient();

const countWords = (text: string) => {
    return text.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(w => w.length > 0).length;
};

async function main() {
  const slugs = [
    { slug: "hp-envy-6055e-paper-jam-no-paper", file: "hp-envy.html" },
    { slug: "niimbot-d11-vs-d110-d101-setup-guides", file: "niimbot.html" },
    { slug: "fix-xerox-network-016-error-web-server-cloud-connections", file: "xerox.html" },
    { slug: "dymo-labelwriter-calibration-feed-size-mismatch", file: "dymo.html" },
    { slug: "hp-laserjet-50-2-fuser-error-fix", file: "hp-fuser.html" }
  ];

  const dbArticles = await prisma.article.findMany({
    where: { slug: { in: slugs.map(s => s.slug) } }
  });

  const promises = slugs.map(async item => {
    const dbArticle = dbArticles.find(a => a.slug === item.slug);
    if (!dbArticle) {
      console.log(`Article not found: ${item.slug}`);
      return;
    }
    const oldWordCount = dbArticle.wordCount;
    const newContent = fs.readFileSync(`scripts/${item.file}`, 'utf-8');
    const newWordCount = countWords(newContent);
    
    await prisma.article.update({
      where: { id: dbArticle.id },
      data: { content: newContent, wordCount: newWordCount }
    });
    
    console.log(`Updated ${item.slug}: Word count ${oldWordCount} -> ${newWordCount}`);
  });

  await Promise.all(promises);
  console.log('Success! All articles updated.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
