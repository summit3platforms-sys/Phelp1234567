import { prisma } from '../src/lib/prisma';

function rewriteHtml(html: string): string {
  let content = html;

  // Rule 2: Replace jargon
  content = content.replace(/bidirectional communication/gi, 'two-way connection');
  content = content.replace(/initialization/gi, 'setup');
  content = content.replace(/proprietary/gi, 'built-in');
  content = content.replace(/calibration protocol/gi, 'calibration process');
  // Need to be careful with firmware to avoid replacing firmware(internal software) repeatedly if already run
  // but just regular word boundaries is fine
  content = content.replace(/\bfirmware\b/gi, 'firmware (internal software)');
  // Clean up if it was double-replaced
  content = content.replace(/firmware\s*\(internal software\)\s*\(internal software\)/gi, 'firmware (internal software)');
  content = content.replace(/configuration/gi, 'settings');

  // Rule 4: Replace wordy openers
  content = content.replace(/In order to/gi, 'To');
  content = content.replace(/Due to the fact that/gi, 'Because');
  content = content.replace(/At this point in time/gi, 'Now');

  // Rule 3: Start sentences with action verbs where possible
  content = content.replace(/You should check/gi, 'Check');
  content = content.replace(/You will need to open/gi, 'Open');
  content = content.replace(/It is recommended to press/gi, 'Press');
  content = content.replace(/We advise you to make sure/gi, 'Make sure');
  content = content.replace(/You should click/gi, 'Click');
  content = content.replace(/Ensure that you/gi, 'Make sure to');
  content = content.replace(/It is necessary to/gi, 'Make sure to');

  // Rule 1: Break long sentences.
  let parts = content.split(/(<[^>]*>)/);
  for (let i = 0; i < parts.length; i++) {
    if (!parts[i].startsWith('<')) {
      // Split by sentences.
      let sentences = parts[i].match(/[^.!?]+[.!?]+(?:\s+|$)/g);
      if (sentences) {
        let newText = '';
        for (let s of sentences) {
          let words = s.trim().split(/\s+/);
          if (words.length > 20) {
            let mid = Math.floor(words.length / 2);
            let splitIndex = -1;
            for (let j = mid - 6; j <= mid + 6 && j < words.length; j++) {
              let w = words[j].replace(/[^a-zA-Z]/g, '').toLowerCase();
              if (j > 0 && ['and', 'but', 'or', 'because', 'which', 'so', 'although', 'however', 'if'].includes(w)) {
                splitIndex = j;
                break;
              }
            }
            if (splitIndex !== -1) {
              let p1 = words.slice(0, splitIndex).join(' ');
              if (!p1.match(/[.!?]$/)) p1 += '.';
              let p2word = words[splitIndex].replace(/[^a-zA-Z]/g, '').toLowerCase();
              let offset = 0;
              if (['and', 'but', 'or', 'so'].includes(p2word)) {
                 offset = 1;
              }
              let p2Arr = words.slice(splitIndex + offset);
              if (p2Arr.length > 0) {
                p2Arr[0] = p2Arr[0].charAt(0).toUpperCase() + p2Arr[0].slice(1);
              }
              let p2 = p2Arr.join(' ');
              newText += p1 + ' ' + p2 + ' ';
            } else {
               let p1 = words.slice(0, 15).join(' ') + '.';
               let p2Arr = words.slice(15);
               if (p2Arr.length > 0) {
                 p2Arr[0] = p2Arr[0].charAt(0).toUpperCase() + p2Arr[0].slice(1);
               }
               let p2 = p2Arr.join(' ');
               newText += p1 + ' ' + p2 + ' ';
            }
          } else {
            newText += s;
          }
        }
        if (parts[i].match(/\s+$/)) {
          newText += ' ';
        }
        parts[i] = newText;
      }
    }
  }

  return parts.join('');
}

async function main() {
  const slugs = [
    "fix-citizen-label-gap-not-detected-reflective-media-feeding",
    "niimbot-misaligned-print-faded-text-partial-labels",
    "dymo-letratag-not-printing-tape-jam",
    "pantum-p2500w-m6600nw-blinking-lights-wifi-error-05",
    "how-to-update-bixolon-printer-firmware"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(article => {
    const origWords = article.content.split(/\s+/).length;
    const newContent = rewriteHtml(article.content);
    const newWords = newContent.split(/\s+/).length;
    console.log(`Slug: ${article.slug} | Words: ${origWords} -> ${newWords}`);
    return prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
  });

  await Promise.all(updates);
  console.log('Update complete.');
}
main().catch(console.error).finally(() => prisma.$disconnect());
