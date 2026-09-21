import { prisma } from '../src/lib/prisma';
import fs from 'fs';

function countWords(str: string): number {
  return str.replace(/<[^>]*>?/gm, '').split(/\s+/).filter(word => word.length > 0).length;
}

function processHtml(html: string): string {
  let processed = html;
  
  // 1. Replace jargon
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

  for (const [jargon, replacement] of Object.entries(jargonMap)) {
    const regex = new RegExp(jargon, "gi");
    processed = processed.replace(regex, replacement);
  }

  // 2. Break sentences over 20 words.
  // We will parse text nodes and apply a simple sentence splitter.
  // Since we don't have a DOM parser, we'll do a regex replace on content outside tags.
  processed = processed.replace(/(>)([^<]+)(<)/g, (match, p1, text, p3) => {
    // split text into sentences
    let sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let newText = sentences.map((sentence: string) => {
      let words = sentence.trim().split(/\s+/);
      if (words.length > 20) {
        // Find a good place to split: " and ", " but ", ", "
        const splitWords = [" because ", " and ", " but ", ", "];
        let splitIndex = -1;
        for (const sw of splitWords) {
          const idx = sentence.toLowerCase().indexOf(sw);
          if (idx > 0 && idx < sentence.length - 10) { // Don't split too close to the ends
             let firstPart = sentence.substring(0, idx);
             let secondPart = sentence.substring(idx + sw.length);
             // capitalize second part
             secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
             return firstPart + ". " + secondPart;
          }
        }
        // If no split word, just split at the 15th word roughly.
        let firstPart = words.slice(0, 15).join(" ");
        let secondPart = words.slice(15).join(" ");
        secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
        return firstPart + ". " + secondPart;
      }
      return sentence;
    }).join(" ");
    return p1 + newText + p3;
  });
  
  // 3. Start sentences with action verbs (heuristics for lists)
  // E.g., "You should open..." -> "Open..."
  processed = processed.replace(/You should ([a-z])/gi, (match, p1) => p1.toUpperCase());
  processed = processed.replace(/You need to ([a-z])/gi, (match, p1) => p1.toUpperCase());
  processed = processed.replace(/Simply ([a-z])/gi, (match, p1) => p1.toUpperCase());

  return processed;
}

async function main() {
  const slugs = [
    "instax-square-link-wide-errors-film-loading-guide",
    "bixolon-xd3-40-label-printer-error",
    "brother-printer-error-46-unable-to-clean",
    "canon-imageclass-mf-toner-error",
    "hp-sprocket-select-vs-sprocket-200-difference"
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updatePromises = articles.map(async (article) => {
    const originalCount = countWords(article.content);
    const newContent = processHtml(article.content);
    const newCount = countWords(newContent);
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });

    console.log(`Updated ${article.slug}: ${originalCount} words -> ${newCount} words`);
  });

  await Promise.all(updatePromises);
  console.log("All articles updated successfully.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
