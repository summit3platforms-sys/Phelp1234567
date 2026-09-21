import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

const jargonMap = [
    { from: /bidirectional communication/gi, to: 'two-way connection' },
    { from: /\binitialization\b/gi, to: 'setup' },
    { from: /\bproprietary\b/gi, to: 'built-in' },
    { from: /calibration protocol/gi, to: 'calibration process' },
    { from: /\bfirmware(?!\s*\(internal software\))/gi, to: 'firmware (internal software)' },
    { from: /\bconfiguration\b/gi, to: 'settings' }
];

const openersMap = [
    { from: /In order to/g, to: 'To' },
    { from: /in order to/g, to: 'to' },
    { from: /Due to the fact that/gi, to: 'Because' },
    { from: /At this point in time/gi, to: 'Now' },
    { from: /You should (open|click|press|check|make sure)/gi, to: (m, p1) => p1.charAt(0).toUpperCase() + p1.slice(1) },
    { from: /You need to (open|click|press|check|make sure)/gi, to: (m, p1) => p1.charAt(0).toUpperCase() + p1.slice(1) },
    { from: /It is recommended to (open|click|press|check|make sure)/gi, to: (m, p1) => p1.charAt(0).toUpperCase() + p1.slice(1) },
    { from: /You must (open|click|press|check|make sure)/gi, to: (m, p1) => p1.charAt(0).toUpperCase() + p1.slice(1) },
    { from: /You can (open|click|press|check|make sure)/gi, to: (m, p1) => p1.charAt(0).toUpperCase() + p1.slice(1) },
    { from: /Be sure to/gi, to: 'Make sure to' },
    { from: /It is necessary to (open|click|press|check|make sure)/gi, to: (m, p1) => p1.charAt(0).toUpperCase() + p1.slice(1) }
];

function capitalizeFirstChar(str: string): string {
    if (!str) return str;
    const match = str.match(/[a-zA-Z]/);
    if (match) {
        const index = match.index!;
        return str.substring(0, index) + str.charAt(index).toUpperCase() + str.substring(index + 1);
    }
    return str;
}

function processText(text: string): string {
    let newText = text;
    
    for (const rule of jargonMap) {
        newText = newText.replace(rule.from, rule.to);
    }
    for (const rule of openersMap) {
        newText = newText.replace(rule.from, rule.to as any);
    }
    
    // Splitting long sentences
    // A simple heuristic: if a text node has a long sentence, we try to break on " and ", " but ", ", which "
    const sentences = newText.split(/([.!?]+(?:\s+|$))/);
    let result = '';
    
    for (let i = 0; i < sentences.length; i++) {
        let sentence = sentences[i];
        const wordCount = sentence.split(/\s+/).filter(w => w.length > 0).length;
        if (wordCount > 20) {
            // Try to split on common conjunctions
            let splitted = false;
            
            // Try splitting by ", and "
            if (!splitted && sentence.includes(', and ')) {
                const parts = sentence.split(', and ');
                if (parts.length === 2 && parts[0].split(/\s+/).length > 5 && parts[1].split(/\s+/).length > 5) {
                    sentence = parts[0] + '. ' + capitalizeFirstChar(parts[1]);
                    splitted = true;
                }
            }
            
            // Try splitting by " and "
            if (!splitted && sentence.includes(' and ')) {
                const parts = sentence.split(' and ');
                if (parts.length === 2 && parts[0].split(/\s+/).length > 5 && parts[1].split(/\s+/).length > 5) {
                    sentence = parts[0] + '. ' + capitalizeFirstChar(parts[1]);
                    splitted = true;
                }
            }
            
            // Try splitting by ", which "
            if (!splitted && sentence.includes(', which ')) {
                const parts = sentence.split(', which ');
                if (parts.length === 2 && parts[0].split(/\s+/).length > 5 && parts[1].split(/\s+/).length > 5) {
                    sentence = parts[0] + '. This ' + parts[1];
                    splitted = true;
                }
            }
            
            // Try splitting by ", but "
            if (!splitted && sentence.includes(', but ')) {
                const parts = sentence.split(', but ');
                if (parts.length === 2 && parts[0].split(/\s+/).length > 5 && parts[1].split(/\s+/).length > 5) {
                    sentence = parts[0] + '. However, ' + parts[1];
                    splitted = true;
                }
            }
            
            // Try splitting by " because "
            if (!splitted && sentence.includes(' because ')) {
                const parts = sentence.split(' because ');
                if (parts.length === 2 && parts[0].split(/\s+/).length > 5 && parts[1].split(/\s+/).length > 5) {
                    sentence = parts[0] + '. This is because ' + parts[1];
                    splitted = true;
                }
            }
        }
        result += sentence;
    }
    
    return result;
}

function processTextNode(node: any) {
    if (node.type === 'text') {
        node.data = processText(node.data);
    } else if (node.children) {
        node.children.forEach(processTextNode);
    }
}

function rewriteArticleContent(htmlContent: string): string {
    const $ = cheerio.load(htmlContent, null, false);
    $.root().contents().each((_, el) => processTextNode(el));
    return $.html();
}

function getWordCount(html: string): number {
    const $ = cheerio.load(html);
    const text = $.text();
    return text.split(/\s+/).filter(w => w.length > 0).length;
}

async function main() {
    const slugs = [
        "printer-wont-connect",
        "how-to-print-from-macos-to-legacy-kodak-printer",
        "brother-printer-error-40-overheating",
        "niimbot-paper-loading-baffle-guide-lid-not-closing",
        "hp-neverstop-toner-not-filling-correctly"
    ];

    console.log(`Fetching articles...`);
    const articles = await prisma.article.findMany({
        where: { slug: { in: slugs } }
    });

    const updates = articles.map(article => {
        const originalWordCount = getWordCount(article.content);
        const newHtml = rewriteArticleContent(article.content);
        const newWordCount = getWordCount(newHtml);
        
        console.log(`Article: ${article.slug}`);
        console.log(`- Original Word Count: ${originalWordCount}`);
        console.log(`- New Word Count: ${newWordCount}`);
        
        return prisma.article.update({
            where: { id: article.id },
            data: {
                content: newHtml,
                wordCount: newWordCount
            }
        });
    });

    console.log(`Updating ${updates.length} articles...`);
    await Promise.all(updates);
    console.log(`Successfully updated articles.`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
