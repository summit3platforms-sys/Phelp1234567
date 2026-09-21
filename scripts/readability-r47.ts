import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

const jargonMap: Record<string, string> = {
  "bidirectional communication": "two-way connection",
  "initialization": "setup",
  "proprietary": "built-in",
  "calibration protocol": "calibration process",
  "firmware": "firmware (internal software)",
  "configuration": "settings",
  "In order to": "To",
  "in order to": "to",
  "Due to the fact that": "Because",
  "due to the fact that": "because",
  "At this point in time": "Now",
  "at this point in time": "now"
};

const actions = [
  { from: /\b(?:You should|You need to|Please)\s+open\b/gi, to: 'Open' },
  { from: /\b(?:You should|You need to|Please)\s+click\b/gi, to: 'Click' },
  { from: /\b(?:You should|You need to|Please)\s+press\b/gi, to: 'Press' },
  { from: /\b(?:You should|You need to|Please)\s+check\b/gi, to: 'Check' },
  { from: /\b(?:You should|You need to|Please)\s+make sure\b/gi, to: 'Make sure' },
  { from: /\b(?:You should|You need to|Please)\s+ensure\b/gi, to: 'Make sure' }
];

function processText(text: string): string {
  let processed = text;

  // 1. Replace jargon
  for (const [jargon, replacement] of Object.entries(jargonMap)) {
    const regex = new RegExp(`\\b${jargon}\\b`, 'gi');
    processed = processed.replace(regex, (match) => {
      if (match[0] === match[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }

  // 2. Start sentences with action verbs
  for (const action of actions) {
    processed = processed.replace(action.from, action.to);
  }

  // 3. Sentence splitting (break sentences > 20 words into 2)
  // We match things that look like sentences.
  const sentenceRegex = /([A-Z0-9][^.?!]+[.?!]+(?:\s+|$))/g;
  
  processed = processed.replace(sentenceRegex, (sentence) => {
    const words = sentence.trim().split(/\s+/);
    if (words.length > 20) {
      let splitIndex = -1;
      const middle = Math.floor(words.length / 2);
      
      // Try to split on comma near the middle
      for (let i = Math.floor(words.length * 0.3); i < Math.floor(words.length * 0.7); i++) {
        if (words[i].endsWith(',')) {
          splitIndex = i;
          break;
        }
      }
      
      // If no comma, try a conjunction
      const conjunctions = ['and', 'but', 'or', 'because', 'so', 'if', 'while'];
      if (splitIndex === -1) {
        for (let i = Math.floor(words.length * 0.3); i < Math.floor(words.length * 0.7); i++) {
          if (conjunctions.includes(words[i].toLowerCase())) {
            splitIndex = i - 1;
            break;
          }
        }
      }

      // If still no good point, just force split
      if (splitIndex === -1) {
        splitIndex = middle;
      }

      let part1 = words.slice(0, splitIndex + 1).join(' ');
      let part2 = words.slice(splitIndex + 1).join(' ');

      if (part1.endsWith(',')) part1 = part1.slice(0, -1);
      if (!part1.match(/[.?!]$/)) part1 += '.';
      
      if (part2.length > 0) {
        part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
      }
      
      return part1 + ' ' + part2 + (sentence.endsWith(' ') ? ' ' : '');
    }
    return sentence;
  });

  return processed;
}

function processHtml(html: string): string {
  const $ = cheerio.load(html, null, false);
  
  function traverse(node: any) {
    if (node.type === 'text') {
      node.data = processText(node.data);
    } else if (node.type === 'tag' && node.children) {
      node.children.forEach(traverse);
    }
  }

  $.root()[0].children.forEach(traverse);
  return $.html();
}

async function run() {
  const slugs = [
    'hp-printer-troubleshooting',
    'nelko-bluetooth-disconnecting-permissions-pc-connection',
    'dascom-dot-matrix-printer-ribbon-faint-print',
    'dascom-1140-not-feeding-paper-error',
    'xerox-error-code-format-explained-how-to-read-xxx-yyy-faults'
  ];
  
  const articles = await prisma.article.findMany({ where: { slug: { in: slugs } } });
  
  let totalBefore = 0;
  let totalAfter = 0;

  const updates = articles.map(async (a) => {
    const beforeWords = a.content.split(/\s+/).length;
    totalBefore += beforeWords;
    
    const newContent = processHtml(a.content);
    
    const afterWords = newContent.split(/\s+/).length;
    totalAfter += afterWords;

    await prisma.article.update({
      where: { id: a.id },
      data: { content: newContent }
    });

    console.log(`Updated ${a.slug}: ${beforeWords} -> ${afterWords} words`);
  });

  await Promise.all(updates);
  console.log(`All updates completed. Word count: ${totalBefore} -> ${totalAfter}`);
}

run().catch(console.error).finally(() => prisma.$disconnect());
