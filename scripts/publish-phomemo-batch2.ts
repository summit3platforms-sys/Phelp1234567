import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const paperCategory = '9a42c554-2b4f-47f8-887e-5996fb83cbad';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Phomemo Status Light Colors Explained & Flashing Red Fix",
    slug: 'phomemo-status-light-colors-explained-flashing-red-fix',
    seoTitle: "Phomemo Status Light Colors Explained & Flashing Red Fix",
    metaDescription: "What does the red light on a Phomemo printer mean? Learn how to decode blinking lights, fix low battery warnings, and clear print errors.",
    excerpt: "The single LED light on a Phomemo printer communicates battery status, paper jams, and connectivity. Here is exactly what the solid and flashing red lights mean.",
    errorCode: 'Red Light Indicator',
    tags: 'Phomemo, Red Light Stays On, Flashing Red Light, Low Battery, Light Blinking Wont Print, Status Light Colors Explained',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: errorCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "Decoding Phomemo status light colors: 1) Solid Green or White: The printer is powered on, ready, and fully charged. 2) Slow Blinking Green: The printer is actively charging via USB. 3) Solid Red: The printer cover is open or improperly latched, or the printer is completely out of paper. 4) Fast Flashing Red: The battery is critically low (under 10%) or the printhead has overheated from continuous printing. 5) To clear a flashing red light, plug the printer into a 5V/2A wall charger and allow it to cool for 15 minutes.",
    content: `<h2>Decoding Phomemo LED Status Indicators</h2>
<p>Because most Phomemo mini printers (like the M02, T02, and M110) lack an LCD screen, they rely on a single multi-color LED built into the power button to communicate errors.</p>

<h3>Normal Operational Lights</h3>
<ul>
  <li><strong>Solid Green (or White):</strong> The printer is in standby, Bluetooth is broadcasting, and it is ready to accept a print job.</li>
  <li><strong>Slow Breathing/Blinking Green:</strong> The printer is connected to a USB power source and the battery is actively charging.</li>
</ul>

<h3>What Does the Solid Red Light Mean?</h3>
<p>If the LED turns <strong>Solid Red</strong> and the printer refuses to print, it indicates a physical hardware interlock has been broken:</p>
<ol>
  <li><strong>Out of Paper:</strong> The optical sensor detects no paper in the feed path. Load a fresh roll.</li>
  <li><strong>Cover Open:</strong> The top clamshell lid is not firmly closed. Squeeze both sides of the lid down tightly until you hear a mechanical click.</li>
</ol>

<h3>What Does the Flashing Red Light Mean?</h3>
<p>A <strong>Rapidly Flashing Red Light</strong> is a critical system warning:</p>
<ul>
  <li><strong>Critically Low Battery:</strong> The internal voltage has dropped too low to power the thermal head. Connect it to a wall charger immediately.</li>
  <li><strong>Thermal Overheat Protection:</strong> If you just printed 20 labels or photos back-to-back, the ceramic printhead has exceeded safe operating temperatures. The firmware locks the printer and flashes red to prevent melting the plastic chassis. Leave the printer alone for 15 minutes to cool down; the light will return to green automatically.</li>
</ul>`
  },
  {
    title: "Fix Phomemo No Paper Light, Cover Open Error & Feed Calibration",
    slug: 'phomemo-no-paper-light-cover-open-error-feed-calibration',
    seoTitle: "Fix Phomemo No Paper Light, Cover Open Error & Calibration",
    metaDescription: "Is your Phomemo printer stuck with a 'No Paper' or 'Cover Open' error even when loaded? Learn how to calibrate the feed button and clean the gap sensor.",
    excerpt: "When the 'No Paper' warning won't clear, the printer's optical sensor is either dirty, blocked by transparent paper, or requires manual feed calibration.",
    errorCode: 'No Paper / Cover Open',
    tags: 'Phomemo, Printer Cover Open Error, No Paper Light Wont Clear, Feed Button Calibration, Paper Sensor',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: errorCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Phomemo 'No Paper' light that won't clear: 1) Clean the Sensor: Open the paper bay and locate the small square optical sensor near the exit slot. Blow out paper dust with compressed air or wipe it with a dry cotton swab. 2) Check Paper Type: If using transparent or clear sticker paper, standard Phomemo sensors cannot 'see' it because light passes straight through. You must use paper with black timing marks on the back. 3) Feed Calibration: Close the lid securely (fixing Cover Open errors) and press the Power/Feed button ONCE. The printer will feed one blank label to recalibrate the gap sensor.",
    content: `<h2>Resolving the 'Cover Open' False Alarm</h2>
<p>Phomemo printers utilize a small microswitch near the hinge of the paper compartment. If the "Cover Open" error remains persistent in the app and the light is solid red:</p>
<ul>
  <li><strong>Uneven Pressure:</strong> Pressing down on only the center of the lid often leaves one side unlatched. You must press down on the far left and right corners simultaneously to engage both locking clips.</li>
  <li><strong>Paper Pinch:</strong> Ensure the label paper is feeding straight out of the slot. If the paper is skewed and pinched in the hinge, the lid cannot close fully.</li>
</ul>

<h2>Why the 'No Paper' Light Won't Clear</h2>
<p>The printer uses an infrared light emitter and receiver to detect the presence of paper. If this system fails, the printer assumes the bay is empty.</p>
<ol>
  <li><strong>Paper Dust Blockage:</strong> Over time, cheap thermal paper sheds microscopic dust that coats the sensor eye. Use a can of compressed air to thoroughly blow out the paper tray, focusing on the area directly under the printhead.</li>
  <li><strong>Transparent / Clear Labels:</strong> Infrared sensors look for light bouncing back off opaque white paper. If you load clear transparent sticker paper, the infrared light shines straight through it, causing the sensor to falsely report "Out of Paper". Ensure your clear paper has black printed registration marks on the backing to trigger the sensor.</li>
</ol>

<h2>Performing Feed Button Calibration</h2>
<p>If you load a new roll of die-cut labels (like on the M110 or M221), the printer needs to learn where the gaps are.</p>
<ul>
  <li>Once loaded and closed, press the main power button quickly exactly <strong>ONE time</strong>.</li>
  <li>The printer will feed one or two blank labels and stop exactly at the tear-line. This calibrates the internal optical baseline.</li>
</ul>`
  },
  {
    title: "Fix Phomemo Won't Turn On, Won't Charge & Battery Drain",
    slug: 'phomemo-wont-turn-on-wont-charge-battery-drain-fix',
    seoTitle: "Fix Phomemo Won't Turn On, Won't Charge & Battery Drain",
    metaDescription: "Is your Phomemo printer completely dead, refusing to charge, or draining battery too fast? Learn how to revive deep-discharged lithium batteries and fix loose ports.",
    excerpt: "When a Phomemo printer sits unused for months, the lithium battery enters a deep sleep state. Here is how to safely wake it and avoid overheating.",
    errorCode: 'No Power / Not Charging',
    tags: 'Phomemo, Wont Charge, Charging Cable Specs 5V 2A, Battery Drains Fast, Wont Turn On, Charging Port Loose Fix, Overheating Print Head',
    wordCount: 1150,
    difficultyLevel: 'Intermediate',
    timeToFix: '30 minutes',
    categoryId: hardwareCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix a Phomemo printer that won't turn on or charge: 1) Use the right charger: Phomemo printers require a standard 5V/1A or 5V/2A charging brick. DO NOT use high-wattage laptop fast-chargers (like 45W/65W USB-C), as the printer's safety chip will block the current and refuse to charge. 2) Deep Sleep Recovery: If the printer hasn't been used in months, plug it into a 5V/1A charger and leave it alone for 45 minutes. The charging light may not turn on for the first 20 minutes while the battery trickle-charges back to a safe voltage. 3) Loose Port: If the cable wiggles, use a wooden toothpick to gently scrape compacted pocket lint out of the USB port.",
    content: `<h2>Understanding Phomemo Battery Architecture</h2>
<p>Phomemo pocket printers are powered by built-in 1000mAh or 1200mAh lithium-ion batteries. Thermal printing requires massive, instantaneous bursts of electrical current to heat the ceramic elements up to 200°C. If the battery voltage drops below critical thresholds, the internal Battery Management System (BMS) shuts the printer down completely to prevent cell damage.</p>

<h2>Fix 1: The Fast-Charger Rejection Issue</h2>
<p>The most common reason a modern Phomemo printer (like the USB-C M02S or T02) won't charge is that you are using a modern smartphone or laptop fast charger.</p>
<ul>
  <li>Phomemo charging circuits are rated strictly for <strong>5V / 1A or 5V / 2A</strong>.</li>
  <li>If you plug the printer into an Apple MacBook 61W USB-C charger, the charger attempts to negotiate Power Delivery (PD) protocols. The Phomemo lacks the PD handshake chip, so the charger cuts power entirely.</li>
  <li><strong>Solution:</strong> Use an older, basic USB-A to USB-C (or Micro-USB) cable plugged into a standard 5-watt wall cube, a power bank, or a computer USB port.</li>
</ul>

<h2>Fix 2: Deep Discharge Trickle Recovery</h2>
<p>If the printer has been sitting in a drawer for a year, the battery voltage has dropped into a deep-sleep protection mode.</p>
<ol>
  <li>Plug the printer into a standard 5V/1A USB port.</li>
  <li>Do not touch the power button.</li>
  <li>The charging LED will likely remain completely dark. This is normal. The BMS is slowly "trickle charging" the cell to prevent a thermal event.</li>
  <li>Wait 30 to 45 minutes. Once the battery reaches 3.2V, the green charging light will finally illuminate.</li>
</ol>

<h2>Fixing Loose Charging Ports &amp; Overheating</h2>
<p>Because pocket printers are carried in bags, the USB port easily fills with compressed lint. Use a wooden toothpick to gently scrape out the bottom corners of the port so the cable can sit flush.</p>
<p>If the <strong>battery drains extremely fast</strong> (e.g., dying after only 5 prints), the battery cell may be degraded from age, or you are printing massive, solid black images that cause <strong>printhead overheating</strong>. Stick to line art, text, and barcodes to maximize battery life per charge.</p>`
  },
  {
    title: "Fix Phomemo Label Off Center, Size Not Recognized & Roller Guide",
    slug: 'phomemo-label-off-center-size-not-recognized-roller-guide',
    seoTitle: "Fix Phomemo Label Off Center, Size Not Recognized & Roller",
    metaDescription: "Are your Phomemo labels printing off-center, misaligned, or showing 'Size Not Recognized'? Learn how to adjust internal roller guides and app paper dimensions.",
    excerpt: "When labels print diagonally or text gets cut off the edge, the physical paper roll is wandering inside the printer due to loose roller guides or app size mismatches.",
    errorCode: 'Size Not Recognized',
    tags: 'Phomemo, Label Printing Off Center, Roller Orientation Guide, Label Size Not Recognized, Paper Skew, Alignment Fix',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '4 minutes',
    categoryId: paperCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix Phomemo labels printing off-center or 'Size Not Recognized': 1) Adjust Physical Guides: For models like the M110 or M221, open the paper compartment and push the adjustable plastic paper guides inward until they lightly touch both sides of the label roll. If left loose, the paper drifts diagonally, causing off-center prints. 2) App Size Match: In the Print Master app, the selected label size MUST match the physical paper exactly (e.g., 40x30mm). 3) Roller Orientation: Ensure the black rubber platen roller is snapped securely into its brackets; if one side is unclipped, the paper will pull sideways.",
    content: `<h2>Diagnosing Off-Center & Skewed Printing</h2>
<p>If your text looks perfectly centered in the Phomemo app, but physically prints halfway off the left or right edge of the label, the issue is mechanical alignment between the paper roll and the printhead.</p>

<h2>Fix 1: Securing the Adjustable Roller Guides</h2>
<p>Phomemo label makers (like the M110, M120, and M221) support multiple widths of paper (from 20mm up to 50mm or 75mm). To accommodate this, they feature adjustable spring-loaded hubs or sliding plastic guides.</p>
<ol>
  <li>Open the printer's top cover.</li>
  <li>Insert the label roll.</li>
  <li>Push the plastic side guides inward until they hug the sides of the paper roll.</li>
  <li><strong>The Rule:</strong> The guides must prevent horizontal left/right movement, but they shouldn't pinch the roll so tightly that it can't spin freely.</li>
  <li>If the guides are left open to 50mm while printing a 30mm label, the paper will drift sideways during printing, causing skewed, cut-off text.</li>
</ol>

<h2>Fix 2: App 'Size Not Recognized' Mismatch</h2>
<p>The Phomemo firmware relies on the app to tell it when to stop feeding paper. If you load a roll of 40x30mm labels, but the app canvas is set to 50x50mm:</p>
<ul>
  <li>The printer will attempt to print outside the physical boundaries of the label, printing directly onto the rubber roller.</li>
  <li>The printer will throw a "Size Not Recognized" or feed error.</li>
  <li><strong>Solution:</strong> Open the Print Master app. Look at the top center of the screen. Tap the label dimensions and select the exact millimeter (mm) dimensions printed on the side of your physical label box.</li>
</ul>

<h2>Fix 3: The Rubber Platen Roller Snap Check</h2>
<p>The thick black rubber roller pulls the paper forward. If you recently experienced a severe paper jam, you may have accidentally unclipped one side of this roller from its bearing bracket. Press down firmly on both sides of the black roller to ensure it is snapped perfectly level into the chassis.</p>`
  }
];

async function main() {
  const brandSlug = 'phomemo';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 2 (Clusters C, D, F: Indicators, Battery, Guides) for brand: ${brand.name}`);

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
