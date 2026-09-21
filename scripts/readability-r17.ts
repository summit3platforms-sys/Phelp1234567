import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

const slugs = [
  "nelko-d810-tattoo-stencil-printer-setup-vs-phomemo-m08f",
  "polaroid-hi-print-multiple-phones-pairing-guide",
  "zebra-setup-utility-not-detecting-printer-driver-install-failed",
  "dascom-printer-dec-emulation-setup",
  "hp-printhead-alignment-failed-repeatedly"
];

function rewriteText(text: string): string {
  let updated = text
    .replace(/\bbidirectional communication\b/gi, 'two-way connection')
    .replace(/\binitialization\b/gi, 'setup')
    .replace(/\bproprietary\b/gi, 'built-in')
    .replace(/\bcalibration protocol\b/gi, 'calibration process')
    .replace(/\bfirmware\b/gi, 'firmware (internal software)')
    .replace(/\bconfiguration\b/gi, 'settings')
    .replace(/\bIn order to\b/gi, 'To')
    .replace(/\bDue to the fact that\b/gi, 'Because')
    .replace(/\bAt this point in time\b/gi, 'Now')
    .replace(/\bYou should open\b/gi, 'Open')
    .replace(/\bIt is necessary to open\b/gi, 'Open')
    .replace(/\bYou must click\b/gi, 'Click')
    .replace(/\bYou will need to press\b/gi, 'Press')
    .replace(/\bIt is important to check\b/gi, 'Check')
    .replace(/\bYou should make sure\b/gi, 'Make sure')
    .replace(/\bMake sure that you\b/gi, 'Make sure');

  const sentenceRegex = /([^.!?]+[.!?]+)/g;
  const matchSentences = updated.match(sentenceRegex);
  
  if (matchSentences) {
    let replaced = updated;
    for (const s of matchSentences) {
      let words = s.trim().split(/\s+/);
      if (words.length > 20) {
        let newS = s;
        const splitters = [', and ', ', but ', ' because ', ' since ', ' while ', ' and ', ' but ', '; '];
        let splitDone = false;
        for (let splitter of splitters) {
          let idx = s.indexOf(splitter, 40);
          if (idx !== -1 && idx < s.length - 20) {
            let firstPart = s.substring(0, idx).trim();
            let secondPart = s.substring(idx + splitter.length).trim();
            if (firstPart && secondPart) {
              if (!firstPart.endsWith('.')) firstPart += '.';
              secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
              newS = firstPart + ' ' + secondPart + (secondPart.match(/[.!?]$/) ? '' : '.');
              splitDone = true;
              break;
            }
          }
        }
        
        if (!splitDone) {
          let commaIdx = s.indexOf(', ', 40);
          if (commaIdx !== -1 && commaIdx < s.length - 20) {
            let firstPart = s.substring(0, commaIdx).trim();
            let secondPart = s.substring(commaIdx + 2).trim();
            if (firstPart && secondPart) {
              if (!firstPart.endsWith('.')) firstPart += '.';
              secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
              newS = firstPart + ' ' + secondPart + (secondPart.match(/[.!?]$/) ? '' : '.');
            }
          }
        }
        replaced = replaced.replace(s, newS);
      }
    }
    updated = replaced;
  }

  return updated;
}

function processHtml(html: string): string {
  const $ = cheerio.load(html, null, false);
  
  function traverse(node: any) {
    if (node.type === 'text') {
      if (node.data && node.data.trim()) {
        node.data = rewriteText(node.data);
      }
    } else if (node.type === 'tag' || node.type === 'root') {
      $(node).contents().each((_, child) => traverse(child));
    }
  }
  
  traverse($.root()[0]);
  return $.html();
}

async function main() {
  console.log('Fetching articles...');
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  console.log(`Found ${articles.length} articles.`);
  
  const updates = articles.map(async (article) => {
    const oldContent = article.content;
    const oldWordCount = (oldContent.match(/\S+/g) || []).length;
    
    const newContent = processHtml(oldContent);
    const newWordCount = (newContent.match(/\S+/g) || []).length;
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
    
    console.log(`Updated ${article.slug}: ${oldWordCount} words -> ${newWordCount} words.`);
  });

  await Promise.all(updates);
  console.log('All articles updated successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
