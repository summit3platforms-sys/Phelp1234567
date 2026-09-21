import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

function wordCount(str: string) {
  return str.split(/\s+/).filter(w => w.length > 0).length;
}

function processText(text: string): string {
  let modified = text;
  
  modified = modified.replace(/bidirectional communication/gi, "two-way connection");
  modified = modified.replace(/initialization/gi, "setup");
  modified = modified.replace(/proprietary/gi, "built-in");
  modified = modified.replace(/calibration protocol/gi, "calibration process");
  modified = modified.replace(/\bfirmware\b/gi, "firmware (internal software)");
  modified = modified.replace(/configuration/gi, "settings");
  
  modified = modified.replace(/In order to/gi, "To");
  modified = modified.replace(/Due to the fact that/gi, "Because");
  modified = modified.replace(/At this point in time/gi, "Now");
  modified = modified.replace(/You should (open|click|press|check|make sure)/gi, "$1");
  modified = modified.replace(/You need to (open|click|press|check|make sure)/gi, "$1");
  modified = modified.replace(/It is important to (open|click|press|check|make sure)/gi, "$1");
  
  const sentenceRegex = /([^.!?]+[.!?]+)(\s*)/g;
  let result = "";
  let match;
  let lastIndex = 0;
  
  while ((match = sentenceRegex.exec(modified)) !== null) {
    let sentence = match[1];
    let trailingSpace = match[2];
    
    if (wordCount(sentence) > 20) {
      const words = sentence.trim().split(/\s+/);
      const mid = Math.floor(words.length / 2);
      let splitIndex = mid;
      
      for (let i = mid - 5; i <= mid + 5; i++) {
        if (i > 0 && i < words.length - 1) {
          const w = words[i].toLowerCase();
          if (w.endsWith(',') || w === 'and' || w === 'but' || w === 'or' || w === 'because' || w === 'which' || w === 'while') {
            splitIndex = i;
            break;
          }
        }
      }
      
      let p1 = words.slice(0, splitIndex + 1).join(' ');
      let p2 = words.slice(splitIndex + 1).join(' ');
      
      if (p1.endsWith(',')) {
        p1 = p1.slice(0, -1) + '.';
      } else if (p1.match(/\b(and|but|or|because|which|while)$/i)) {
        p1 = p1.replace(/\s*\b(and|but|or|because|which|while)$/i, '.');
      } else {
        p1 += '.';
      }
      
      p2 = p2.charAt(0).toUpperCase() + p2.slice(1);
      result += p1 + ' ' + p2 + trailingSpace;
    } else {
      result += sentence + trailingSpace;
    }
    lastIndex = sentenceRegex.lastIndex;
  }
  
  if (lastIndex < modified.length) {
    result += modified.substring(lastIndex);
  }
  
  return result;
}

async function main() {
  const slugs = [
    "hp-printer-cartridge-sensor-failure",
    "niimbot-bluetooth-connection-fails-android-gps",
    "phomemo-no-paper-light-cover-open-error-feed-calibration",
    "canon-pixma-mg3620-offline",
    "dymo-labelwriter-label-jam-removal-clean-sensor"
  ];
  
  const allArticles = await prisma.article.findMany({ select: { id: true, slug: true, content: true }});
  
  const targetArticles = allArticles.filter(a => slugs.some(s => a.slug.includes(s)));
  
  console.log("Found", targetArticles.length, "articles to process.");
  
  const updates = targetArticles.map(async (article) => {
    const beforeWords = wordCount(cheerio.load(article.content).text());
    
    const $ = cheerio.load(article.content, null, false);
    $('*').contents().each(function() {
      if (this.type === 'text') {
        this.data = processText(this.data);
      }
    });
    
    const newContent = $.html();
    const afterWords = wordCount(cheerio.load(newContent).text());
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
    
    return {
      slug: article.slug,
      beforeWords,
      afterWords
    };
  });
  
  const results = await Promise.all(updates);
  console.log("Readability Update Complete!");
  console.table(results);
}

main().catch(console.error).finally(() => prisma.$disconnect());
