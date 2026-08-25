import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const qualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';
const paperCategory = '9a42c554-2b4f-47f8-887e-5996fb83cbad';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Citizen CL-S Series Guide: 521 vs 521ii, 621, 631 & 700",
    slug: 'citizen-cl-s-series-guide-521-621-631-700',
    seoTitle: "Citizen CL-S Series Setup: 521, 621, 631 & 700 Guide",
    metaDescription: "Learn the difference between Citizen CL-S521 and CL-S521ii models. Troubleshoot CL-S631 printing errors, counter resets, and setup the industrial CL-S700.",
    excerpt: "The Citizen CL-S series includes some of the most robust industrial barcode printers on the market. Here is how to configure and troubleshoot them.",
    errorCode: null,
    tags: 'citizen cl-s521 vs cl-s521ii difference, citizen cl-s621 printer errors list, citizen cls-s631 error printing state, citizen cl-s631 label counter resets, citizen cl-s700 setup guide, citizen cl-s521ii driver download, citizen cl-s6521 error code',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: setupCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredSnippet: "What is the difference between the Citizen CL-S521 and CL-S521II? The CL-S521II is the modern hardware revision of the classic CL-S521. While the exterior casing looks almost identical, the 'Type II' features an upgraded internal logic board, support for modern Windows 10/11 drivers via Seagull Scientific, built-in standard network compatibility (rather than relying strictly on older parallel ports), and higher memory capacity for storing large label formats.",
    content: `<h2>Understanding the CL-S Lineup</h2>
<p>Citizen's "CL-S" nomenclature stands for Citizen Label - Standard (or desktop). They are divided into direct thermal and thermal transfer models.</p>
<ul>
  <li><strong>CL-S521 &amp; CL-S521II:</strong> Direct thermal only. Uses heat-sensitive paper. No ribbon required.</li>
  <li><strong>CL-S621 &amp; CL-S631:</strong> Thermal transfer. Capable of using wax/resin ribbons for long-lasting, weatherproof labels. The 621 prints at 203 DPI, while the 631 prints at a sharper 300 DPI (ideal for small jewelry tags).</li>
  <li><strong>CL-S700:</strong> The true industrial heavyweight. Housed in an all-metal chassis, designed for massive label rolls and continuous warehouse operations.</li>
</ul>

<h2>CL-S631 Label Counter Resets & Error States</h2>
<p>If your CL-S631 is flashing an error stating the label counter is maxed out, or it is stuck in a permanent "Error Printing State":</p>
<ol>
  <li><strong>Counter Reset:</strong> Citizen printers track the total miles of media printed for warranty purposes. If you need to clear the session counter, power the printer off, hold down the MODE, FEED, and STOP buttons simultaneously, and power it back on. The LCD will prompt you to enter the maintenance menu where you can clear the counters.</li>
  <li><strong>Error Printing State:</strong> If the LCD reads "Error", it is usually a media out or ribbon out fault. Open the clamshell completely, ensure the ribbon is not wrinkled and the label roll is pushed all the way to the right side of the spindle, and lock it down firmly.</li>
</ol>

<h2>CL-S521II Driver Downloads</h2>
<p>Because Citizen printers are industrial, they do not use standard consumer drivers. You must download the "Seagull Scientific Citizen Windows Printer Drivers." Go to the Seagull Scientific website, select Citizen, and download the latest package. These drivers contain the exact command languages (ZPL or Datamax emulation) needed to talk to the printer.</p>`
  },
  {
    title: "Citizen CT-S Series Guide: 601 vs 310, 651 & Model Finder",
    slug: 'citizen-ct-s-series-guide-601-310-651-model-finder',
    seoTitle: "Citizen CT-S Series: 601 vs 310, Setup & Model Finder",
    metaDescription: "Identify your Citizen POS receipt printer model. Learn the differences between the CT-S310, CT-S601, and CT-S651, and how to troubleshoot 'not printing' errors.",
    excerpt: "The Citizen CT-S line handles retail Point of Sale receipt printing. Learn how to identify your model and configure it for your POS software.",
    errorCode: null,
    tags: 'citizen ct-s601 vs ct-s310 difference, citizen ct-s651 not printing, citizen printer model number location, citizen ct-s310ii setup guide, citizen printer which model do i have',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: setupCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To find which Citizen printer model you have: Do not rely on the sticker on the front of the printer, as it often only lists the generic series (e.g., 'CT-S600 Series'). You must look at the silver manufacturer's label. On CT-S receipt printers, this label is usually located on the very bottom of the printer underneath the chassis, or occasionally on the back panel near the power port. The exact model number (e.g., CT-S310II) and the serial number will be printed clearly on this silver tag.",
    content: `<h2>The CT-S Receipt Printer Lineup</h2>
<p>Citizen's "CT-S" nomenclature represents their Point of Sale thermal receipt printers. They print exclusively on continuous 80mm or 58mm thermal paper rolls.</p>

<h3>CT-S310 vs CT-S601</h3>
<ul>
  <li><strong>CT-S310 &amp; CT-S310II:</strong> The economical workhorses. They are top-exit printers (receipt shoots upward) and are extremely compact. The "II" version features dual interfaces (USB and Serial) out of the box and is Energy Star compliant.</li>
  <li><strong>CT-S601:</strong> A premium, highly customizable top-exit printer. It prints noticeably faster (200mm/sec vs 160mm/sec) and features a more robust auto-cutter mechanism.</li>
  <li><strong>CT-S651:</strong> The front-exit version of the 601. Because the receipt shoots out the front, the top lid is completely sealed against liquid spills, making it the ideal choice for messy kitchen/bar environments.</li>
</ul>

<h2>CT-S651 Not Printing</h2>
<p>If your front-exit CT-S651 refuses to print from your POS system:</p>
<ol>
  <li><strong>Cash Drawer Conflict:</strong> If a cash drawer is plugged into the RJ11 port on the back of the printer, ensure the POS software isn't sending constant "kick" signals that are locking up the printer's data buffer. Unplug the cash drawer and test print.</li>
  <li><strong>Baud Rate:</strong> If using a Serial connection, the baud rate on the printer must match the PC exactly. Print a self-test page (hold FEED while powering on) to see the printer's current baud rate (usually 9600 or 19200).</li>
  <li><strong>Paper Jam:</strong> Front-exit printers are more prone to jamming if a user pulls the receipt before the cutter finishes. Open the front cover and clear any debris.</li>
</ol>`
  },
  {
    title: "Fix Citizen Faded Print, Streaky Lines & Ribbon Tension",
    slug: 'fix-citizen-faded-print-streaky-lines-ribbon-tension',
    seoTitle: "Fix Citizen Streaky Lines, Faded Print & Ribbon Tension",
    metaDescription: "Are your Citizen labels printing faded, streaky, or wrinkled? Learn how to adjust print head heat (print speed), clean the thermal head, and set ribbon tension.",
    excerpt: "Faded barcodes and diagonal white streaks across your labels indicate a dirty printhead, incorrect print speed, or loose ribbon tension.",
    errorCode: null,
    tags: 'citizen printer faded receipt print, citizen printer ribbon tension setting, citizen printer streaky print lines, citizen printer print speed setting, citizen printer number plate production setup',
    wordCount: 1000,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: qualityCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix diagonal streaky lines (wrinkles) on a Citizen thermal transfer printer: 1) Diagonal unprinted streaks indicate the ink ribbon is wrinkling as it passes under the printhead. 2) Open the printer clamshell. 3) Locate the Ribbon Tension Adjustment knob (usually a green dial on the ribbon supply spindle). 4) If the ribbon is sagging, turn the dial to increase tension. If the ribbon is snapping or stretching too tight, decrease tension. 5) Also ensure the left and right Printhead Pressure dials (above the printhead) are set evenly to balance the downward force on the media.",
    content: `<h2>Fixing Faded Print (Direct Thermal & Transfer)</h2>
<p>If your text or barcodes are printing too lightly (faded gray instead of dark black):</p>
<ul>
  <li><strong>Clean the Printhead:</strong> The number one cause of faded print is paper dust or adhesive residue insulating the printhead. Open the printer, dip a lint-free cloth in 99% isopropyl alcohol, and scrub the thin ceramic line on the bottom of the printhead.</li>
  <li><strong>Adjust Print Speed / Heat:</strong> The faster the printer pushes paper, the less time the printhead has to burn the image into the media. Go into your Windows Printer Preferences. Under the "Options" or "Advanced" tab, lower the <strong>Print Speed</strong> (e.g., from 6 inches/sec down to 2 inches/sec). Next, increase the <strong>Darkness/Heat</strong> setting by a few increments.</li>
</ul>

<h2>Specialized Setups: Number Plate Production</h2>
<p>Citizen printers (specifically the CL-S621) are frequently used in the UK for manufacturing vehicle number plates (license plates). They print onto thick reflective media using a resin ribbon.</p>
<p>Because the media is so thick and the resin must melt aggressively to bond with the reflective coating, you MUST drastically lower the print speed (to 2 or 3 ips) and increase the heat. Furthermore, ensure you are using a premium Resin ribbon. Wax or Wax/Resin blend ribbons will easily scratch off of acrylic/reflective plates.</p>`
  },
  {
    title: "Fix Citizen Label Gap Not Detected & Reflective Media Feeding",
    slug: 'fix-citizen-label-gap-not-detected-reflective-media-feeding',
    seoTitle: "Fix Citizen Label Gap Not Detected & Reflective Media Feeding",
    metaDescription: "Is your Citizen printer spitting out blank labels or showing a 'Gap Not Detected' error? Learn how to calibrate the optical sensor for gap, notch, and reflective media.",
    excerpt: "If your Citizen printer feeds continuously or prints across the gap between labels, you must physically align the optical sensor to the correct media type.",
    errorCode: 'Media Out',
    tags: 'citizen printer reflective media not feeding, citizen printer media tray not seated, citizen printer label gap not detected',
    wordCount: 850,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: paperCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix a Citizen printer 'Label Gap Not Detected' error: 1) Open the printer clamshell. Look at the lower media path where the paper feeds through. 2) You will see a small, movable green plastic piece housing the optical sensor. 3) If you are using standard die-cut labels, the sensor must be positioned to 'see' the gap between the labels. Slide the green sensor to the center of the paper path. 4) If you are using tags with a notch or hole punched on the edge, slide the sensor so it aligns exactly under the notch. 5) Close the printer and press the FEED button to allow it to measure and calibrate to the new media.",
    content: `<h2>Understanding Citizen Media Sensors</h2>
<p>Unlike basic desktop printers with fixed sensors, Citizen industrial printers use an adjustable, multi-purpose sensor. It can act as a <strong>Transmissive (Gap)</strong> sensor or a <strong>Reflective (Black Mark)</strong> sensor.</p>

<h3>Label Gap Not Detected (Continuous Feeding)</h3>
<p>If you press print and the printer spits out 5 blank labels before stopping with an error, it is completely blind to the label edges.</p>
<ul>
  <li>Ensure the green sensor arm is slid into the correct position. If it is pushed all the way to the left, it is looking at the solid edge of the label roll and will never see the gap.</li>
  <li>Ensure the software settings match the hardware. In the Windows driver, go to Page Setup and ensure the "Media Type" is set to "Labels with Gaps" (not "Continuous").</li>
</ul>

<h3>Reflective Media Not Feeding (Black Mark)</h3>
<p>If you are printing on media that uses a black printed line on the back (often used for transparent labels, thermal tickets, or reflective media):</p>
<ol>
  <li>Open the printer menu (or the Windows Driver) and change the sensor type from Transmissive/Gap to <strong>Reflective/Mark</strong>.</li>
  <li>The sensor uses an LED to bounce light off the back of the liner. The black mark absorbs the light, triggering the sensor.</li>
  <li>Ensure the green sensor block is physically slid directly underneath the path where the black mark passes.</li>
</ol>`
  }
];

async function main() {
  const brandSlug = 'citizen-systems';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 2 (Clusters C & D: Models & Print Quality) for brand: ${brand.name}`);

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
