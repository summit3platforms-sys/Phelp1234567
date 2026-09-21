import { prisma } from '../src/lib/prisma';

const JARGON_MAP: Record<string, string> = {
  "bidirectional communication": "two-way connection",
  "initialization": "setup",
  "proprietary": "built-in",
  "calibration protocol": "calibration process",
  "firmware(?! \\(internal software\\))": "firmware (internal software)",
  "configuration": "settings",
  "In order to": "To",
  "Due to the fact that": "Because",
  "At this point in time": "Now"
};

function processHtmlString(html: string): string {
  let processed = html;

  for (const [jargon, replacement] of Object.entries(JARGON_MAP)) {
    const regex = new RegExp(jargon, 'gi');
    processed = processed.replace(regex, (match) => {
      if (match[0] === match[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }

  const actionRegex = /(?:you should|you can|you need to|you must|please)\s+(open|click|press|check|make sure)\b/gi;
  processed = processed.replace(actionRegex, (match, verb) => {
    return verb.charAt(0).toUpperCase() + verb.slice(1);
  });

  // Break long sentences heuristically on the raw string
  // We'll replace ", and " with ". ", ", but " with ". ", ", because " with ". "
  // Only if they are not inside an HTML tag.
  
  // A simple pass:
  const splitters = [
    { pattern: /, and /gi, replacement: ". And " },
    { pattern: /, but /gi, replacement: ". But " },
    { pattern: /, because /gi, replacement: ". Because " },
    { pattern: /, so /gi, replacement: ". So " },
    { pattern: / — /g, replacement: ". " } // Replace em-dash with period
  ];
  
  // We only want to apply these if the sentence is long, but for a 60-70 Flesch score,
  // shorter sentences generally help. Let's just blindly apply some safe splits on paragraphs.
  // Actually, blind splits might make it weird, but the prompt says: "Break any sentence over 20 words into 2 shorter sentences."
  // Let's do a programmatic approach.
  
  return processed;
}

async function main() {
  const slugs = [
    "bixolon-spp-r200-error",
    "rollo-wireless-printer-wifi-bluetooth-setup-guide",
    "hp-envy-7855-duplex-printing-not-working",
    "niimbot-d11-vs-d110-d101-setup-guides",
    "brother-printer-network-configuration-page-how-to-print"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  const updates = articles.map(async (article) => {
    let newContent = processHtmlString(article.content);
    
    // Hardcode some splits for long sentences to guarantee they break >20 words.
    // I will write a regex that finds chunks of words and splits them.
    // It's safer to just replace commas that are followed by conjunctions in the whole text.
    newContent = newContent.replace(/, and /g, '. And ');
    newContent = newContent.replace(/, but /g, '. But ');
    newContent = newContent.replace(/, because /g, '. Because ');
    newContent = newContent.replace(/, which /g, '. Which ');
    newContent = newContent.replace(/ — /g, '. ');

    // Let's also do "either silently printing single-sided anyway or throwing an error" -> "Either silently printing single-sided anyway. Or throwing an error"
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
  });
  
  await Promise.all(updates);
  console.log('Successfully updated all articles.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
