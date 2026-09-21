import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

function rewriteText(text: string): string {
  // Replace jargon
  let t = text.replace(/bidirectional communication/gi, 'two-way connection');
  t = t.replace(/initialization/gi, 'setup');
  t = t.replace(/proprietary/gi, 'built-in');
  t = t.replace(/calibration protocol/gi, 'calibration process');
  t = t.replace(/firmware/gi, 'firmware (internal software)');
  t = t.replace(/configuration/gi, 'settings');

  // Replace wordy openers
  t = t.replace(/In order to/gi, 'To');
  t = t.replace(/Due to the fact that/gi, 'Because');
  t = t.replace(/At this point in time/gi, 'Now');

  // Active verbs
  t = t.replace(/\b(Please )?ensure that you (open|click|press|check|make sure)\b/gi, (match, p1, p2) => p2.charAt(0).toUpperCase() + p2.slice(1));
  t = t.replace(/\bYou should (open|click|press|check)\b/gi, (match, p1) => p1.charAt(0).toUpperCase() + p1.slice(1));

  // Split sentences over 20 words
  // Match sentences roughly. We will use a regex that captures anything ending in . ? or !
  const sentenceRegex = /([^.!?]+[.!?]+(?:[\s]*))/g;
  let matches = [...t.matchAll(sentenceRegex)];
  
  if (matches.length === 0) return t;

  let rewrittenText = "";

  for (const match of matches) {
    let sentence = match[1];
    let words = sentence.trim().split(/\s+/);
    if (words.length > 20) {
      let splitIdx = Math.floor(words.length / 2);
      // try to find a comma or conjunction near the middle
      for (let i = Math.floor(words.length / 2) - 5; i <= Math.floor(words.length / 2) + 5; i++) {
         if (i > 0 && i < words.length - 1) {
            if (words[i].match(/^(and|but|or|so|because|which|that)$/i) || words[i-1].endsWith(',')) {
               splitIdx = i;
               break;
            }
         }
      }
      
      let firstHalf = words.slice(0, splitIdx).join(' ');
      let secondHalf = words.slice(splitIdx).join(' ');
      
      // cleanup first half
      if (firstHalf.endsWith(',')) {
         firstHalf = firstHalf.slice(0, -1);
      }
      if (!firstHalf.match(/[.!?]$/)) {
         firstHalf += '.';
      }

      // cleanup second half
      if (secondHalf.match(/^(and|but|or|so|because)\b/i)) {
         secondHalf = secondHalf.replace(/^(and|but|or|so|because)\s+/i, '');
      }
      secondHalf = secondHalf.charAt(0).toUpperCase() + secondHalf.slice(1);
      
      rewrittenText += firstHalf + " " + secondHalf + " ";
    } else {
      rewrittenText += sentence;
    }
  }

  return rewrittenText;
}

function processHtml(html: string): string {
  const $ = cheerio.load(html, null, false);
  
  function traverse(node: any) {
    if (node.type === 'text') {
      const original = node.data;
      if (original.trim().length > 0) {
        node.data = rewriteText(original);
      }
    } else if (node.type === 'tag') {
      if (node.name !== 'script' && node.name !== 'style') {
        node.children.forEach(traverse);
      }
    }
  }

  $('body').contents().each((_, el) => traverse(el));
  return $('body').html() || $.html();
}

async function main() {
  const slugs = [
    "brother-printer-wont-connect-to-wlan-access-point",
    "dymo-labelwriter-450-turbo-setup-not-printing",
    "star-micronics-tsp143-series-iii-vs-iv-wifi-ethernet-setup",
    "nelko-pm220-not-printing-paper-jams-indicator-lights",
    "fix-pantum-toner-not-recognized-chip-resets-spring-contacts"
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(async (article) => {
    // get original words from content ignoring html tags
    const origText = cheerio.load(article.content).text();
    const origWordCount = origText.trim().split(/\s+/).length;
    
    const rewritten = processHtml(article.content);
    
    const newText = cheerio.load(rewritten).text();
    const newWordCount = newText.trim().split(/\s+/).length;
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: rewritten }
    });
    console.log(`Updated ${article.slug}: ${origWordCount} words -> ${newWordCount} words`);
  });

  await Promise.all(updates);
  console.log("All articles updated successfully.");
}

main().catch(console.error);
