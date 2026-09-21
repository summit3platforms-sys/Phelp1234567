import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

const replacements = [
  { from: /bidirectional communication/gi, to: 'two-way connection' },
  { from: /\binitialization\b/gi, to: 'setup' },
  { from: /\bproprietary\b/gi, to: 'built-in' },
  { from: /calibration protocol/gi, to: 'calibration process' },
  { from: /\bfirmware\b(?!\s*\(internal software\))/gi, to: 'firmware (internal software)' },
  { from: /\bconfiguration\b/gi, to: 'settings' },
  { from: /In order to/gi, to: 'To' },
  { from: /Due to the fact that/gi, to: 'Because' },
  { from: /At this point in time/gi, to: 'Now' },
  // Adding action verbs replacements where possible (basic heuristic)
  { from: /You should open/gi, to: 'Open' },
  { from: /You need to click/gi, to: 'Click' },
  { from: /It is recommended to press/gi, to: 'Press' },
  { from: /Make sure that you check/gi, to: 'Check' },
  { from: /Ensure that/gi, to: 'Make sure' }
];

function countWords(str: string) {
  return str.split(/\s+/).filter(w => w.length > 0).length;
}

function processText(text: string) {
  let newText = text;
  
  for (const rule of replacements) {
    newText = newText.replace(rule.from, rule.to);
  }
  
  // Basic sentence splitting for long sentences (>20 words)
  // Use a regex that splits sentences but keeps the punctuation
  const sentenceRegex = /([^.!?]+[.!?]+)(\s*)/g;
  const parts = [];
  let match;
  let lastIndex = 0;
  
  while ((match = sentenceRegex.exec(newText)) !== null) {
    let sentence = match[1];
    const space = match[2];
    
    if (countWords(sentence) > 20) {
      const splitters = [
        { pattern: /, and /i, replace: '. And ' },
        { pattern: /, but /i, replace: '. But ' },
        { pattern: /, so /i, replace: '. So ' },
        { pattern: / because /i, replace: '. Because ' },
        { pattern: /, which /i, replace: '. This ' }
      ];
      for (const splitter of splitters) {
        if (sentence.match(splitter.pattern)) {
          sentence = sentence.replace(splitter.pattern, splitter.replace);
          break;
        }
      }
    }
    parts.push(sentence + space);
    lastIndex = sentenceRegex.lastIndex;
  }
  
  // Append any remaining text
  parts.push(newText.substring(lastIndex));
  
  return parts.join('');
}

async function main() {
  const slugs = [
    "niimbot-wont-turn-on-wont-charge-battery-drain",
    "hp-scanner-says-door-open-when-closed",
    "brother-printer-error-49-too-cold",
    "niimbot-b1-vs-b21-b3s-b4-comparison-troubleshooting",
    "primera-printer-offline-error-state-ptstatus-wont-open"
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updatePromises = articles.map(async (article) => {
    const originalText = cheerio.load(article.content).text();
    const originalWordCount = countWords(originalText);
    
    const $ = cheerio.load(article.content, null, false);
    
    $('*').contents().each(function() {
      if (this.type === 'text') {
        const text = $(this).text();
        if (text.trim().length > 0) {
          this.data = processText(text);
        }
      }
    });
    
    const newContent = $.html();
    const newWordCount = countWords(cheerio.load(newContent).text());
    
    console.log(`\nArticle: ${article.slug}`);
    console.log(`Word count before: ${originalWordCount}`);
    console.log(`Word count after: ${newWordCount}`);
    
    return prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
  });

  await Promise.all(updatePromises);
  console.log('\nSuccess: All specified articles updated concurrently.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
