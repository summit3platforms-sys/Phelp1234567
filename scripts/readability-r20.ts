import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

const JARGON_MAP: Record<string, string> = {
  "bidirectional communication": "two-way connection",
  "initialization": "setup",
  "proprietary": "built-in",
  "calibration protocol": "calibration process",
  "firmware": "firmware (internal software)",
  "configuration": "settings",
  "In order to": "To",
  "Due to the fact that": "Because",
  "At this point in time": "Now"
};

function rewriteText(text: string): string {
  let result = text;
  
  // Replace wordy openers & jargon
  for (const [jargon, replacement] of Object.entries(JARGON_MAP)) {
    const regex = new RegExp(`\\b${jargon}\\b`, 'gi');
    result = result.replace(regex, (match) => {
      // basic case preservation
      if (match === match.toUpperCase()) {
        return replacement.toUpperCase();
      }
      if (match[0] === match[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      // If it's something like "In order to", the replacement is "To". 
      // If match is "in order to", return "to"
      if (jargon.toLowerCase() === "in order to" && match[0] === match[0].toLowerCase()) {
        return replacement.toLowerCase();
      }
      if (jargon.toLowerCase() === "due to the fact that" && match[0] === match[0].toLowerCase()) {
         return replacement.toLowerCase();
      }
      if (jargon.toLowerCase() === "at this point in time" && match[0] === match[0].toLowerCase()) {
         return replacement.toLowerCase();
      }
      return replacement;
    });
  }

  // Active voice conversions
  result = result.replace(/\b(You should open|Please open|It is necessary to open)\b/gi, "Open");
  result = result.replace(/\b(You should click|Please click|It is necessary to click)\b/gi, "Click");
  result = result.replace(/\b(You should press|Please press|It is necessary to press)\b/gi, "Press");
  result = result.replace(/\b(You should check|Please check|It is necessary to check)\b/gi, "Check");
  result = result.replace(/\b(You must make sure|Please make sure|It is necessary to make sure)\b/gi, "Make sure");

  // A basic sentence splitter logic
  // Split by common punctuation ending a sentence followed by space.
  const sentenceRegex = /([^.?!]+[.?!]+(?:\s+|$))/g;
  let sentences = [];
  let match;
  let lastIndex = 0;
  while ((match = sentenceRegex.exec(result)) !== null) {
      sentences.push(match[1]);
      lastIndex = sentenceRegex.lastIndex;
  }
  
  if (lastIndex < result.length) {
      sentences.push(result.substring(lastIndex));
  }
  
  if (sentences.length === 0) {
      sentences = [result];
  }

  let finalSentences = sentences.map(sentence => {
      // don't touch if very short or no text
      if (sentence.trim().length === 0) return sentence;
      
      const words = sentence.trim().split(/\s+/);
      if (words.length > 20) {
          const mid = Math.floor(words.length / 2);
          const firstPart = words.slice(0, mid).join(" ");
          const secondPart = words.slice(mid).join(" ");
          
          const cleanFirst = firstPart.replace(/[,;:]$/, '');
          const cleanSecond = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
          
          // Preserve trailing space if it was there
          const trailingSpaceMatch = sentence.match(/\s+$/);
          const trailingSpace = trailingSpaceMatch ? trailingSpaceMatch[0] : "";
          
          return `${cleanFirst}. ${cleanSecond}${trailingSpace}`;
      }
      return sentence;
  });

  return finalSentences.join("");
}

function processNode(node: any) {
  if (node.type === 'text') {
    if (node.data && node.data.trim().length > 0) {
      node.data = rewriteText(node.data);
    }
  } else if (node.children) {
    node.children.forEach(processNode);
  }
}

async function main() {
  const slugs = [
    "pantum-cartridge-errors-anti-counterfeit-door-latch-refill",
    "phomemo-printer-wont-connect-bluetooth-app-cant-find",
    "hp-printer-fax-error-no-dial-tone",
    "hp-deskjet-4155e-wifi-setup-guide",
    "niimbot-general-setup-factory-reset-cables-business-pricing"
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  if (articles.length === 0) {
    console.log("No articles found");
    return;
  }

  const updatePromises = articles.map(async (article) => {
    const beforeWords = article.content.split(/\s+/).length;
    
    // load html with cheerio
    const $ = cheerio.load(article.content, null, false);
    
    $.root().contents().each((i, el) => {
      processNode(el);
    });

    const newContent = $.html();
    const afterWords = newContent.split(/\s+/).length;

    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });

    console.log(`Updated ${article.slug}: ${beforeWords} words -> ${afterWords} words`);
  });

  await Promise.all(updatePromises);
}

main().catch(console.error).finally(() => prisma.$disconnect());
