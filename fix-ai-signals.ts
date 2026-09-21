import { prisma } from './src/lib/prisma';

async function main() {
  const articles = await prisma.article.findMany();
  let updatedCount = 0;

  for (const article of articles) {
    let content = article.content;
    const originalContent = content;

    // Direct AI declarations
    content = content.replace(/As an AI language model, I/gi, 'We');
    content = content.replace(/As an AI, I/gi, 'We');
    content = content.replace(/I am an AI/gi, 'We are a team');
    
    // Cliche AI vocabulary
    content = content.replace(/delve into/gi, 'explore');
    content = content.replace(/delving into/gi, 'exploring');
    content = content.replace(/demystify/gi, 'explain');
    content = content.replace(/a testament to/gi, 'proof of');
    content = content.replace(/In conclusion,/gi, 'To summarize,');
    content = content.replace(/When it comes to/gi, 'Regarding');
    content = content.replace(/It is important to note that/gi, 'Note that');
    content = content.replace(/It's important to remember that/gi, 'Remember that');

    if (content !== originalContent) {
      await prisma.article.update({
        where: { id: article.id },
        data: { content: content }
      });
      updatedCount++;
    }
  }

  console.log(`Successfully purged AI signals from ${updatedCount} articles.`);
}

main().finally(() => prisma.$disconnect());
