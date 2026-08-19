import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const updates = [
    {
      slug: 'how-to-calibrate-munbyn-label-printer',
      featuredImage: '/images/articles/how-to-calibrate-munbyn-label-printer.jpg',
      featuredImageAlt: 'Calibrating a Munbyn label printer with a diagnostic printout',
      featuredImageCaption: 'Calibrating a Munbyn label printer with a diagnostic printout',
    }
  ];

  for (const update of updates) {
    const article = await prisma.article.findUnique({
      where: { slug: update.slug },
    });

    if (article) {
      await prisma.article.update({
        where: { slug: update.slug },
        data: {
          featuredImage: update.featuredImage,
          featuredImageAlt: update.featuredImageAlt,
          featuredImageCaption: update.featuredImageCaption,
        },
      });
      console.log(`Updated article: ${update.slug}`);
    } else {
      console.log(`Article not found: ${update.slug}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
