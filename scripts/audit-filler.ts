import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    select: { id: true, slug: true, content: true, brand: { select: { name: true } } },
    where: { status: 'published' }
  });

  const suspicious: any[] = [];

  for (const a of articles) {
    const brand = a.brand?.name ?? 'unknown';
    // Split into sentences
    const text = a.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    
    // Check frequency of each sentence
    const sentMap: Record<string, number> = {};
    for (const s of sentences) {
      const trimmed = s.trim().toLowerCase();
      if (trimmed.length > 30) {
        sentMap[trimmed] = (sentMap[trimmed] || 0) + 1;
      }
    }

    for (const [sent, count] of Object.entries(sentMap)) {
      if (count >= 3) {
        suspicious.push({ slug: a.slug, brand, count, sent: sent.substring(0, 100) });
      }
    }
  }

  console.log('Articles with sentences repeated 3+ times:', suspicious.length);
  suspicious.forEach(x => {
    console.log(`- [${x.brand}] ${x.slug} (${x.count}x): "${x.sent}..."`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
