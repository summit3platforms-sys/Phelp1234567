import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface BankLink {
  id: string;
  url: string;
  realTitle: string;
  topicDescription: string;
  phrases: string[];
  priority: number;
}

export const LINK_BANK: Record<string, BankLink> = {
  L1: {
    id: 'L1',
    url: 'https://support.hp.com/us-en/help/printer/printer-offline',
    realTitle: 'HP printer is offline or not responding',
    topicDescription: 'printer offline / not responding / unavailable',
    phrases: ['printer offline', 'shows offline', 'offline status', 'printer is unavailable', 'not responding'],
    priority: 3,
  },
  L2: {
    id: 'L2',
    url: 'https://support.hp.com/us-en/document/ish_2026537-1681507-16',
    realTitle: 'HP printer is offline or unavailable',
    topicDescription: 'printer offline / unavailable (detailed steps)',
    phrases: ['printer offline', 'shows offline', 'offline status', 'printer is unavailable', 'not responding'],
    priority: 1, // L2 > L1 > L3
  },
  L3: {
    id: 'L3',
    url: 'https://www.hp.com/us-en/tech-takes/printers/troubleshooting/why-is-my-hp-printer-offline.html',
    realTitle: 'Why Is My HP Printer Offline?',
    topicDescription: 'why a printer goes offline (explanatory)',
    phrases: ['printer offline', 'shows offline', 'offline status', 'printer is unavailable', 'not responding'],
    priority: 4,
  },
  L4: {
    id: 'L4',
    url: 'https://support.hp.com/us-en/help/printer/paper-jam',
    realTitle: 'Fix paper jam errors',
    topicDescription: 'paper jams, false jam errors',
    phrases: ['paper jam error', 'jammed paper', 'false jam', 'paper jam'],
    priority: 2,
  },
  L5: {
    id: 'L5',
    url: 'https://support.hp.com/us-en/document/ish_4595069-4595116-16',
    realTitle: 'HP DeskJet, ENVY 6000, 6400 printers - E4 (Paper jam) error',
    topicDescription: 'E4 paper jam error on DeskJet / ENVY 6000 / 6400 ONLY',
    phrases: ['E4 (paper jam)', 'E4 error', 'E4 code'],
    priority: 1, // L5 > L4
  },
  L6: {
    id: 'L6',
    url: 'https://support.hp.com/us-en/help/printer/ink-cartridge-issue',
    realTitle: 'Ink cartridge issues',
    topicDescription: 'cartridge errors (general)',
    phrases: ['cartridge error', 'cartridge problem'],
    priority: 3,
  },
  L7: {
    id: 'L7',
    url: 'https://support.hp.com/us-en/document/ish_1721989-1461843-16',
    realTitle: "HP Ink Cartridges - 'Incompatible', 'Missing', or 'Failure' message",
    topicDescription: "'Incompatible', 'Missing', 'Failure' cartridge messages, Instant Ink enrolment errors",
    phrases: [
      'incompatible cartridge',
      'Instant Ink cartridge',
      'cartridge failure',
      'missing cartridge',
    ],
    priority: 1, // L7 > L6
  },
  L8: {
    id: 'L8',
    url: 'https://support.hp.com/us-en/document/ish_1740122-1449154-16',
    realTitle: 'HP Printers - Printhead Problem or Ink System Failure',
    topicDescription: 'printhead problem, ink system failure, 0x... error codes',
    phrases: ['printhead problem', 'printhead error', 'ink system failure'],
    priority: 1, // L8 > L6
  },
  L9: {
    id: 'L9',
    url: 'https://support.hp.com/us-en/document/c05029966',
    realTitle: 'HP Printers - Print Quality Issues',
    topicDescription: 'print quality: streaks, faded, smears, banding',
    phrases: ['faded print', 'print quality', 'smearing', 'banding', 'streaks'],
    priority: 2,
  },
  L10: {
    id: 'L10',
    url: 'https://www.hp.com/us-en/tech-takes/printers/troubleshooting/printer-troubleshooting-common-problems-quick-fixes.html',
    realTitle: 'HP Printer Troubleshooting: Common Problems and Quick Fixes',
    topicDescription: 'general troubleshooting, test pages, cleaning cycles',
    phrases: ['clean the printhead', 'align the printhead', 'cleaning cycle', 'test page'],
    priority: 2,
  },
  L11: {
    id: 'L11',
    url: 'https://support.hp.com/us-en/document/ish_3666269-3612259-16',
    realTitle: 'Use Diagnose & Fix in HP Smart to repair printer issues',
    topicDescription: 'Diagnose & Fix tool',
    phrases: ['Diagnose and Fix', 'Diagnose & Fix'],
    priority: 2,
  },
  L12: {
    id: 'L12',
    url: 'https://www.hp.com/hp-app',
    realTitle: 'HP App',
    topicDescription: 'HP app / HP Smart app',
    phrases: ['HP Smart app', 'HP Smart', 'HP app'],
    priority: 2,
  },
  L13: {
    id: 'L13',
    url: 'https://123.hp.com/',
    realTitle: '123.hp.com - Printer setup from the HP official site',
    topicDescription: 'initial printer setup, 123.hp.com',
    phrases: ['123.hp.com', 'HP setup page'],
    priority: 2,
  },
  L14: {
    id: 'L14',
    url: 'https://developers.hp.com/hp-linux-imaging-and-printing',
    realTitle: 'HP Linux Imaging and Printing',
    topicDescription: 'Linux, HPLIP, Ubuntu, Fedora, CUPS',
    phrases: ['HP Linux Imaging and Printing', 'hp-setup', 'HPLIP'],
    priority: 1,
  },
  L15: {
    id: 'L15',
    url: 'https://www.hp.com/us-en/printers/instant-ink.html',
    realTitle: 'HP Instant Ink',
    topicDescription: 'Instant Ink subscription',
    phrases: ['Instant Ink'],
    priority: 2,
  },
  L16: {
    id: 'L16',
    url: 'https://www.hp.com/contacthp/',
    realTitle: 'HP Customer Support - Contact Us',
    topicDescription: 'contacting HP, warranty, repair service',
    phrases: ['HP Customer Support', 'service center', 'contact HP', 'HP support', 'warranty'],
    priority: 4,
  },
  L17: {
    id: 'L17',
    url: 'https://www.hp.com/us-en/tech-takes/printers/troubleshooting/how-to-fix-common-hp-printer-problems.html',
    realTitle: 'How to Fix Common HP Printer Problems',
    topicDescription: 'broad "common HP printer problems / error messages" articles',
    phrases: ['common HP printer problems', 'HP error messages'],
    priority: 1,
  },
};

