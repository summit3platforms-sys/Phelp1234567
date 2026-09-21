import { prisma } from '../src/lib/prisma';
import fs from 'fs';
async function main() {
    const slugs = ["printer-wont-connect", "how-to-print-from-macos-to-legacy-kodak-printer", "brother-printer-error-40-overheating", "niimbot-paper-loading-baffle-guide-lid-not-closing", "hp-neverstop-toner-not-filling-correctly"];
    const articles = await prisma.article.findMany({ where: { slug: { in: slugs } }});
    fs.writeFileSync('5-articles.json', JSON.stringify(articles, null, 2));
}
main().finally(() => prisma.$disconnect());
