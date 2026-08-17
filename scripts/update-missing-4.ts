import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updates = [
  { slug: 'bixolon-printer-red-and-green-light-blinking', image: '/images/articles/bixolon_red_green.jpg' },
  { slug: 'munbyn-printer-factory-reset', image: '/images/articles/munbyn_factory_reset.jpg' },
  { slug: 'bixolon-printer-wont-feed-paper', image: '/images/articles/bixolon_feed_paper.jpg' },
  { slug: 'bixolon-printer-not-working-with-square-pos', image: '/images/articles/bixolon_square_pos.jpg' }
];

async function main() {
  for (const item of updates) {
    await prisma.article.update({
      where: { slug: item.slug },
      data: { featuredImage: item.image }
    });
    console.log('✅ Updated:', item.slug);
  }
}

main().finally(() => prisma.$disconnect());
