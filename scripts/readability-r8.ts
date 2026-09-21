import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

const jargon = {
  "bidirectional communication": "two-way connection",
  "initialization": "setup",
  "proprietary": "built-in",
  "calibration protocol": "calibration process",
  "firmware": "firmware (internal software)",
  "configuration": "settings",
  "in order to": "to",
  "due to the fact that": "because",
  "at this point in time": "now",
  "you should check": "check",
  "it is necessary to open": "open",
  "make sure to": "make sure",
  "you need to click": "click",
  "please press": "press",
  "we recommend checking": "check"
};

function processText(text: string): string {
  let newText = text;
  
  // Replace jargon and wordy phrases (case-insensitive, preserving case roughly for first letter)
  for (let [k, v] of Object.entries(jargon)) {
    let regex = new RegExp('\\b' + k + '\\b', 'gi');
    newText = newText.replace(regex, match => {
        if (match[0] === match[0].toUpperCase()) {
            return v.charAt(0).toUpperCase() + v.slice(1);
        }
        return v;
    });
  }
  
  // Clean up duplicate (internal software) if it occurred
  newText = newText.replace(/firmware \(internal software\) \(internal software\)/gi, "firmware (internal software)");
  
  // Basic sentence splitting for >20 words
  let parts = newText.match(/[^.!?]+[.!?]+|\s+|[^.!?]+$/g);
  if (!parts) return newText;
  
  let processedSentences = parts.map(s => {
    if (s.trim().length === 0) return s;
    let words = s.trim().split(/\s+/);
    if (words.length > 20) {
        // Try to find a good split point (conjunctions)
        const conjunctions = [' because ', ' which ', ' but ', ' and ', ' however ', ', and ', ', but '];
        let lowerS = s.toLowerCase();
        let splitIdx = -1;
        let splitWordLen = 0;
        
        for (let conj of conjunctions) {
            let idx = lowerS.lastIndexOf(conj);
            if (idx > 10 && idx < lowerS.length - 10) { // Don't split too close to edges
                splitIdx = s.lastIndexOf(conj); // need exact case original
                if (splitIdx === -1) {
                  // Fallback for case mismatch on lastIndexOf
                  let regexConj = new RegExp(conj, 'i');
                  let m = s.match(regexConj);
                  if (m && m.index && m.index > 10 && m.index < s.length - 10) {
                     splitIdx = m.index;
                  }
                }
                if (splitIdx !== -1) {
                  splitWordLen = conj.length;
                  break;
                }
            }
        }
        
        if (splitIdx !== -1) {
            let part1 = s.substring(0, splitIdx).trim() + '.';
            let part2 = s.substring(splitIdx + splitWordLen).trim();
            part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
            // Re-check part2 length, though simple 1-level split is fine for this rule
            return part1 + ' ' + part2 + (s.endsWith(' ') ? ' ' : '');
        } else {
            // Hard split at middle
            let mid = Math.floor(words.length / 2);
            let part1 = words.slice(0, mid).join(' ') + '.';
            let part2 = words.slice(mid).join(' ');
            part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
            
            // Preserve trailing punctuation/spaces
            let matchPunc = s.match(/[.!?]+$/);
            let punc = matchPunc ? matchPunc[0] : '';
            if (punc && !part2.endsWith(punc)) {
                part2 = part2.replace(/[.!?]+$/, '') + punc;
            }
            return part1 + ' ' + part2 + (s.endsWith(' ') ? ' ' : '');
        }
    }
    return s;
  });
  
  return processedSentences.join('');
}

function processHtml(html: string): string {
  if (!html) return html;
  const $ = cheerio.load(html, null, false);
  
  function walk(node: any) {
    if (node.type === 'text') {
       node.data = processText(node.data);
    } else if (node.children) {
       node.children.forEach(walk);
    }
  }

  $.root()[0].children.forEach(walk);
  return $.html();
}

function countWords(str: string): number {
  if (!str) return 0;
  // strip html
  const text = str.replace(/<[^>]*>?/gm, ' ');
  const words = text.trim().split(/\s+/);
  return words.filter(w => w.length > 0).length;
}

async function main() {
  const slugs = [
    "citizen-ct-s-series-guide-601-310-651-model-finder",
    "zebra-zpl-label-prints-garbled-text-raw-code-issues",
    "instax-link-printer-jammed-film-ejection-failure",
    "hp-printer-showing-two-devices-network",
    "rollo-printer-blank-faint-light-uneven-print-density-fix"
  ];
  
  console.log("Fetching articles...");
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  console.log(`Found ${articles.length} articles.`);
  
  const updates = articles.map(async (article) => {
    const beforeWordCount = countWords(article.content || '');
    
    const updatedContent = processHtml(article.content || '');
    const afterWordCount = countWords(updatedContent);
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: updatedContent }
    });
    
    console.log(`Updated ${article.slug}: ${beforeWordCount} words -> ${afterWordCount} words`);
  });
  
  await Promise.all(updates);
  console.log("All articles updated successfully.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
