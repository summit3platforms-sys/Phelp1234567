import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

const slugs = [
  "brother-error-code-e50-vs-e51-difference",
  "hp-wireless-direct-not-appearing-on-phone",
  "dymo-550-rfid-drm-third-party-labels-compatibility",
  "rollo-x1038-vs-x1040-wireless-models-comparison",
  "rollo-printer-software-not-available-apple-mac-driver-fix"
];

const replacements = [
  { regex: /bidirectional communication/gi, replacement: "two-way connection" },
  { regex: /\binitialization\b/gi, replacement: "setup" },
  { regex: /\bproprietary\b/gi, replacement: "built-in" },
  { regex: /calibration protocol/gi, replacement: "calibration process" },
  { regex: /\bfirmware\b/gi, replacement: "firmware (internal software)" },
  { regex: /\bconfiguration\b/gi, replacement: "settings" },
  { regex: /In order to/gi, replacement: "To" },
  { regex: /Due to the fact that/gi, replacement: "Because" },
  { regex: /At this point in time/gi, replacement: "Now" },
];

function rewriteText(text: string): string {
  let newText = text;
  
  // 1. Jargon and wordy openers
  for (const { regex, replacement } of replacements) {
    newText = newText.replace(regex, (match) => {
      if (match[0] === match[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }

  // 2. Active verbs
  newText = newText.replace(/(?:You should|You need to|You must|It is recommended to)\s+(open|click|press|check|make sure)\b/gi, (match, p1) => {
    return p1.charAt(0).toUpperCase() + p1.slice(1);
  });
  
  // 3. Sentence breaking for > 20 words
  const sentenceRegex = /([^.?!]+[.?!]+)/g;
  newText = newText.replace(sentenceRegex, (sentence) => {
    let words = sentence.trim().split(/\s+/);
    if (words.length > 20) {
      let splitIdx = -1;
      
      // Try splitting on comma + conjunction
      for (let i = 10; i < words.length - 5; i++) {
        let w = words[i].toLowerCase();
        let prev = words[i-1];
        if (prev && prev.endsWith(',') && ["and", "but", "so", "because", "which", "while", "or"].includes(w)) {
            splitIdx = i;
            break;
        }
      }
      
      // Fallback: split on bare conjunction near middle
      if (splitIdx === -1) {
        for (let i = 12; i < words.length - 5; i++) {
            let w = words[i].toLowerCase();
            if (["and", "but", "so", "because", "while"].includes(w)) {
                splitIdx = i;
                break;
            }
        }
      }
      
      if (splitIdx !== -1) {
        words[splitIdx - 1] = words[splitIdx - 1].replace(/,$/, '') + ".";
        words[splitIdx] = words[splitIdx].charAt(0).toUpperCase() + words[splitIdx].slice(1);
        return words.join(" ") + " ";
      }
    }
    return sentence;
  });

  return newText;
}

function processHtml(html: string): string {
  const $ = cheerio.load(html, null, false);
  
  function traverse(node: any) {
    if (node.type === 'text') {
      if (node.data.trim()) {
        // preserve leading/trailing whitespace
        const leading = node.data.match(/^\s*/)?.[0] || '';
        const trailing = node.data.match(/\s*$/)?.[0] || '';
        const coreText = node.data.trim();
        if (coreText) {
            node.data = leading + rewriteText(coreText) + trailing;
        }
      }
    } else if (node.type === 'tag') {
      if (node.name !== 'script' && node.name !== 'style') {
        $(node).contents().each((_, child) => traverse(child));
      }
    }
  }

  const root = $.root();
  root.contents().each((_, child) => traverse(child));
  return root.html() || '';
}

function countWords(html: string): number {
  const text = cheerio.load(html).text();
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  console.log(`Found ${articles.length} articles to update.`);

  const updates = articles.map(article => {
    const originalContent = article.content;
    const originalWordCount = article.wordCount;
    
    const newContent = processHtml(originalContent);
    const newWordCount = countWords(newContent);
    
    console.log(`- ${article.slug}: Original words: ${originalWordCount}, New words: ${newWordCount}`);

    return prisma.article.update({
      where: { id: article.id },
      data: {
        content: newContent,
        wordCount: newWordCount
      }
    });
  });

  await Promise.all(updates);
  console.log('All articles updated successfully.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
