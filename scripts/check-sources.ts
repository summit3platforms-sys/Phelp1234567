import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkSources() {
  console.log('--- Checking Link Health for Article Sources ---');
  const sources = await prisma.articleSource.findMany({
    include: {
      article: {
        select: {
          slug: true,
          brand: { select: { slug: true } },
          category: { select: { slug: true } },
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  console.log(`Found ${sources.length} sources to verify.\n`);

  let passed = 0;
  let non200Count = 0;
  const non200List: Array<{ articleUrl: string; sourceUrl: string; status: number; error?: string }> = [];

  for (const source of sources) {
    const articleUrl = `https://libertyprinterfix.com/${source.article.brand?.slug || 'brand'}/${source.article.category?.slug || 'category'}/${source.article.slug}`;
    try {
      const resp = await fetch(source.url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml,application/pdf;q=0.9,*/*;q=0.8',
        },
        redirect: 'follow',
      });

      const currentStatus = resp.status;
      const now = new Date();

      await prisma.articleSource.update({
        where: { id: source.id },
        data: {
          httpStatus: currentStatus,
          verifiedAt: now,
        },
      });

      if (currentStatus === 200) {
        passed++;
        console.log(`[PASS 200] ${source.publisher} | ${source.anchorText} (${source.url})`);
      } else {
        non200Count++;
        console.warn(`[WARN ${currentStatus}] ${source.url}`);
        non200List.push({
          articleUrl,
          sourceUrl: source.url,
          status: currentStatus,
        });
      }
    } catch (err: any) {
      non200Count++;
      const now = new Date();
      await prisma.articleSource.update({
        where: { id: source.id },
        data: {
          httpStatus: 0,
          verifiedAt: now,
        },
      });
      console.error(`[FAIL] ${source.url} -> ${err.message}`);
      non200List.push({
        articleUrl,
        sourceUrl: source.url,
        status: 0,
        error: err.message,
      });
    }
  }

  console.log('\n==========================================');
  console.log(`Total checked: ${sources.length}`);
  console.log(`200 OK: ${passed}`);
  console.log(`Non-200 / Errors: ${non200Count}`);
  console.log('==========================================');

  if (non200List.length > 0) {
    console.log('\nNon-200 Sources Detected:');
    non200List.forEach((item, idx) => {
      console.log(`${idx + 1}. [HTTP ${item.status}] ${item.sourceUrl}`);
      console.log(`   Article: ${item.articleUrl}`);
      if (item.error) console.log(`   Error: ${item.error}`);
    });
  } else {
    console.log('\nAll source citations returned HTTP 200 OK.');
  }
}

checkSources()
  .catch((e) => {
    console.error('Fatal error during check-sources:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
