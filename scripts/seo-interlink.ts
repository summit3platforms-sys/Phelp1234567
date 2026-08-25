import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

const IGNORED_KEYWORDS = new Set([
  'canon', 'epson', 'brother', 'kodak', 'printer', 'printers', 'error', 'code',
  'fix', 'issue', 'problem', 'troubleshooting', 'setup', 'cartridge',
  'printhead', 'blank', 'page', 'pages', 'ink', 'toner', 'paper', 'jam',
  'mac', 'windows', 'wifi', 'wi-fi', 'wireless', 'network', 'offline',
  'zebra', 'brother', 'epson', 'pantum', 'niimbot', 'seiko', 'citizen', 'bixolon',
  'dymo', 'rollo', 'munbyn', 'nelko', 'phomemo', 'primera', 'xerox', 'lexmark',
  'star', 'honeywell', 'datamax', 'godex', 'toshiba', 'eltron', 'intermec',
  'print', 'label', 'receipt', 'thermal', 'driver', 'usb', 'serial', 'port'
]);

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function main() {
  // ── Phase 1: Strip ALL old interlinks via a single SQL UPDATE ─────────────
  console.log('Phase 1: Stripping ALL existing interlinks via SQL...');

  // One SQL statement strips all <a href="/...">text</a> patterns across the ENTIRE table at once
  const result = await prisma.$executeRawUnsafe(
    `UPDATE "Article"
     SET content = regexp_replace(
       content,
       E'<a\\s[^>]*href="/[^"]*"[^>]*>([^<]*)</a>',
       E'\\1',
       'g'
     )
     WHERE content ~ E'<a\\s[^>]*href="/[^"]*"'
       AND status = 'published'`
  );

  console.log(`✅ Phase 1 done — cleaned links from ${result} articles in a single SQL pass.\n`);

  // ── Phase 2: Same-brand interlinking only ─────────────────────────────────
  console.log('Phase 2: Re-running interlinking with SAME-BRAND restriction...');

  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    include: { brand: true, category: true },
  });
  console.log(`Found ${articles.length} published articles.`);

  // Group by brandId
  const byBrand = new Map<string, typeof articles>();
  for (const a of articles) {
    if (!a.brand) continue;
    if (!byBrand.has(a.brand.id)) byBrand.set(a.brand.id, []);
    byBrand.get(a.brand.id)!.push(a);
  }
  console.log(`Organized articles into ${byBrand.size} brand groups.`);

  let updatedCount = 0;
  let totalLinksAdded = 0;

  for (const [, brandArticles] of byBrand) {
    const brandName = brandArticles[0]?.brand?.name ?? '?';

    // Build keyword dict from THIS brand only
    type KwEntry = { keyword: string; url: string; articleId: string; title: string };
    const kwDict: KwEntry[] = [];

    for (const a of brandArticles) {
      if (!a.brand || !a.category) continue;
      const url = `/${a.brand.slug}/${a.category.slug}/${a.slug}`;
      const candidates: string[] = [];

      if (a.tags) candidates.push(...a.tags.split(',').map((t: string) => t.trim()));
      if (a.errorCode) candidates.push(a.errorCode, `Error ${a.errorCode}`);

      for (let kw of candidates) {
        kw = kw.toLowerCase().trim();
        if (kw.length < 4) continue;
        if (IGNORED_KEYWORDS.has(kw)) continue;

        // Only allow specific keywords: >=12 chars OR contains a model-code pattern
        const hasModelCode = /[a-z]{1,4}[-_]?[0-9]{2,}|[0-9]{3,}/.test(kw);
        if (kw.length < 12 && !hasModelCode) continue;

        if (!kwDict.some(k => k.keyword === kw && k.articleId === a.id)) {
          kwDict.push({ keyword: kw, url, articleId: a.id, title: a.seoTitle || a.title });
        }
      }
    }

    kwDict.sort((a, b) => b.keyword.length - a.keyword.length);

    for (const article of brandArticles) {
      if (!article.content) continue;

      const $ = cheerio.load(article.content, null, false);
      let added = 0;
      const linkedIds = new Set<string>();
      let modified = false;
      const MAX = 3;

      for (const kw of kwDict) {
        if (added >= MAX) break;
        if (kw.articleId === article.id) continue;
        if (linkedIds.has(kw.articleId)) continue;
        if (!article.content.toLowerCase().includes(kw.keyword)) continue;

        const re = new RegExp(`\\b(${escapeRegExp(kw.keyword)})\\b`, 'i');
        let hit = false;

        $('p, li').each((_, el) => {
          if (hit) return;
          if ($(el).find('a').length > 0) return;
          const html = $(el).html();
          if (html && re.test(html)) {
            $(el).html(html.replace(re, `<a href="${kw.url}" title="${kw.title.replace(/"/g, '&quot;')}">$1</a>`));
            hit = true;
            modified = true;
          }
        });

        if (hit) { added++; totalLinksAdded++; linkedIds.add(kw.articleId); }
      }

      if (modified) {
        await prisma.article.update({ where: { id: article.id }, data: { content: $.html() } });
        updatedCount++;
      }
    }

    console.log(`  ✔ ${brandName}: ${brandArticles.length} articles processed`);
  }

  console.log(`\n✅ SEO Interlinking Complete!`);
  console.log(`Updated ${updatedCount} articles with ${totalLinksAdded} new same-brand internal links.`);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
