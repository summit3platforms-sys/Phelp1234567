import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    where: { status: 'published', brand: { slug: 'hp' } },
    select: { id: true, slug: true, title: true, content: true, wordCount: true }
  });

  const thin = articles
    .map(a => {
      const words = a.content ? a.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(w => w.length > 0).length : 0;
      return { ...a, realWords: words };
    })
    .filter(a => a.realWords < 700)
    .sort((a, b) => a.realWords - b.realWords);

  console.log(`HP thin articles (< 700 words): ${thin.length}\n`);
  thin.forEach(a => {
    console.log(`[${a.realWords}w] ${a.id} | ${a.slug}`);
  });
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); });
