import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

function processText(text: string): string {
  // Replace wordy openers
  text = text.replace(/In order to/gi, "To");
  text = text.replace(/Due to the fact that/gi, "Because");
  text = text.replace(/At this point in time/gi, "Now");

  // Action verbs replacements
  text = text.replace(/You should open/gi, "Open");
  text = text.replace(/You need to open/gi, "Open");
  text = text.replace(/You must click/gi, "Click");
  text = text.replace(/You need to click/gi, "Click");
  text = text.replace(/It is recommended to press/gi, "Press");
  text = text.replace(/You should press/gi, "Press");
  text = text.replace(/Please check/gi, "Check");
  text = text.replace(/You need to check/gi, "Check");
  text = text.replace(/You need to make sure/gi, "Make sure");
  text = text.replace(/It is important to make sure/gi, "Make sure");

  // Jargon
  text = text.replace(/bidirectional communication/gi, "two-way connection");
  text = text.replace(/initialization/gi, "setup");
  text = text.replace(/proprietary/gi, "built-in");
  text = text.replace(/calibration protocol/gi, "calibration process");
  text = text.replace(/\bconfiguration\b/gi, "settings");
  text = text.replace(/\bfirmware(?! \(internal software\))\b/gi, "firmware (internal software)");

  // Sentence splitting
  // A simple regex to extract sentences (including punctuation and trailing spaces)
  const sentenceRegex = /([^\.!\?]+[\.!\?]+(\s+|$))/g;
  let newText = "";
  let match;
  let lastIndex = 0;

  while ((match = sentenceRegex.exec(text)) !== null) {
    const prefix = text.substring(lastIndex, match.index);
    newText += prefix;
    lastIndex = match.index + match[0].length;
    
    let sentence = match[0];
    // count words
    const words = sentence.trim().split(/\s+/);
    if (words.length > 20) {
      const mid = Math.floor(words.length / 2);
      // strip punctuation from first half end if any
      let firstHalfEnd = words[mid - 1];
      firstHalfEnd = firstHalfEnd.replace(/[,;:]$/, '') + '.';
      words[mid - 1] = firstHalfEnd;
      // capitalize second half start
      words[mid] = words[mid].charAt(0).toUpperCase() + words[mid].slice(1);
      
      sentence = words.join(" ") + (sentence.match(/\s+$/) ? sentence.match(/\s+$/)![0] : " ");
    }
    newText += sentence;
  }
  newText += text.substring(lastIndex);
  
  return newText;
}

function processHtml(html: string): string {
  const $ = cheerio.load(html, null, false);
  
  function walk(node: any) {
    if (node.type === 'text') {
      if (node.data) {
        node.data = processText(node.data);
      }
    } else if (node.type === 'tag' && node.name !== 'script' && node.name !== 'style' && node.name !== 'code') {
      if (node.children) {
        node.children.forEach(walk);
      }
    }
  }

  $('body').contents().each((i, el) => walk(el));
  return $.html();
}

async function main() {
  const slugs = [
    "hp-printer-error-messages",
    "canon-maxify-gx-error-code",
    "rollo-printer-not-showing-up-mac-ventura-sequoia-fix",
    "hp-smart-tank-7602-fax-not-working",
    "polaroid-hi-print-faded-dark-grainy-overexposed-fix"
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(article => {
    const originalWordCount = article.content.split(/\s+/).length;
    const newContent = processHtml(article.content);
    const newWordCount = newContent.split(/\s+/).length;
    console.log(`[${article.slug}] Words: ${originalWordCount} -> ${newWordCount}`);
    
    return prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
  });

  await Promise.all(updates);
  console.log('Successfully updated all articles in batch.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
