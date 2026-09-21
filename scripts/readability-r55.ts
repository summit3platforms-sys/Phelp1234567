import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

const jargonMap: Record<string, string> = {
  "bidirectional communication": "two-way connection",
  "initialization": "setup",
  "proprietary": "built-in",
  "calibration protocol": "calibration process",
  "firmware": "firmware (internal software)",
  "configuration": "settings",
  "In order to": "To",
  "Due to the fact that": "Because",
  "At this point in time": "Now",
  "You should open": "Open",
  "You need to click": "Click",
  "You must press": "Press",
  "It is necessary to check": "Check",
  "Please make sure": "Make sure"
};

function processText(text: string): string {
  let newText = text;
  // Replace jargon and wordy openers
  for (const [jargon, replacement] of Object.entries(jargonMap)) {
    const regex = new RegExp(`\\b${jargon}\\b`, 'gi');
    newText = newText.replace(regex, (match) => {
      if (match[0] === match[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement.toLowerCase();
    });
  }

  // A simple sentence boundary detection
  const sentenceRegex = /([^.?!]+[.?!]+(?:\s+|$))/g;
  const sentences = newText.match(sentenceRegex);
  if (sentences) {
    newText = sentences.map(sentence => {
      const words = sentence.trim().split(/\s+/);
      if (words.length > 20) {
        let mid = Math.floor(words.length / 2);
        let splitIndex = mid;
        for (let i = mid - 5; i <= mid + 5; i++) {
          if (i > 0 && i < words.length && (words[i-1].endsWith(',') || ['and', 'but', 'or', 'because'].includes(words[i].toLowerCase()))) {
            splitIndex = i;
            break;
          }
        }
        
        let firstHalf = words.slice(0, splitIndex).join(' ').replace(/,$/, '');
        let secondHalf = words.slice(splitIndex).join(' ');
        
        secondHalf = secondHalf.charAt(0).toUpperCase() + secondHalf.slice(1);
        return `${firstHalf}. ${secondHalf} `;
      }
      return sentence;
    }).join('');
  }
  return newText;
}

function getWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

async function main() {
  const slugs = [
    "zebra-ribbon-not-feeding-top-cover-error-fix",
    "rollo-printer-streaky-lines-ghosting-barcode-scan-fix",
    "instax-link-keeps-disconnecting-connected-wont-print",
    "kodak-printer-scanner-not-working",
    "niimbot-print-direction-template-size-match-self-test"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(async (article) => {
    // get text only using cheerio
    const $old = cheerio.load(article.content, null, false);
    const oldWordCount = getWordCount($old.text());
    
    // Process HTML using cheerio
    const $ = cheerio.load(article.content, null, false);
    
    $('*').each((i, el) => {
      el.children.forEach(child => {
        if (child.type === 'text' && child.data && child.data.trim().length > 0) {
          child.data = processText(child.data);
        }
      });
    });

    const newContent = $.html();
    const $new = cheerio.load(newContent, null, false);
    const newWordCount = getWordCount($new.text());
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
    
    return {
      slug: article.slug,
      oldWordCount,
      newWordCount
    };
  });

  const results = await Promise.all(updates);
  console.log("Update Results:");
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
