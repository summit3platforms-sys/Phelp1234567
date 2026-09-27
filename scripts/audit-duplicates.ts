import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';
const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    select: { id: true, slug: true, content: true, faqs: true, brand: { select: { name: true } } },
    where: { status: 'published' }
  });

  const dupH2List: any[] = [];
  const dupFaqSections: any[] = [];
  const dupParagraphs: any[] = [];
  const emptyH2List: any[] = [];
  const duplicateSections: any[] = [];

  for (const a of articles) {
    const brand = a.brand?.name ?? 'unknown';
    const html = a.content;
    const $ = cheerio.load('<div id="root">' + html + '</div>', null, false);

    // 1. Check duplicate FAQ sections still remaining
    const hasContentFaq = a.content.includes('<details');
    let faqsArr: any[] = [];
    try { faqsArr = a.faqs ? JSON.parse(a.faqs as string) : []; } catch(e) {}
    if (hasContentFaq && faqsArr.length > 0) {
      dupFaqSections.push({ slug: a.slug, brand, count: faqsArr.length });
    }

    // 2. Check duplicate H2
    const h2Map: Record<string, number> = {};
    $('#root h2').each((_, el) => {
      const t = $(el).text().trim().toLowerCase();
      if (!t) {
        emptyH2List.push({ slug: a.slug, brand });
      } else {
        h2Map[t] = (h2Map[t] || 0) + 1;
      }
    });
    for (const [heading, count] of Object.entries(h2Map)) {
      if (count > 1) {
        dupH2List.push({ slug: a.slug, brand, heading, count });
      }
    }

    // 3. Check duplicate paragraphs (> 60 chars)
    const pMap: Record<string, number> = {};
    $('#root p').each((_, el) => {
      const t = $(el).text().trim();
      if (t.length > 60) {
        const norm = t.toLowerCase().replace(/\s+/g, ' ');
        pMap[norm] = (pMap[norm] || 0) + 1;
      }
    });
    for (const [p, count] of Object.entries(pMap)) {
      if (count > 1) {
        dupParagraphs.push({ slug: a.slug, brand, snippet: p.substring(0, 80), count });
      }
    }

    // 4. Check for entire duplicate repeated sections (e.g. repeated h2 + p blocks or repeated content chunks)
    const rawH2s = $('#root h2').map((_, el) => $(el).text().trim()).get();
    // Also check if article has duplicate blocks of text (> 200 chars)
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    // Search for repeated 150-char substrings
    for (let i = 0; i < text.length - 200; i += 100) {
      const chunk = text.substring(i, i + 150);
      const secondIdx = text.indexOf(chunk, i + 150);
      if (secondIdx !== -1) {
        duplicateSections.push({ slug: a.slug, brand, sample: chunk.substring(0, 70) });
        break;
      }
    }
  }

  console.log('=== DUPLICATE CONTENT AUDIT REPORT ===');
  console.log('Total articles scanned:', articles.length);
  console.log('\n1. Duplicate FAQ sections (content <details> + DB faqs field):', dupFaqSections.length);
  if (dupFaqSections.length > 0) {
    dupFaqSections.forEach(x => console.log('   - [' + x.brand + '] ' + x.slug));
  }

  console.log('\n2. Articles with exact duplicate H2 headings:', dupH2List.length);
  dupH2List.forEach(x => console.log('   - [' + x.brand + '] ' + x.slug + ': "' + x.heading + '" (' + x.count + 'x)'));

  console.log('\n3. Articles with empty H2 tags (<h2></h2>):', emptyH2List.length);
  emptyH2List.forEach(x => console.log('   - [' + x.brand + '] ' + x.slug));

  console.log('\n4. Articles with identical duplicate paragraphs (>60 chars):', dupParagraphs.length);
  dupParagraphs.forEach(x => console.log('   - [' + x.brand + '] ' + x.slug + ' (' + x.count + 'x): "' + x.snippet + '..."'));

  console.log('\n5. Articles with repeated large text chunks (>150 characters):', duplicateSections.length);
  duplicateSections.forEach(x => console.log('   - [' + x.brand + '] ' + x.slug + ': "' + x.sample + '..."'));
}

main().catch(console.error).finally(() => prisma.$disconnect());
