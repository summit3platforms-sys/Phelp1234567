import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get real word counts by computing from actual HTML content
  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    select: { id: true, title: true, wordCount: true, content: true, slug: true, brand: { select: { name: true } } },
    orderBy: { wordCount: 'asc' }
  });

  console.log(`Total articles: ${articles.length}\n`);

  // Compute real word count from HTML
  const withRealCount = articles.map(a => {
    const text = a.content ? a.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
    const realWords = text ? text.split(' ').filter(w => w.length > 0).length : 0;
    return { ...a, realWords };
  });

  const thin = withRealCount.filter(a => a.realWords < 500);
  const medium = withRealCount.filter(a => a.realWords >= 500 && a.realWords < 900);

  console.log(`🔴 TRULY THIN (< 500 real words): ${thin.length}`);
  console.log(`🟡 MEDIUM (500-899 real words):    ${medium.length}`);
  console.log(`🟢 GOOD (900+ real words):         ${withRealCount.filter(a => a.realWords >= 900).length}`);
  console.log('\n');

  console.log('🔴 THIN ARTICLES:\n');
  thin.forEach(a => {
    console.log(`  [real:${a.realWords}w stored:${a.wordCount}w] ${(a.brand?.name || '').padEnd(22)} | ${a.title.substring(0, 55)}`);
    console.log(`  ID: ${a.id}`);
    console.log(`  slug: ${a.slug}`);
    console.log('');
  });

  console.log('\n🟡 MEDIUM ARTICLES:\n');
  medium.slice(0, 30).forEach(a => {
    console.log(`  [real:${a.realWords}w stored:${a.wordCount}w] ${(a.brand?.name || '').padEnd(22)} | ${a.title.substring(0, 55)}`);
    console.log(`  ID: ${a.id}`);
    console.log(`  slug: ${a.slug}`);
    console.log('');
  });
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
