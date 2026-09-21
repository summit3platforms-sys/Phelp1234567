import { prisma } from '../src/lib/prisma';

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
};

function splitLongSentence(sentence: string): string {
  // strip tags to count words accurately
  const textOnly = sentence.replace(/<[^>]*>/g, ' ');
  const words = textOnly.trim().split(/\s+/);
  if (words.length <= 20) return sentence;

  // Try to split at commas or conjunctions near the middle
  const splitPoints = [', and ', ', but ', ' because ', ', which '];
  for (const point of splitPoints) {
    const idx = sentence.indexOf(point);
    if (idx > 0 && idx < sentence.length - 10) {
      if (point === ', and ') return sentence.substring(0, idx) + '. ' + sentence.substring(idx + 6).charAt(0).toUpperCase() + sentence.substring(idx + 7);
      if (point === ', but ') return sentence.substring(0, idx) + '. ' + sentence.substring(idx + 6).charAt(0).toUpperCase() + sentence.substring(idx + 7);
      if (point === ' because ') return sentence.substring(0, idx) + '. This happens because ' + sentence.substring(idx + 9);
      if (point === ', which ') return sentence.substring(0, idx) + '. This ' + sentence.substring(idx + 8);
    }
  }

  // Fallback: split at first ' and ' after 10th word
  const match = sentence.match(/(.*?)( and )(.*)/);
  if (match && match[1].split(/\s+/).length > 8) {
    return match[1] + '. ' + match[3].charAt(0).toUpperCase() + match[3].substring(1);
  }
  
  return sentence;
}

function processContent(html: string): string {
  let processed = html;
  // Replace jargon (case insensitive for some, exact for others)
  for (const [key, val] of Object.entries(jargonMap)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    processed = processed.replace(regex, (match) => {
      // maintain capitalization for first letter
      if (match.charAt(0) === match.charAt(0).toUpperCase()) {
         return val.charAt(0).toUpperCase() + val.slice(1);
      }
      return val;
    });
  }

  // Very basic sentence splitter inside paragraph/li tags
  // We don't want to mess up HTML tags, so we'll carefully split text nodes
  // A simple hack: split by ". " and process.
  let finalHtml = "";
  const blocks = processed.split(/(<\/?p>|<\/?li>|<\/?h[1-6]>)/);
  
  for (let block of blocks) {
    if (block.startsWith('<') || block.trim().length === 0) {
      finalHtml += block;
      continue;
    }
    const sentences = block.split(/\. /);
    const newSentences = sentences.map(s => {
      let updated = splitLongSentence(s);
      return updated;
    });
    finalHtml += newSentences.join('. ');
  }

  // Fix Action verbs (Just some hardcoded replacements for openers)
  finalHtml = finalHtml.replace(/You should open/gi, 'Open');
  finalHtml = finalHtml.replace(/You can click/gi, 'Click');
  finalHtml = finalHtml.replace(/It is recommended to check/gi, 'Check');
  finalHtml = finalHtml.replace(/Please make sure/gi, 'Make sure');

  return finalHtml;
}

async function main() {
  const slugs = [
    "hp-smart-tank-720-ink-not-flowing",
    "dymo-discontinued-400-turbo-se450-wireless-setup",
    "hp-printer-error-0xc19a0003-problem-with-printhead",
    "zebra-label-roll-guides-fanfold-linerless-printing-setup",
    "epson-l3250-red-light-blinking-fix"
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  console.log(`Found ${articles.length} articles to process.`);

  const updatePromises = articles.map(async (article) => {
    const beforeWords = article.content.replace(/<[^>]*>/g, ' ').split(/\s+/).length;
    const newContent = processContent(article.content);
    const afterWords = newContent.replace(/<[^>]*>/g, ' ').split(/\s+/).length;

    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });

    console.log(`Updated ${article.slug}: ${beforeWords} words -> ${afterWords} words`);
  });

  await Promise.all(updatePromises);
  console.log('Batch update complete!');
}

main().catch(console.error);
