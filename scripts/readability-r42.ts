import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

const slugs = [
  "hp-envy-6055e-printhead-error",
  "hp-laserjet-m1136-driver-windows-11",
  "primera-windows-11-driver-logo-testing-usb-communication",
  "hp-printer-error-79-service-error-real-fix",
  "hp-sprocket-luna-pearl-setup-guide"
];

function processText(text: string): string {
    // 2. Replace jargon
    let t = text.replace(/bidirectional communication/gi, "two-way connection");
    t = t.replace(/\binitialization\b/gi, "setup");
    t = t.replace(/\bproprietary\b/gi, "built-in");
    t = t.replace(/calibration protocol/gi, "calibration process");
    t = t.replace(/\bfirmware\b/gi, "firmware (internal software)");
    // Avoid double replacing if it's already "firmware (internal software)"
    t = t.replace(/firmware \(internal software\) \(internal software\)/gi, "firmware (internal software)");
    t = t.replace(/\bconfiguration\b/gi, "settings");

    // 4. Replace wordy openers
    t = t.replace(/In order to/gi, "To");
    t = t.replace(/Due to the fact that/gi, "Because");
    t = t.replace(/At this point in time/gi, "Now");

    // 3. Action verbs
    t = t.replace(/You should open/gi, "Open");
    t = t.replace(/You should click/gi, "Click");
    t = t.replace(/You should press/gi, "Press");
    t = t.replace(/You should check/gi, "Check");
    t = t.replace(/Please make sure/gi, "Make sure");
    t = t.replace(/It is important to make sure/gi, "Make sure");
    t = t.replace(/We recommend that you open/gi, "Open");

    // 1. Break sentences over 20 words
    // Split text into sentences using simple regex
    const sentenceRegex = /([^.!?]+[.!?]+)(?=\s|$)/g;
    t = t.replace(sentenceRegex, (sentence) => {
        const words = sentence.trim().split(/\s+/);
        if (words.length > 20) {
            // Find a good place to split: " and ", " or ", " but ", " because ", " which ", " - "
            const splitRegex = /(.*?(?:,\s+| — | - ))(and|but|or|so|because|which|while|although|—|-)( \b.*)/i;
            let match = sentence.match(splitRegex);
            
            // If no match with comma/dash, try just the conjunction
            if (!match) {
                const splitRegex2 = /(.*?\s+)(and|but|or|so|because|which|while|although)( \b.*)/i;
                match = sentence.match(splitRegex2);
            }

            if (match) {
                let p1 = match[1].trim();
                // Clean up trailing punctuation
                if (p1.endsWith(',') || p1.endsWith('—') || p1.endsWith('-')) p1 = p1.slice(0, -1).trim();
                
                let p2 = match[3].trim();
                if (p2.length > 0) {
                    p2 = p2.charAt(0).toUpperCase() + p2.slice(1);
                    return `${p1}. ${p2}`;
                }
            }
        }
        return sentence;
    });

    return t;
}

function processHtml(html: string): string {
    const $ = cheerio.load(html, null, false);
    
    // Process text nodes recursively
    function traverse(node: any) {
        if (node.type === 'text') {
            node.data = processText(node.data);
        } else if (node.type === 'tag' && node.name !== 'script' && node.name !== 'style') {
            node.children.forEach(traverse);
        }
    }
    
    $.root().contents().each((_, el) => {
        traverse(el);
    });
    
    return $.html();
}

async function main() {
    const articles = await prisma.article.findMany({
        where: { slug: { in: slugs } }
    });

    const updates = articles.map(async (article) => {
        const oldWordCount = article.wordCount || article.content.replace(/<[^>]*>?/gm, '').trim().split(/\s+/).length;
        const newContent = processHtml(article.content);
        const newWordCount = newContent.replace(/<[^>]*>?/gm, '').trim().split(/\s+/).length;

        await prisma.article.update({
            where: { id: article.id },
            data: { 
                content: newContent,
                wordCount: newWordCount
            }
        });

        console.log(`Updated ${article.slug}: ${oldWordCount} words -> ${newWordCount} words`);
    });

    await Promise.all(updates);
    console.log("Batch update complete.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
