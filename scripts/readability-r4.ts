import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

function rewriteText(text: string): string {
  let rewritten = text;

  // Jargon
  rewritten = rewritten.replace(/\bbidirectional communication\b/gi, "two-way connection");
  rewritten = rewritten.replace(/\binitialization\b/gi, "setup");
  rewritten = rewritten.replace(/\bproprietary\b/gi, "built-in");
  rewritten = rewritten.replace(/\bcalibration protocol\b/gi, "calibration process");
  rewritten = rewritten.replace(/\bfirmware\b/gi, "firmware (internal software)");
  rewritten = rewritten.replace(/\bconfiguration\b/gi, "settings");

  // Wordy openers
  rewritten = rewritten.replace(/\bIn order to\b/gi, "To");
  rewritten = rewritten.replace(/\bDue to the fact that\b/gi, "Because");
  rewritten = rewritten.replace(/\bAt this point in time\b/gi, "Now");

  // Action verbs (some basic heuristics)
  rewritten = rewritten.replace(/\bYou should open\b/gi, "Open");
  rewritten = rewritten.replace(/\bYou need to click\b/gi, "Click");
  rewritten = rewritten.replace(/\bIt is recommended to check\b/gi, "Check");
  rewritten = rewritten.replace(/\bYou must make sure\b/gi, "Make sure");
  rewritten = rewritten.replace(/\bPlease press\b/gi, "Press");

  // Sentences splitting (> 20 words)
  // Simple heuristic: split text into sentences by `. `, `? `, `! `.
  // Then if a sentence > 20 words, try to split at `, and `, `, but `, `, which `
  const sentenceRegex = /([^\.!\?]+[\.!\?]+)/g;
  let matches = rewritten.match(sentenceRegex);
  if (matches) {
    let newSentences = [];
    for (let s of matches) {
      let words = s.trim().split(/\s+/);
      if (words.length > 20) {
        // try to split
        let splitMatch = s.match(/(.*?)(, and |, but |, so |, which | because )(.*)/i);
        if (splitMatch) {
          let part1 = splitMatch[1].trim();
          let conj = splitMatch[2].toLowerCase();
          let part2 = splitMatch[3].trim();
          
          if (conj.includes('and') || conj.includes('but') || conj.includes('so')) {
            let capitalized = part2.charAt(0).toUpperCase() + part2.slice(1);
            s = `${part1}. ${capitalized}`;
          } else if (conj.includes('which')) {
            let capitalized = "This " + part2.slice(0); // crude fix
            s = `${part1}. ${capitalized}`;
          } else if (conj.includes('because')) {
            let capitalized = "This is because " + part2.slice(0);
            s = `${part1}. ${capitalized}`;
          }
        }
      }
      newSentences.push(s);
    }
    rewritten = newSentences.join(' ');
  }

  return rewritten;
}

function processHtml(html: string): string {
  const $ = cheerio.load(html, null, false); // no outer html/body wrapping
  
  // Recursively process text nodes
  function processNode(node: any) {
    if (node.type === 'text') {
      node.data = rewriteText(node.data);
    } else if (node.type === 'tag' || node.type === 'script' || node.type === 'style') {
      // Don't modify code or scripts, though unlikely in these articles
      if (node.name !== 'code' && node.name !== 'pre') {
        if (node.children) {
          node.children.forEach(processNode);
        }
      }
    }
  }

  $.root().contents().each((_, el) => {
    processNode(el);
  });

  return $.html();
}

async function run() {
  const slugs = [
    'bixolon-printer-not-working-with-square-pos',
    'hp-laserjet-m428fdw-scan-to-email-not-working',
    'dascom-thermal-printer-not-cutting-paper-cutter-jam',
    'hp-printer-vibrating-or-shaking',
    'bixolon-xd5-40-troubleshooting'
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  let totalBefore = 0;
  let totalAfter = 0;

  const updates = articles.map(async (article) => {
    const beforeWords = article.content.split(/\s+/).length;
    totalBefore += beforeWords;

    const newContent = processHtml(article.content);
    const afterWords = newContent.split(/\s+/).length;
    totalAfter += afterWords;

    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });

    console.log(`Updated ${article.slug}: ${beforeWords} -> ${afterWords} words`);
  });

  await Promise.all(updates);

  console.log(`Total words before: ${totalBefore}`);
  console.log(`Total words after: ${totalAfter}`);
}

run().catch(console.error);
