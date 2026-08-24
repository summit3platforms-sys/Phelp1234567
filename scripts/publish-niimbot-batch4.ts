import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix NIIMBOT Won't Turn On, Won't Charge & Battery Drain",
    slug: 'niimbot-wont-turn-on-wont-charge-battery-drain',
    seoTitle: "Fix NIIMBOT Won't Turn On, Won't Charge & Fast Battery Drain",
    metaDescription: "Is your NIIMBOT printer dead, refusing to charge from a laptop, or draining battery instantly? Learn how to fix 'Insufficient Power' errors and decode charging lights.",
    excerpt: "Lithium-ion batteries in NIIMBOT printers can go into deep sleep mode or reject high-wattage smart chargers. Here is how to revive a dead printer.",
    errorCode: 'No Power',
    tags: 'niimbot wont charge from laptop, niimbot battery draining fast, niimbot printer wont turn on, niimbot charging light meaning, niimbot usb port insufficient power',
    wordCount: 1000,
    difficultyLevel: 'Beginner',
    timeToFix: '15 minutes',
    categoryId: hardwareCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a NIIMBOT that won't charge or turn on: 1) Stop using Laptop Ports or Apple Fast Chargers. If you plug a NIIMBOT into a MacBook USB-C fast charger, the printer's circuit board will block the current entirely for safety because it lacks a PD (Power Delivery) handshake chip. 2) The Fix: You must use an old, standard 5V/1A or 5V/2A USB-A wall charger (like an old iPhone cube) and a USB-A to USB-C cable. 3) Dead Battery: If the printer hasn't been used in months, the battery is in deep sleep. Leave it plugged into a 5V/1A charger for 45 minutes; the charging light may remain off initially before waking up.",
    content: `<h2>Decoding NIIMBOT Charging Lights</h2>
<p>Understanding what the single LED indicator is telling you is the first step to fixing power issues.</p>
<ul>
  <li><strong>Flashing Red:</strong> Battery is critically low (under 10%). The printer may shut down mid-print.</li>
  <li><strong>Flashing Red (while plugged in):</strong> On some models, this indicates the battery is deeply discharged and is trickle-charging.</li>
  <li><strong>Flashing Green/Blue (while plugged in):</strong> The printer is actively charging normally.</li>
  <li><strong>Solid Green/Blue (while plugged in):</strong> The battery is 100% full. Unplug it to prevent battery degradation.</li>
</ul>

<h2>Why It Won't Charge From a Laptop (Insufficient Power)</h2>
<p>If you plug your NIIMBOT D110 or B21 into your laptop's USB port and receive a Windows popup saying "USB Port Insufficient Power", or the printer just stays dead:</p>
<ol>
  <li>Many laptop USB ports limit output to 500mA (0.5 Amps). A completely dead thermal printer requires at least 1 Amp to wake up the charging circuit.</li>
  <li>Conversely, if you plug it into a 65W USB-C laptop <em>charger</em>, the smart charger expects the NIIMBOT to negotiate voltage via Power Delivery (PD). The NIIMBOT cannot do this, so the charger outputs 0 Watts.</li>
  <li><strong>Solution:</strong> Only use a basic 5V/1A or 5V/2A USB-A wall cube.</li>
</ol>

<h2>Why Is the Battery Draining So Fast?</h2>
<p>If your NIIMBOT battery dies after only printing 20 labels:</p>
<ul>
  <li><strong>High Density Printing:</strong> Thermal printing requires massive electrical current. If you print a giant solid black box, the battery has to heat 90% of the printhead simultaneously. This drains the battery 10x faster than printing a simple text name tag.</li>
  <li><strong>Cold Environments:</strong> Lithium-ion batteries lose up to 40% of their efficiency in freezing temperatures. Do not leave the printer in a cold car overnight.</li>
</ul>`
  },
  {
    title: "NIIMBOT General Setup: Factory Reset, Cables & Business Pricing",
    slug: 'niimbot-general-setup-factory-reset-cables-business-pricing',
    seoTitle: "NIIMBOT Setup: Factory Reset, Cable Labels & Pricing",
    metaDescription: "Learn how to factory reset a NIIMBOT printer. Plus, setup guides for printing small business retail pricing labels and P-type cable/wire flags.",
    excerpt: "Beyond basic address labels, NIIMBOT is highly popular for printing folded wire flags and retail price tags. Here is how to configure the templates.",
    errorCode: null,
    tags: 'niimbot factory reset how to, niimbot for cable wire labeling, niimbot for small business pricing labels',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: setupCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To Factory Reset a NIIMBOT printer: 1) Turn the printer ON. 2) Press and hold the main power button for 10-15 seconds without letting go. The printer will beep, flash its LED lights, and shut down. This clears the Bluetooth cache and resets the internal gap sensor calibration. 3) To print Cable/Wire labels: In the NIIMBOT app, search for 'Cable' or 'P-Type' templates. These templates create a mirrored design on a long skinny label so you can fold the label over a wire, causing the two sticky sides to mate perfectly like a flag.",
    content: `<h2>How to Factory Reset a NIIMBOT Printer</h2>
<p>If your NIIMBOT is behaving erratically—such as feeding 5 blank labels at a time, failing to connect to Bluetooth despite unpairing, or blinking red without a paper jam—a hard hardware reset is required.</p>
<ol>
  <li>Ensure the printer is powered on and unplugged from the charger.</li>
  <li>Press and hold the power button down. Keep holding it for <strong>10 to 15 seconds</strong>.</li>
  <li>Do not release it when the printer initially beeps to turn off. Keep holding until you hear a secondary beep or see the lights flash rapidly.</li>
  <li>The internal memory cache is now cleared. You must 'Forget' the printer in your phone's Bluetooth settings and re-pair it in the app.</li>
</ol>

<h2>Setup: Cable and Wire Labeling</h2>
<p>Electricians and IT workers frequently use the D110 or B21 to label Cat6 ethernet cables and server racks using <strong>P-Type (Flag) Labels</strong>.</p>
<ul>
  <li>P-Type labels have a long, skinny transparent tail and a colored printable head.</li>
  <li><strong>App Setup:</strong> Do not use a blank canvas. Search the template gallery for "Cable" or "Wire". The app will automatically generate a mirrored template.</li>
  <li><strong>Application:</strong> Wrap the transparent tail around the wire, then stick it to the back of the printed head. It creates a flag that sticks straight out from the wire, making it easily readable in a dense server rack.</li>
</ul>

<h2>Setup: Small Business Pricing Labels</h2>
<p>For bakeries, thrift stores, and boutiques, the NIIMBOT B21 is ideal for printing price tags.</p>
<ul>
  <li><strong>Excel Import:</strong> If you have 500 different products, do not type them manually. You can import an Excel (.xlsx) spreadsheet directly into the NIIMBOT app.</li>
  <li>Create a template with a Barcode field and a Text field. Link the Barcode field to Column A (SKU) and the Text field to Column B (Price). The app will automatically batch-print the entire roll.</li>
</ul>`
  }
];

async function main() {
  const brandSlug = 'niimbot';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 4 (Clusters E & G: Power & Setup) for brand: ${brand.name}`);

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
