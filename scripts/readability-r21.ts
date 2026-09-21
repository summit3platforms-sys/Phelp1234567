import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function rewriteTextNode(text: string): string {
  let t = text;
  
  // 2. Replace jargon
  t = t.replace(/bidirectional communication/gi, "two-way connection");
  t = t.replace(/\binitialization\b/gi, "setup");
  t = t.replace(/\bproprietary\b/gi, "built-in");
  t = t.replace(/calibration protocol/gi, "calibration process");
  t = t.replace(/\bfirmware\b/gi, "firmware (internal software)");
  t = t.replace(/\bconfiguration\b/gi, "settings");

  // 4. Replace wordy openers
  t = t.replace(/In order to\b/gi, "To");
  t = t.replace(/Due to the fact that/gi, "Because");
  t = t.replace(/At this point in time,?\s*/gi, "Now, ");

  // 3. Start sentences with action verbs where possible
  t = t.replace(/\bYou should open\b/gi, "Open");
  t = t.replace(/\bYou need to click\b/gi, "Click");
  t = t.replace(/\bIt is necessary to press\b/gi, "Press");
  t = t.replace(/\bMake sure that you\b/gi, "Make sure");
  t = t.replace(/\bYou must check\b/gi, "Check");
  t = t.replace(/\bYou can check\b/gi, "Check");

  // 1. Break long sentences
  t = t.replace(/, and /gi, ". And ");
  t = t.replace(/, but /gi, ". But ");
  t = t.replace(/, because /gi, ". Because ");
  t = t.replace(/, which /gi, ". Which ");
  t = t.replace(/, while /gi, ". While ");
  t = t.replace(/; however,/gi, ". However,");
  t = t.replace(/; /g, ". ");

  return t;
}

function rewriteContent(html: string): string {
  let result = "";
  let i = 0;
  while (i < html.length) {
    let tagStart = html.indexOf('<', i);
    if (tagStart === -1) {
      result += rewriteTextNode(html.substring(i));
      break;
    }
    result += rewriteTextNode(html.substring(i, tagStart));
    let tagEnd = html.indexOf('>', tagStart);
    if (tagEnd === -1) {
      result += html.substring(tagStart);
      break;
    }
    result += html.substring(tagStart, tagEnd + 1);
    i = tagEnd + 1;
  }
  return result;
}

async function main() {
  const slugs = [
    "hp-smart-app-stuck-searching-for-printer",
    "phomemo-label-maker-comparison-m110-m120-m150-m221",
    "bixolon-network-printer-offline",
    "hp-officejet-pro-9015e-printhead-missing",
    "niimbot-rfid-chip-fault-non-universal-labels-error"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  const updates = articles.map(article => {
    let originalWordCount = article.content.split(/\s+/).length;
    let newContent = rewriteContent(article.content);
    let newWordCount = newContent.split(/\s+/).length;
    console.log(`Rewriting ${article.slug}... Words: ${originalWordCount} -> ${newWordCount}`);
    
    return prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
  });
  
  await Promise.all(updates);
  console.log("Successfully updated articles");
}

main().catch(console.error).finally(() => prisma.$disconnect());
