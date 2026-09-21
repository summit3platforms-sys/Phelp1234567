import { prisma } from '../src/lib/prisma';

const JARGON_MAP: Record<string, string> = {
  "bidirectional communication": "two-way connection",
  "initialization": "setup",
  "proprietary": "built-in",
  "calibration protocol": "calibration process",
  "firmware": "firmware (internal software)",
  "configuration": "settings",
  "in order to": "to",
  "due to the fact that": "because",
  "at this point in time": "now"
};

function processText(text: string): string {
  let processed = text;

  // 1. Replace jargon
  for (const [jargon, replacement] of Object.entries(JARGON_MAP)) {
    const regex = new RegExp(`\\b${jargon}\\b`, 'gi');
    processed = processed.replace(regex, (match) => {
      // Don't double replace firmware
      if (jargon === 'firmware' && processed.includes('firmware (internal software)')) {
          // It's a bit risky, let's just do a negative lookahead in the regex
      }
      if (match[0] === match[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }
  
  // Fix firmware double replacement more cleanly
  processed = processed.replace(/firmware \(internal software\) \(internal software\)/gi, "firmware (internal software)");

  // 2. Action verbs
  const actionRegex = /(?:you should|you can|you need to|you must|please)\s+(open|click|press|check|make sure)\b/gi;
  processed = processed.replace(actionRegex, (match, verb) => {
    return verb.charAt(0).toUpperCase() + verb.slice(1);
  });

  // 3. Break sentences over 20 words
  // Since we are processing chunks of text between tags, some "sentences" might be split across tags.
  // But doing a heuristic split on long text nodes is often good enough for Flesch scores.
  const sentences = processed.split(/([.!?]+[\s]+)/);
  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i];
    const wordCount = s.trim().split(/\s+/).length;
    if (wordCount > 20) {
      sentences[i] = s.replace(/, (and|but|because|so) /i, (match, p1) => '. ' + p1.charAt(0).toUpperCase() + p1.slice(1) + ' ');
      if (sentences[i] === s) {
         // if no conjunction, try em-dash
         sentences[i] = s.replace(/ — /i, '. ');
      }
    }
  }
  processed = sentences.join('');

  return processed;
}

function processContent(html: string): string {
  // Wrap in a div to ensure all text is between tags
  let wrapped = `<div>${html}</div>`;
  
  // Replace firmware first to avoid regex complexities in the loop
  wrapped = wrapped.replace(/\bfirmware\b/gi, "firmware (internal software)");
  wrapped = wrapped.replace(/firmware \(internal software\) \(internal software\)/gi, "firmware (internal software)");

  // Replace text between tags
  wrapped = wrapped.replace(/>([^<]+)</g, (match, innerText) => {
    return ">" + processText(innerText) + "<";
  });

  // Unwrap
  return wrapped.slice(5, -6);
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
    const originalWordCount = article.content.split(/\s+/).length;
    
    // Process content multiple times to catch sentences that are still > 20 words
    let newContent = article.content;
    for (let i = 0; i < 2; i++) {
        newContent = processContent(newContent);
    }
    
    const newWordCount = newContent.split(/\s+/).length;
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
    
    console.log(`Updated ${article.slug}: ${originalWordCount} -> ${newWordCount} words`);
  });
  
  await Promise.all(updates);
  console.log('Successfully updated all articles.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
