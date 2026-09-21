import { prisma } from '../src/lib/prisma';
import * as fs from 'fs';

async function main() {
    const slugs = [
        "hp-printer-certificate-error-network",
        "fix-star-micronics-printer-blank-receipts-faded-print-paper-errors",
        "dymo-connect-vs-dymo-label-software-difference",
        "brother-printer-error-50-fuser-unit",
        "brother-printer-wps-button-not-connecting"
    ];
    const articles = await prisma.article.findMany({
        where: { slug: { in: slugs } },
        select: { slug: true, content: true }
    });
    fs.writeFileSync('my_articles.json', JSON.stringify(articles, null, 2));
    console.log("Articles fetched and saved to my_articles.json");
}

main().catch(console.error).finally(() => prisma.$disconnect());
