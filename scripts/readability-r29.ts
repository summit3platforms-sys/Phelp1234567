import { prisma } from '../src/lib/prisma';

const JARGON_MAP = {
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

function processText(html: string): string {
  let processed = html;

  // Replace jargon
  for (const [jargon, plain] of Object.entries(JARGON_MAP)) {
    const regex = new RegExp(jargon, 'gi');
    processed = processed.replace(regex, plain);
  }

  const tokens = processed.split(/(<[^>]+>)/g);
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].startsWith('<')) continue;
    
    let text = tokens[i];
    
    // Fix wordy openers
    text = text.replace(/In order to/gi, "To");
    text = text.replace(/Due to the fact that/gi, "Because");
    text = text.replace(/At this point in time/gi, "Now");
    
    // Replace action verbs where possible (just an approximation by simple regex mapping some common cases, though instructions say "Start sentences with action verbs where possible: Open, Click, Press, Check, Make sure".)
    text = text.replace(/You should open/gi, "Open");
    text = text.replace(/You should click/gi, "Click");
    text = text.replace(/You should press/gi, "Press");
    text = text.replace(/You should check/gi, "Check");
    text = text.replace(/You should make sure/gi, "Make sure");
    text = text.replace(/Please open/gi, "Open");
    text = text.replace(/Please click/gi, "Click");
    text = text.replace(/Please press/gi, "Press");
    text = text.replace(/Please check/gi, "Check");
    text = text.replace(/Please make sure/gi, "Make sure");

    // Split sentences > 20 words
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const newSentences = sentences.map(sentence => {
      const words = sentence.trim().split(/\s+/);
      if (words.length > 20) {
        const mid = Math.floor(words.length / 2);
        for (let j = mid - 5; j <= mid + 5; j++) {
          if (j > 0 && j < words.length - 1) {
            const word = words[j];
            if (word.endsWith(',') || ['and', 'but', 'or', 'so', 'because', 'which'].includes(word.toLowerCase())) {
              let p1, p2;
              if (word.endsWith(',')) {
                 p1 = words.slice(0, j + 1).join(' ').replace(/,$/, '.');
                 p2 = words.slice(j + 1).join(' ');
              } else {
                 p1 = words.slice(0, j).join(' ') + '.';
                 p2 = words.slice(j + 1).join(' ');
              }
              if (p2) p2 = p2.charAt(0).toUpperCase() + p2.slice(1);
              return p1 + ' ' + p2;
            }
          }
        }
        const p1 = words.slice(0, 15).join(' ') + '.';
        let p2 = words.slice(15).join(' ');
        if (p2) p2 = p2.charAt(0).toUpperCase() + p2.slice(1);
        return p1 + ' ' + p2;
      }
      return sentence;
    });
    
    tokens[i] = newSentences.join(' ');
  }
  
  return tokens.join('');
}

async function main() {
  const slugs = [
    "phomemo-printer-feeds-prints-blank-paper-orientation",
    "zebra-zpl-vs-epl-difference-configuration-format-guide",
    "hp-laserjet-m15w-fuser-error",
    "hp-laserjet-pro-m15w-fuser-error",
    "canon-print-app-not-detecting-printer",
    "hp-laserjet-m111w-offline-fix"
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(article => {
    const beforeWords = article.content.split(/\s+/).length;
    const newContent = processText(article.content);
    const afterWords = newContent.split(/\s+/).length;
    console.log(`[${article.slug}] Words: ${beforeWords} -> ${afterWords}`);
    return prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
  });

  await Promise.all(updates);
  console.log("All articles updated successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
