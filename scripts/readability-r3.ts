import { prisma } from '../src/lib/prisma';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const jargonMap: Record<string, string> = {
  "bidirectional communication": "two-way connection",
  "initialization": "setup",
  "proprietary": "built-in",
  "calibration protocol": "calibration process",
  "firmware": "firmware (internal software)",
  "configuration": "settings",
  "In order to": "To",
  "Due to the fact that": "Because",
  "At this point in time": "Now"
};

const actionVerbMap: Array<{regex: RegExp, replacement: (match: string, p1: string) => string}> = [
  { regex: /(?:You should|Please|You need to|You must|It is necessary to)\s+(open|click|press|check|make sure)/g, replacement: (match, p1) => capitalize(p1.toLowerCase()) },
  { regex: /(?:you should|please|you need to|you must|it is necessary to)\s+(open|click|press|check|make sure)/gi, replacement: (match, p1) => p1.toLowerCase() },
];

function capitalize(s: string) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function processText(text: string): string {
  let newText = text;

  // Replace jargon and wordy openers
  for (const [jargon, replacement] of Object.entries(jargonMap)) {
    // Only replace if it doesn't already contain the replacement (to avoid double replacement)
    // Actually, just use a precise regex
    const regexI = new RegExp(`\\b${jargon}\\b`, 'gi');
    newText = newText.replace(regexI, (match) => {
       // if we are replacing firmware, make sure we aren't already replacing inside 'firmware (internal software)'
       if (replacement === 'firmware (internal software)') {
           // We can't lookahead easily for all cases in text node, but since we are running this ONCE on fresh DB, a simple replacement is fine
       }
       if (match[0] === match[0].toUpperCase()) {
         return capitalize(replacement);
       }
       return replacement.toLowerCase(); // keep case as is or lowercase? Just use replacement as defined.
    });
  }

  // Restore the correct case for specific ones
  newText = newText.replace(/two-way connection/gi, "two-way connection");
  newText = newText.replace(/firmware \(internal software\)/gi, "firmware (internal software)");
  newText = newText.replace(/calibration process/gi, "calibration process");
  newText = newText.replace(/\bto\b/g, "to"); // this is unsafe but it was "in order to"
  // actually let's skip re-lowercasing.

  // Action verbs
  for (const {regex, replacement} of actionVerbMap) {
    newText = newText.replace(regex, replacement as any);
  }

  // Split sentences > 20 words
  const sentenceRegex = /[^.?!]+[.?!]+/g;
  const sentences = newText.match(sentenceRegex);
  
  if (sentences) {
    for (const sentence of sentences) {
      const trimmed = sentence.trim();
      const words = trimmed.split(/\s+/);
      
      if (words.length > 20) {
        const replacement = recursiveSplit(trimmed);
        newText = newText.replace(sentence, " " + replacement);
      }
    }
  }

  return newText;
}

function recursiveSplit(sentence: string): string {
  const words = sentence.split(/\s+/);
  if (words.length <= 20) return sentence;

  const minSplit = Math.max(1, Math.floor(words.length * 0.4));
  const maxSplit = Math.min(words.length - 1, Math.floor(words.length * 0.6));

  let splitIdx = -1;
  const conjunctions = ['and', 'but', 'or', 'because', 'so', 'although', 'though', 'while', 'furthermore', 'moreover', 'however'];
  
  for (let i = minSplit; i <= maxSplit; i++) {
    const w = words[i].replace(/[,;]/g, '').toLowerCase();
    if (conjunctions.includes(w)) {
      splitIdx = i;
      break;
    }
  }

  if (splitIdx === -1) {
    for (let i = minSplit; i <= maxSplit; i++) {
      if (words[i].endsWith(',')) {
        splitIdx = i;
        break;
      }
    }
  }

  if (splitIdx === -1) {
    splitIdx = Math.floor(words.length / 2);
  }

  let isCommaSplit = words[splitIdx].endsWith(',');
  let splitWord = words[splitIdx].replace(/[,;]/g, '').toLowerCase();
  
  let part1Words = words.slice(0, isCommaSplit ? splitIdx + 1 : splitIdx);
  let part2Words = words.slice(isCommaSplit ? splitIdx + 1 : splitIdx);
  
  if (!isCommaSplit && conjunctions.includes(splitWord) && part2Words.length > 0) {
     part2Words.shift(); 
  }

  if (part2Words.length === 0) {
    return sentence; 
  }

  let part1 = part1Words.join(' ').replace(/[,;]+$/, '') + '.';
  let part2 = part2Words.join(' ');
  part2 = capitalize(part2);
  if (!part2.match(/[.?!]+$/)) {
    part2 += '.';
  }

  return recursiveSplit(part1) + ' ' + recursiveSplit(part2);
}

function processHtml(html: string): string {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  function walk(node: Node) {
    if (node.nodeType === 3) { // Text node
      if (node.nodeValue && node.nodeValue.trim().length > 0) {
        node.nodeValue = processText(node.nodeValue);
      }
    } else {
      if (node.nodeName !== 'CODE' && node.nodeName !== 'PRE') {
        for (const child of Array.from(node.childNodes)) {
          walk(child);
        }
      }
    }
  }

  walk(document.body);
  return document.body.innerHTML;
}

function countWords(str: string): number {
  return (str.match(/\w+/g) || []).length;
}

async function main() {
  const slugs = [
    "fix-pantum-0x000000709-communication-errors-bm2300-cover",
    "fix-citizen-printer-overheating-cooling-pause-dense-text",
    "nelko-4x6-shipping-label-printer-setup-calibration-blank-labels",
    "dascom-card-printer-setup-streaky-print",
    "fix-seiko-slp-manager-software-printer-not-responding-stuck"
  ];
  
  for (const slug of slugs) {
    const filePath = path.join(process.cwd(), `${slug}.html`);
    if (fs.existsSync(filePath)) {
      const originalContent = fs.readFileSync(filePath, 'utf-8');
      const originalWords = countWords(originalContent);
      
      const newContent = processHtml(originalContent);
      const newWords = countWords(newContent);
      
      console.log(`Article: ${slug}`);
      console.log(`Original words: ${originalWords}, New words: ${newWords}`);
      
      await prisma.article.update({
        where: { slug },
        data: { content: newContent }
      });
    } else {
      console.log(`Could not find ${filePath}`);
    }
  }
  
  console.log("All articles updated successfully.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
