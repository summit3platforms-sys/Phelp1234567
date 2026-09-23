import { prisma } from '../src/lib/prisma';

async function updateCanonImages() {
  const updates = [
    {
      slug: 'how-to-print-directly-from-canon-camera-guide',
      image: '/images/articles/how-to-print-directly-from-canon-camera-guide.jpg',
      alt: 'DSLR camera connected directly to a compact photo printer on wooden desk',
      title: 'Print Directly from Canon Camera'
    },
    {
      slug: 'canon-pictbridge-not-connecting-camera-fix',
      image: '/images/articles/canon-pictbridge-not-connecting-camera-fix.jpg',
      alt: 'DSLR camera with USB cable beside photo printer showing connection indicator',
      title: 'Canon PictBridge Troubleshooting'
    },
    {
      slug: 'canon-imageclass-duplex-not-working-fix',
      image: '/images/articles/canon-imageclass-duplex-not-working-fix.jpg',
      alt: 'Canon imageCLASS office laser printer printing two-sided duplex paper smoothly',
      title: 'Canon imageCLASS Duplex Printing'
    },
    {
      slug: 'canon-imageclass-fax-error-fix',
      image: '/images/articles/canon-imageclass-fax-error-fix.jpg',
      alt: 'Multifunction laser printer touchscreen displaying fax line communication transmission error',
      title: 'Canon Fax Communication Error'
    },
    {
      slug: 'canon-imageclass-scan-to-email-setup-guide',
      image: '/images/articles/canon-imageclass-scan-to-email-setup-guide.jpg',
      alt: 'Laptop displaying network scan to email SMTP setup next to an office laser printer',
      title: 'Canon Scan to Email Setup'
    },
    {
      slug: 'canon-pro-series-vs-consumer-pixma-difference',
      image: '/images/articles/canon-pro-series-vs-consumer-pixma-difference.jpg',
      alt: 'Canon PRO wide-format photo printer side-by-side with consumer PIXMA inkjet printer',
      title: 'Canon PRO vs Consumer PIXMA'
    },
    {
      slug: 'canon-pixma-pro-300-ink-not-recognized-fix',
      image: '/images/articles/canon-pixma-pro-300-ink-not-recognized-fix.jpg',
      alt: 'Open carriage of professional Canon photo printer showing colored ink tanks with illuminated LEDs',
      title: 'Canon PIXMA PRO-300 Ink Tanks'
    },
    {
      slug: 'canon-pixma-pro-200-color-cast-issue-fix',
      image: '/images/articles/canon-pixma-pro-200-color-cast-issue-fix.jpg',
      alt: 'Photo printer outputting colorful print with ICC profile color swatch chart on desk',
      title: 'Canon PIXMA Color Calibration'
    },
    {
      slug: 'canon-imageprograf-ink-tank-not-detected-fix',
      image: '/images/articles/canon-imageprograf-ink-tank-not-detected-fix.jpg',
      alt: 'Large format plotter printer open ink tank chamber showing industrial ink cartridges and levers',
      title: 'Canon imagePROGRAF Ink Chamber'
    },
    {
      slug: 'canon-imageprograf-nozzle-check-failed-fix',
      image: '/images/articles/canon-imageprograf-nozzle-check-failed-fix.jpg',
      alt: 'Diagnostic printer nozzle check test pattern sheet with fine color grid test lines',
      title: 'Canon imagePROGRAF Nozzle Check'
    },
    {
      slug: 'canon-imageprograf-paper-feed-error-fix',
      image: '/images/articles/canon-imageprograf-paper-feed-error-fix.jpg',
      alt: 'Architectural wide-format plotter roll loading spindle and blue alignment guides',
      title: 'Canon Plotter Roll Paper Loading'
    },
    {
      slug: 'canon-selphy-prints-faded-fix',
      image: '/images/articles/canon-selphy-prints-faded-fix.jpg',
      alt: 'Compact dye-sublimation photo printer with side-by-side vibrant and faded photo prints',
      title: 'Canon SELPHY Faded Print Comparison'
    },
    {
      slug: 'canon-selphy-wifi-setup-guide',
      image: '/images/articles/canon-selphy-wifi-setup-guide.jpg',
      alt: 'Smartphone showing wireless printer connection screen next to compact photo printer with blue Wi-Fi light',
      title: 'Canon SELPHY Wireless Setup'
    },
    {
      slug: 'canon-selphy-vs-instax-square-link-comparison',
      image: '/images/articles/canon-selphy-vs-instax-square-link-comparison.jpg',
      alt: 'Canon SELPHY dye-sub photo printer beside Fujifilm Instax square instant printer on table',
      title: 'Canon SELPHY vs Instax Comparison'
    },
    {
      slug: 'canon-selphy-ink-cartridge-not-recognized-fix',
      image: '/images/articles/canon-selphy-ink-cartridge-not-recognized-fix.jpg',
      alt: 'Hand inserting a dye-sublimation ink ribbon cassette into the side compartment of a photo printer',
      title: 'Canon SELPHY Ink Ribbon Cassette'
    },
    {
      slug: 'canon-selphy-cp1500-not-printing-fix',
      image: '/images/articles/canon-selphy-cp1500-not-printing-fix.jpg',
      alt: 'Canon SELPHY CP1500 compact photo printer on wooden desk with error alert light',
      title: 'Canon SELPHY CP1500 Troubleshooting'
    }
  ];

  console.log(`Updating ${updates.length} Canon articles with dedicated featured images...`);

  for (const u of updates) {
    await prisma.article.update({
      where: { slug: u.slug },
      data: {
        featuredImage: u.image,
        featuredImageAlt: u.alt,
        featuredImageTitle: u.title
      }
    });
    console.log(`✓ Updated [${u.slug}] -> ${u.image}`);
  }

  console.log('All Canon articles updated successfully with dedicated images!');
}

updateCanonImages().catch(console.error).finally(() => prisma.$disconnect());
