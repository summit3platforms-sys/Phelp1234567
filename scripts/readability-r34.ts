import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

const slugs = [
  "kodak-verite-printer-troubleshooting-offline-setup",
  "phomemo-m08f-tattoo-stencil-m832-letter-size-paper-guide",
  "hp-printer-paper-curling-out-of-tray",
  "seiko-slp-self-test-calibration-flashing-light-error",
  "polaroid-hi-print-sticker-backing-peeling-storage-tips"
];

const jargonMap: Record<string, string> = {
  "bidirectional communication": "two-way connection",
  "initialization": "setup",
  "proprietary": "built-in",
  "calibration protocol": "calibration process",
  "firmware": "firmware (internal software)",
  "configuration": "settings",
  "In order to": "To",
  "Due to the fact that": "Because",
  "At this point in time": "Now",
  "You should open": "Open",
  "You should click": "Click",
  "You should press": "Press",
  "You should check": "Check",
  "You need to open": "Open",
  "You need to click": "Click",
  "You need to press": "Press",
  "You need to check": "Check",
  "Please open": "Open",
  "Please click": "Click",
  "Please press": "Press",
  "Please check": "Check",
  "It is recommended to open": "Open",
  "It is recommended to click": "Click",
  "It is recommended to press": "Press",
  "It is recommended to check": "Check"
};

function splitLongSentence(sentence: string): string {
  let words = sentence.split(/\s+/).filter(w => w.trim().length > 0);
  if (words.length <= 20) return sentence;
  
  let mid = Math.floor(words.length / 2);
  let splitIdx = mid;
  
  for (let i = mid - 5; i <= mid + 5; i++) {
    if (i > 0 && i < words.length - 1 && /^(and|but|or|because|which|that|,)$/i.test(words[i])) {
      splitIdx = i;
      break;
    }
  }
  
  let part1 = words.slice(0, splitIdx).join(' ').replace(/,$/, '');
  let part2 = words.slice(splitIdx).join(' ');
  
  if (/^(and|but|or|because|which|that)/i.test(part2)) {
    part2 = part2.replace(/^(and|but|or|because|which|that)\s+/i, '');
  }
  
  // capitalize part2
  part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
  
  // Add a period to part1 if it doesn't have one
  if (!part1.endsWith('.')) {
    part1 += '.';
  }
  
  // recurse in case part1 or part2 is still > 20 words
  return splitLongSentence(part1) + ' ' + splitLongSentence(part2);
}

function processText(text: string): string {
  let newText = text;
  
  // Replace jargon (case insensitive for some, but let's just do a regex replace)
  for (const [key, value] of Object.entries(jargonMap)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    newText = newText.replace(regex, (match) => {
      // Preserve case if original was capitalized
      if (match[0] === match[0].toUpperCase()) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
      return value;
    });
  }

  // Basic sentence splitting using a naive regex (handles periods followed by space)
  const sentences = newText.split(/(?<=[.?!])\s+/);
  const processedSentences = sentences.map(s => {
    return splitLongSentence(s);
  });
  
  return processedSentences.join(' ');
}

function traverse(node: any, $: cheerio.CheerioAPI) {
  if (node.type === 'text') {
    const text = node.data;
    if (text.trim().length > 0) {
      node.data = processText(text);
    }
  } else if (node.type === 'tag') {
    // skip elements that shouldn't be altered
    if (node.name !== 'script' && node.name !== 'style') {
      node.children.forEach((child: any) => traverse(child, $));
    }
  }
}

async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  console.log(`Found ${articles.length} articles to process.`);

  const updates = articles.map(async (article) => {
    const beforeWords = article.content.split(/\s+/).length;
    
    const $ = cheerio.load(article.content, null, false);
    
    // Process all root nodes
    $.root()[0].children.forEach((child: any) => traverse(child, $));
    
    const newContent = $.html();
    const afterWords = newContent.split(/\s+/).length;
    
    console.log(`Article [${article.slug}]: ${beforeWords} words -> ${afterWords} words`);
    
    return prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
  });

  await Promise.all(updates);
  console.log('Update complete.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
