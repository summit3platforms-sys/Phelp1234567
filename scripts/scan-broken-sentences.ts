import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Strip HTML tags
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

// Pattern 1: function word followed by period then space then capital (broken sentence)
// e.g. "with your. Printer's" or "in the. Printer's"
const BROKEN_SENTENCE_RE = /\b(the|a|an|your|of|to|with|named|for|and|in|on|at|by|from|into|is|are|was|be|this|that|as|or|if|it|its|but)\.\s+[A-Z][a-z]/gi;

// Pattern 2: missing spaces like "2.4GHzand", "PrinterOpen"
// Lowercase letter/digit directly followed by uppercase letter (no space)
const MISSING_SPACE_RE = /[a-z0-9][A-Z][a-z]/g;
// But exclude known acronyms - we'll capture and manually filter
// Also: word ending in common tech suffix then immediately a word
const GLUED_WORDS_RE = /\b(GHz|MHz|kHz|Wi-Fi|USB|PDF|API|IP|PC|HP|OK|ID|OS|TV|UK|US|AC|DC|LED|LCD|RAM|ROM|CPU|GPU|SSD|HDD|UPS|WPA|WPS|DNS|DHCP|TCP|UDP|URL|SSL|TLS|LAN|WAN|SSID|OEM|MAC|PIN|FAQ|ADF|MFP|LUT|ICC|ICM|dpi|ppm|lbs|kg|cm|mm|Hz|kHz|MHz|GHz)\b(?=[A-Z][a-z])/g;

async function main() {
  const articles = await prisma.article.findMany({
    select: {
      id: true,
      slug: true,
      content: true,
      brand: { select: { name: true } }
    },
    where: { status: 'published' }
  });

  console.log(`Scanning ${articles.length} published articles...\n`);

  const brandCounts: Record<string, { broken: number; missing: number; total: number }> = {};
  const examples: string[] = [];
  const missingSpaceExamples: string[] = [];

  let totalBroken = 0;
  let totalMissing = 0;
  let articlesBroken = 0;
  let articlesMissing = 0;

  for (const article of articles) {
    const brand = article.brand?.name ?? 'unknown';
    if (!brandCounts[brand]) brandCounts[brand] = { broken: 0, missing: 0, total: 0 };
    brandCounts[brand].total++;

    const text = stripHtml(article.content);

    // Pattern 1: broken sentence
    const brokenMatches = Array.from(text.matchAll(new RegExp(BROKEN_SENTENCE_RE)));
    if (brokenMatches.length > 0) {
      brandCounts[brand].broken += brokenMatches.length;
      totalBroken += brokenMatches.length;
      articlesBroken++;
      for (const m of brokenMatches.slice(0, 2)) {
        if (examples.length < 20) {
          const start = Math.max(0, m.index! - 40);
          const end = Math.min(text.length, m.index! + 60);
          examples.push(`[${article.slug}] "...${text.substring(start, end)}..."`);
        }
      }
    }

    // Pattern 2: missing spaces (glued words)
    // Find things like "2.4GHzand" - where a word runs into another without space
    // More targeted: digit+letter+uppercase or lowercase+uppercase in non-acronym context
    const missingRe = /(?:[a-z]{3,}[A-Z][a-z]|[0-9]+[a-zA-Z]+[A-Z][a-z])/g;
    const missingMatches = Array.from(text.matchAll(missingRe)).filter(m => {
      // Skip known brand/model names that are intentionally fused
      const s = m[0];
      // Allow camelCase model names and known compounds
      const skipList = ['iPhone', 'iPad', 'iMac', 'macOS', 'macBook', 'PowerShell', 'JavaScript', 'TypeScript', 'eCommerce', 'eBay', 'eCheck', 'kWh'];
      return !skipList.some(skip => s.includes(skip));
    });
    
    if (missingMatches.length > 0) {
      brandCounts[brand].missing += missingMatches.length;
      totalMissing += missingMatches.length;
      articlesMissing++;
      for (const m of missingMatches.slice(0, 1)) {
        if (missingSpaceExamples.length < 20) {
          const start = Math.max(0, m.index! - 30);
          const end = Math.min(text.length, m.index! + 50);
          missingSpaceExamples.push(`[${article.slug}] "${m[0]}" → "...${text.substring(start, end)}..."`);
        }
      }
    }
  }

  console.log('=== BROKEN SENTENCE PATTERN (word). Capital ===');
  console.log(`Total matches: ${totalBroken} across ${articlesBroken} articles\n`);
  console.log('Per brand:');
  for (const [brand, counts] of Object.entries(brandCounts).sort((a,b) => b[1].broken - a[1].broken)) {
    if (counts.broken > 0) {
      console.log(`  ${brand}: ${counts.broken} occurrences in articles (${counts.total} total articles)`);
    }
  }
  
  console.log('\n20 Examples:');
  examples.forEach((e, i) => console.log(`  ${i+1}. ${e}`));

  console.log('\n=== MISSING SPACE PATTERN (GlueWords) ===');
  console.log(`Total matches: ${totalMissing} across ${articlesMissing} articles\n`);
  console.log('Per brand:');
  for (const [brand, counts] of Object.entries(brandCounts).sort((a,b) => b[1].missing - a[1].missing)) {
    if (counts.missing > 0) {
      console.log(`  ${brand}: ${counts.missing} occurrences`);
    }
  }
  
  console.log('\n20 Examples:');
  missingSpaceExamples.forEach((e, i) => console.log(`  ${i+1}. ${e}`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
