import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'kodak-ink-cartridge-compatibility-guide-series-10-vs-30',
    image: '/images/articles/kodak-cartridges.jpg'
  },
  {
    slug: 'kodak-printer-flashing-red-light-error',
    image: '/images/articles/kodak-red-light.jpg'
  },
  {
    slug: 'epson-et-4760-error-code-guide',
    image: '/images/articles/epson-4760-error.jpg'
  },
  {
    slug: 'kodak-dock-plus-paper-jam',
    image: '/images/articles/kodak-dock-jam.jpg'
  },
  {
    slug: 'epson-fatal-error-printer-wont-start-power-supply',
    image: '/images/articles/epson-fatal-power.jpg'
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
