import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

const IGNORED_KEYWORDS = new Set([
  'canon', 'epson', 'brother', 'kodak', 'printer', 'printers', 'error', 'code', 
  'fix', 'issue', 'problem', 'troubleshooting', 'setup', 'cartridge', 
  'printhead', 'blank', 'page', 'pages', 'ink', 'toner', 'paper', 'jam',
  'mac', 'windows', 'wifi', 'wi-fi', 'wireless', 'network', 'offline'
]);

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function main() {
  console.log('Fetching articles for SEO Interlinking...');
  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    include: {
      brand: true,
      category: true,
    }
  });

  console.log(`Found ${articles.length} published articles.`);

  // Build Keyword Dictionary
  const keywordDict: { keyword: string; url: string; articleId: string; title: string }[] = [];

  for (const article of articles) {
    if (!article.brand || !article.category) continue;
    const url = `/${article.brand.slug}/${article.category.slug}/${article.slug}`;
    
    const potentialKeywords = [];
    if (article.tags) {
      const tags = article.tags.split(',').map(t => t.trim());
      potentialKeywords.push(...tags);
    }
    if (article.errorCode) {
      potentialKeywords.push(article.errorCode, `Error ${article.errorCode}`, `Code ${article.errorCode}`);
    }
    if (article.printerModel) {
      potentialKeywords.push(article.printerModel);
    }

    for (let kw of potentialKeywords) {
      kw = kw.toLowerCase().trim();
      if (kw.length < 3) continue; // ignore tiny words
      if (IGNORED_KEYWORDS.has(kw)) continue;
      
      // Ensure uniqueness per article
      if (!keywordDict.some(k => k.keyword === kw && k.articleId === article.id)) {
        keywordDict.push({
          keyword: kw,
          url,
          articleId: article.id,
          title: article.seoTitle || article.title
        });
      }
    }
  }

  // Sort by keyword length descending (so "Error 5B00" matches before "5B00")
  keywordDict.sort((a, b) => b.keyword.length - a.keyword.length);
  
  console.log(`Generated ${keywordDict.length} target keywords for interlinking.`);

  let updatedCount = 0;
  let totalLinksAdded = 0;

  for (const article of articles) {
    if (!article.content) continue;
    
    const $ = cheerio.load(article.content, null, false);
    let linksAddedThisArticle = 0;
    const linkedArticleIds = new Set<string>();
    let contentModified = false;

    // We only want to interlink 3 to 5 times per article to avoid spam
    const MAX_LINKS = 4;

    for (const kwData of keywordDict) {
      if (linksAddedThisArticle >= MAX_LINKS) break;
      if (kwData.articleId === article.id) continue; // Don't link to self
      if (linkedArticleIds.has(kwData.articleId)) continue; // Only one link to a specific article

      const regex = new RegExp(`\\b(${escapeRegExp(kwData.keyword)})\\b`, 'i');
      let keywordMatched = false;

      // Find p or li tags that DO NOT currently have an <a> tag
      $('p, li').each((i, el) => {
        if (keywordMatched) return; // already added this keyword to this article
        if ($(el).find('a').length > 0) return; // skip paragraphs with links to be safe

        const html = $(el).html();
        if (html && regex.test(html)) {
          // Replace exactly one occurrence in this paragraph
          const newHtml = html.replace(regex, `<a href="${kwData.url}" title="${kwData.title.replace(/"/g, '&quot;')}">$1</a>`);
          $(el).html(newHtml);
          keywordMatched = true;
          contentModified = true;
        }
      });

      if (keywordMatched) {
        linksAddedThisArticle++;
        totalLinksAdded++;
        linkedArticleIds.add(kwData.articleId);
      }
    }

    if (contentModified) {
      const newContent = $.html();
      await prisma.article.update({
        where: { id: article.id },
        data: { content: newContent }
      });
      updatedCount++;
    }
  }

  console.log(`✅ SEO Interlinking Complete!`);
  console.log(`Updated ${updatedCount} articles with ${totalLinksAdded} new internal links.`);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
