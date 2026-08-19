import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const updates = [
    {
      slug: 'munbyn-itpp130-calibration',
      featuredImage: '/images/articles/munbyn-itpp130-calibration.jpg',
      featuredImageAlt: 'A person calibrating a Munbyn ITPP130 thermal label printer on a desk.',
      featuredImageCaption: 'Calibrating your Munbyn ITPP130 ensures precise label printing.'
    },
    {
      slug: 'munbyn-printer-app-not-working-android',
      featuredImage: '/images/articles/munbyn-printer-app-not-working-android.jpg',
      featuredImageAlt: 'A person looking at a smartphone with the Munbyn app, troubleshooting an issue.',
      featuredImageCaption: 'Troubleshooting the Munbyn app on an Android smartphone.'
    }
  ];

  for (const data of updates) {
    try {
      await prisma.article.update({
        where: { slug: data.slug },
        data: {
          featuredImage: data.featuredImage,
          featuredImageAlt: data.featuredImageAlt,
          featuredImageCaption: data.featuredImageCaption,
        },
      });
      console.log(`Updated article: ${data.slug}`);
    } catch (error) {
      console.error(`Failed to update article ${data.slug}:`, error);
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
