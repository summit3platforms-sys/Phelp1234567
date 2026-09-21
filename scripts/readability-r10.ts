import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

const slugs = [
  "hp-printer-not-showing-up-on-macos-sequoia",
  "star-micronics-tsp650-vs-tsp700-which-pos-models-buy",
  "hp-printer-driver-missing-after-windows-update",
  "phomemo-m02-vs-m02-pro-t02-comparison-m02s-fixes",
  "hp-plus-third-party-ink-blocked-after-update"
];

function rewriteHtml(html: string): string {
  let text = html;
  
  // Rule 4: Wordy openers
  text = text.replace(/\bIn order to\b/gi, "To");
  text = text.replace(/\bDue to the fact that\b/gi, "Because");
  text = text.replace(/\bAt this point in time\b/gi, "Now");
  
  // Rule 2: Jargon
  text = text.replace(/\bbidirectional communication\b/gi, "two-way connection");
  text = text.replace(/\binitialization\b/gi, "setup");
  text = text.replace(/\bproprietary\b/gi, "built-in");
  text = text.replace(/\bcalibration protocol\b/gi, "calibration process");
  text = text.replace(/\bFirmware\b/g, "Firmware (internal software)");
  text = text.replace(/\bfirmware\b/g, "firmware (internal software)");
  text = text.replace(/\bConfiguration\b/g, "Settings");
  text = text.replace(/\bconfiguration\b/g, "settings");

  // Rule 3: Action verbs
  text = text.replace(/\b(?:you need to|you should|you must|it is important to|it is recommended to|we recommend that you|please)\s+(open|click|press|check|make sure)\b/gi, (match, p1) => {
    if (match.charAt(0) === match.charAt(0).toUpperCase()) {
      return p1.charAt(0).toUpperCase() + p1.slice(1);
    }
    return p1;
  });

  // Rule 1: Break sentences over 20 words
  const $ = cheerio.load(text, null, false);
  $('p, li, td').each((_, el) => {
    let inner = $(el).html() || '';
    const textContent = $(el).text();
    
    const sentences = textContent.match(/[^.!?]+[.!?]*\s*/g) || [textContent];
    let hasLongSentence = sentences.some(s => s.trim().split(/\s+/).length > 20);
    
    if (hasLongSentence) {
      for (let i = 0; i < 3; i++) {
         inner = inner.replace(/\s(and|but|because)\s/, (match, p1) => {
           return '. ' + p1.charAt(0).toUpperCase() + p1.slice(1) + ' ';
         });
      }
    }
    $(el).html(inner);
  });
  
  return $.html();
}

function countWords(str: string): number {
  return str.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(w => w.trim().length > 0).length;
}

async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  const updates = articles.map(async (article) => {
    const beforeWords = countWords(article.content);
    const newContent = rewriteHtml(article.content);
    const afterWords = countWords(newContent);
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
    
    console.log(`Article [${article.slug}]: ${beforeWords} words -> ${afterWords} words`);
  });
  
  await Promise.all(updates);
  console.log("Successfully updated all articles in the batch!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
