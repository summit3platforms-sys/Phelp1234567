import { prisma } from './src/lib/prisma';
async function main() {
    const arts = await prisma.article.findMany({ select: { slug: true } });
    console.log(arts.map(a => a.slug).filter(s => s.includes('xerox')));
}
main().catch(console.error);
