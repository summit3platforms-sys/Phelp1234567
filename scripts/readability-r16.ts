import { prisma } from '../src/lib/prisma';
import { parse, TextNode, HTMLElement } from 'node-html-parser';

const slugs = [
  "hp-printer-not-working-after-windows-update",
  "instax-mini-vs-square-vs-wide-film-compatibility-guide",
  "fix-xerox-024-toner-codes-third-party-chips-developer-errors",
  "hp-deskjet-2755e-cartridge-not-recognized",
  "xerox-phaser-6510-errors-versalink-c505-vs-c605"
];

function processText(text: string): string {
    let s = text;
    // Replace jargon
    s = s.replace(/\bbidirectional communication\b/gi, "two-way connection");
    s = s.replace(/\binitialization\b/gi, "setup");
    s = s.replace(/\bproprietary\b/gi, "built-in");
    s = s.replace(/\bcalibration protocol\b/gi, "calibration process");
    s = s.replace(/\bfirmware\b/g, "firmware (internal software)"); 
    s = s.replace(/\bFirmware\b/g, "Firmware (internal software)");
    s = s.replace(/\bconfiguration\b/gi, "settings");

    // Wordy openers
    s = s.replace(/\bIn order to\b/gi, "To");
    s = s.replace(/\bDue to the fact that\b/gi, "Because");
    s = s.replace(/\bAt this point in time\b/gi, "Now");

    // Action verbs
    s = s.replace(/\bYou should (open|click|press|check|make sure)\b/gi, (m, p1) => p1.charAt(0).toUpperCase() + p1.slice(1));
    s = s.replace(/\bYou must (open|click|press|check|make sure)\b/gi, (m, p1) => p1.charAt(0).toUpperCase() + p1.slice(1));
    s = s.replace(/\bYou need to (open|click|press|check|make sure)\b/gi, (m, p1) => p1.charAt(0).toUpperCase() + p1.slice(1));

    // Split sentences > 20 words
    // We only process if it looks like a sentence. We will split by simple regex.
    const sentences = s.match(/[^.!?]+[.!?]+/g) || [s];
    const newSentences = sentences.map(sentence => {
        let trimmed = sentence.trim();
        if (!trimmed) return sentence;
        
        const words = trimmed.split(/\s+/);
        if (words.length > 20) {
            // Find a conjunction in the middle 50% of the sentence
            const midStart = Math.floor(words.length * 0.25);
            const midEnd = Math.floor(words.length * 0.75);
            let splitIdx = -1;
            let replacement = "";
            let toRemove = 0;
            
            for (let i = midStart; i < midEnd; i++) {
                const w = words[i].toLowerCase().replace(/[,;]/, "");
                if (w === "and") { splitIdx = i; replacement = "Also,"; toRemove = 1; break; }
                if (w === "but") { splitIdx = i; replacement = "However,"; toRemove = 1; break; }
                if (w === "because") { splitIdx = i; replacement = "This is because"; toRemove = 1; break; }
                if (w === "which") { splitIdx = i; replacement = "This"; toRemove = 1; break; }
            }

            if (splitIdx !== -1) {
                const part1 = words.slice(0, splitIdx).join(" ").replace(/[,;]$/, "") + ".";
                const part2Words = words.slice(splitIdx + toRemove);
                if (part2Words.length > 0) {
                    part2Words[0] = part2Words[0].charAt(0).toUpperCase() + part2Words[0].slice(1);
                    const part2 = replacement + " " + part2Words.join(" ");
                    return (sentence.startsWith(" ") ? " " : "") + part1 + " " + part2 + (sentence.endsWith(" ") ? " " : "");
                }
            } else {
                // If no conjunction, just split at the middle
                const mid = Math.floor(words.length / 2);
                const part1 = words.slice(0, mid).join(" ").replace(/[,;]$/, "") + ".";
                const part2Words = words.slice(mid);
                part2Words[0] = part2Words[0].charAt(0).toUpperCase() + part2Words[0].slice(1);
                const part2 = part2Words.join(" ");
                return (sentence.startsWith(" ") ? " " : "") + part1 + " " + part2 + (sentence.endsWith(" ") ? " " : "");
            }
        }
        return sentence;
    });

    return newSentences.join(s.includes("\n") ? "\n" : " "); // attempt to preserve some spacing
}

function traverse(node: any) {
    if (node instanceof TextNode) {
        if (node.rawText && node.rawText.trim().length > 0) {
            node.rawText = processText(node.rawText);
        }
    } else if (node instanceof HTMLElement) {
        // don't process code blocks or pre or a href links to avoid breaking them completely, though text nodes inside links should be fine, actually wait, text nodes in links might be split. It's safer to just process all text nodes.
        if (node.tagName && (node.tagName.toLowerCase() === 'code' || node.tagName.toLowerCase() === 'pre')) {
            return;
        }
        for (const child of node.childNodes) {
            traverse(child);
        }
    }
}

async function main() {
    const articles = await prisma.article.findMany({
        where: { slug: { in: slugs } }
    });

    const updatePromises = articles.map(async (article) => {
        const root = parse(article.content);
        traverse(root);
        const newContent = root.toString();
        
        const oldWordCount = article.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
        const newWordCount = newContent.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;

        await prisma.article.update({
            where: { id: article.id },
            data: { content: newContent, wordCount: newWordCount }
        });
        
        return { slug: article.slug, oldWordCount, newWordCount };
    });

    const results = await Promise.all(updatePromises);
    console.log("Success! Updated articles:");
    console.table(results);
}

main().catch(console.error).finally(() => prisma.$disconnect());
