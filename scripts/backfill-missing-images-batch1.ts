import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'epson-printer-printing-blurry-double-vision-black-text-only',
    image: '/images/articles/epson-blurry-text.jpg'
  },
  {
    slug: 'epson-ecotank-prints-one-color-only',
    image: '/images/articles/epson-ecotank-tubes.jpg'
  },
  {
    slug: 'brother-printer-ts-02-5ghz-vs-2.4ghz',
    image: '/images/articles/brother-wifi-router.jpg'
  },
  {
    slug: 'kodak-mini-3-retro-stops-printing-halfway',
    image: '/images/articles/kodak-mini-jam.jpg'
  },
  {
    slug: 'kodak-verite-printer-troubleshooting-offline-setup',
    image: '/images/articles/kodak-verite-offline.jpg'
  }
];

async function main() {
  for (const update of updates) {
    try {
      const article = await prisma.article.update({
        where: { slug: update.slug },
        data: { featuredImage: update.image }
      });
      console.log(`✅ Updated ${update.slug} with image ${update.image}`);
    } catch (e: any) {
      console.log(`⚠️ Error updating ${update.slug}: ${e.message}`);
    }
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
