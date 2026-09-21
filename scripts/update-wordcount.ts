import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const article = await prisma.article.findFirst({
    where: { slug: "hp-sprocket-select-vs-sprocket-200-difference" }
  });
  if (article) {
    const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');
    const plainText = stripHtml(article.content).trim();
    const wordCount = plainText.split(/\s+/).length;
    console.log('Actual Word count:', wordCount);
    
    await prisma.article.update({
      where: { id: article.id },
      data: { wordCount }
    });
    console.log('Updated word count to', wordCount);
  }
}
main().finally(() => prisma.$disconnect());
