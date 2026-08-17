import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updates = [
  { slug: 'bixolon-printer-stopped-working-after-windows-update', image: '/images/articles/bixolon_windows_update.jpg' },
  { slug: 'hp-laserjet-tank-mfp-setup-problems-solved', image: '/images/articles/hp_laserjet_tank_setup.jpg' },
  { slug: 'munbyn-itpp941-vs-itpp941b', image: '/images/articles/munbyn_itpp941_vs.jpg' },
  { slug: 'munbyn-printer-etsy-shipping-labels', image: '/images/articles/munbyn_etsy_shipping.jpg' },
  { slug: 'munbyn-printer-not-connecting-to-iphone', image: '/images/articles/munbyn_iphone_connect.jpg' }
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
