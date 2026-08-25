import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Citizen Printer Utility, Windows 11 Drivers & NiceLabel Setup",
    slug: 'citizen-printer-utility-windows-11-drivers-nicelabel-setup',
    seoTitle: "Citizen Printer Utility, NiceLabel Setup & Windows 11 Drivers",
    metaDescription: "Learn how to configure the Citizen Printer Utility for ribbon settings, install Windows 11 drivers via Seagull Scientific, and set up Loftware NiceLabel.",
    excerpt: "Managing a fleet of Citizen printers requires mastering the Citizen Printer Utility and integrating robust software like NiceLabel for barcode generation.",
    errorCode: null,
    tags: 'citizen printer utility not detecting printer, citizen printer nicelabel setup, citizen printer firmware update guide, citizen printer driver windows 11, citizen printer utility ribbon settings, citizen printer software compatibility issues',
    wordCount: 1050,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: softwareCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix the Citizen Printer Utility not detecting your printer: 1) The utility tool relies on a direct communication pipeline. If you have a stuck print job in the Windows queue, the utility is completely blocked from 'seeing' the printer. 2) Open the Windows Print Queue and cancel all pending documents. 3) Restart the Print Spooler service in Windows. 4) Ensure you are running the Citizen Utility as an Administrator. 5) If using a network connection, go to the 'Communication' tab in the utility and explicitly type the printer's IP address instead of relying on the auto-scan feature.",
    content: `<h2>Windows 11 Driver Installation</h2>
<p>Citizen relies heavily on their partnership with Seagull Scientific (the makers of BarTender) for their Windows driver stack. If you upgrade to Windows 11, the legacy CD drivers will not work.</p>
<p>Navigate to the Seagull Scientific website, locate the Citizen section, and download the latest Windows 11 WHQL-certified driver package. When installing, choose the specific emulation mode you plan to use (usually Datamax or ZPL emulation) so the driver sends the correct language commands.</p>

<h2>Citizen Printer Utility Ribbon Settings</h2>
<p>The <strong>Citizen Printer Utility</strong> is a powerful tool that allows you to change internal hardware settings without navigating the clunky LCD screen or front buttons.</p>
<ul>
  <li>If you recently switched from Direct Thermal (no ribbon) to Thermal Transfer (using a ribbon), you MUST update the sensor setting.</li>
  <li>Open the Utility, navigate to the <strong>Media / Ribbon</strong> tab.</li>
  <li>Change the print method to <strong>Thermal Transfer</strong>. If you leave it on Direct Thermal, the printer will completely ignore the ribbon spindles, and if the ribbon breaks, it won't trigger a "Ribbon Out" error to alert you. Click "Apply" to push the setting to the printer's NVRAM.</li>
</ul>

<h2>NiceLabel Setup & Compatibility</h2>
<p>Loftware NiceLabel is industry-standard software for generating barcodes. When integrating a Citizen printer with NiceLabel, it is highly recommended to install the specific <strong>NiceLabel Native Citizen Driver</strong> rather than the generic Windows driver. The native driver bypasses the Windows spooler rendering engine and sends pure command code (like ZPL) to the printer, resulting in flawlessly crisp barcodes and significantly faster print speeds.</p>`
  },
  {
    title: "Fix Citizen Printer Overheating, Cooling Pause & Dense Text",
    slug: 'fix-citizen-printer-overheating-cooling-pause-dense-text',
    seoTitle: "Fix Citizen Printer Overheating & Cooling Pauses",
    metaDescription: "Does your Citizen printer randomly stop printing in the middle of a batch? Learn why the printer pauses to cool down and how to prevent print head overheating.",
    excerpt: "High-speed printing of dense black barcodes generates immense heat. Citizen printers use a thermal protection circuit to pause printing and prevent damage.",
    errorCode: 'Head Overheat',
    tags: 'citizen printer overheating print head, citizen printer stops printing dense text, citizen printer cooling pause explained',
    wordCount: 850,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: hardwareCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "Why does my Citizen printer pause while printing? 1) If you are printing a long batch of labels, and the printer suddenly stops, flashes the Error LED, waits 30 seconds, and resumes printing, it has triggered a Cooling Pause. 2) The thermal printhead generates massive heat when printing dense black graphics or large barcodes. To prevent the ceramic head from physically melting or starting a fire, an internal thermistor monitors the temperature. 3) When it hits the critical threshold, the printer forcefully pauses to let the ambient air cool the head. It will automatically resume once the temperature drops.",
    content: `<h2>Preventing Thermal Print Head Overheating</h2>
<p>While the Cooling Pause is a normal safety mechanism, triggering it constantly means your settings are suboptimal, which drastically reduces the lifespan of the expensive printhead.</p>
<p>If your printer is constantly stopping to cool down (especially when printing dense text or inverted black backgrounds):</p>
<ol>
  <li><strong>Lower the Darkness/Heat Setting:</strong> Go into the Windows driver preferences. Users often crank the "Darkness" setting to maximum to get darker text. This is unnecessary and burns out the head. Lower the darkness to the minimum acceptable level where the barcode still scans reliably.</li>
  <li><strong>Use a Higher Quality Ribbon:</strong> Cheap wax ribbons require more heat to melt onto the paper. Switching to a premium wax/resin blend often allows you to lower the heat setting significantly while achieving a darker print.</li>
  <li><strong>Ambient Environment:</strong> If the printer is housed in a hot warehouse or inside an unventilated POS cabinet, the internal cooling fan cannot draw in cold air. Ensure the printer has at least 4 inches of clearance on all sides.</li>
</ol>`
  },
  {
    title: "Fix Citizen Printer Won't Turn On & Factory Reset Guide",
    slug: 'fix-citizen-printer-wont-turn-on-factory-reset-guide',
    seoTitle: "Fix Citizen Printer Won't Turn On & Factory Reset",
    metaDescription: "Is your Citizen printer completely dead with no power LED? Learn how to diagnose power supply failures and perform a master factory reset.",
    excerpt: "If your printer is completely unresponsive or glitching heavily after a firmware update, a power supply check and a master factory reset are required.",
    errorCode: 'No Power',
    tags: 'citizen printer wont turn on, citizen printer power led not lighting, citizen printer factory reset guide',
    wordCount: 750,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: hardwareCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To perform a Master Factory Reset on a Citizen CL-S series printer: 1) Turn the printer OFF. 2) Press and hold all three buttons on the front panel simultaneously (PAUSE, FEED, and STOP). 3) While holding the buttons down, turn the printer ON. 4) Keep holding the buttons until the printer beeps or the LCD displays 'Factory Clear' / 'Init'. 5) Release the buttons. The printer will wipe its internal NVRAM, erasing all custom sensor calibrations, network IPs, and memory switches, returning it to out-of-the-box defaults.",
    content: `<h2>Printer Won't Turn On (No Power LED)</h2>
<p>If you flip the power switch and absolutely nothing happens (no motor noises, no LEDs):</p>
<ul>
  <li><strong>The Power Supply Brick:</strong> Many Citizen printers (especially POS receipt printers like the CT-S series) use an external power brick. Check the small green LED on the brick itself. If the wall outlet has power, but the brick's LED is off, the AC adapter is dead and must be replaced.</li>
  <li><strong>The Internal Switch:</strong> On industrial models (CL-S700), the power supply is internal. If the printer is dead, check the heavy-duty power cable connection. If there was a recent power surge, the internal glass fuse on the logic board may have blown to protect the main components. Replacing this fuse requires disassembling the casing and should be done by a certified technician.</li>
</ul>

<h2>When to use a Factory Reset</h2>
<p>You should only perform a master factory reset as a last resort. Because Citizen printers are highly customizable via Memory Switches, a factory reset will wipe all custom configurations. You will need to re-run the media calibration, set up your network IP address again, and reconfigure any custom baud rates or emulation languages (ZPL/Datamax) your POS software relies on.</p>`
  }
];

async function main() {
  const brandSlug = 'citizen-systems';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 3 (Clusters E & F: Software, Thermal & Power) for brand: ${brand.name}`);

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
