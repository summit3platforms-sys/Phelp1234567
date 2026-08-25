import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const zeroWordArticles = await prisma.article.findMany({
    where: { status: 'published', wordCount: 0 },
    include: { brand: true },
    orderBy: { brand: { name: 'asc' } }
  });

  console.log(`\n🔍 ZERO wordCount articles: ${zeroWordArticles.length}\n`);
  console.log('='.repeat(90));

  for (const a of zeroWordArticles) {
    const actualLen = a.content ? a.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length : 0;
    const status = actualLen > 300 ? '✅ HAS CONTENT' : actualLen > 0 ? '⚠️  SPARSE' : '❌ EMPTY';
    console.log(`${status} [actual ~${actualLen}w stored:0] ${a.brand?.name?.padEnd(20)} | ${a.title.substring(0, 55)}`);
    console.log(`  ID: ${a.id}  slug: ${a.slug}`);
    console.log('');
  }

  // Also check for empty content
  const nullContent = await prisma.article.findMany({
    where: { status: 'published', content: '' },
    include: { brand: true }
  });
  console.log(`\n❌ EMPTY content articles: ${nullContent.length}`);
  for (const a of nullContent) {
    console.log(`  ${a.brand?.name?.padEnd(20)} | ${a.title}`);
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
