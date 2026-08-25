import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    select: { id: true, slug: true, title: true, content: true, wordCount: true, brand: { select: { name: true, slug: true } } }
  });

  const thinArticles = articles
    .map(a => {
      const text = a.content ? a.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
      const realWords = text ? text.split(' ').filter(w => w.length > 0).length : 0;
      return { ...a, realWords };
    })
    .filter(a => a.realWords < 750)
    .sort((a, b) => a.realWords - b.realWords);

  console.log(`Total published articles: ${articles.length}`);
  console.log(`Articles under 750 real words: ${thinArticles.length}\n`);

  // Group by brand
  const byBrand: Record<string, typeof thinArticles> = {};
  thinArticles.forEach(a => {
    const brandName = a.brand?.name || 'Unknown';
    if (!byBrand[brandName]) byBrand[brandName] = [];
    byBrand[brandName].push(a);
  });

  for (const [brand, list] of Object.entries(byBrand)) {
    console.log(`=== ${brand} (${list.length} articles) ===`);
    list.forEach(a => {
      console.log(`  [${a.realWords}w] ${a.id} | ${a.slug} | ${a.title.substring(0, 50)}`);
    });
    console.log('');
  }
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); process.exit(1); });
