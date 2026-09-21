import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

function getWordCount(text: string): number {
    return text.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(w => w.length > 0).length;
}

async function main() {
    const slugs = [
        "canon-pixma-ts3522-not-printing",
        "hp-printer-ghosting-duplicate-faint-image",
        "polaroid-hi-print-wont-turn-on-charge-port-fix",
        "rollo-printer-etsy-ebay-shipping-labels-setup",
        "star-micronics-printer-wont-cut-double-cut-half-cuts"
    ];

    const articles = await prisma.article.findMany({
        where: { slug: { in: slugs } }
    });

    console.log(`Found ${articles.length} articles.`);

    const updatePromises = articles.map(async (article) => {
        const originalContent = article.content;
        const originalWordCount = getWordCount(originalContent);

        const $ = cheerio.load(originalContent, null, false);

        $('p, li, summary, h2, h3').each(function() {
            let h = $(this).html();
            if (!h) return;
            
            // Jargon replacements
            h = h.replace(/\bbidirectional communication\b/gi, "two-way connection");
            h = h.replace(/\binitialization\b/gi, "setup");
            h = h.replace(/\bproprietary\b/gi, "built-in");
            h = h.replace(/\bcalibration protocol\b/gi, "calibration process");
            h = h.replace(/\bfirmware\b(?! \(internal software\))/gi, "firmware (internal software)");
            h = h.replace(/\bconfiguration\b/gi, "settings");

            // Wordy openers
            h = h.replace(/In order to /gi, "To ");
            h = h.replace(/Due to the fact that /gi, "Because ");
            h = h.replace(/At this point in time,? /gi, "Now, ");
            
            // Start sentences with action verbs (approximate fix for some patterns)
            h = h.replace(/You should open /gi, "Open ");
            h = h.replace(/You need to click /gi, "Click ");
            h = h.replace(/Please press /gi, "Press ");
            h = h.replace(/It is important to check /gi, "Check ");
            h = h.replace(/Be sure to make sure /gi, "Make sure ");
            
            let segments = h.split(/(?<=[.?!])\s+(?=[A-Z<])/);
            let newSegments = segments.map(seg => {
                let stripped = seg.replace(/<[^>]+>/g, '');
                let words = stripped.split(/\s+/).filter(w => w.length > 0);
                
                // Break sentence > 20 words
                if (words.length > 20) {
                    let splitRegex = /(, and |, but |; | because |, which | that )/i;
                    let parts = seg.split(splitRegex);
                    if (parts.length > 1) {
                        let bestSplitIdx = -1;
                        let minDiff = 9999;
                        for(let i=1; i<parts.length; i+=2) {
                            let leftPart = parts.slice(0, i).join('');
                            let openTags = (leftPart.match(/</g) || []).length;
                            let closeTags = (leftPart.match(/>/g) || []).length;
                            
                            // Naive check: tags are balanced
                            if (openTags === closeTags) {
                                let leftWords = leftPart.replace(/<[^>]+>/g, '').split(/\s+/).filter(w => w.length > 0).length;
                                let rightWords = parts.slice(i+1).join('').replace(/<[^>]+>/g, '').split(/\s+/).filter(w => w.length > 0).length;
                                if (Math.abs(leftWords - rightWords) < minDiff) {
                                    minDiff = Math.abs(leftWords - rightWords);
                                    bestSplitIdx = i;
                                }
                            }
                        }
                        
                        if (bestSplitIdx !== -1) {
                            let leftStr = parts.slice(0, bestSplitIdx).join('').trim();
                            let delimiter = parts[bestSplitIdx].toLowerCase();
                            let rightStr = parts.slice(bestSplitIdx+1).join('').trim();
                            
                            let rightFirstCharIdx = rightStr.search(/[a-zA-Z]/);
                            if (rightFirstCharIdx !== -1) {
                                rightStr = rightStr.substring(0, rightFirstCharIdx) + rightStr.charAt(rightFirstCharIdx).toUpperCase() + rightStr.substring(rightFirstCharIdx + 1);
                            }

                            if (delimiter === ', and ' || delimiter === ' and ') {
                                return leftStr + ". And " + rightStr;
                            } else if (delimiter === ', but ' || delimiter === ' but ') {
                                return leftStr + ". But " + rightStr;
                            } else if (delimiter === '; ') {
                                return leftStr + ". " + rightStr;
                            } else if (delimiter === ' because ') {
                                return leftStr + ". This happens because " + rightStr;
                            } else if (delimiter === ', which ') {
                                return leftStr + ". This " + rightStr;
                            } else if (delimiter === ' that ') {
                                return leftStr + ". This means that " + rightStr;
                            }
                        }
                    } else {
                        // fallback to splitting at comma if > 20 words
                        let commaParts = seg.split(', ');
                        if (commaParts.length > 1) {
                            let leftPart = commaParts[0];
                            let openTags = (leftPart.match(/</g) || []).length;
                            let closeTags = (leftPart.match(/>/g) || []).length;
                            if (openTags === closeTags) {
                                let leftStr = leftPart;
                                let rightStr = commaParts.slice(1).join(', ');
                                let rightFirstCharIdx = rightStr.search(/[a-zA-Z]/);
                                if (rightFirstCharIdx !== -1) {
                                    rightStr = rightStr.substring(0, rightFirstCharIdx) + rightStr.charAt(rightFirstCharIdx).toUpperCase() + rightStr.substring(rightFirstCharIdx + 1);
                                }
                                return leftStr + ". " + rightStr;
                            }
                        }
                    }
                }
                return seg;
            });
            
            $(this).html(newSegments.join(' '));
        });

        const newContent = $.html();
        const newWordCount = getWordCount(newContent);
        
        await prisma.article.update({
            where: { id: article.id },
            data: { content: newContent }
        });

        console.log(`Updated [${article.slug}]: Word count changed from ${originalWordCount} to ${newWordCount}`);
        return { slug: article.slug, originalWordCount, newWordCount };
    });

    await Promise.all(updatePromises);
    console.log("All articles updated successfully.");
}

main()
    .catch(e => {
        console.error("Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
