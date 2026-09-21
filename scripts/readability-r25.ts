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
    "Due to the fact that": "Because",
    "At this point in time": "Now",
    "troubleshooting": "fixing",
    "functionality": "feature",
    "specifically": "exactly",
    "automatically": "by itself",
    "exclusively": "only",
    "completely": "fully",
    "immediately": "right away",
    "additionally": "also",
    "subsequently": "then",
    "accordingly": "so",
    "consequently": "so"
};

function rewriteHtml(html: string): string {
    let newHtml = html;
    
    // Replace jargon
    for (const [key, value] of Object.entries(jargonMap)) {
        const regex = new RegExp(key, 'gi');
        newHtml = newHtml.replace(regex, (match) => {
            if (match[0] === match[0].toUpperCase()) {
                return value.charAt(0).toUpperCase() + value.slice(1);
            }
            return value;
        });
    }

    const $ = cheerio.load(newHtml, null, false);
    
    $('p, li').each(function() {
        let text = $(this).html() || '';
        
        let sentences = text.split(/(?<=\.)\s+/);
        let changed = false;
        
        sentences = sentences.map(s => {
            let plainText = s.replace(/<[^>]+>/g, '');
            let words = plainText.trim().split(/\s+/);
            if (words.length > 20) {
                const splits = [' and ', ' but ', ' because ', ' which ', ', and ', ', but '];
                for (let sp of splits) {
                    let idx = s.indexOf(sp);
                    if (idx > 15 && idx < s.length - 15) {
                        let leftPart = s.substring(0, idx);
                        let openTags = (leftPart.match(/</g) || []).length;
                        let closeTags = (leftPart.match(/>/g) || []).length;
                        if (openTags === closeTags) {
                            let part1 = s.substring(0, idx).trim();
                            let part2 = s.substring(idx + sp.length).trim();
                            part2 = part2.replace(/^([^a-zA-Z]*)([a-zA-Z])/, (m, p1, p2) => p1 + p2.toUpperCase());
                            changed = true;
                            return `${part1}. ${part2}`;
                        }
                    }
                }
            }
            return s;
        });
        
        if (changed) {
            $(this).html(sentences.join(' '));
        }
    });
    
    let finalHtml = $.html();
    finalHtml = finalHtml.replace(/It is necessary to open/gi, 'Open');
    finalHtml = finalHtml.replace(/You should click/gi, 'Click');
    finalHtml = finalHtml.replace(/You will need to press/gi, 'Press');
    finalHtml = finalHtml.replace(/It is recommended to check/gi, 'Check');
    finalHtml = finalHtml.replace(/It is important to make sure/gi, 'Make sure');
    
    return finalHtml;
}

function countWords(str: string): number {
    return str.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(w => w.length > 0).length;
}

async function run() {
    const slugs = [
        "hp-smart-app-scan-to-pc-not-showing", 
        "hp-officejet-pro-8025e-not-printing-color", 
        "bixolon-printer-wifi-cant-connect", 
        "fix-pantum-streaky-lines-drum-marks-heavy-paper", 
        "nelko-pm220-not-printing-paper-jams-indicator-lights",
        "bixolon-printer-wont-connect-to-wi-fi"
    ];

    const articles = await prisma.article.findMany({
        where: { slug: { in: slugs } }
    });

    console.log(`Found ${articles.length} articles to process.`);

    const updatePromises = articles.map(async (article) => {
        const oldContent = article.content;
        const oldWordCount = countWords(oldContent);
        
        const newContent = rewriteHtml(oldContent);
        const newWordCount = countWords(newContent);
        
        await prisma.article.update({
            where: { id: article.id },
            data: { content: newContent }
        });
        
        console.log(`Slug: ${article.slug} | Old Word Count: ${oldWordCount} | New Word Count: ${newWordCount}`);
    });

    await Promise.all(updatePromises);
    console.log("Success: All articles updated concurrently using Promise.all().");
}

run().catch(console.error).finally(() => prisma.$disconnect());
