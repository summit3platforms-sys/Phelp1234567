import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

const JARGON_MAP: Record<string, string> = {
    "bidirectional communication": "two-way connection",
    "Bidirectional communication": "Two-way connection",
    "initialization": "setup",
    "Initialization": "Setup",
    "proprietary": "built-in",
    "Proprietary": "Built-in",
    "calibration protocol": "calibration process",
    "Calibration protocol": "Calibration process",
    "firmware": "firmware (internal software)",
    "Firmware": "Firmware (internal software)",
    "configuration": "settings",
    "Configuration": "Settings",
    "In order to": "To",
    "in order to": "to",
    "Due to the fact that": "Because",
    "due to the fact that": "because",
    "At this point in time": "Now",
    "at this point in time": "now",
    "You should open": "Open",
    "you should open": "open",
    "You can click": "Click",
    "you can click": "click",
    "It is recommended to check": "Check",
    "it is recommended to check": "check",
    "Make sure to": "Make sure",
    "make sure to": "make sure",
    "You need to press": "Press",
    "you need to press": "press",
    "You must check": "Check",
    "We recommend that you open": "Open",
    "You should click": "Click",
    "You should check": "Check",
    "You should press": "Press"
};

function processHtmlBlock(html: string): string {
    let modified = html;

    // Apply jargon replacements
    for (const [key, value] of Object.entries(JARGON_MAP)) {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        modified = modified.replace(regex, value);
    }
    
    // Split block into sentences roughly
    const parts = modified.split(/(?<=\.|\?|\!)\s+/);
    let newParts = [];
    
    for (let part of parts) {
        let textOnly = part.replace(/<[^>]+>/g, '').trim();
        let words = textOnly.split(/\s+/);
        
        if (words.length > 20) {
            // Find a conjunction or comma outside of HTML tags to split on
            let replaced = false;
            
            // Regex that matches conjunctions that have spaces around them, and we replace with ". "
            // We use a simple replace that only replaces the first occurrence
            part = part.replace(/\s(and|but|or|because|so|however|therefore)\s/i, (match, p1) => {
                if (replaced) return match;
                replaced = true;
                return ". ";
            });
            
            if (!replaced) {
                part = part.replace(/,\s/, (match) => {
                    if (replaced) return match;
                    replaced = true;
                    return ". ";
                });
            }
            
            // Capitalize the next letter after a period-space
            part = part.replace(/\.\s+([a-z])/g, (m, p1) => ". " + p1.toUpperCase());
            newParts.push(part);
        } else {
            newParts.push(part);
        }
    }
    
    return newParts.join(" ");
}

async function run() {
    const slugs = [
        "hp-sprocket-prints-blank-fix", 
        "zebra-network-factory-reset-diagnostics-test-ups-mode", 
        "brother-printer-error-ts-07", 
        "nelko-pm220-vs-pm230-small-business-setup-bluetooth-pairing", 
        "dymo-connect-web-service-certificate-error-localhost"
    ];
    
    const articles = await prisma.article.findMany({
        where: { slug: { in: slugs } }
    });
    
    console.log(`Found ${articles.length} articles to update.`);
    
    const updatePromises = articles.map(async (article) => {
        const originalWordCount = article.wordCount;
        const $ = cheerio.load(article.content, null, false);
        
        $('p, li, h2, h3, h4, h5, h6, summary, td, th').each(function() {
            const html = $(this).html();
            if (html) {
                const newHtml = processHtmlBlock(html);
                $(this).html(newHtml);
            }
        });
        
        let updatedContent = $.html();
        
        // Also apply replacements globally for any stragglers
        for (const [key, value] of Object.entries(JARGON_MAP)) {
            const regex = new RegExp(`\\b${key}\\b`, 'g');
            updatedContent = updatedContent.replace(regex, value);
        }
        
        // Calculate new word count
        const textContent = cheerio.load(updatedContent).text();
        const newWordCount = textContent.trim().split(/\s+/).length;
        
        await prisma.article.update({
            where: { id: article.id },
            data: { 
                content: updatedContent,
                wordCount: newWordCount
            }
        });
        
        console.log(`Updated ${article.slug}: ${originalWordCount} words -> ${newWordCount} words`);
    });
    
    await Promise.all(updatePromises);
    console.log('Successfully updated all articles in the batch.');
}

run().catch(console.error).finally(() => prisma.$disconnect());
