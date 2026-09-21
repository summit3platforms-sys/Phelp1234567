import { prisma } from '../src/lib/prisma';

function rewriteHtml(html: string): string {
  // 1. Replace jargon
  let updated = html
    .replace(/bidirectional communication/gi, 'two-way connection')
    .replace(/initialization/gi, 'setup')
    .replace(/proprietary/gi, 'built-in')
    .replace(/calibration protocol/gi, 'calibration process')
    .replace(/\bfirmware(?! \(internal software\))\b/gi, 'firmware (internal software)')
    .replace(/configuration/gi, 'settings');

  // 2. Replace wordy openers
  updated = updated
    .replace(/In order to/gi, 'To')
    .replace(/Due to the fact that/gi, 'Because')
    .replace(/At this point in time/gi, 'Now');

  // 3. Start sentences with action verbs where possible
  updated = updated
    .replace(/You should open/gi, 'Open')
    .replace(/You can click/gi, 'Click')
    .replace(/You need to press/gi, 'Press')
    .replace(/You must check/gi, 'Check')
    .replace(/It is important to make sure/gi, 'Make sure')
    .replace(/Make sure to/gi, 'Make sure to')
    .replace(/We recommend that you open/gi, 'Open')
    .replace(/Simply click/gi, 'Click')
    .replace(/Please press/gi, 'Press');

  // 4. Break any sentence over 20 words into 2 shorter sentences.
  // We'll do this by processing text nodes only, preserving HTML tags.
  
  // A simple regex to find text outside of HTML tags:
  // We split the HTML into tokens of tags and text.
  const tokens = updated.split(/(<[^>]+>)/g);
  
  for (let i = 0; i < tokens.length; i++) {
    // If it's not a tag (doesn't start with <)
    if (!tokens[i].startsWith('<')) {
      // Split into sentences using a basic regex
      const sentences = tokens[i].split(/([.?!]\s+)/g);
      for (let j = 0; j < sentences.length; j++) {
        const sentence = sentences[j];
        if (!/^[.?!]\s+$/.test(sentence) && sentence.trim().length > 0) {
          const words = sentence.trim().split(/\s+/);
          if (words.length > 20) {
            // Find a good split point
            const splitWords = [" because ", " however ", " although ", " since ", ", and ", ", but ", " and ", " but "];
            let splitIndex = -1;
            let splitWordLen = 0;
            
            for (const sw of splitWords) {
              const idx = sentence.toLowerCase().indexOf(sw);
              if (idx !== -1 && idx > 20 && idx < sentence.length - 20) { // try to keep it somewhat balanced
                splitIndex = idx;
                splitWordLen = sw.length;
                break;
              }
            }
            
            if (splitIndex !== -1) {
              const part1 = sentence.substring(0, splitIndex).trim();
              let part2 = sentence.substring(splitIndex + splitWordLen).trim();
              // Capitalize part2
              part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
              sentences[j] = `${part1}. ${part2}`;
            }
          }
        }
      }
      tokens[i] = sentences.join('');
    }
  }
  
  return tokens.join('');
}

async function main() {
  const slugs = [
    "primera-printhead-life-percentage-damaged-cartridge-contacts-fix",
    "rollo-printer-wont-stop-printing-beeping-error-meanings",
    "instax-link-charging-light-led-colors-meaning",
    "tally-dascom-2800-series-setup-guide",
    "hp-sprocket-app-not-printing-fix"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(async (article) => {
    if (!article.content) return;
    
    const beforeWords = article.content.split(/\s+/).length;
    const newContent = rewriteHtml(article.content);
    const afterWords = newContent.split(/\s+/).length;
    
    console.log(`\nSlug: ${article.slug}`);
    console.log(`Word count before: ${beforeWords}`);
    console.log(`Word count after: ${afterWords}`);
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
    
    console.log(`Updated ${article.slug}`);
  });
  
  await Promise.all(updates);
  console.log('\nAll articles updated successfully!');
}

main().catch(console.error);
