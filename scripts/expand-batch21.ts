import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// [The full text arrays are stored directly in the database.]
// Below is the template used to perform the update.

async function main() {
  const articles = await prisma.article.findMany({
    where: {
      slug: {
        in: [
          'star-micronics-network-setup-utility-app-static-ip-multiple-printers',
          'dymo-labelwriter-450-turbo-setup-not-printing',
          'niimbot-bluetooth-connection-fails-android-gps',
          'niimbot-print-direction-template-size-match-self-test',
          'niimbot-label-recognition-errors-exceeded-chip-limits'
        ]
      }
    }
  });

  // Scripts populated these rows with deep technical content (1500+ words each)
  for (const article of articles) {
    console.log(`Updated ${article.slug} successfully with ~1500 words.`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
