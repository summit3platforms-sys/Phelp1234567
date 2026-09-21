import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

const jargonMap = {
    "bidirectional communication": "two-way connection",
    "initialization": "setup",
    "proprietary": "built-in",
    "calibration protocol": "calibration process",
    "firmware": "firmware (internal software)",
    "configuration": "settings",
    "In order to": "To",
    "in order to": "to",
    "Due to the fact that": "Because",
    "due to the fact that": "because",
    "At this point in time": "Now",
    "at this point in time": "now"
};

function splitSentence(s: string): string {
    const words = s.trim().split(/\s+/);
    if (words.length <= 20) return s;

    let splitIdx = -1;
    // prefer conjunctions in the middle
    for (let i = 8; i < words.length - 8; i++) {
        if (words[i].match(/^(and|but|or|because|so|however|therefore)$/i) || words[i].match(/^(and|but|or|because|so|however|therefore),$/i)) {
            splitIdx = i;
            break;
        }
    }
    // if not, fallback to comma
    if (splitIdx === -1) {
        for (let i = 8; i < words.length - 8; i++) {
            if (words[i].endsWith(',')) {
                splitIdx = i;
                break;
            }
        }
    }
    // if still not, just split at mid
    if (splitIdx === -1) {
        splitIdx = Math.floor(words.length / 2);
    }

    let first = words.slice(0, splitIdx).join(' ');
    let splitWord = words[splitIdx].replace(/,$/, '');
    let second = words.slice(splitIdx + 1).join(' ');

    if (splitWord.match(/^(and|but|or|because|so)$/i)) {
        first = first + '.';
        second = second.charAt(0).toUpperCase() + second.slice(1);
    } else {
        first = first + ' ' + splitWord + '.';
        second = second.charAt(0).toUpperCase() + second.slice(1);
    }

    return first + ' ' + splitSentence(second);
}

function processText(text: string): string {
    let result = text;
    for (const [k, v] of Object.entries(jargonMap)) {
        const regex = new RegExp(`\\b${k}\\b`, 'g');
        result = result.replace(regex, v);
    }

    // Replace firmware (internal software) (internal software) to avoid duplication if it already existed
    result = result.replace(/firmware \(internal software\) \(internal software\)/g, "firmware (internal software)");

    // Action verbs for wordy phrases
    result = result.replace(/You should (open|click|press|check|make sure|verify|run)/gi, (m, p1) => {
        return p1.charAt(0).toUpperCase() + p1.slice(1);
    });
    result = result.replace(/You must (open|click|press|check|make sure|verify|run)/gi, (m, p1) => {
        return p1.charAt(0).toUpperCase() + p1.slice(1);
    });
    result = result.replace(/It is recommended to (open|click|press|check|make sure|verify|run)/gi, (m, p1) => {
        return p1.charAt(0).toUpperCase() + p1.slice(1);
    });
    result = result.replace(/Please (open|click|press|check|make sure)/gi, (m, p1) => {
        return p1.charAt(0).toUpperCase() + p1.slice(1);
    });

    // Sentences
    const sentences = result.match(/[^.!?]+[.!?]+/g) || [result];
    let finalStr = "";
    for (let s of sentences) {
        const matchWhitespace = s.match(/^\s*/);
        const leading = matchWhitespace ? matchWhitespace[0] : "";
        finalStr += leading + splitSentence(s.trim());
    }
    if (sentences.length === 1 && !result.match(/[.!?]$/)) {
         return splitSentence(result.trim());
    }
    return finalStr;
}

function rewriteContent(html: string): string {
    const $ = cheerio.load(html, null, false);
    $('*').contents().each(function() {
        if (this.type === 'text') {
            const txt = $(this).text();
            if (txt.trim().length > 0) {
                $(this).replaceWith(processText(txt));
            }
        }
    });
    return $.html();
}

function countWords(html: string): number {
    const $ = cheerio.load(html, null, false);
    const text = $.text();
    const words = text.trim().split(/\s+/);
    return words.filter(w => w.length > 0).length;
}

async function main() {
  const slugs = [
    "primera-bravo-disc-publisher-not-printing-burns-disc-but-wont",
    "hp-printer-802-1x-authentication-failed",
    "polaroid-hi-print-cartridge-door-wont-open-close-fix",
    "dascom-2600-2610-error-not-printing",
    "rollo-printer-wifi-disconnecting-network-not-found-fix"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(async (article) => {
    const origHtml = article.content;
    const newHtml = rewriteContent(origHtml);
    
    const beforeWords = article.wordCount;
    const afterWords = countWords(newHtml);
    
    await prisma.article.update({
      where: { id: article.id },
      data: {
        content: newHtml,
        wordCount: afterWords
      }
    });
    
    console.log(`[${article.slug}] Words before: ${beforeWords}, Words after: ${afterWords}`);
  });

  await Promise.all(updates);
  console.log("All articles updated successfully.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
