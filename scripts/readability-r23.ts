import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

const jargonMap: Record<string, string> = {
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

    for (let i = 8; i < words.length - 8; i++) {
        if (words[i].match(/[,;]$/)) {
            splitIdx = i;
            break;
        }
    }

    if (splitIdx === -1) {
        for (let i = 8; i < words.length - 8; i++) {
            if (words[i].match(/^(and|but|or|because|so|however|therefore|which|that|when|where)$/i)) {
                splitIdx = i;
                break;
            }
        }
    }

    if (splitIdx === -1) {
        splitIdx = Math.floor(words.length / 2);
    }

    let first = words.slice(0, splitIdx).join(' ');
    let splitWord = words[splitIdx].replace(/[,;]$/, '');
    let second = words.slice(splitIdx + 1).join(' ');

    if (splitWord.match(/^(and|but|or|because|so|however|therefore|which|that|when|where)$/i)) {
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
        // Also handle capitalized versions if needed, though 'g' doesn't cover 'i'. Let's do gi:
        const regexI = new RegExp(`\\b${k}\\b`, 'gi');
        result = result.replace(regexI, v);
    }

    const verbs = "open|click|press|check|make sure";
    const regex = new RegExp(`(?:You should|You must|It is recommended to|We recommend that you)\\s+(${verbs})`, 'gi');
    result = result.replace(regex, (m, p1) => {
        return p1.charAt(0).toUpperCase() + p1.slice(1);
    });

    const sentences = result.match(/[^.!?]+[.!?]+|\s+/g) || [result];
    let finalStr = "";
    for (let s of sentences) {
        if (s.trim().length === 0) {
            finalStr += s;
        } else {
            const puncMatch = s.match(/[.!?]+$/);
            const punc = puncMatch ? puncMatch[0] : '';
            const core = s.replace(/[.!?]+$/, '');
            finalStr += splitSentence(core) + punc;
        }
    }
    return finalStr;
}

function countWords(str: string): number {
    const text = str.replace(/<[^>]*>?/gm, ' ');
    return (text.match(/\b\w+\b/g) || []).length;
}

async function main() {
    const slugs = [
        "hp-officejet-pro-9015e-error-0x610000f6", 
        "dymo-printer-error-printing-message-not-printing", 
        "phomemo-m02-vs-m02-pro-t02-comparison-m02s-fixes", 
        "fix-xerox-016-error-web-server-cloud-connections", "fix-xerox-network-016-error-web-server-cloud-connections", 
        "zebra-zq520-setup-gk420d-driver-windows-11"
    ];

    const articles = await prisma.article.findMany({
        where: { slug: { in: slugs } }
    });

    const updates = articles.map(async (article) => {
        const beforeWords = countWords(article.content);
        
        const $ = cheerio.load(article.content, null, false);
        $('*').contents().each(function() {
            if (this.type === 'text') {
                const txt = $(this).text();
                if (txt.trim().length > 0) {
                    $(this).replaceWith(processText(txt));
                }
            }
        });
        
        const newContent = $.html();
        const afterWords = countWords(newContent);
        
        await prisma.article.update({
            where: { id: article.id },
            data: { content: newContent }
        });
        
        return { slug: article.slug, before: beforeWords, after: afterWords };
    });

    const results = await Promise.all(updates);
    
    for (const r of results) {
        console.log(`Updated ${r.slug}: ${r.before} words -> ${r.after} words`);
    }
    console.log("Success: Processed 5 articles.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
