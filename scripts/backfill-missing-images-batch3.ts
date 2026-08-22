import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'how-to-reset-kodak-printer-to-factory-settings',
    image: '/images/articles/kodak-reset-button.jpg'
  },
  {
    slug: 'kodak-instant-printer-app-not-connecting',
    image: '/images/articles/kodak-app-connect.jpg'
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
