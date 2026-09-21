import { prisma } from '../src/lib/prisma';

const slugs = [
  "instax-connect-ar-print-not-working-troubleshooting",
  "hp-printer-driver-not-installing",
  "instax-link-app-crashing-compatibility-permissions-fix",
  "hp-laserjet-tank-mfp-setup-problems-solved",
  "how-to-reset-a-bixolon-printer"
];

const jargonMap: Record<string, string> = {
  "bidirectional communication": "two-way connection",
  "initialization": "setup",
  "proprietary": "built-in",
  "calibration protocol": "calibration process",
  "configuration": "settings",
  "In order to": "To",
  "Due to the fact that": "Because",
  "At this point in time": "Now",
  "You should open": "Open",
  "You need to click": "Click",
  "It is recommended to press": "Press",
  "You must check": "Check",
  "Please make sure": "Make sure"
};

function processHtml(html: string): string {
  let processed = html;

  // Replace jargon and openers
  for (const [jargon, replacement] of Object.entries(jargonMap)) {
    const regex = new RegExp(`\\b${jargon}\\b`, 'gi');
    processed = processed.replace(regex, replacement);
  }

  // Handle "firmware" -> "firmware (internal software)"
  processed = processed.replace(/\bfirmware\b(?!\s*\(\s*internal software\s*\))/gi, "firmware (internal software)");

  // A basic sentence splitter: look for long sentences in plain text segments.
  // We'll split text outside of HTML tags using a replacement function.
  processed = processed.replace(/(>)([^<]+)(<)/g, (match, p1, text, p3) => {
    // text is the content between tags
    const sentenceRegex = /([^.?!]+[.?!]+(?:\s+|$))/g;
    const sentences = text.match(sentenceRegex);
    
    if (!sentences) {
      const words = text.trim().split(/\s+/);
      if (words.length > 20) {
          const mid = Math.floor(words.length / 2);
          const part1 = words.slice(0, mid).join(' ') + '.';
          let part2 = words.slice(mid).join(' ');
          part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
          return p1 + part1 + ' ' + part2 + p3;
      }
      return match;
    }

    let finalSentences = [];
    for (let sentence of sentences) {
      let s = sentence;
      const words = s.trim().split(/\s+/);
      if (words.length > 20) {
        const splitPoints = [', and ', ', but ', ', so ', ' because ', ' which ', ' although ', ' since ', ' while '];
        let split = false;
        for (const sp of splitPoints) {
          const idx = s.toLowerCase().indexOf(sp);
          if (idx > -1 && idx > 20 && (s.length - idx) > 20) {
            const part1 = s.substring(0, idx).trim() + '.';
            let part2 = s.substring(idx + sp.length).trim();
            part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
            finalSentences.push(part1 + ' ' + part2 + (s.endsWith(' ') ? ' ' : ''));
            split = true;
            break;
          }
        }
        
        if (!split) {
          const mid = Math.floor(words.length / 2);
          const part1 = words.slice(0, mid).join(' ') + '.';
          let part2 = words.slice(mid).join(' ');
          part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
          finalSentences.push(part1 + ' ' + part2 + (s.endsWith(' ') ? ' ' : ''));
        }
      } else {
        finalSentences.push(s);
      }
    }
    return p1 + finalSentences.join('') + p3;
  });

  return processed;
}

function countWords(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ');
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  const updates = articles.map(async (article) => {
    const oldContent = article.content || '';
    const oldWords = countWords(oldContent);
    const newContent = processHtml(oldContent);
    const newWords = countWords(newContent);
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
    
    return { slug: article.slug, oldWords, newWords };
  });
  
  const results = await Promise.all(updates);
  console.log("Rewrite completed successfully!");
  console.table(results);
}

main().catch(console.error).finally(() => prisma.$disconnect());
