import { prisma } from '../src/lib/prisma';

const slugs = [
  "fix-xerox-077-finisher-errors-stapler-jams-sorter-faults",
  "instax-mini-link-2-flashing-light-meanings-diagnostic-guide",
  "hp-envy-4520-print-quality-lines",
  "nelko-printer-wont-turn-on-wont-charge-fast-charger-fix",
  "kodak-printer-driver-unavailable-fix"
];

function processHTML(html: string): string {
  // Replace jargon
  let text = html
    .replace(/\bbidirectional communication\b/gi, "two-way connection")
    .replace(/\binitialization\b/gi, "setup")
    .replace(/\bproprietary\b/gi, "built-in")
    .replace(/\bcalibration protocol\b/gi, "calibration process")
    .replace(/\bfirmware\b/gi, "firmware (internal software)")
    .replace(/\bconfiguration\b/gi, "settings")
    .replace(/\bIn order to\b/gi, "To")
    .replace(/\bDue to the fact that\b/gi, "Because")
    .replace(/\bAt this point in time\b/gi, "Now")
    .replace(/\bYou should open\b/gi, "Open")
    .replace(/\bYou should click\b/gi, "Click")
    .replace(/\bYou should press\b/gi, "Press")
    .replace(/\bYou should check\b/gi, "Check")
    .replace(/\bYou should make sure\b/gi, "Make sure")
    .replace(/\bYou need to open\b/gi, "Open")
    .replace(/\bYou need to click\b/gi, "Click")
    .replace(/\bIt is important to check\b/gi, "Check")
    .replace(/\bIt is recommended to\b/gi, "We recommend")
    .replace(/\bEnsure that you\b/gi, "Make sure to");

  // We need a smart way to break sentences > 20 words.
  // Let's use a regex that matches text outside of HTML tags.
  // A simple way is to match text nodes.
  const parts = text.split(/(<[^>]+>)/g);
  
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0 && parts[i].trim().length > 0) {
      // This is text.
      // Split into sentences.
      const sentenceRegex = /([^\.?!]+[\.?!]+)(?=\s|$)/g;
      parts[i] = parts[i].replace(sentenceRegex, (sentence) => {
        let words = sentence.trim().split(/\s+/);
        if (words.length > 20) {
          let splitIndex = -1;
          for (let j = 10; j < words.length - 5; j++) {
            let w = words[j].toLowerCase();
            if (w === 'and' || w === 'but' || w === 'or' || w.endsWith(',') || w.endsWith(';')) {
              splitIndex = j;
              break;
            }
          }
          if (splitIndex !== -1) {
            let w = words[splitIndex];
            if (w.endsWith(',') || w.endsWith(';')) {
              words[splitIndex] = w.slice(0, -1) + '.';
              if (words[splitIndex + 1]) {
                words[splitIndex + 1] = words[splitIndex + 1].charAt(0).toUpperCase() + words[splitIndex + 1].slice(1);
              }
            } else if (w === 'and' || w === 'but' || w === 'or') {
              words[splitIndex] = '.';
              if (words[splitIndex + 1]) {
                words[splitIndex + 1] = words[splitIndex + 1].charAt(0).toUpperCase() + words[splitIndex + 1].slice(1);
              }
            }
            sentence = words.join(' ') + (sentence.endsWith(' ') ? ' ' : '');
          }
        }
        return sentence;
      });
    }
  }
  return parts.join('');
}

async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(async (article) => {
    const originalWordCount = article.content.replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(w => w.length > 0).length;
    
    const newContent = processHTML(article.content);
    const newWordCount = newContent.replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(w => w.length > 0).length;
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
    
    console.log(`Updated ${article.slug}: ${originalWordCount} words -> ${newWordCount} words`);
  });

  await Promise.all(updates);
  console.log("All articles updated successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
