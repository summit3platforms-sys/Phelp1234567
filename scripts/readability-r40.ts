import { JSDOM } from 'jsdom';
import { prisma } from '../src/lib/prisma';

const slugs = [
  "dymo-550-turbo-vs-450-turbo-upgrade",
  "bixolon-srp-e300-troubleshooting",
  "instax-link-multiple-phones-pairing-guide",
  "zebra-zd420-streaky-lines-inconsistent-quality-ribbon-wrinkle-fix",
  "hp-toner-streaking-down-page"
];

function splitSentence(sentence: string): string {
  const words = sentence.trim().split(/\s+/);
  if (words.length <= 20) return sentence;
  
  const mid = Math.floor(words.length / 2);
  let bestSplitIdx = -1;
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase();
    if (word.endsWith(',') || word.endsWith(';') || word === 'and' || word === 'but' || word === 'because' || word === 'which') {
      if (bestSplitIdx === -1 || Math.abs(i - mid) < Math.abs(bestSplitIdx - mid)) {
        bestSplitIdx = i;
      }
    }
  }

  if (bestSplitIdx !== -1 && bestSplitIdx > 3 && bestSplitIdx < words.length - 3) {
    let word = words[bestSplitIdx];
    if (word.endsWith(',') || word.endsWith(';')) {
      words[bestSplitIdx] = word.slice(0, -1) + '.';
    } else {
      words[bestSplitIdx] = '.';
    }
    if (bestSplitIdx + 1 < words.length) {
       words[bestSplitIdx + 1] = words[bestSplitIdx + 1].charAt(0).toUpperCase() + words[bestSplitIdx + 1].slice(1);
    }
  } else {
    words[mid] = words[mid] + '.';
    if (mid + 1 < words.length) {
       words[mid + 1] = words[mid + 1].charAt(0).toUpperCase() + words[mid + 1].slice(1);
    }
  }
  return words.join(' ');
}

function processText(text: string): string {
  let processed = text;
  processed = processed.replace(/bidirectional communication/gi, "two-way connection");
  processed = processed.replace(/initialization/gi, "setup");
  processed = processed.replace(/proprietary/gi, "built-in");
  processed = processed.replace(/calibration protocol/gi, "calibration process");
  processed = processed.replace(/firmware/gi, "firmware (internal software)");
  processed = processed.replace(/configuration/gi, "settings");
  
  processed = processed.replace(/In order to/gi, "To");
  processed = processed.replace(/Due to the fact that/gi, "Because");
  processed = processed.replace(/At this point in time/gi, "Now");
  
  const sentences = processed.split(/(?<=[.!?])\s+/);
  const newSentences = sentences.map(s => {
      const words = s.split(/\s+/).filter(w => w.length > 0);
      if (words.length > 20) {
          let newS = s;
          let iterations = 0;
          while (newS.split(/\s+/).filter(w => w.length > 0).length > 20 && iterations < 3) {
             const preSplit = newS;
             newS = splitSentence(newS);
             if (newS === preSplit) break;
             iterations++;
          }
          return newS;
      }
      return s;
  });
  
  return newSentences.join(' ');
}

function heuristics(text: string) {
    let p = processText(text);
    p = p.replace(/You should open /gi, "Open ");
    p = p.replace(/You must open /gi, "Open ");
    p = p.replace(/It is necessary to open /gi, "Open ");
    p = p.replace(/You should click /gi, "Click ");
    p = p.replace(/You should press /gi, "Press ");
    p = p.replace(/You should check /gi, "Check ");
    p = p.replace(/You should make sure /gi, "Make sure ");
    p = p.replace(/Ensure that /gi, "Make sure ");
    return p;
}

function rewriteHTML(html: string) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  
  function walk(node: any) {
    if (node.nodeType === 3) { 
      if (node.nodeValue.trim()) {
        node.nodeValue = heuristics(node.nodeValue);
      }
    } else {
      for (const child of node.childNodes) {
        walk(child);
      }
    }
  }
  
  walk(document.body);
  return document.body.innerHTML;
}

function countWords(str: string) {
    return str.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(w => w.length > 0).length;
}

async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(article => {
    const origWordCount = countWords(article.content || "");
    const newContent = rewriteHTML(article.content || "");
    const newWordCount = countWords(newContent);
    console.log(`Article: ${article.slug}`);
    console.log(`Word count: ${origWordCount} -> ${newWordCount}`);
    
    return prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
  });

  await Promise.all(updates);
  console.log('Update complete!');
}

main().catch(console.error);
