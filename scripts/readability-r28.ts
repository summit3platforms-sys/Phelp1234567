import { prisma } from '../src/lib/prisma';

function processText(text: string): string {
  // Replace wordy openers
  let res = text
    .replace(/In order to /gi, "To ")
    .replace(/Due to the fact that /gi, "Because ")
    .replace(/At this point in time/gi, "Now");

  // Replace jargon
  res = res
    .replace(/bidirectional communication/gi, "two-way connection")
    .replace(/initialization/gi, "setup")
    .replace(/proprietary/gi, "built-in")
    .replace(/calibration protocol/gi, "calibration process")
    .replace(/firmware/gi, "firmware (internal software)")
    .replace(/configuration/gi, "settings");

  // Replace passive/wordy instructions to action verbs
  res = res
    .replace(/You should open/gi, "Open")
    .replace(/You need to open/gi, "Open")
    .replace(/You should click/gi, "Click")
    .replace(/You need to click/gi, "Click")
    .replace(/You should press/gi, "Press")
    .replace(/You need to press/gi, "Press")
    .replace(/It is necessary to check/gi, "Check")
    .replace(/You should check/gi, "Check")
    .replace(/You need to check/gi, "Check")
    .replace(/Make sure that you/gi, "Make sure")
    .replace(/Be sure to/gi, "Make sure to");

  // Split long sentences (rough heuristic for sentences > 20 words)
  // We'll split on ", and " or ", but " or ", or " if the first part is long enough.
  res = res.replace(/([^.?!]{40,}), (and|but|so) ([^.?!]{40,}[.?!])/g, (match, p1, p2, p3) => {
    // Capitalize first letter of p3
    const capitalized = p3.charAt(0).toUpperCase() + p3.slice(1);
    return `${p1}. ${capitalized}`;
  });

  return res;
}

function processHtml(html: string): string {
  // A simple regex to process only text outside HTML tags
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
    "hp-laserjet-p4015-error-49-4c02", 
    "dymo-labelwriter-network-setup-lan-wi-fi", 
    "hp-printer-not-appearing-airprint-list-iphone", 
    "zebra-thermal-transfer-vs-direct-thermal-smudging-fix", 
    "hp-printer-burning-smell"
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(article => {
    const newContent = processHtml(article.content);
    const wordsBefore = article.content.split(/\s+/).length;
    const wordsAfter = newContent.split(/\s+/).length;
    console.log(`Slug: ${article.slug} | Words Before: ${wordsBefore} | Words After: ${wordsAfter}`);
    return prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
  });

  await Promise.all(updates);
  console.log("All articles updated successfully.");
}

main().catch(console.error);
