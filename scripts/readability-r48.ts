import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

const slugs = [
  "zebra-zd220-not-printing-zd888-troubleshooting",
  "dascom-pos-printer-offline-esc-pos-driver",
  "brother-printer-error-ts-02",
  "polaroid-printer-paper-jam-no-jam-visible-blank-fix",
  "fix-citizen-paper-cover-open-print-head-alarm-lever"
];

function simplifyText(text: string): string {
  let result = text;
  
  // Replace Jargon
  result = result.replace(/bidirectional communication/gi, "two-way connection");
  result = result.replace(/initialization/gi, "setup");
  result = result.replace(/proprietary/gi, "built-in");
  result = result.replace(/calibration protocol/gi, "calibration process");
  result = result.replace(/firmware/gi, "firmware (internal software)");
  result = result.replace(/configuration/gi, "settings");
  
  // Replace wordy openers
  result = result.replace(/In order to/gi, "To");
  result = result.replace(/Due to the fact that/gi, "Because");
  result = result.replace(/At this point in time/gi, "Now");
  
  // Try to start sentences with action verbs
  // "You should check" -> "Check"
  // "You need to open" -> "Open"
  // "Make sure to" -> "Make sure"
  result = result.replace(/You should check/gi, "Check");
  result = result.replace(/You need to check/gi, "Check");
  result = result.replace(/You should open/gi, "Open");
  result = result.replace(/You need to open/gi, "Open");
  result = result.replace(/You should press/gi, "Press");
  result = result.replace(/You need to press/gi, "Press");
  result = result.replace(/You should click/gi, "Click");
  result = result.replace(/You need to click/gi, "Click");
  result = result.replace(/It is recommended to check/gi, "Check");
  
  // Split long sentences
  const sentenceRegex = /([^.!?]+[.!?]*)/g;
  const match = result.match(sentenceRegex);
  if (match) {
    result = match.map(sentence => {
      const words = sentence.trim().split(/\s+/);
      if (words.length > 20) {
        let s = sentence;
        s = s.replace(/, and /g, '. And ');
        s = s.replace(/, but /g, '. But ');
        s = s.replace(/, which /g, '. This ');
        s = s.replace(/; /g, '. ');
        s = s.replace(/ — /g, '. ');
        
        s = s.replace(/\. ([a-z])/g, (m, p1) => `. ${p1.toUpperCase()}`);
        return s;
      }
      return sentence;
    }).join('');
  }
  
  return result;
}

async function processHtml(html: string): Promise<string> {
  const $ = cheerio.load(html, null, false);
  
  const textNodes: cheerio.Element[] = [];
  
  function walk(node: any) {
    if (node.type === 'text') {
      textNodes.push(node);
    } else if (node.children) {
      node.children.forEach(walk);
    }
  }
  
  $.root().children().each((_, el) => walk(el));
  
  textNodes.forEach(node => {
    if (node.data && node.data.trim().length > 0) {
      // Split by spaces to preserve exact whitespace but replace text
      node.data = simplifyText(node.data);
    }
  });
  
  return $.html();
}

async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  console.log(`Found ${articles.length} articles.`);

  const updates = articles.map(async (article) => {
    const oldHtml = article.content;
    const oldWords = (oldHtml.match(/\b\w+\b/g) || []).length;
    
    const newHtml = await processHtml(oldHtml);
    const newWords = (newHtml.match(/\b\w+\b/g) || []).length;
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: newHtml }
    });
    
    console.log(`Updated ${article.slug}: ${oldWords} words -> ${newWords} words`);
  });

  await Promise.all(updates);
  console.log('All articles updated successfully.');
}

main().catch(console.error);
