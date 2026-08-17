import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'hp-printer-wont-turn-on-no-power-light',
    image: '/images/articles/hp_no_power.jpg',
    alt: 'HP printer with unplugged power cord symbol',
    caption: 'A printer showing no signs of power'
  },
  {
    slug: 'hp-printer-not-showing-up-on-macos-sequoia',
    image: '/images/articles/hp_mac_sequoia.jpg',
    alt: 'MacBook and HP printer with broken Wi-Fi symbol',
    caption: 'Connection issues between macOS and HP printers'
  },
  {
    slug: 'cancel-instant-ink-keep-printer-working',
    image: '/images/articles/hp_cancel_instant_ink.jpg',
    alt: 'Ink cartridge with canceled subscription icon',
    caption: 'Canceling HP Instant Ink'
  },
  {
    slug: 'hp-printer-fax-error-no-dial-tone',
    image: '/images/articles/hp_fax_no_dial_tone.jpg',
    alt: 'HP OfficeJet printer with disconnected phone receiver icon',
    caption: 'Fax error indicating no dial tone detected'
  },
  {
    slug: 'hp-laserjet-m111w-offline-fix',
    image: '/images/articles/hp_laserjet_m111w_offline.jpg',
    alt: 'HP LaserJet printer with broken Wi-Fi signal icon',
    caption: 'HP LaserJet M111w offline status'
  },
  {
    slug: 'hp-officejet-3830-carriage-jam-fix',
    image: '/images/articles/hp_carriage_jam.jpg',
    alt: 'Ink cartridge carriage jammed with crumpled paper inside HP printer',
    caption: 'Clearing a carriage jam inside an HP OfficeJet'
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
