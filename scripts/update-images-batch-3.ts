import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'hp-envy-inspire-7255e-setup-stuck',
    image: '/images/articles/hp_envy_setup_stuck.jpg',
    alt: 'HP Envy Inspire printer with setup error indicator',
    caption: 'HP Envy Inspire 7255e experiencing a setup issue'
  },
  {
    slug: 'uninstall-hp-smart-app-without-breaking-printer',
    image: '/images/articles/uninstall_hp_smart.jpg',
    alt: 'Uninstalling HP Smart App from smartphone with printer in background',
    caption: 'Removing the HP Smart app does not break core printing functionality'
  },
  {
    slug: 'hp-smart-app-scan-to-pc-not-showing',
    image: '/images/articles/hp_scan_to_pc_error.jpg',
    alt: 'HP Scanner failing to connect to PC',
    caption: 'Scan to PC connection errors often stem from network isolation'
  },
  {
    slug: 'hp-smart-tank-7602-fax-not-working',
    image: '/images/articles/hp_smart_tank_fax_error.jpg',
    alt: 'HP Smart Tank printer with fax error symbol',
    caption: 'Fax failure on the HP Smart Tank 7602'
  },
  {
    slug: 'hp-plus-third-party-ink-blocked-after-update',
    image: '/images/articles/hp_plus_ink_blocked.jpg',
    alt: 'Ink cartridge with digital lock icon',
    caption: 'HP+ Dynamic Security blocks third-party ink cartridges'
  },
  {
    slug: 'hp-envy-6055e-printhead-error',
    image: '/images/articles/hp_envy_printhead_error.jpg',
    alt: 'Inside an HP Envy printer showing a printhead warning',
    caption: 'Printhead communication errors require reseating the cartridges'
  }
];

async function main() {
  for (const item of updates) {
    try {
      await prisma.article.update({
        where: { slug: item.slug },
        data: {
          featuredImage: item.image,
          featuredImageAlt: item.alt,
          featuredImageCaption: item.caption
        }
      });
      console.log(`✅ Updated images for: ${item.slug}`);
    } catch (e: any) {
      console.log(`⚠️ Failed to update ${item.slug}:`, e.message);
    }
  }
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
