import { prisma } from '../src/lib/prisma';

function rewriteHtml(html: string): string {
  const parts = html.split(/(<[^>]+>)/g);
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith('<')) continue;

    // 2. Replace jargon
    let text = parts[i]
      .replace(/\bbidirectional communication\b/gi, 'two-way connection')
      .replace(/\binitialization\b/gi, 'setup')
      .replace(/\bproprietary\b/gi, 'built-in')
      .replace(/\bcalibration protocol\b/gi, 'calibration process')
      .replace(/\bfirmware\b/gi, 'firmware (internal software)')
      .replace(/\bconfiguration\b/gi, 'settings');

    // 4. Replace wordy openers
    text = text
      .replace(/\bIn order to\b/gi, 'To')
      .replace(/\bDue to the fact that\b/gi, 'Because')
      .replace(/\bAt this point in time\b/gi, 'Now');

    // 1. Break sentences over 20 words.
    // 3. Action verbs.
    const sentences = text.split(/([.?!]+(?:\s+|$))/g);
    for (let j = 0; j < sentences.length; j += 2) {
      if (!sentences[j]) continue;
      let s = sentences[j];
      let words = s.split(/\s+/).filter(w => w.trim().length > 0);
      
      // Keep breaking if still over 20 words
      let attempts = 0;
      while (words.length > 20 && attempts < 5) {
        attempts++;
        const match = s.match(/\b( and | but | because | or | as | while | although | which | since )\b/i);
        if (match) {
          const splitIdx = s.indexOf(match[0]);
          const part1 = s.slice(0, splitIdx).trim();
          let part2 = s.slice(splitIdx + match[0].length).trim();
          if (part2.length > 0) {
              part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
          }
          s = part1 + ". " + part2;
        } else {
          // split at word 10
          const word10 = words[10];
          const splitIdx = s.indexOf(word10) + word10.length;
          const part1 = s.slice(0, splitIdx).trim();
          let part2 = s.slice(splitIdx).trim();
          if (part2.length > 0) {
              part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
          }
          s = part1 + ". " + part2;
        }
        words = s.split(/\s+/).filter(w => w.trim().length > 0);
      }
      
      s = s.replace(/^\s*You should (open|click|press|check|make sure)\b/i, (m, v) => v.charAt(0).toUpperCase() + v.slice(1));
      s = s.replace(/^\s*Please (open|click|press|check|make sure)\b/i, (m, v) => v.charAt(0).toUpperCase() + v.slice(1));
      s = s.replace(/^\s*We recommend that you (open|click|press|check|make sure)\b/i, (m, v) => v.charAt(0).toUpperCase() + v.slice(1));
      
      sentences[j] = s;
    }
    parts[i] = sentences.join('');
  }
  return parts.join('');
}

async function main() {
  const slugs = ["bixolon-printer-printing-garbled-text", "hp-printer-keeps-disconnecting-from-wifi", "polaroid-hi-print-streaky-lines-wrong-colors-fix", "printer-not-printing", "kodak-scan-to-email-not-working"];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(a => {
    const oldWords = a.content.split(/\s+/).length;
    const newContent = rewriteHtml(a.content);
    const newWords = newContent.split(/\s+/).length;
    console.log(`Rewrote ${a.slug}. Old words: ${oldWords}. New words: ${newWords}.`);
    return prisma.article.update({
      where: { id: a.id },
      data: { content: newContent }
    });
  });

  await Promise.all(updates);
  console.log('Successfully updated all articles in the batch.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
