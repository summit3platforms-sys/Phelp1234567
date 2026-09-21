import { prisma } from '../src/lib/prisma';

async function processText(html: string): Promise<string> {
    // 2. Jargon replacement
    html = html.replace(/bidirectional communication/gi, 'two-way connection');
    html = html.replace(/initialization/gi, 'setup');
    html = html.replace(/proprietary/gi, 'built-in');
    html = html.replace(/calibration protocol/gi, 'calibration process');
    html = html.replace(/firmware \(internal software\)/gi, 'firmware');
    html = html.replace(/firmware/gi, 'firmware (internal software)');
    html = html.replace(/configuration/gi, 'settings');

    // 4. Wordy openers
    html = html.replace(/In order to/gi, 'To');
    html = html.replace(/Due to the fact that/gi, 'Because');
    html = html.replace(/At this point in time/gi, 'Now');

    // 3. Action verbs
    html = html.replace(/(?:You need to|You should|It is recommended to|Please)\s+(open|click|press|check|make sure)/gi, (m, v) => {
        return v.charAt(0).toUpperCase() + v.slice(1);
    });

    const parts = html.split(/(<[^>]+>)/g);
    for (let i = 0; i < parts.length; i++) {
        if (!parts[i].startsWith('<')) {
            parts[i] = parts[i].replace(/([^.!?\n]+(?:[.!?]+|$)(?:\s+|$))/g, (match) => {
                const matchObj = match.match(/^(\s*)(.*?)(\s*)$/);
                if (!matchObj) return match;
                const [, leadingSpace, coreText, trailingSpace] = matchObj;
                const words = coreText.split(/\s+/);
                
                // Break sentences over 20 words
                if (words.length > 20) {
                    let splitIndex = Math.floor(words.length / 2);
                    let dropWord = false;
                    const conjunctions = ["and", "but", "because", "or", "so", "if", "while"];
                    for (let j = 8; j < words.length - 8; j++) {
                        const w = words[j].toLowerCase().replace(/[^a-z]/g, '');
                        if (conjunctions.includes(w)) {
                            splitIndex = j;
                            dropWord = true;
                            break;
                        }
                        if (words[j].endsWith(',')) {
                            splitIndex = j;
                            words[j] = words[j].slice(0, -1);
                            break;
                        }
                    }
                    
                    let first, second;
                    if (dropWord) {
                        first = words.slice(0, splitIndex).join(' ');
                        second = words.slice(splitIndex + 1).join(' ');
                    } else {
                        first = words.slice(0, splitIndex + 1).join(' ');
                        second = words.slice(splitIndex + 1).join(' ');
                    }
                    second = second.charAt(0).toUpperCase() + second.slice(1);
                    return leadingSpace + first + ". " + second + trailingSpace;
                }
                return match;
            });
        }
    }
    return parts.join('');
}

async function main() {
    const slugs = [
        "epson-error-code-2000020a-initialization-fault",
        "hp-deskjet-3755-wifi-setup-without-app",
        "hp-sprocket-cartridge-not-recognized-fix",
        "hp-web-jetadmin-not-discovering-printers",
        "kodak-dock-plus-flashing-lights-error-codes"
    ];

    const articles = await prisma.article.findMany({
        where: { slug: { in: slugs } }
    });

    console.log(`Found ${articles.length} articles.`);

    const updates = articles.map(async (article) => {
        const originalContent = article.content || '';
        const originalWordCount = originalContent.split(/\s+/).length;

        const newContent = await processText(originalContent);
        const newWordCount = newContent.split(/\s+/).length;

        console.log(`[${article.slug}] Words: ${originalWordCount} -> ${newWordCount}`);

        return prisma.article.update({
            where: { id: article.id },
            data: { content: newContent }
        });
    });

    await Promise.all(updates);
    console.log('All articles updated successfully.');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
