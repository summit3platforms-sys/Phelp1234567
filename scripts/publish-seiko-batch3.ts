import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Seiko SLP Self-Test, Calibration & Flashing Light Error Meanings",
    slug: 'seiko-slp-self-test-calibration-flashing-light-error',
    seoTitle: "Seiko SLP Self-Test, Calibration & Flashing Lights",
    metaDescription: "Learn how to perform a Seiko SLP form feed button self-test and calibrate label sensors. Decode what a flashing or solid green status light means.",
    excerpt: "The single button and LED light on the front of a Seiko SLP can tell you everything you need to know about the printer's hardware status.",
    errorCode: 'Flashing Light',
    tags: 'seiko slp form feed button self test, seiko label printer status light flashing, seiko slp calibration guide, seiko printer green light meaning',
    wordCount: 850,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: hardwareCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To calibrate a Seiko SLP and perform a self-test: 1) Ensure the printer is plugged in but turned OFF. 2) Press and hold the main button on the front of the printer. 3) While continuing to hold the button down, unplug the power cable from the back, wait 3 seconds, and plug it back in. 4) Release the button. 5) The printer will advance the label roll to calibrate the optical sensor, and then it will print a Self-Test label showing the firmware version and a grid pattern. This confirms the printhead and feed motor are working perfectly.",
    content: `<h2>Decoding the Seiko Status Light</h2>
<p>Because there is no screen, the single LED light on the front of the SLP is your only diagnostic tool.</p>
<ul>
  <li><strong>Solid Green Light:</strong> The printer is powered on, ready, and communicating with the PC perfectly.</li>
  <li><strong>No Light:</strong> The printer has no power. Check the AC adapter connection. Note: Some older models have a physical power switch on the back.</li>
  <li><strong>Flashing Green Light:</strong> This indicates an error state.
    <ul>
      <li><strong>Out of Paper:</strong> The roll is empty or not fed into the sensor slot correctly.</li>
      <li><strong>Cover Open:</strong> The lid is not snapped down on both sides.</li>
      <li><strong>Print Job Stuck:</strong> The printer is receiving corrupted data from the PC. Cancel the print job in Windows and power cycle the printer.</li>
    </ul>
  </li>
</ul>

<h2>SLP Calibration Guide</h2>
<p>If your labels are printing off-center (e.g., the text is printing across the gap between two labels), the printer's optical sensor needs to be re-calibrated. Running the self-test (described above) automatically forces a recalibration. When you load a new roll of labels, always push them firmly into the slot until the motor grabs them and auto-feeds the first label to the tear-off edge. Do not try to manually force the labels all the way through.</p>`
  },
  {
    title: "Seiko SLP Networking: Serial Adapters, Baud Rates & Multi-Printer Setup",
    slug: 'seiko-slp-networking-serial-adapters-baud-rates-multi-printer',
    seoTitle: "Seiko SLP Networking: Serial Adapters & Multi-Printer",
    metaDescription: "Troubleshooting advanced Seiko SLP deployments. Learn how to configure Baud Rates for serial connections, use Serial-to-USB adapters, and manage multiple printers.",
    excerpt: "Deploying legacy Seiko SLP printers in modern environments often requires navigating USB adapters, COM port assignments, and shared network naming.",
    errorCode: null,
    tags: 'seiko slp network printer naming, seiko label printer baud rate setting, seiko slp serial to usb adapter, seiko printer multiple printers same network',
    wordCount: 950,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: setupCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To set up a Seiko SLP using a Serial-to-USB adapter: 1) Because modern PCs lack 9-pin Serial ports, you must use an adapter (like an FTDI or Prolific chipset cable). 2) Plug in the adapter and install its Windows driver. 3) Open Device Manager, expand 'Ports (COM & LPT)', and find the adapter (e.g., 'USB Serial Port COM3'). 4) Right-click it > Properties > Port Settings. Change the Bits per second (Baud Rate) to 9600, Data bits to 8, Parity to None, Stop bits to 1. 5) In your Seiko printer properties, assign the printer to that exact COM3 port.",
    content: `<h2>Managing Multiple Printers on the Same Network</h2>
<p>If you have three Seiko SLP 650 printers attached to three different PCs, but you want all PCs to be able to print to any of the printers across the network, you must use Windows Printer Sharing.</p>
<ol>
  <li><strong>Network Printer Naming:</strong> On the host PC (the one physically connected to the printer via USB), go to Printer Properties &gt; Sharing. Check "Share this printer". Name it something very short and without spaces (e.g., <code>SLP650_Desk1</code>). Do not use long names like "Seiko Smart Label Printer 650 Front Office", as legacy software will often truncate the network path and fail to print.</li>
  <li>On the client PC, go to Add Printer, and type the network path: <code>\\\\HostPCName\\SLP650_Desk1</code>.</li>
</ol>

<h2>Serial Port Baud Rate Settings (SLP 650se / 440)</h2>
<p>Industrial users still rely on the RS-232 serial port on the back of "SE" edition printers to connect directly to scales or proprietary medical equipment.</p>
<ul>
  <li>If the scale sends a weight measurement to the printer, but the printer just prints a string of random garbage characters (like <code>$@#%^&</code>), your <strong>Baud Rate</strong> is mismatched.</li>
  <li>The equipment sending the data and the printer receiving the data must speak at the exact same speed. Check your medical/industrial equipment manual. If the equipment sends data at 19200 baud, you must configure the Seiko's COM port in Windows to 19200 baud to match it.</li>
</ul>`
  }
];

async function main() {
  const brandSlug = 'seiko-instruments';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 3 (Clusters E & F: Hardware Tests & Networking) for brand: ${brand.name}`);

  for (const article of articles) {
    try {
      await prisma.article.deleteMany({ where: { slug: article.slug } });
    } catch (e) {}

    try {
      const created = await prisma.article.create({
        data: {
          title: article.title,
          slug: article.slug,
          content: article.content,
          seoTitle: article.seoTitle,
          metaDescription: article.metaDescription,
          excerpt: article.excerpt,
          errorCode: article.errorCode,
          tags: article.tags,
          wordCount: article.wordCount,
          difficultyLevel: article.difficultyLevel,
          timeToFix: article.timeToFix,
          featuredSnippet: article.featuredSnippet,
          status: 'published',
          publishedAt: new Date(),
          brandId: brand.id,
          categoryId: article.categoryId,
          authorId: article.authorId,
          reviewerId: article.reviewerId,
          reviewedAt: new Date(),
        }
      });
      console.log(`✅ Published: "${created.title}"`);
    } catch (e: any) {
      console.log(`⚠️ Error for "${article.title}": ${e.message}`);
    }
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
