import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

function processText(text: string): string {
  // 2. Replace jargon
  let t = text
    .replace(/\bbidirectional communication\b/gi, 'two-way connection')
    .replace(/\binitialization\b/gi, 'setup')
    .replace(/\bproprietary\b/gi, 'built-in')
    .replace(/\bcalibration protocol\b/gi, 'calibration process')
    .replace(/\bfirmware\b/g, 'firmware (internal software)')
    .replace(/\bFirmware\b/g, 'Firmware (internal software)')
    .replace(/\bconfiguration\b/gi, 'settings');

  // 4. Replace wordy openers
  t = t
    .replace(/\bIn order to\b/gi, 'To')
    .replace(/\bDue to the fact that\b/gi, 'Because')
    .replace(/\bAt this point in time\b/gi, 'Now');

  // 3. Action verbs
  t = t
    .replace(/You should open/gi, 'Open')
    .replace(/It is recommended to open/gi, 'Open')
    .replace(/You should click/gi, 'Click')
    .replace(/It is recommended to click/gi, 'Click')
    .replace(/You should press/gi, 'Press')
    .replace(/It is recommended to press/gi, 'Press')
    .replace(/You should check/gi, 'Check')
    .replace(/It is recommended to check/gi, 'Check')
    .replace(/You should make sure/gi, 'Make sure')
    .replace(/It is recommended to make sure/gi, 'Make sure')
    .replace(/Make sure that you/gi, 'Make sure')
    .replace(/Ensure that you/gi, 'Make sure');

  // 1. Break sentences > 20 words
  // Basic heuristic: split by period, count words, if > 20, split at ' and ' or ', ' or ' but '
  const sentences = t.split(/([.?!]\s+)/);
  for (let i = 0; i < sentences.length; i++) {
    // Only process actual sentences (not the delimiters)
    if (i % 2 === 0 && sentences[i].trim().length > 0) {
      const words = sentences[i].split(/\s+/);
      if (words.length > 20) {
        // Try to split at a conjunction or comma near the middle
        const mid = Math.floor(words.length / 2);
        
        let splitIndex = -1;
        // Find 'and', 'but', or ',' around the middle
        for (let j = mid - 5; j <= mid + 5; j++) {
          if (j > 0 && j < words.length - 1) {
            const w = words[j].toLowerCase();
            if (w === 'and' || w === 'but' || w.endsWith(',')) {
              splitIndex = j;
              break;
            }
          }
        }
        
        if (splitIndex !== -1) {
          if (words[splitIndex].endsWith(',')) {
             words[splitIndex] = words[splitIndex].slice(0, -1) + '.';
             words[splitIndex+1] = words[splitIndex+1].charAt(0).toUpperCase() + words[splitIndex+1].slice(1);
          } else {
             words[splitIndex] = '.';
             words[splitIndex+1] = words[splitIndex+1].charAt(0).toUpperCase() + words[splitIndex+1].slice(1);
          }
          sentences[i] = words.join(' ');
        }
      }
    }
  }
  
  return sentences.join('');
}

function processHtml(html: string): string {
  const $ = cheerio.load(html, null, false);
  
  // Recursively process text nodes
  function traverse(node: any) {
    if (node.type === 'text') {
      node.data = processText(node.data);
    } else if (node.type === 'tag') {
      node.children.forEach(traverse);
    }
  }
  
  $.root()[0].children.forEach(traverse);
  
  return $.html();
}

async function main() {
  const slugs = [
    "hp-color-laserjet-m283fdw-error-59",
    "citizen-cl-s-series-guide-521-621-631-700",
    "epson-xp-4100-et-2400-wifi-setup",
    "hp-smart-tank-5101-printhead-error",
    "fix-xerox-010-paper-jams-duplex-errors-door-jams"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  const updates = articles.map(async (article) => {
    const oldWordCount = article.content.split(/\s+/).length;
    const newContent = processHtml(article.content);
    const newWordCount = newContent.split(/\s+/).length;
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
    
    console.log(`Updated ${article.slug}: ${oldWordCount} words -> ${newWordCount} words`);
  });
  
  await Promise.all(updates);
  console.log("All articles updated successfully.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
