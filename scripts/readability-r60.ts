import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

function splitLongSentences(text: string): string {
  const sentenceRegex = /([^.!?]+[.!?]+)(\s*)/g;
  let result = '';
  let lastIndex = 0;
  
  let match;
  while ((match = sentenceRegex.exec(text)) !== null) {
    let sentence = match[1];
    let trailingSpace = match[2];
    
    let words = sentence.trim().split(/\s+/);
    if (words.length > 20) {
      const splitPointRegex = /(,\s*and\s+|\s+and\s+|,?\s*but\s+|,?\s*so\s+|,?\s*which\s+|,\s*)/i;
      
      let parts = sentence.split(splitPointRegex);
      if (parts.length >= 3) {
        let currentWordCount = 0;
        let splitIndex = -1;
        
        for (let i = 0; i < parts.length; i += 2) {
          currentWordCount += parts[i].trim().split(/\s+/).length;
          if (currentWordCount >= 8 && currentWordCount <= words.length - 5) {
            splitIndex = i + 1; 
            break;
          }
        }
        
        if (splitIndex !== -1) {
          let firstHalf = parts.slice(0, splitIndex).join('');
          let rest = parts.slice(splitIndex + 1).join('');
          
          let newSentenceStart = rest.trim();
          if (newSentenceStart.length > 0) {
             newSentenceStart = newSentenceStart.charAt(0).toUpperCase() + newSentenceStart.slice(1);
          }
          
          sentence = firstHalf.replace(/,?\s*$/, '') + '. ' + newSentenceStart;
        }
      }
    }
    result += sentence + trailingSpace;
    lastIndex = sentenceRegex.lastIndex;
  }
  
  result += text.slice(lastIndex);
  return result;
}

function processText(text: string): string {
  let modified = text;
  
  modified = modified.replace(/In order to/gi, "To");
  modified = modified.replace(/Due to the fact that/gi, "Because");
  modified = modified.replace(/At this point in time/gi, "Now");
  
  modified = modified.replace(/bidirectional communication/gi, "two-way connection");
  modified = modified.replace(/initialization/gi, "setup");
  modified = modified.replace(/proprietary/gi, "built-in");
  modified = modified.replace(/calibration protocol/gi, "calibration process");
  modified = modified.replace(/\bfirmware(?!\s*\(internal software\))\b/gi, "firmware (internal software)");
  modified = modified.replace(/configuration/gi, "settings");

  modified = modified.replace(/You should (open|click|press|check|make sure)/gi, (match, p1) => p1.charAt(0).toUpperCase() + p1.slice(1));
  modified = modified.replace(/You need to (open|click|press|check|make sure)/gi, (match, p1) => p1.charAt(0).toUpperCase() + p1.slice(1));
  modified = modified.replace(/You must (open|click|press|check|make sure)/gi, (match, p1) => p1.charAt(0).toUpperCase() + p1.slice(1));
  modified = modified.replace(/It is recommended to (open|click|press|check|make sure)/gi, (match, p1) => p1.charAt(0).toUpperCase() + p1.slice(1));
  
  modified = splitLongSentences(modified);
  
  return modified;
}

async function main() {
  const slugs = [
    "primera-bravo-se-vs-pro-firmware-update-failed-signature-composer",
    "hp-sprocket-vs-instax-mini-link-comparison",
    "kodak-easyshare-printer-dock-series-3-troubleshooting",
    "dymo-labelwriter-550-not-printing-power-adapter",
    "epson-controller-error-printer-fix"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(article => {
    const originalWordCount = article.content.split(/\s+/).length;
    
    // Disable cheerio wrapper on the root to avoid modifying html structure
    const $ = cheerio.load(article.content, null, false);
    
    function traverse(node: any) {
      if (node.type === 'text') {
        node.data = processText(node.data);
      } else if (node.type === 'tag' || node.type === 'root') {
        if (node.name !== 'script' && node.name !== 'style') {
          if (node.children) {
            node.children.forEach(traverse);
          }
        }
      }
    }
    
    // $.root()[0].children might be the way to get children
    if ($.root()[0] && $.root()[0].children) {
      $.root()[0].children.forEach(traverse);
    }
    
    let newContent = $.html();
    const newWordCount = newContent.split(/\s+/).length;
    
    console.log(`Slug: ${article.slug}`);
    console.log(`Original words: ${originalWordCount}`);
    console.log(`New words: ${newWordCount}`);
    console.log('---');
    
    return prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
  });

  await Promise.all(updates);
  console.log('All articles updated successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
