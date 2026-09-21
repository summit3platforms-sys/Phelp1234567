import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

function processText(text: string): string {
  let newText = text.replace(/In order to/gi, "To")
                    .replace(/Due to the fact that/gi, "Because")
                    .replace(/At this point in time/gi, "Now");
                    
  newText = newText.replace(/bidirectional communication/gi, "two-way connection")
                   .replace(/initialization/gi, "setup")
                   .replace(/proprietary/gi, "built-in")
                   .replace(/calibration protocol/gi, "calibration process")
                   .replace(/\bfirmware\b(?! \(internal software\))/gi, "firmware (internal software)")
                   .replace(/configuration/gi, "settings");
                   
  newText = newText.replace(/You should open/gi, "Open")
                   .replace(/You need to open/gi, "Open")
                   .replace(/It is recommended to open/gi, "Open")
                   .replace(/You must click/gi, "Click")
                   .replace(/You should click/gi, "Click")
                   .replace(/You need to click/gi, "Click")
                   .replace(/Be sure to check/gi, "Check")
                   .replace(/You should check/gi, "Check")
                   .replace(/You need to check/gi, "Check")
                   .replace(/You will want to make sure/gi, "Make sure")
                   .replace(/You should make sure/gi, "Make sure")
                   .replace(/You need to make sure/gi, "Make sure")
                   .replace(/You must press/gi, "Press")
                   .replace(/You should press/gi, "Press")
                   .replace(/You need to press/gi, "Press");
                   
  const sentences = newText.split(/(?<=[.?!])\s+/);
  const processedSentences = sentences.map(sentence => {
      const words = sentence.trim().split(/\s+/);
      if (words.length > 20) {
          const mid = Math.floor(words.length / 2);
          let splitIdx = mid;
          const conjunctions = ['and', 'but', 'or', 'because', 'since', 'while', 'as', 'although'];
          for (let i = mid - 5; i <= Math.min(mid + 5, words.length - 2); i++) {
              if (i > 0 && i < words.length - 1) {
                  const wordRaw = words[i].toLowerCase().replace(/[^a-z]/g, '');
                  if (conjunctions.includes(wordRaw)) {
                      splitIdx = i;
                      break;
                  }
              }
          }
          words[splitIdx - 1] = words[splitIdx - 1].replace(/,$/, '') + '.';
          words[splitIdx] = words[splitIdx].charAt(0).toUpperCase() + words[splitIdx].slice(1);
          return words.join(' ');
      }
      return sentence;
  });
  
  return processedSentences.join(' ');
}

function processHTML(html: string): string {
  const $ = cheerio.load(html, null, false);
  function traverse(node: any) {
    if (node.type === 'text') {
      if (node.data.trim().length > 0) {
        const leadingSpace = node.data.match(/^\s*/)?.[0] || '';
        const trailingSpace = node.data.match(/\s*$/)?.[0] || '';
        const processed = processText(node.data);
        node.data = leadingSpace + processed + trailingSpace;
      }
    } else if (node.children) {
      node.children.forEach(traverse);
    }
  }
  $.root()[0].children.forEach(traverse);
  return $.html();
}

function getWordCount(html: string): parseInt {
  const $ = cheerio.load(html, null, false);
  return $.text().split(/\s+/).filter(w => w.trim().length > 0).length;
}

async function run() {
  const slugs = [
    "rollo-vs-munbyn-thermal-label-printer-comparison",
    "hp-officejet-pro-8025e-wifi-keeps-dropping",
    "hp-printer-static-ip-setup-guide",
    "nelko-app-crashing-android-14-errors-ios-updates",
    "bixolon-printer-driver-not-installing"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  const updates = articles.map(article => {
    const beforeCount = getWordCount(article.content);
    const newContent = processHTML(article.content);
    const afterCount = getWordCount(newContent);
    
    console.log(`Article: ${article.slug}`);
    console.log(`Word Count Before: ${beforeCount}`);
    console.log(`Word Count After: ${afterCount}\n`);
    
    return prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
  });
  
  await Promise.all(updates);
  console.log("All articles updated successfully.");
}

run().catch(console.error).finally(() => prisma.$disconnect());
