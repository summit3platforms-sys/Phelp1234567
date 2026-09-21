import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

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
  "You need to open": "Open",
  "Please click": "Click",
  "You should click": "Click",
  "You will need to press": "Press",
  "You should check": "Check",
  "Make sure that you": "Make sure"
};

function processText(text: string): string {
  let newText = text;
  
  // Replace jargon and wordy openers
  for (const [jargon, replacement] of Object.entries(jargonMap)) {
    const regex = new RegExp("\\b" + jargon + "\\b", "gi");
    // Special handling for case preservation on the first letter would be nice, but straightforward replace is okay for now.
    newText = newText.replace(regex, replacement);
  }
  
  // Split long sentences
  const sentences = newText.match(/[^.!?]+[.!?]+/g) || [newText];
  const processedSentences = sentences.map(sentence => {
    const words = sentence.trim().split(/\s+/);
    if (words.length > 20) {
      // Splitters
      const splitters = [", and ", " and ", ", but ", " but ", ", which ", ", because ", " because "];
      for (const splitter of splitters) {
        if (sentence.includes(splitter)) {
          const parts = sentence.split(splitter);
          if (parts.length === 2 && parts[0].split(/\s+/).length > 5 && parts[1].split(/\s+/).length > 5) {
            let part2 = parts[1].trim();
            if (part2) {
              part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
            }
            return parts[0] + ". " + part2;
          }
        }
      }
      
      // Fallback: split by comma
      if (sentence.includes(", ")) {
         const parts = sentence.split(", ");
         if (parts.length >= 2) {
            let part2 = parts.slice(1).join(", ").trim();
            part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
            return parts[0] + ". " + part2;
         }
      }
    }
    return sentence;
  });
  
  return processedSentences.join(" ");
}

function rewriteHtml(html: string): string {
  const $ = cheerio.load(html, null, false);
  
  function walk(node: any) {
    if (node.type === 'text') {
      node.data = processText(node.data);
    } else if (node.children) {
      node.children.forEach(walk);
    }
  }
  
  $.root().children().each((i, el) => walk(el));
  return $.html();
}

function getWordCount(html: string): number {
  const $ = cheerio.load(html);
  const text = $.text();
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

async function main() {
  const slugs = [
    "zebra-sd-darkness-mf-label-length-commands-explained",
    "seiko-slp-650-vs-650se-slp-620-differences-setup",
    "bixolon-srp-275iii-not-printing",
    "bixolon-printer-stuck-on-yellow-light",
    "seiko-slp-legacy-support-windows-7-mac-compatibility"
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  console.log(`Found ${articles.length} articles to update.`);

  const updatePromises = articles.map(async (article) => {
    const beforeHtml = article.content || '';
    const beforeCount = getWordCount(beforeHtml);
    
    const afterHtml = rewriteHtml(beforeHtml);
    const afterCount = getWordCount(afterHtml);

    const updated = await prisma.article.update({
      where: { id: article.id },
      data: { 
        content: afterHtml,
        wordCount: afterCount
      }
    });

    return {
      slug: article.slug,
      beforeCount,
      afterCount
    };
  });

  const results = await Promise.all(updatePromises);

  results.forEach(res => {
    console.log(`Updated ${res.slug} | Words: ${res.beforeCount} -> ${res.afterCount}`);
  });

  console.log("Success: All articles updated with concurrent Promise.all().");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
