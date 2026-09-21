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

    // Sentences
    const sentences = result.match(/[^.!?]+[.!?]+/g) || [result];
    let finalStr = "";
    for (let s of sentences) {
        const matchWhitespace = s.match(/^\s*/);
        const leading = matchWhitespace ? matchWhitespace[0] : "";
        finalStr += leading + splitSentence(s.trim()) + " ";
    }
    if (sentences.length === 1 && !result.match(/[.!?]$/)) {
         return splitSentence(result.trim());
    }
    return finalStr.trim();
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

async function main() {
    const slugs = [
        "hp-printer-error-0xc4eb827f", 
        "fix-xerox-scan-to-email-connectkey-smb-share-errors", 
        "dymo-labelwriter-4xl-5xl-setup-driver-guide", 
        "hp-printer-wont-turn-on-no-light", 
        "polaroid-zip-gl10-mobile-printer-setup-troubleshooting"
    ];

    const articles = await prisma.article.findMany({
        where: { slug: { in: slugs } }
    });

    let totalWordsBefore = 0;
    let totalWordsAfter = 0;

    const updates = articles.map(article => {
        const beforeContent = article.content || '';
        totalWordsBefore += beforeContent.split(/\s+/).length;

        const afterContent = rewriteContent(beforeContent);
        totalWordsAfter += afterContent.split(/\s+/).length;

        return {
            slug: article.slug,
            content: afterContent
        };
    });

    await Promise.all(updates.map(update => 
        prisma.article.update({
            where: { slug: update.slug },
            data: { content: update.content }
        })
    ));

    console.log(`Word count before: ${totalWordsBefore}`);
    console.log(`Word count after: ${totalWordsAfter}`);
    console.log('Successfully updated 5 articles.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
