import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rules = [
  { from: /bidirectional communication/gi, to: 'two-way connection' },
  { from: /initialization/gi, to: 'setup' },
  { from: /proprietary/gi, to: 'built-in' },
  { from: /calibration protocol/gi, to: 'calibration process' },
  { from: /firmware/gi, to: 'firmware (internal software)' },
  { from: /configuration/gi, to: 'settings' },
  { from: /In order to /g, to: 'To ' },
  { from: /Due to the fact that /g, to: 'Because ' },
  { from: /At this point in time/gi, to: 'Now' },
  { from: /It is important that you open /g, to: 'Open ' },
  { from: /Please make sure to check /g, to: 'Check ' },
  { from: /You should click /g, to: 'Click ' },
  { from: /Make sure to press /g, to: 'Press ' },
];

function rewriteContent(html: string): string {
  let modified = html;
  
  // Apply word replacements
  for (const rule of rules) {
    modified = modified.replace(rule.from, rule.to);
  }

  // Splitting long sentences > 20 words
  // First, isolate text outside of HTML tags using regex
  const parts = modified.split(/(<[^>]+>)/g);
  
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith('<') && parts[i].endsWith('>')) continue;
    
    // It's a text block
    let text = parts[i];
    
    // split by sentences roughly (. ! ?) followed by space
    const sentences = text.split(/(?<=[.!?])\s+/);
    
    for (let j = 0; j < sentences.length; j++) {
      let s = sentences[j];
      let words = s.split(/\s+/);
      
      if (words.length > 20) {
        // Find a logical place to split
        // e.g., ', and ', ', but ', ', or '
        // To avoid grammar issues, replace ', and ' with '. And '
        let mid = Math.floor(words.length / 2);
        
        let splitDone = false;
        const splitKeywords = [
          { from: ', and ', to: '. And ' },
          { from: ', but ', to: '. But ' },
          { from: ', or ', to: '. Or ' },
          { from: ' because ', to: '. Because ' },
          { from: ', which ', to: '. This ' }
        ];

        for (const kw of splitKeywords) {
          let idx = s.indexOf(kw.from, 30); // Look past the first 30 chars to split roughly in half
          if (idx !== -1) {
             s = s.substring(0, idx) + kw.to + s.substring(idx + kw.from.length);
             // Ensure the resulting first sentence isn't too long again? We just do it once per sentence for now.
             splitDone = true;
             break;
          }
        }
        
        if (!splitDone) {
          // If no conjunction, maybe just split at first comma after 40 chars
          let idx = s.indexOf(', ', 40);
          if (idx !== -1) {
            s = s.substring(0, idx) + '. ' + s.substring(idx + 2).charAt(0).toUpperCase() + s.substring(idx + 3);
          }
        }
      }
      sentences[j] = s;
    }
    
    parts[i] = sentences.join(' ');
  }
  
  return parts.join('');
}

async function main() {
  const slugs = [
    "zebra-printer-zpl-command-not-working-ignored-fix",
    "brother-printer-ts-02-5ghz-vs-2.4ghz",
    "primera-label-jam-label-cut-not-printed-error",
    "printer-troubleshooting",
    "kodak-printer-lines-on-photos-printhead-cleaning"
  ];

  const updatePromises = slugs.map(async (slug) => {
    const article = await prisma.article.findUnique({ where: { slug } });
    if (!article || !article.content) return;
    
    const oldWordCount = article.content.split(/\s+/).length;
    const newContent = rewriteContent(article.content);
    const newWordCount = newContent.split(/\s+/).length;

    await prisma.article.update({
      where: { slug },
      data: { content: newContent }
    });

    console.log(`Updated [${slug}] - Old Word Count: ${oldWordCount}, New Word Count: ${newWordCount}`);
  });

  await Promise.all(updatePromises);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