export interface MatchedLink {
  linkId: string;
  url: string;
  anchorText: string;
  method: 'existing_phrase' | 'added_sentence';
  sentenceBefore: string;
  sentenceAfter: string;
}

export interface ArticlePlan {
  articleUrl: string;
  slug: string;
  title: string;
  links: MatchedLink[];
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Strict topic matching with word boundaries
export function getTopicEligibleLinks(article: any): string[] {
  const title = (article.title || '').toLowerCase();
  const slug = (article.slug || '').toLowerCase();
  const category = (article.category?.slug || '').toLowerCase();
  const content = (article.content || '').toLowerCase();

  // Exclude purely comparison / buying guide articles from repair link banks
  const isComparison =
    /\bvs\b/i.test(title) ||
    /\bcomparison\b/i.test(title) ||
    /\bdifference\b/i.test(title) ||
    slug.includes('-vs-') ||
    slug.includes('-difference');

  const eligible: string[] = [];

  // 1. Offline topic
  const isOffline =
    category === 'connectivity-issues' &&
    (/\b(offline|not responding|disconnecting|disconnected|unavailable)\b/i.test(title) ||
      /\boffline\b/i.test(slug));
  if (isOffline) {
    // Priority: L2 > L1 > L3
    eligible.push('L2', 'L1', 'L3');
  }

  // 2. Paper jam topic
  const isDeskJetOrEnvy6000 =
    /\benvy\s*60\d\d/i.test(title) ||
    /\benvy\s*64\d\d/i.test(title) ||
    slug.includes('envy-60') ||
    slug.includes('envy-64') ||
    /\bdeskjet\b/i.test(title) ||
    slug.includes('deskjet');

  const isPaperJam =
    category === 'paper-handling-issues' ||
    /\b(jam|jams|jammed|jamming)\b/i.test(title) ||
    slug.includes('paper-jam');

  if (isPaperJam && !isComparison) {
    if (isDeskJetOrEnvy6000 && (/\be4\b/i.test(title) || /\be4\b/i.test(slug) || /\be4\b/i.test(content))) {
      eligible.push('L5', 'L4'); // L5 > L4
    } else {
      eligible.push('L4');
    }
  }

  // 3. Cartridge & Printhead & 0x Error Codes
  const has0xCode = /\b0x[0-9a-f]+\b/i.test(title) || /\b0x[0-9a-f]+\b/i.test(slug);
  const isPrintheadOrInkSystem =
    /\bprinthead\b/i.test(title) ||
    slug.includes('printhead') ||
    /\bink system failure\b/i.test(title) ||
    has0xCode;

  if (isPrintheadOrInkSystem && !isComparison) {
    eligible.push('L8');
  }

  const isCartridge =
    (category === 'ink-toner-issues' ||
      /\bcartridge\b/i.test(title) ||
      slug.includes('cartridge') ||
      (/\bink\b/i.test(title) && !/\binkjet\b/i.test(title)) ||
      /\btoner\b/i.test(title)) &&
    !isPrintheadOrInkSystem &&
    !isComparison;

  if (isCartridge) {
    eligible.push('L7', 'L6'); // L7 > L6
  }

  // 4. Print Quality
  const isPrintQuality =
    (category === 'print-quality-issues' ||
      /\b(streak|streaks|faded|smear|smearing|banding|stripes|ghosting)\b/i.test(title)) &&
    !isComparison;
  if (isPrintQuality) {
    eligible.push('L9');
  }

  // 5. Linux / HPLIP
  const isLinux =
    /\b(linux|ubuntu|fedora|hplip|cups)\b/i.test(title) ||
    /\b(linux|ubuntu|fedora|hplip|cups)\b/i.test(slug);
  if (isLinux) {
    eligible.push('L14');
  }

  // 6. Instant Ink
  const isInstantInk =
    /\binstant[\s-]ink\b/i.test(title) ||
    slug.includes('instant-ink') ||
    /\binstant ink subscription\b/i.test(content);
  if (isInstantInk && !isComparison) {
    eligible.push('L15');
  }

  // 7. Initial Setup / 123.hp.com
  const isSetup =
    (category === 'setup-installation' ||
      /\b(setup|install|first print|unboxing)\b/i.test(title)) &&
    !isComparison;
  if (isSetup && (content.includes('123.hp.com') || title.includes('setup'))) {
    eligible.push('L13');
  }

  // 8. Diagnose & Fix tool
  if (content.includes('diagnose & fix') || content.includes('diagnose and fix')) {
    eligible.push('L11');
  }

  // 9. HP App / HP Smart app
  if (
    content.includes('hp smart') ||
    content.includes('hp app') ||
    title.includes('hp smart')
  ) {
    eligible.push('L12');
  }

  // 10. General troubleshooting / test pages / cleaning cycles
  if (
    category === 'printing-problems' ||
    content.includes('cleaning cycle') ||
    content.includes('clean the printhead') ||
    content.includes('test page')
  ) {
    eligible.push('L10');
  }

  // 11. Broad common problems / error messages
  if (
    slug === 'hp-printer-error-codes' ||
    slug === 'hp-printer-error-messages' ||
    slug === 'hp-printer-troubleshooting'
  ) {
    eligible.push('L17');
  }

  // 12. Contact HP / warranty
  if (
    !isComparison &&
    (content.includes('contact hp') ||
      content.includes('hp customer support') ||
      content.includes('warranty') ||
      content.includes('service center'))
  ) {
    eligible.push('L16');
  }

  return [...new Set(eligible)];
}

// Added sentence templates rotated
const ADDED_TEMPLATES = [
  (topic: string, anchor: string, url: string) => ({
    text: `HP's own guide to ${topic} covers the same checks.`,
    anchor,
    html: `HP's own guide to <a href="${url}" target="_blank" rel="noopener">${anchor}</a> covers the same checks.`,
  }),
  (topic: string, anchor: string, url: string) => ({
    text: `For HP's official steps, see ${anchor}.`,
    anchor,
    html: `For HP's official steps, see <a href="${url}" target="_blank" rel="noopener">${anchor}</a>.`,
  }),
  (topic: string, anchor: string, url: string) => ({
    text: `HP documents this in ${anchor}.`,
    anchor,
    html: `HP documents this in <a href="${url}" target="_blank" rel="noopener">${anchor}</a>.`,
  }),
];

let templateIndex = 0;

function cleanSentence(fullBlockText: string, matchIdx: number, matchLen: number, url: string) {
  const text = fullBlockText.replace(/\s+/g, ' ');

  // Find start of sentence (. ? ! followed by space or start of block)
  let start = 0;
  for (let i = matchIdx - 1; i >= 0; i--) {
    if ((text[i] === '.' || text[i] === '?' || text[i] === '!') && (i + 1 === text.length || /\s/.test(text[i + 1]))) {
      start = i + 1;
      while (start < matchIdx && /\s/.test(text[start])) start++;
      break;
    }
  }

  // Find end of sentence
  let end = text.length;
  for (let i = matchIdx + matchLen; i < text.length; i++) {
    if (text[i] === '.' || text[i] === '?' || text[i] === '!') {
      end = i + 1;
      break;
    }
  }

  const sentenceBefore = text.slice(start, end).trim();
  const matchedPart = text.slice(matchIdx, matchIdx + matchLen);
  const beforePart = text.slice(start, matchIdx).trimStart();
  const afterPart = text.slice(matchIdx + matchLen, end).trimEnd();

  const sentenceAfter = `${beforePart}<a href="${url}" target="_blank" rel="noopener">${matchedPart}</a>${afterPart}`.replace(/\s+/g, ' ').trim();

  return { sentenceBefore, sentenceAfter };
}

export function processArticle(article: any): ArticlePlan {
  const articleUrl = `https://libertyprinterfix.com/hp/${article.category?.slug || 'general'}/${article.slug}`;
  const eligibleLinkIds = getTopicEligibleLinks(article);

  const plan: ArticlePlan = {
    articleUrl,
    slug: article.slug,
    title: article.title,
    links: [],
  };

  if (eligibleLinkIds.length === 0) {
    return plan;
  }

  const $ = cheerio.load(article.content, null, false);

  interface CandidateMatch {
    linkId: string;
    phrase: string;
    node: any;
    blockText: string;
    matchIndexInBlock: number;
    sentenceBefore: string;
    sentenceAfter: string;
    wordPosition: number;
  }

  const foundMatches: CandidateMatch[] = [];

  let runningWordCount = 0;

  // Identify specific 0x error code for article if any
  const errorCodeMatch = (article.slug.match(/0x[0-9a-f]+/i) || article.title.match(/0x[0-9a-f]+/i))?.[0];

  function traverse(node: any) {
    if (node.type === 'text') {
      const text = node.data || '';
      const words = text.split(/\s+/).filter((w: string) => w.length > 0);
      const startWord = runningWordCount;
      runningWordCount += words.length;

      // Check if parent or ancestors are invalid
      let isInvalidParent = false;
      let curr = node.parent;
      while (curr && curr.type === 'tag') {
        const tag = curr.tagName.toLowerCase();
        if (
          tag === 'h1' ||
          tag === 'h2' ||
          tag === 'h3' ||
          tag === 'h4' ||
          tag === 'h5' ||
          tag === 'h6' ||
          tag === 'a' ||
          tag === 'code' ||
          tag === 'pre'
        ) {
          isInvalidParent = true;
          break;
        }
        curr = curr.parent;
      }

      if (isInvalidParent) {
        return;
      }

      // Check if text starts after the first 100 words of the body
      if (startWord + words.length <= 100) {
        return;
      }

      // Find enclosing block for context sentence
      const enclosingBlock = $(node).closest('p, li, td, div');
      const blockText = enclosingBlock.length ? enclosingBlock.text() : text;

      // Look for candidate phrases
      for (const linkId of eligibleLinkIds) {
        const bankItem = LINK_BANK[linkId];
        if (!bankItem) continue;

        const candidatePhrases = [...bankItem.phrases];
        if (linkId === 'L8' && errorCodeMatch) {
          candidatePhrases.unshift(errorCodeMatch);
        }

        // Sort candidate phrases by length descending
        candidatePhrases.sort((a, b) => b.length - a.length);

        for (const phrase of candidatePhrases) {
          const regex = new RegExp(`\\b${escapeRegex(phrase)}\\b`, 'gi');
          let m: RegExpExecArray | null;

          while ((m = regex.exec(text)) !== null) {
            const matchIndex = m.index;
            const matchLen = m[0].length;

            const wordsBeforeInNode = text.slice(0, matchIndex).split(/\s+/).filter(Boolean).length;
            const absoluteWordPos = startWord + wordsBeforeInNode;

            if (absoluteWordPos < 100) {
              continue;
            }

            // Rule 5: Do NOT link any phrase containing or inside "Print and Scan Doctor"
            const surroundingText = text.slice(
              Math.max(0, matchIndex - 50),
              Math.min(text.length, matchIndex + matchLen + 50)
            );
            if (/print and scan doctor/i.test(surroundingText) || /print and scan doctor/i.test(blockText)) {
              continue;
            }

            // Find match index in block text
            const blockMatchIdx = blockText.toLowerCase().indexOf(m[0].toLowerCase());
            let sBefore = '';
            let sAfter = '';
            if (blockMatchIdx !== -1) {
              const res = cleanSentence(blockText, blockMatchIdx, matchLen, bankItem.url);
              sBefore = res.sentenceBefore;
              sAfter = res.sentenceAfter;
            } else {
              const res = cleanSentence(text, matchIndex, matchLen, bankItem.url);
              sBefore = res.sentenceBefore;
              sAfter = res.sentenceAfter;
            }

            foundMatches.push({
              linkId,
              phrase: m[0],
              node,
              blockText,
              matchIndexInBlock: blockMatchIdx,
              sentenceBefore: sBefore,
              sentenceAfter: sAfter,
              wordPosition: absoluteWordPos,
            });

            break; // take first eligible match for this link in this text node
          }
        }
      }
    } else if (node.type === 'tag') {
      const tag = node.tagName.toLowerCase();
      if (
        tag !== 'h1' &&
        tag !== 'h2' &&
        tag !== 'h3' &&
        tag !== 'h4' &&
        tag !== 'h5' &&
        tag !== 'h6' &&
        tag !== 'a' &&
        tag !== 'code' &&
        tag !== 'pre'
      ) {
        for (const child of node.children || []) {
          traverse(child);
        }
      } else {
        const text = $(node).text();
        const words = text.split(/\s+/).filter((w) => w.length > 0);
        runningWordCount += words.length;
      }
    }
  }

  $.root().children().each((_, el) => traverse(el));

  // Specificity rules and limits
  const selectedLinks: MatchedLink[] = [];
  const usedUrls = new Set<string>();
  const usedLinkIds = new Set<string>();

  // Sort matches by priority of linkId, then by earliest wordPosition
  foundMatches.sort((a, b) => {
    const prioA = LINK_BANK[a.linkId]?.priority || 10;
    const prioB = LINK_BANK[b.linkId]?.priority || 10;
    if (prioA !== prioB) return prioA - prioB;
    return a.wordPosition - b.wordPosition;
  });

  for (const match of foundMatches) {
    if (selectedLinks.length >= 3) break;

    const bankItem = LINK_BANK[match.linkId];
    if (usedUrls.has(bankItem.url)) continue;
    if (usedLinkIds.has(match.linkId)) continue;

    // Specificity checks
    if (match.linkId === 'L4' && usedLinkIds.has('L5')) continue;
    if (match.linkId === 'L6' && (usedLinkIds.has('L7') || usedLinkIds.has('L8'))) continue;
    if (match.linkId === 'L1' && usedLinkIds.has('L2')) continue;
    if (match.linkId === 'L3' && (usedLinkIds.has('L2') || usedLinkIds.has('L1'))) continue;

    selectedLinks.push({
      linkId: match.linkId,
      url: bankItem.url,
      anchorText: match.phrase,
      method: 'existing_phrase',
      sentenceBefore: match.sentenceBefore,
      sentenceAfter: match.sentenceAfter,
    });

    usedUrls.add(bankItem.url);
    usedLinkIds.add(match.linkId);
  }

  // If article has 0 links, check Rule 3: added sentence for true primary troubleshooting topic
  if (selectedLinks.length === 0 && eligibleLinkIds.length > 0) {
    // Pick the most specific eligible link
    const candidateId = eligibleLinkIds[0];
    const bankItem = LINK_BANK[candidateId];

    if (bankItem) {
      const template = ADDED_TEMPLATES[templateIndex % ADDED_TEMPLATES.length];
      templateIndex++;

      const topicName = bankItem.topicDescription.split('/')[0].trim();
      const sentenceObj = template(topicName, bankItem.realTitle, bankItem.url);

      selectedLinks.push({
        linkId: bankItem.id,
        url: bankItem.url,
        anchorText: bankItem.realTitle,
        method: 'added_sentence',
        sentenceBefore: '',
        sentenceAfter: sentenceObj.html,
      });
    }
  }

  plan.links = selectedLinks;
  return plan;
}

export async function runDryRun() {
  console.log('=== Starting HP Link Plan Dry Run ===\n');

  const hp = await prisma.brand.findFirst({ where: { slug: 'hp' } });
  if (!hp) {
    throw new Error('HP brand not found');
  }

  const articles = await prisma.article.findMany({
    where: { brandId: hp.id, status: 'published' },
    include: { category: true },
    orderBy: { slug: 'asc' },
  });

  console.log(`Processing ${articles.length} published HP articles...`);

  const plans: ArticlePlan[] = [];
  const linkIdCounts: Record<string, number> = {};
  const linkCountBuckets: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
  const psdList: Array<{ url: string; sentence: string }> = [];
  const hpSmartList: Array<{ url: string; count: number }> = [];

  for (const article of articles) {
    const url = `https://libertyprinterfix.com/hp/${article.category?.slug || 'general'}/${article.slug}`;
    const content = article.content || '';

    // Check Print and Scan Doctor
    if (/print and scan doctor/i.test(content)) {
      const sentences = content.replace(/<[^>]*>/g, ' ').split(/(?<=[.?!])\s+/);
      for (const s of sentences) {
        if (/print and scan doctor/i.test(s)) {
          psdList.push({ url, sentence: s.trim().replace(/\s+/g, ' ') });
        }
      }
    }

    // Check HP Smart
    const hpSmartMatches = content.match(/HP Smart/gi);
    if (hpSmartMatches && hpSmartMatches.length > 0) {
      hpSmartList.push({ url, count: hpSmartMatches.length });
    }

    const plan = processArticle(article);
    plans.push(plan);

    const count = plan.links.length;
    linkCountBuckets[count] = (linkCountBuckets[count] || 0) + 1;

    for (const l of plan.links) {
      linkIdCounts[l.linkId] = (linkIdCounts[l.linkId] || 0) + 1;
    }
  }

  // Generate CSV rows
  const csvRows: string[] = ['article_url,link_id,url,anchor_text,method,sentence_before,sentence_after'];
  for (const p of plans) {
    for (const l of p.links) {
      csvRows.push(
        `"${p.articleUrl}","${l.linkId}","${l.url}","${l.anchorText.replace(/"/g, '""')}","${l.method}","${l.sentenceBefore.replace(/"/g, '""')}","${l.sentenceAfter.replace(/"/g, '""')}"`
      );
    }
  }

  const csvContent = csvRows.join('\n');
  const csvPath = path.join(process.cwd(), 'hp-link-plan.csv');
  fs.writeFileSync(csvPath, csvContent, 'utf-8');
  console.log(`\nGenerated CSV written to: ${csvPath}\n`);

  return {
    plans,
    linkIdCounts,
    linkCountBuckets,
    psdList,
    hpSmartList,
    csvRows,
  };
}

runDryRun()
  .then((res) => {
    console.log('=== SUMMARY OF ARTICLE LINK COUNTS ===');
    console.log(`0 links: ${res.linkCountBuckets[0]}`);
    console.log(`1 link:  ${res.linkCountBuckets[1]}`);
    console.log(`2 links: ${res.linkCountBuckets[2]}`);
    console.log(`3 links: ${res.linkCountBuckets[3]}`);

    console.log('\n=== USAGE COUNT PER LINK ID ===');
    const sortedIds = Object.keys(res.linkIdCounts).sort();
    sortedIds.forEach((id) => {
      console.log(`${id}: ${res.linkIdCounts[id]}`);
    });

    console.log('\n=== HP ARTICLES CONTAINING "Print and Scan Doctor" ===');
    console.log(`Total sentences found: ${res.psdList.length}`);
    res.psdList.forEach((p) => {
      console.log(`- ${p.url}\n  "${p.sentence}"`);
    });

    console.log('\n=== HP ARTICLES CONTAINING "HP Smart" ===');
    console.log(`Total articles found: ${res.hpSmartList.length}`);
    res.hpSmartList.forEach((h) => {
      console.log(`- ${h.url}: ${h.count}`);
    });
  })
  .catch((err) => {
    console.error('Dry run error:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
