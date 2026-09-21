import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';
import nlp from 'compromise';

const prisma = new PrismaClient();

const jargonMap: Record<string, string> = {
  "bidirectional communication": "two-way connection",
  "initialization": "setup",
  "proprietary": "built-in",
  "calibration protocol": "calibration process",
  "firmware": "firmware (internal software)",
  "configuration": "settings",
};

const openersMap: Record<string, string> = {
  "in order to": "to",
  "due to the fact that": "because",
  "at this point in time": "now"
};

const actionMap: Record<string, string> = {
  "you should open": "open",
  "you need to click": "click",
  "you must press": "press",
  "it is important to check": "check",
  "you should check": "check",
  "make sure that": "make sure"
};

function processText(text: string): string {
  let modified = text;

  // Replace jargon (case-insensitive, preserving case roughly if we want, but lowercase is mostly fine for these in middle of sentences)
  for (const [jargon, replacement] of Object.entries(jargonMap)) {
    const regex = new RegExp(`\\b${jargon}\\b`, 'gi');
    modified = modified.replace(regex, (match) => {
      if (match[0] === match[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }

  // Replace openers
  for (const [opener, replacement] of Object.entries(openersMap)) {
    const regex = new RegExp(`\\b${opener}\\b`, 'gi');
    modified = modified.replace(regex, (match) => {
      if (match[0] === match[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }

  // Replace action phrases
  for (const [phrase, replacement] of Object.entries(actionMap)) {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    modified = modified.replace(regex, (match) => {
      if (match[0] === match[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }

  // Break long sentences (>20 words)
  let doc = nlp(modified);
  let sentences = doc.sentences().out('array');
  
  let newSentences: string[] = [];
  
  for (let sentence of sentences) {
    let words = sentence.split(/\s+/);
    if (words.length > 20) {
      // try to split at a conjunction
      const splitters = [", and ", ", but ", " because ", " therefore ", ", so ", " and "];
      let splitted = false;
      for (const splitter of splitters) {
        let index = sentence.toLowerCase().indexOf(splitter);
        if (index > 10 && index < sentence.length - 10) {
          let part1 = sentence.substring(0, index).trim();
          // if part1 ends with comma, remove it
          if (part1.endsWith(',')) part1 = part1.slice(0, -1);
          part1 += ".";
          
          let part2Str = sentence.substring(index + splitter.length).trim();
          let part2 = part2Str.charAt(0).toUpperCase() + part2Str.slice(1);
          
          newSentences.push(part1);
          newSentences.push(part2);
          splitted = true;
          break;
        }
      }
      if (!splitted) {
        newSentences.push(sentence);
      }
    } else {
      newSentences.push(sentence);
    }
  }

  return newSentences.join(' ');
}

async function main() {
  const slugs = [
    "bixolon-printer-self-test",
    "bixolon-printer-showing-offline",
    "phomemo-printer-connected-wont-print-app-crashing-fix",
    "epson-printer-beeping-and-blinking",
    "kodak-step-printer-orange-light-flashing"
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  console.log(`Found ${articles.length} articles.`);

  const updatePromises = articles.map(async (article) => {
    const originalWordCount = article.content.split(/\s+/).length;
    
    const $ = cheerio.load(article.content, null, false);
    
    // Iterate over all text nodes
    function traverse(node: any) {
      if (node.type === 'text') {
        const trimmed = node.data.trim();
        if (trimmed.length > 0) {
          // Process text, preserving surrounding whitespace
          const leadingSpace = node.data.match(/^\s*/)?.[0] || '';
          const trailingSpace = node.data.match(/\s*$/)?.[0] || '';
          const processed = processText(trimmed);
          node.data = leadingSpace + processed + trailingSpace;
        }
      } else if (node.type === 'tag' && node.name !== 'script' && node.name !== 'style') {
        for (const child of node.childNodes) {
          traverse(child);
        }
      }
    }

    $.root().contents().each((_, el) => traverse(el));
    
    const newContent = $.html();
    const newWordCount = newContent.split(/\s+/).length;

    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });

    console.log(`Updated ${article.slug}: ${originalWordCount} words -> ${newWordCount} words.`);
  });

  await Promise.all(updatePromises);
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
