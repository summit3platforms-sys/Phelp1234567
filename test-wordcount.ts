import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const articles = await prisma.article.findMany();
    for (const a of articles) {
        console.log(a.slug, a.wordCount);
    }
}
main().finally(() => prisma.$disconnect());
