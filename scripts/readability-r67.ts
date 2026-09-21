import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

const slugs = [
  "brother-printer-error-42-temperature",
  "hp-envy-photo-7855-paper-jam-error",
  "zebra-zd421-cancel-button-not-working-zd620-error-light",
  "niimbot-rfid-chip-fault-non-universal-labels-error",
  "fix-lexmark-service-engine-controller-card-980-scanner-lamp-820"
];

const jargon = [
  [/bidirectional communication/gi, "two-way connection"],
  [/initialization/gi, "setup"],
  [/proprietary/gi, "built-in"],
  [/calibration protocol/gi, "calibration process"],
  [/\bfirmware\b/gi, "firmware (internal software)"],
  [/configuration/gi, "settings"]
];

const openers = [
  [/\bIn order to\b/gi, "To"],
  [/\bDue to the fact that\b/gi, "Because"],
  [/\bAt this point in time\b/gi, "Now"],
  [/If you want to (open|click|press|check|make sure)\b/gi, (match: string, p1: string) => p1.charAt(0).toUpperCase() + p1.slice(1)],
  [/You should (open|click|press|check|make sure)\b/gi, (match: string, p1: string) => p1.charAt(0).toUpperCase() + p1.slice(1)],
  [/It is recommended to (open|click|press|check|make sure)\b/gi, (match: string, p1: string) => p1.charAt(0).toUpperCase() + p1.slice(1)]
];

function rewriteText(text: string): string {
  let newText = text;
  
  for (let [pattern, replacement] of jargon) {
    newText = newText.replace(pattern as RegExp, replacement as string);
  }
  for (let [pattern, replacement] of openers) {
    newText = newText.replace(pattern as RegExp, replacement as any);
  }
  
  const sentenceRegex = /[^.!?\n]+[.!?]*\s*/g;
  let sentences = newText.match(sentenceRegex) || [newText];
  
  let finalSentences = sentences.map(sentence => {
    let words = sentence.trim().split(/\s+/);
    if (words.length > 20) {
      const splitPoints = [
        /(,\s*and\s+)/i,
        /(,\s*but\s+)/i,
        /(,\s*so\s+)/i,
        /(,\s*because\s+)/i,
        /(,\s*which\s+)/i,
        /(\s+and\s+)/i,
        /(\s+but\s+)/i,
        /(\s+because\s+)/i
      ];
      
      for (let sp of splitPoints) {
        let parts = sentence.split(sp);
        if (parts.length >= 3) {
          let firstHalfWords = parts[0].trim().split(/\s+/).length;
          let secondHalfWords = parts.slice(2).join('').trim().split(/\s+/).length;
          if (firstHalfWords > 5 && secondHalfWords > 5) {
            let firstPart = parts[0].trim() + ".";
            let secondPart = parts.slice(2).join('').trim();
            if (sp.toString().includes('which')) {
                secondPart = "This " + secondPart;
            } else {
                secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
            }
            return firstPart + " " + secondPart + (sentence.endsWith(" ") ? " " : "");
          }
        }
      }
    }
    return sentence;
  });
  
  return finalSentences.join("");
}

function processHtml(html: string): string {
  const $ = cheerio.load(html, null, false);
  
  function traverse(node: any) {
    if (node.type === 'text') {
      if (node.data.trim().length > 0) {
        node.data = rewriteText(node.data);
      }
    } else if (node.children) {
      node.children.forEach((child: any) => traverse(child));
    }
  }
  
  $.root().contents().each((i: number, el: any) => traverse(el));
  
  return $.html();
}

async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  console.log(`Found ${articles.length} articles`);
  let initialWords = 0;
  let finalWords = 0;

  const updates = articles.map(article => {
    const originalTextLength = article.content.split(/\s+/).length;
    initialWords += originalTextLength;
    
    const newContent = processHtml(article.content);
    
    const newTextLength = newContent.split(/\s+/).length;
    finalWords += newTextLength;
    
    console.log(`Rewritten ${article.slug}: ${originalTextLength} -> ${newTextLength} words`);
    
    return prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
  });

  await Promise.all(updates);

  console.log(`Total words before: ${initialWords}`);
  console.log(`Total words after: ${finalWords}`);
  console.log("Success: Articles have been rewritten and updated in the database.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
