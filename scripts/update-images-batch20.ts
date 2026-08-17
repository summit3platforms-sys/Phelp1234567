import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updates = [
  { slug: 'hp-web-jetadmin-not-discovering-printers', image: '/images/articles/hp_web_jetadmin.jpg' },
  { slug: 'hp-printer-certificate-error-network', image: '/images/articles/hp_cert_error.jpg' },
  { slug: 'hp-printer-802-1x-authentication-failed', image: '/images/articles/hp_8021x.jpg' },
  { slug: 'hp-printer-not-appearing-airprint-list-iphone', image: '/images/articles/hp_airprint.jpg' },
  { slug: 'hp-utility-not-opening-mac', image: '/images/articles/hp_utility_mac.jpg' },
  { slug: 'hp-deskjet-4155e-wont-connect-wifi', image: '/images/articles/hp_4155e_wifi.jpg' },
  { slug: 'hp-envy-6055e-paper-jam-no-paper', image: '/images/articles/hp_envy_jam.jpg' },
  { slug: 'hp-officejet-pro-9015e-printhead-missing-failed', image: '/images/articles/hp_9015e_printhead.jpg' },
];

async function main() {
  console.log('Updating images for Batch 20...');
  
  for (const item of updates) {
    await prisma.article.update({
      where: { slug: item.slug },
      data: { featuredImage: item.image }
    });
    console.log('✅ Updated:', item.slug);
  }
  
  console.log('All 8 images mapped successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
