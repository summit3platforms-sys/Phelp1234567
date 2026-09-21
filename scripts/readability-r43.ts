import { prisma } from '../src/lib/prisma';

function processText(text: string) {
  const sentenceRegex = /([^.!?]+[.!?]+)(\s+|$)/g;
  let newText = '';
  let lastIndex = 0;
  
  let match;
  while ((match = sentenceRegex.exec(text)) !== null) {
    let before = text.substring(lastIndex, match.index);
    newText += before;
    
    let s = match[1];
    let trailing = match[2];
    
    let words = s.trim().split(/\s+/);
    // Keep splitting while the sentence is > 20 words
    // Actually, splitting once usually makes it < 20 or close enough.
    if (words.length > 20) {
      let splitIdx = -1;
      let mid = Math.floor(words.length / 2);
      for (let offset = 0; offset < mid; offset++) {
        for (let sign of [1, -1]) {
           let idx = mid + (offset * sign);
           if (idx > 5 && idx < words.length - 5) {
             let w = words[idx].toLowerCase().trim();
             if (['and', 'but', 'or', 'so', 'because', 'although', 'while'].includes(w) || w.endsWith(',')) {
               splitIdx = idx;
               break;
             }
           }
        }
        if (splitIdx !== -1) break;
      }
      
      if (splitIdx !== -1) {
        let splitWord = words[splitIdx];
        let part1 = words.slice(0, splitIdx).join(' ');
        let part2 = words.slice(splitIdx + 1).join(' ');
        
        if (splitWord.endsWith(',')) {
           part1 += splitWord.slice(0, -1) + '.';
        } else {
           part1 += '.';
        }
        
        part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
        s = part1 + ' ' + part2;
      }
    }
    newText += s + trailing;
    lastIndex = sentenceRegex.lastIndex;
  }
  newText += text.substring(lastIndex);
  
  // Wordy openers
  newText = newText.replace(/\bIn order to\b/g, "To");
  newText = newText.replace(/\bIn order to\b/gi, "To");
  newText = newText.replace(/\bdue to the fact that\b/gi, "because");
  newText = newText.replace(/\bDue to the fact that\b/gi, "Because");
  newText = newText.replace(/\bAt this point in time\b/gi, "Now");
  
  // Jargon
  newText = newText.replace(/\bbidirectional communication\b/gi, "two-way connection");
  newText = newText.replace(/\binitialization\b/gi, "setup");
  newText = newText.replace(/\bproprietary\b/gi, "built-in");
  newText = newText.replace(/\bcalibration protocol\b/gi, "calibration process");
  newText = newText.replace(/\bfirmware\b/gi, "firmware (internal software)");
  newText = newText.replace(/\bconfiguration\b/gi, "settings");

  // Action verbs
  newText = newText.replace(/\bYou should open\b/gi, "Open");
  newText = newText.replace(/\bYou need to open\b/gi, "Open");
  newText = newText.replace(/\bUsers must click\b/gi, "Click");
  newText = newText.replace(/\bIt is necessary to press\b/gi, "Press");
  newText = newText.replace(/\bYou must press\b/gi, "Press");
  newText = newText.replace(/\bYou need to check\b/gi, "Check");
  newText = newText.replace(/\bYou should check\b/gi, "Check");
  newText = newText.replace(/\bIt is important to check\b/gi, "Check");
  newText = newText.replace(/\bIt is recommended to check\b/gi, "Check");
  newText = newText.replace(/\bYou must ensure\b/gi, "Make sure");
  newText = newText.replace(/\bPlease make sure\b/gi, "Make sure");

  return newText;
}

function processHtml(html: string) {
  const parts = html.split(/(<[^>]*>)/);
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      parts[i] = processText(parts[i]);
    }
  }
  return parts.join('');
}

function countWords(str: string) {
  // Strip HTML to count words
  const text = str.replace(/<[^>]*>/g, ' ');
  return (text.match(/\b\w+\b/g) || []).length;
}

async function main() {
  const slugs = [
    "fix-seiko-label-printer-feed-errors-faded-print-loading-jams",
    "fix-lexmark-tray-gears-duplex-jams-error-943",
    "hp-officejet-200-mobile-printer-not-charging",
    "zebra-printer-wont-calibrate-labels-gap-not-detected-fix",
    "canon-pixma-ts6420-error-code"
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(async (article) => {
    const beforeCount = countWords(article.content);
    const newContent = processHtml(article.content);
    const afterCount = countWords(newContent);
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
    
    return {
      slug: article.slug,
      before: beforeCount,
      after: afterCount
    };
  });

  const results = await Promise.all(updates);
  
  console.log("Update Results:");
  results.forEach(r => {
    console.log(`- ${r.slug}: ${r.before} words -> ${r.after} words`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
