import { prisma } from '../src/lib/prisma';

function countWords(str: string): number {
  return (str.match(/\b\w+\b/g) || []).length;
}

function processText(text: string): string {
  // Replace jargon and wordy openers
  let processed = text
    .replace(/bidirectional communication/gi, "two-way connection")
    .replace(/initialization/gi, "setup")
    .replace(/proprietary/gi, "built-in")
    .replace(/calibration protocol/gi, "calibration process")
    .replace(/\bfirmware\b/gi, "firmware (internal software)")
    .replace(/configuration/gi, "settings")
    .replace(/In order to/gi, "To")
    .replace(/Due to the fact that/gi, "Because")
    .replace(/At this point in time/gi, "Now")
    .replace(/You should open/gi, "Open")
    .replace(/It is recommended to check/gi, "Check")
    .replace(/You must make sure/gi, "Make sure")
    .replace(/You need to press/gi, "Press")
    .replace(/Users should click/gi, "Click")
    .replace(/You must rigorously test/gi, "Test")
    .replace(/It is recommended to use/gi, "Use");

  // Split into sentences and break those over 20 words
  const sentenceRegex = /([^.!?]+[.!?]+(\s|$))/g;
  let result = "";
  let match;
  let lastIndex = 0;

  while ((match = sentenceRegex.exec(processed)) !== null) {
    let sentence = match[0];
    const wordCount = countWords(sentence);
    
    if (wordCount > 20) {
      // split sentence into two
      const words = sentence.trim().split(/\s+/);
      const mid = Math.floor(words.length / 2);
      
      let firstHalf = words.slice(0, mid).join(" ");
      let secondHalf = words.slice(mid).join(" ");
      
      // clean up punctuation at split point
      firstHalf = firstHalf.replace(/[,;:]$/, "");
      
      // capitalize second half
      secondHalf = secondHalf.charAt(0).toUpperCase() + secondHalf.slice(1);
      
      sentence = firstHalf + ". " + secondHalf + (sentence.endsWith(" ") ? " " : "");
    }
    result += sentence;
    lastIndex = match.index + match[0].length;
  }
  
  result += processed.substring(lastIndex);
  
  return result;
}

function rewriteHtml(html: string): string {
  const parts = html.split(/(<[^>]+>)/g);
  for (let i = 0; i < parts.length; i++) {
    if (!parts[i].startsWith('<')) {
      parts[i] = processText(parts[i]);
    }
  }
  return parts.join('');
}

async function main() {
  const slugs = [
    "hp-printer-13-20-paper-jam-error-fix",
    "dascom-pos-printer-cash-drawer-not-opening",
    "dymo-labelwriter-printing-blank-labels-skipping",
    "hp-officejet-pro-9130e-error-fix",
    "canon-maxify-mb2720-error"
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(async (article) => {
    const beforeWords = countWords(article.content);
    const newContent = rewriteHtml(article.content);
    const afterWords = countWords(newContent);
    
    console.log(`Article: ${article.slug} | Words Before: ${beforeWords} | Words After: ${afterWords}`);
    
    return prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
  });

  await Promise.all(updates);
  console.log("All articles updated successfully.");
}

main().catch(console.error);
