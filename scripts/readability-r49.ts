import { prisma } from '../src/lib/prisma';

function rewriteContent(html: string): string {
  let text = html;

  // Rule 2: Replace jargon
  text = text.replace(/bidirectional communication/gi, 'two-way connection');
  text = text.replace(/initialization/gi, 'setup');
  text = text.replace(/proprietary/gi, 'built-in');
  text = text.replace(/calibration protocol/gi, 'calibration process');
  text = text.replace(/\bfirmware\b/gi, 'firmware (internal software)');
  text = text.replace(/configuration/gi, 'settings');

  // Rule 4: Replace wordy openers
  text = text.replace(/In order to/gi, 'To');
  text = text.replace(/Due to the fact that/gi, 'Because');
  text = text.replace(/At this point in time/gi, 'Now');

  // Rule 3: Action verbs (basic heuristic for known instructional starts)
  text = text.replace(/You should open/gi, 'Open');
  text = text.replace(/You will need to click/gi, 'Click');
  text = text.replace(/It is necessary to press/gi, 'Press');
  text = text.replace(/It is recommended to check/gi, 'Check');
  text = text.replace(/Be sure to make sure/gi, 'Make sure');
  text = text.replace(/You must make sure/gi, 'Make sure');

  // Rule 1: Break sentences over 20 words.
  // We'll parse the HTML slightly to only process text nodes.
  // Since it's basic HTML, we can split by tags.
  const parts = text.split(/(<[^>]+>)/g);
  for (let i = 0; i < parts.length; i++) {
    if (!parts[i].startsWith('<') && parts[i].trim().length > 0) {
      // Split into sentences
      let sentences = parts[i].match(/[^.!?]+[.!?]+/g) || [parts[i]];
      let newSentences = [];
      for (let s of sentences) {
        let words = s.trim().split(/\s+/);
        if (words.length > 20) {
          // find a good splitting point: " and ", " but ", ", which "
          let splitMatch = s.match(/\s+(and|but|because|, which|, and|, but)\s+/i);
          if (splitMatch && splitMatch.index) {
            let firstPart = s.substring(0, splitMatch.index).trim();
            let secondPart = s.substring(splitMatch.index + splitMatch[0].length).trim();
            // capitalize second part
            secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
            // remove starting punctuation if any
            if (secondPart.startsWith('Which ')) secondPart = 'It ' + secondPart.slice(6);
            newSentences.push(`${firstPart}. ${secondPart}`);
            continue;
          }
          
          // another try: split at around middle on a comma
          let commaIdx = s.indexOf(', ', Math.floor(s.length / 3));
          if (commaIdx !== -1 && commaIdx < s.length * 0.8) {
            let firstPart = s.substring(0, commaIdx).trim();
            let secondPart = s.substring(commaIdx + 2).trim();
            secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
            newSentences.push(`${firstPart}. ${secondPart}`);
            continue;
          }
        }
        newSentences.push(s);
      }
      parts[i] = newSentences.join(' ');
    }
  }

  return parts.join('');
}

function wordCount(str: string): number {
  return str.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(w => w.length > 0).length;
}

async function main() {
  const slugs = [
    "brother-mfc-scanner-error-e52", 
    "zebra-sensor-profile-explained-cleaning-manual-calibration", 
    "dascom-tractor-feed-paper-jam-alignment", 
    "hp-utility-not-opening-mac", 
    "fix-xerox-041-042-053-codes-fuser-transfer-belt-errors"
  ];
  
  const updates = await Promise.all(slugs.map(async (slug) => {
    const article = await prisma.article.findUnique({ where: { slug } });
    if (!article) return null;
    
    const beforeCount = wordCount(article.content);
    const newContent = rewriteContent(article.content);
    const afterCount = wordCount(newContent);
    
    await prisma.article.update({
      where: { slug },
      data: { content: newContent }
    });
    
    return { slug, beforeCount, afterCount };
  }));

  console.log("Update Results:");
  updates.forEach(u => {
    if (u) {
      console.log(`- ${u.slug}: ${u.beforeCount} words -> ${u.afterCount} words`);
    }
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
