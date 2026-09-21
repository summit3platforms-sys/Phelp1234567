import * as cheerio from 'cheerio';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const jargonMap: Record<string, string> = {
    "bidirectional communication": "two-way connection",
    "initialization": "setup",
    "proprietary": "built-in",
    "calibration protocol": "calibration process",
    "firmware": "firmware (internal software)",
    "configuration": "settings",
    "In order to": "To",
    "Due to the fact that": "Because",
    "At this point in time": "Now"
};

export function rewriteHtml(html: string): string {
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

    // Attempt to break long sentences. This is a heuristic.
    // We parse with cheerio to manipulate text nodes safely, but since we want to avoid 
    // breaking HTML, we can just use cheerio to iterate over block elements (p, li) 
    // and process their innerHTML.
    const $ = cheerio.load(newHtml, null, false);
    
    $('p, li').each(function() {
        let text = $(this).html() || '';
        
        // We'll split the innerHTML by '. ' and check word count (stripping tags for word count)
        let sentences = text.split(/(?<=\.)\s+/);
        let changed = false;
        
        sentences = sentences.map(s => {
            let plainText = s.replace(/<[^>]+>/g, '');
            let words = plainText.trim().split(/\s+/);
            if (words.length > 20) {
                // Find conjunctions
                const splits = [' and ', ' but ', ' because ', ' which ', ', and ', ', but '];
                for (let sp of splits) {
                    let idx = s.indexOf(sp);
                    if (idx > 15 && idx < s.length - 15) {
                        // avoid splitting inside an HTML tag
                        // naive check: count '<' and '>' before idx
                        let leftPart = s.substring(0, idx);
                        let openTags = (leftPart.match(/</g) || []).length;
                        let closeTags = (leftPart.match(/>/g) || []).length;
                        if (openTags === closeTags) {
                            let part1 = s.substring(0, idx).trim();
                            let part2 = s.substring(idx + sp.length).trim();
                            // capitalize part2
                            // need to find first text char
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
    
    // Replace action verbs where possible.
    // For list items, if they don't start with action verb, try to fix? The instructions say:
    // Start sentences with action verbs where possible: "Open", "Click", "Press", "Check", "Make sure".
    // I can do a naive replace:
    let finalHtml = $.html();
    finalHtml = finalHtml.replace(/It is necessary to open/gi, 'Open');
    finalHtml = finalHtml.replace(/You should click/gi, 'Click');
    finalHtml = finalHtml.replace(/You will need to press/gi, 'Press');
    finalHtml = finalHtml.replace(/It is recommended to check/gi, 'Check');
    finalHtml = finalHtml.replace(/It is important to make sure/gi, 'Make sure');
    
    return finalHtml;
}

const html = fs.readFileSync('article_hp-smart-app-scan-to-pc-not-showing.html', 'utf-8');
console.log(rewriteHtml(html));
