const fs = require('fs');

const data = JSON.parse(fs.readFileSync('fetch_output.json', 'utf8'));

function rewriteContent(html) {
  html = html.replace(/bidirectional communication/gi, "two-way connection");
  html = html.replace(/initialization/gi, "setup");
  html = html.replace(/proprietary/gi, "built-in");
  html = html.replace(/calibration protocol/gi, "calibration process");
  html = html.replace(/\bfirmware\b/gi, "firmware (internal software)");
  html = html.replace(/configuration/gi, "settings");

  html = html.replace(/In order to/gi, "To");
  html = html.replace(/Due to the fact that/gi, "Because");
  html = html.replace(/At this point in time/gi, "Now");

  html = html.replace(/You should check/gi, "Check");
  html = html.replace(/You need to open/gi, "Open");
  html = html.replace(/You must press/gi, "Press");
  html = html.replace(/It is important to make sure/gi, "Make sure");
  html = html.replace(/Please make sure/gi, "Make sure");
  html = html.replace(/We recommend that you check/gi, "Check");
  html = html.replace(/It is recommended to check/gi, "Check");

  let inTag = false;
  let textBuffer = '';
  let result = '';
  
  for (let i = 0; i < html.length; i++) {
    const char = html[i];
    if (char === '<') {
      if (textBuffer.length > 0) {
        result += processText(textBuffer);
        textBuffer = '';
      }
      inTag = true;
      result += char;
    } else if (char === '>') {
      inTag = false;
      result += char;
    } else {
      if (inTag) {
        result += char;
      } else {
        textBuffer += char;
      }
    }
  }
  if (textBuffer.length > 0) {
    result += processText(textBuffer);
  }

  return result;
}

function processText(text) {
  const sentenceRegex = /([^.?!]+[.?!]+(?:\s+|$))/g;
  let match;
  let newText = '';
  let lastIndex = 0;
  
  while ((match = sentenceRegex.exec(text)) !== null) {
    let sentence = match[1];
    let words = sentence.trim().split(/\s+/);
    if (words.length > 20) {
      const splitters = [", and ", ", but ", " because ", " since ", " which ", " that ", " and ", " or "];
      let splitDone = false;
      for (const splitter of splitters) {
        const idx = sentence.toLowerCase().indexOf(splitter);
        if (idx > 15 && idx < sentence.length - 15) {
          let firstPart = sentence.substring(0, idx).trim();
          let secondPart = sentence.substring(idx + splitter.length).trim();
          secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
          newText += firstPart + ". " + secondPart + (sentence.endsWith(' ') ? ' ' : '');
          splitDone = true;
          break;
        }
      }
      if (!splitDone) {
        newText += sentence;
      }
    } else {
      newText += sentence;
    }
    lastIndex = sentenceRegex.lastIndex;
  }
  newText += text.substring(lastIndex);
  
  return newText;
}

const updates = data.map(item => ({
  slug: item.slug,
  content: rewriteContent(item.content)
}));

const lines = [
  "import { prisma } from '../src/lib/prisma';",
  "",
  "const updates = " + JSON.stringify(updates, null, 2) + ";",
  "",
  "async function main() {",
  "  let totalBefore = 0;",
  "  let totalAfter = 0;",
  "",
  "  await Promise.all(updates.map(async (update) => {",
  "    const before = await prisma.article.findUnique({ where: { slug: update.slug } });",
  "    if (before) {",
  "       totalBefore += before.content.split(/\\\\s+/).length;",
  "    }",
  "    await prisma.article.update({",
  "      where: { slug: update.slug },",
  "      data: { content: update.content }",
  "    });",
  "    totalAfter += update.content.split(/\\\\s+/).length;",
  "  }));",
  "  ",
  "  console.log('Updates applied successfully.');",
  "  console.log('Total words before: ' + totalBefore);",
  "  console.log('Total words after: ' + totalAfter);",
  "}",
  "",
  "main().catch(console.error).finally(() => prisma.$disconnect());"
];

fs.writeFileSync('scripts/readability-r5.ts', lines.join('\n'));
console.log('Script readability-r5.ts generated.');
