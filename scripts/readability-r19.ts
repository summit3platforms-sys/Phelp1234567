import { prisma } from '../src/lib/prisma';
import fs from 'fs';

const jargons = [
  { from: /bidirectional communication/gi, to: 'two-way connection' },
  { from: /initialization/gi, to: 'setup' },
  { from: /proprietary/gi, to: 'built-in' },
  { from: /calibration protocol/gi, to: 'calibration process' },
  { from: /\bfirmware\b(?! \(internal software\))/gi, to: 'firmware (internal software)' },
  { from: /configuration/gi, to: 'settings' },
  { from: /In order to/gi, to: 'To' },
  { from: /Due to the fact that/gi, to: 'Because' },
  { from: /At this point in time/gi, to: 'Now' },
  { from: /You should open/gi, to: 'Open' },
  { from: /You must click/gi, to: 'Click' },
  { from: /You need to press/gi, to: 'Press' },
  { from: /It is recommended to check/gi, to: 'Check' },
  { from: /It is important to make sure/gi, to: 'Make sure' },
  { from: /First, you should/gi, to: 'First,' },
  { from: /You will need to/gi, to: 'Make sure to' },
  { from: /Users should/gi, to: 'Make sure to' }
];

function processHtml(html: string): string {
  let modified = html;
  
  for (const j of jargons) {
    modified = modified.replace(j.from, j.to);
  }
  
  let result = '';
  const tokens = modified.split(/(<[^>]+>)/g);
  
  for (let token of tokens) {
    if (token.startsWith('<')) {
      result += token;
    } else {
      if (!token.trim()) {
        result += token;
        continue;
      }
      
      const sentences = token.match(/[^.!?]+[.!?]+(\s|$)/g) || [token];
      let newText = '';
      for (let s of sentences) {
        let trimmed = s.trim();
        if (!trimmed) {
            newText += s;
            continue;
        }
        let words = trimmed.split(/\s+/);
        if (words.length > 20) {
          const splitWords = [' and ', ', and ', ' because ', ', but ', ' but ', ' which ', ', which ', ' while ', ' since ', ', so '];
          let splitFound = false;
          
          for (const sw of splitWords) {
            const idx = trimmed.toLowerCase().indexOf(sw);
            if (idx > 20 && idx < trimmed.length - 20) {
              let p1 = trimmed.substring(0, idx).trim();
              let p2 = trimmed.substring(idx + sw.length).trim();
              if (p2.length > 0) {
                p2 = p2.charAt(0).toUpperCase() + p2.slice(1);
                // Ensure proper punctuation for p1 if missing
                if (!p1.endsWith('.') && !p1.endsWith('!') && !p1.endsWith('?')) p1 += '.';
                s = p1 + ' ' + p2;
                if (!s.endsWith('.') && !s.endsWith('!') && !s.endsWith('?')) s += '.';
                s += (s.endsWith(' ') ? '' : ' ');
                splitFound = true;
                break;
              }
            }
          }
          if (!splitFound) {
            const splitIdx = Math.floor(words.length / 2);
            let firstPart = words.slice(0, splitIdx).join(' ');
            let secondPart = words.slice(splitIdx).join(' ');
            if (firstPart.endsWith(',')) firstPart = firstPart.slice(0, -1);
            if (!firstPart.endsWith('.') && !firstPart.endsWith('!') && !firstPart.endsWith('?')) firstPart += '.';
            secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
            s = firstPart + ' ' + secondPart;
            if (!s.endsWith('.') && !s.endsWith('!') && !s.endsWith('?')) s += '.';
            s += ' ';
          }
        }
        
        // Active voice adjustments at the start of sentence
        s = s.replace(/^To \w+, you should (open|click|press|check)/i, '$1');
        s = s.replace(/^You can (open|click|press|check)/i, '$1');
        
        newText += s;
      }
      result += newText;
    }
  }
  return result;
}

async function main() {
  const slugs = [
    "zebra-zd421-cancel-button-not-working-zd620-error-light", 
    "bixolon-printer-overheating", 
    "niimbot-app-crashing-sync-errors-permissions-fix", 
    "uninstall-hp-smart-app-without-breaking-printer", 
    "dymo-labelwriter-4xl-5xl-setup-driver-guide"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  console.log(`Found ${articles.length} articles to update.`);

  const updates = articles.map(article => {
    const originalWordCount = (article.content || '').split(/\s+/).length;
    const newContent = processHtml(article.content || '');
    const newWordCount = newContent.split(/\s+/).length;
    
    return prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    }).then(() => {
      console.log(`Updated ${article.slug}: ${originalWordCount} words -> ${newWordCount} words`);
    });
  });

  await Promise.all(updates);
  console.log("All articles updated successfully.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
