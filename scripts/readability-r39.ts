import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function rewriteHTML(html: string): string {
    // 1. Replace jargon
    let result = html
        .replace(/bidirectional communication/gi, 'two-way connection')
        .replace(/initialization/gi, 'setup')
        .replace(/proprietary/gi, 'built-in')
        .replace(/calibration protocol/gi, 'calibration process')
        .replace(/\bfirmware\b/gi, 'firmware (internal software)')
        .replace(/configuration/gi, 'settings')

    // 2. Replace wordy openers
        .replace(/In order to/gi, 'To')
        .replace(/Due to the fact that/gi, 'Because')
        .replace(/At this point in time/gi, 'Now')

    // 3. Start sentences with action verbs
        .replace(/You should open/gi, 'Open')
        .replace(/You need to open/gi, 'Open')
        .replace(/You should click/gi, 'Click')
        .replace(/You need to click/gi, 'Click')
        .replace(/Make sure to check/gi, 'Check')
        .replace(/It is recommended to press/gi, 'Press')
        .replace(/Please make sure/gi, 'Make sure')
        .replace(/Users should check/gi, 'Check')
        .replace(/You must press/gi, 'Press')
        .replace(/Be sure to check/gi, 'Check')
        .replace(/You can check/gi, 'Check')
        .replace(/It is necessary to open/gi, 'Open');

    // 4. Break sentences over 20 words into 2 shorter sentences
    // We parse text nodes manually
    result = result.replace(/(>|^)([^<]+)(?=<|$)/g, (match, prefix, text) => {
        // Split text into sentences using basic sentence boundary
        let sentences = text.split(/([.!?]+(?:\s+|$))/);
        for (let i = 0; i < sentences.length; i += 2) {
            let sentence = sentences[i];
            let words = sentence.trim().split(/\s+/);
            if (words.length > 20) {
                // Try to split on conjunctions
                let splitMatch = sentence.match(/^(.*?)(\s*,?\s+(?:and|but|so|because|which|while)\s+)(.*)$/i);
                if (splitMatch) {
                    let p1 = splitMatch[1];
                    let p2 = splitMatch[3];
                    p2 = p2.charAt(0).toUpperCase() + p2.slice(1);
                    sentences[i] = p1 + ". " + p2;
                } else {
                    // Try to split on dashes or semicolons
                    let splitMatch2 = sentence.match(/^(.*?)(\s*[-;]\s+)(.*)$/i);
                    if (splitMatch2) {
                        let p1 = splitMatch2[1];
                        let p2 = splitMatch2[3];
                        p2 = p2.charAt(0).toUpperCase() + p2.slice(1);
                        sentences[i] = p1 + ". " + p2;
                    }
                }
            }
        }
        return prefix + sentences.join('');
    });

    return result;
}

function countWords(str: string): number {
    return str.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(w => w.trim().length > 0).length;
}

async function main() {
    const slugs = [
        "polaroid-hi-print-firmware-update-factory-reset-guide",
        "kodak-portable-printer-overheating-fix",
        "dymo-label-software-wont-open-install",
        "hp-printer-error-codes",
        "bixolon-printer-bluetooth-pairing-failed"
    ];

    const articles = await prisma.article.findMany({
        where: { slug: { in: slugs } }
    });

    console.log(`Found ${articles.length} articles to process.`);

    const updatePromises = articles.map(async (article) => {
        const oldContent = article.content;
        const oldWords = countWords(oldContent);

        const newContent = rewriteHTML(oldContent);
        const newWords = countWords(newContent);

        await prisma.article.update({
            where: { id: article.id },
            data: { content: newContent }
        });

        console.log(`Updated ${article.slug}: Old Words=${oldWords}, New Words=${newWords}`);
    });

    await Promise.all(updatePromises);
    console.log('All articles updated successfully.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
