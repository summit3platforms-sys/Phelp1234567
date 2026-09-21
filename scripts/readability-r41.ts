import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

const jargons = [
  { from: /\bbidirectional communication\b/gi, to: 'two-way connection' },
  { from: /\binitialization\b/gi, to: 'setup' },
  { from: /\bproprietary\b/gi, to: 'built-in' },
  { from: /\bcalibration protocol\b/gi, to: 'calibration process' },
  { from: /\bfirmware(?! \(internal software\))\b/gi, to: 'firmware (internal software)' },
  { from: /\bconfiguration\b/gi, to: 'settings' },
  { from: /\bIn order to\b/gi, to: 'To' },
  { from: /\bDue to the fact that\b/gi, to: 'Because' },
  { from: /\bAt this point in time\b/gi, to: 'Now' },
  { from: /\bYou should open\b/gi, to: 'Open' },
  { from: /\bYou should click\b/gi, to: 'Click' },
  { from: /\bYou should press\b/gi, to: 'Press' },
  { from: /\bYou should check\b/gi, to: 'Check' },
  { from: /\bPlease make sure\b/gi, to: 'Make sure' },
  { from: /\bMake sure that you\b/gi, to: 'Make sure' }
];

function processText(text: string): string {
  if (!text || !text.trim()) return text;
  
  let modified = text;
  
  // Replace jargons and wordy openers
  for (const j of jargons) {
    modified = modified.replace(j.from, j.to);
  }

  // Action verbs start: "You can click" -> "Click", etc.
  modified = modified.replace(/\b(You can|You must|Please)\s+(open|click|press|check|make sure)\b/gi, (match, p1, p2) => {
    return p2.charAt(0).toUpperCase() + p2.slice(1);
  });
  
  // Split long sentences.
  // Match sentences roughly. We need to be careful with abbreviations.
  // Using a simpler approach: split by . ! ? followed by space or end of string.
  const sentenceRegex = /([^.!?]+[.!?]+(?:\s+|$))/g;
  const sentences = modified.match(sentenceRegex);
  
  if (!sentences) return modified;
  
  let newText = '';
  for (let s of sentences) {
    const originalWhitespace = s.match(/\s+$/)?.[0] || '';
    s = s.trim();
    if (!s) {
      newText += originalWhitespace;
      continue;
    }

    let words = s.split(/\s+/);
    if (words.length > 20) {
      // Find a good split point
      const splitWords = [' and ', ', and ', ' because ', ', but ', ' but ', ' which ', ', which ', ' while '];
      let splitFound = false;
      for (const sw of splitWords) {
        const idx = s.toLowerCase().indexOf(sw);
        if (idx > 15 && idx < s.length - 15) {
          let p1 = s.substring(0, idx).trim();
          let p2 = s.substring(idx + sw.length).trim();
          
          if (p2.length > 0) {
            // Check if p1 ends with punctuation, if not add a period.
            if (!/[.!?]$/.test(p1)) {
              p1 += '.';
            }
            p2 = p2.charAt(0).toUpperCase() + p2.slice(1);
            s = p1 + ' ' + p2;
            splitFound = true;
            break;
          }
        }
      }
      
      // If no split word found, force split at the middle or 15th word
      if (!splitFound) {
        const mid = Math.floor(words.length / 2);
        const firstPart = words.slice(0, mid).join(' ');
        let secondPart = words.slice(mid).join(' ');
        secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
        s = firstPart + '. ' + secondPart;
      }
    }
    newText += s + originalWhitespace;
  }
  
  return newText;
}

function rewriteHtml(html: string): string {
  const $ = cheerio.load(html, null, false);
  
  // Traverse text nodes and replace
  $('*').contents().each(function() {
    if (this.type === 'text') {
      const origText = this.data || '';
      const newText = processText(origText);
      this.data = newText;
    }
  });

  return $.html();
}

async function main() {
  const slugs = [
    "hp-printer-certificate-error-network",
    "fix-star-micronics-printer-blank-receipts-faded-print-paper-errors",
    "dymo-connect-vs-dymo-label-software-difference",
    "brother-printer-error-50-fuser-unit",
    "brother-printer-wps-button-not-connecting"
  ];

  console.log("Fetching articles...");
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } },
    select: { id: true, slug: true, content: true }
  });

  const updatePromises = articles.map(async (article) => {
    const origWordCount = article.content.split(/\s+/).length;
    const rewrittenContent = rewriteHtml(article.content);
    const newWordCount = rewrittenContent.split(/\s+/).length;

    await prisma.article.update({
      where: { id: article.id },
      data: { content: rewrittenContent }
    });

    console.log(`Updated [${article.slug}]: Word count ${origWordCount} -> ${newWordCount}`);
  });

  await Promise.all(updatePromises);
  console.log("All articles updated successfully.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
