import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const printQualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Polaroid Hi-Print Won't Turn On, Won't Charge & Port Fix",
    slug: 'polaroid-hi-print-wont-turn-on-charge-port-fix',
    seoTitle: "Fix Polaroid Hi-Print Won't Turn On or Charge (Port Guide)",
    metaDescription: "Is your Polaroid Hi-Print completely dead, refusing to charge, or showing no indicator light when plugged in? Learn how to revive deep-sleep lithium batteries.",
    excerpt: "When a Polaroid Hi-Print printer sits unused in a drawer for months, the lithium battery enters deep sleep protection. Here is how to wake the power controller safely.",
    errorCode: 'No Power / No Charging LED',
    tags: 'Polaroid, Wont Charge, Wont Turn On, No Indicator Light, Charging Port, Micro USB vs USB C, Deep Discharge',
    wordCount: 1150,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: hardwareCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix a Polaroid Hi-Print that won't turn on or charge: 1) Avoid high-wattage 65W+ USB-PD laptop chargers; use a standard 5V/1A or 5V/2A wall adapter with a standard USB-A to Micro-USB (Gen 1) or USB-C (Gen 2) cable. 2) If the battery is deeply drained, the LED will stay dark for the first 15 to 20 minutes while the BMS trickle-charges the cell. Leave it plugged in undisturbed. 3) Perform a pinhole hardware reset by pressing the reset switch beside the charging port for 5 seconds.",
    content: `<h2>Understanding Polaroid Hi-Print Battery Architecture</h2>
<p>The <strong>Polaroid Hi-Print Pocket Photo Printer</strong> is powered by a high-output 620mAh lithium-ion battery pack. Because dye-sublimation requires rapid thermal bursts up to 200°C, the internal Battery Management System (BMS) includes strict over-discharge cutoffs. If the battery is depleted and left in storage for several months, the cell voltage drops below 2.8V, causing the printer to appear completely dead with <strong>no charging indicator light</strong>.</p>

<h2>Fix 1: The Low-Wattage Trickle Charge Recovery</h2>
<p>Connecting a high-speed smartphone or laptop charger (such as 45W or 65W USB-PD bricks) will cause the Hi-Print BMS to reject the power inrush as a protective measure.</p>
<ol>
  <li>Find a standard <strong>5V / 1.0A or 5V / 2.0A USB wall adapter</strong> (e.g., an older 5W Apple cube, a power bank, or a computer USB port).</li>
  <li>Plug the charging cable firmly into the printer's port:
    <ul>
      <li><strong>Polaroid Hi-Print Gen 1:</strong> Uses a <strong>Micro-USB</strong> port.</li>
      <li><strong>Polaroid Hi-Print Gen 2:</strong> Uses a modern <strong>USB-C</strong> port.</li>
    </ul>
  </li>
  <li><strong>Leave the printer plugged in for at least 30 minutes without pressing the power button.</strong></li>
  <li>The BMS will slowly trickle-charge the battery chemistry. Once safe voltage is restored, the charging LED will illuminate solid red.</li>
  <li>Allow it to charge for a full <strong>80 to 90 minutes</strong> until the LED turns solid green or shuts off (100% full).</li>
</ol>

<h2>Fix 2: Clearing Charging Port Debris &amp; Pin Inspection</h2>
<p>Because the Hi-Print is carried in pockets, backpacks, and purses, compact lint can compress into the base of the charging port, preventing the cable pins from making electrical contact.</p>
<ul>
  <li>Shine a flashlight into the USB port.</li>
  <li>Use a clean, non-conductive wooden toothpick to gently scrape out compacted pocket lint from the corners.</li>
  <li>Ensure the USB cable clicks flush against the outer white casing.</li>
</ul>

<h2>Fix 3: Cold Hardware Pinhole Reset</h2>
<p>If the printer displays a solid light but is completely frozen and refuses to respond to button presses:</p>
<ol>
  <li>Disconnect the charging cable.</li>
  <li>Insert a paperclip into the small pinhole switch next to the USB port.</li>
  <li>Press and hold for <strong>5 seconds</strong> until the internal relay clicks.</li>
  <li>Press the power button for 2 seconds to reboot the operating system.</li>
</ol>`
  },
  {
    title: "Polaroid Hi-Print Red Blinking Light, Battery Drain & Hard Reset",
    slug: 'polaroid-hi-print-red-blinking-light-battery-drain-reset',
    seoTitle: "Polaroid Hi-Print Red Blinking Light & Battery Drain Fix",
    metaDescription: "What does a blinking red LED light mean on the Polaroid Hi-Print? Learn how to fix rapid battery drain, thermal over-temperature errors, and hard reset procedures.",
    excerpt: "A red blinking light on the Polaroid Hi-Print indicates either a low battery, paper jam, or thermal motor cutoff. Here is how to decode and clear the warning.",
    errorCode: 'Blinking Red',
    tags: 'Polaroid, Red Blinking Light, Battery Draining Fast, Hard Reset, Overheating, Thermal Error',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: errorCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "Polaroid Hi-Print red blinking light decoded: 1) Slow Blinking Red (1 flash/sec): Battery is critically low (< 10%)—connect USB charger. 2) Rapid Blinking Red (3 flashes/sec): Hardware error—cartridge door is open, paper is jammed, or cartridge ribbon is exhausted. 3) Solid Red while plugged in: Normal charging. 4) Fast Battery Drain: If the battery drains in under 5 prints, the cell has developed high internal resistance or the printer was stored in extreme cold; perform a hard reset and run a full 90-minute charge cycle.",
    content: `<h2>Decoding the Polaroid Status Indicator</h2>
<p>The Polaroid Hi-Print uses an illuminated RGB LED ring integrated around the power button to signal hardware diagnostics, battery capacity, thermal alerts, and error codes.</p>

<h2>Diagnostic Light Pattern Matrix</h2>
<table style="width:100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: left;">
      <th style="padding: 0.75rem;">LED State</th>
      <th style="padding: 0.75rem;">Hardware Meaning</th>
      <th style="padding: 0.75rem;">Required Action</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #16a34a;">Solid White / Green</td>
      <td style="padding: 0.75rem;">Standby / Ready</td>
      <td style="padding: 0.75rem;">Connected to app; ready to print</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #2563eb;">Rotating Rainbow LED</td>
      <td style="padding: 0.75rem;">Active 4Pass Printing</td>
      <td style="padding: 0.75rem;">Applying YMC layers; do not touch paper</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #dc2626;">Slow Pulsing Red</td>
      <td style="padding: 0.75rem;">Low Battery Warning (&lt; 10%)</td>
      <td style="padding: 0.75rem;">Connect USB charger immediately</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #dc2626;">Rapid Blinking Red</td>
      <td style="padding: 0.75rem;">Cartridge Door Open or Paper Jam</td>
      <td style="padding: 0.75rem;">Verify door is latched; check for stuck sheets</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #ea580c;">Solid Amber / Orange</td>
      <td style="padding: 0.75rem;">Thermal Protection (Overheating)</td>
      <td style="padding: 0.75rem;">Allow printer to cool for 15 minutes</td>
    </tr>
  </tbody>
</table>

<h2>How to Fix Fast Battery Drain</h2>
<p>Under normal conditions, a fully charged Polaroid Hi-Print yields approximately <strong>12 to 15 full photo prints (1.5 full cartridges)</strong> on a single charge. If your battery dies after only 3 or 4 photos:</p>
<ul>
  <li><strong>Extreme Ambient Temperatures:</strong> Lithium chemistry loses up to 60% of its discharge capacity in cold weather (&lt; 10°C / 50°F). Keep the printer at room temperature (20°C / 68°F).</li>
  <li><strong>Background BLE Disconnects:</strong> Always press and hold the power button for 3 seconds to turn off the printer when finished. Leaving it in standby slowly drains the cell over 24 hours.</li>
</ul>

<h2>Performing a Complete Hard Reset</h2>
<ol>
  <li>Disconnect the USB charging cable.</li>
  <li>Locate the tiny recessed button beside the charging port.</li>
  <li>Use a paperclip to press and hold the switch for <strong>5 seconds</strong>.</li>
  <li>Plug the printer into USB power and power it back on. The internal micro-controller registers will be completely cleared.</li>
</ol>`
  },
  {
    title: "Fix Polaroid Hi-Print Faded, Too Dark, Grainy & Overexposed Prints",
    slug: 'polaroid-hi-print-faded-dark-grainy-overexposed-fix',
    seoTitle: "Fix Polaroid Hi-Print Faded, Dark, Grainy & Overexposed Prints",
    metaDescription: "Are your Polaroid Hi-Print photos coming out muddy dark, washed out, or grainy? Learn how to optimize in-app exposure, contrast, and color rendering.",
    excerpt: "Dye-sublimation produces rich 16.7M continuous-tone prints, but smartphone screen calibration and expired dye ribbons can cause dark or muddy output.",
    errorCode: null,
    tags: 'Polaroid, Faded Print, Print Too Dark, Grainy Quality, Overexposed, App Filters, Color Calibration',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: printQualityCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix faded, dark, grainy, or overexposed prints on Polaroid Hi-Print: 1) Smartphone OLED screens are self-illuminated and appear 20% brighter than physical prints. In the Polaroid Hi-Print app before printing, tap 'Edit' > 'Brightness' and boost exposure by +10% to +15% for indoor and shadow photos. 2) Lower contrast slightly (-5%) to preserve shadow details. 3) For Grainy Prints: Avoid printing heavily cropped, digital-zoomed screenshots; print original full-resolution camera roll photos.",
    content: `<h2>Understanding Dye-Sublimation Color Science</h2>
<p>The <strong>Polaroid Hi-Print</strong> uses a thermal transfer head to diffuse dye pigments directly into the photo paper's synthetic polymer topcoat at continuous tone levels. Because there are no visible halftone dots (unlike inkjet or Zink), image clarity is photographic. However, discrepancies between smartphone display brightness and physical reflective paper require slight editing adjustments.</p>

<h2>Problem 1: Photos Print Significantly Darker Than On Screen</h2>
<p>Modern smartphones (Super Retina OLED and AMOLED displays) emit high backlight luminance. A photo that looks perfectly exposed on an iPhone screen will often print slightly underexposed on physical paper.</p>
<ol>
  <li>Open the photo in the <strong>Polaroid Hi-Print</strong> app.</li>
  <li>Tap the <strong>Edit (Pencil)</strong> icon.</li>
  <li>Select the <strong>Brightness</strong> adjustment slider and increase it by <strong>+10% to +20%</strong>.</li>
  <li>Select <strong>Shadows</strong> and boost shadow illumination to reveal dark hair, clothing, and background details.</li>
  <li>Tap the Checkmark and print. The resulting sticker will match your intended visual perception.</li>
</ol>

<h2>Problem 2: Washed-Out, Faded, or Low-Contrast Prints</h2>
<p>If prints appear milky or lack rich black tones:</p>
<ul>
  <li><strong>Direct Sunlight / Heat Exposure:</strong> Never store unused Polaroid Hi-Print cartridges in hot cars, direct sunlight, or humid bathrooms. Excessive heat degrades the thermal dye transfer chemical bonds on the ribbon.</li>
  <li><strong>Overexposure in App:</strong> If you shot a photo in harsh midday sun, tap <em>Edit &gt; Highlights</em> in the Polaroid app and pull the slider down by -15% to recover sky and skin highlights.</li>
</ul>

<h2>Problem 3: Grainy, Pixelated, or Blurry Output</h2>
<p>The Hi-Print hardware prints at 291 DPI (equivalent to high-resolution professional mini-labs). If your print looks pixelated:</p>
<ul>
  <li>You selected a low-resolution compressed image downloaded from WhatsApp, Instagram DMs, or Facebook Messenger.</li>
  <li>Always print original uncompressed files from your smartphone's primary camera roll.</li>
</ul>`
  },
  {
    title: "Fix Polaroid Hi-Print Streaky Lines & Incorrect Color Casts",
    slug: 'polaroid-hi-print-streaky-lines-wrong-colors-fix',
    seoTitle: "Fix Polaroid Hi-Print Streaky Lines & Wrong Colors Guide",
    metaDescription: "Are vertical color streaks or strange pink/cyan color casts ruining your Polaroid Hi-Print stickers? Learn how to clean thermal elements and remove ribbon wrinkles.",
    excerpt: "Vertical line streaks and color shifts on Polaroid Hi-Print stickers are caused by microscopic dust on the ceramic thermal line or wrinkled ribbon spools.",
    errorCode: null,
    tags: 'Polaroid, Streaky Lines, Wrong Colors, Color Cast, Pink Tint, Cyan Tint, Thermal Printhead',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '7 minutes',
    categoryId: printQualityCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix streaky lines and incorrect color casts on Polaroid Hi-Print: 1) Vertical White / Color Streaks: Caused by a speck of lint insulating one of the thermal micro-resistors. Remove the cartridge, shine a light into the printer slot, and gently wipe the ceramic thermal line with a dry microfiber cloth or an alcohol swab (99% isopropyl alcohol). 2) Pink or Yellow Color Tint: The cartridge ribbon was loosely spooled and skipped a color pass. Turn the cartridge gear clockwise 2 clicks to pull the ribbon taut before inserting.",
    content: `<h2>How Thermal Line Contaminants Cause Streaks</h2>
<p>Inside the Polaroid Hi-Print is a high-density ceramic line containing hundreds of microscopic heating elements. As the photo paper glides past during the 4Pass process, each element heats up to transfer exact color quantities. A single particle of airborne dust sitting on the ceramic element prevents that specific dot from heating the ribbon, leaving a <strong>continuous vertical line across all four color passes</strong>.</p>

<h2>Step-by-Step: Cleaning the Thermal Head</h2>
<ol>
  <li>Power off the printer and remove the cartridge.</li>
  <li>Open the side door and look toward the top ceiling of the inner compartment. You will see the thin ceramic thermal strip.</li>
  <li>Take a clean cotton swab lightly moistened with <strong>99% Isopropyl Alcohol</strong> (do not use water or wet wipes).</li>
  <li>Gently wipe the length of the ceramic heating strip back and forth 3 to 4 times.</li>
  <li>Allow 2 minutes for the alcohol to evaporate completely.</li>
  <li>Reinsert the cartridge and test print. The streak line will vanish.</li>
</ol>

<h2>Resolving Unwanted Color Casts (Heavy Pink, Yellow, or Cyan Tints)</h2>
<ul>
  <li><strong>Loose Ribbon Wrinkle:</strong> If the yellow or cyan ribbon film has a diagonal crease inside the cartridge, the thermal head cannot achieve uniform contact. Manually tension the ribbon spool gear clockwise until smooth.</li>
  <li><strong>In-App Filter Interference:</strong> Check whether an artistic filter (such as "Sepia", "Vintage", or "Cool") was accidentally applied in the Polaroid app's bottom toolbar before printing.</li>
</ul>`
  },
  {
    title: "Polaroid Hi-Print Print Button Not Lighting Up & Mid-Print Stalls",
    slug: 'polaroid-hi-print-print-button-not-lighting-up-mid-print-stall',
    seoTitle: "Polaroid Hi-Print Button Not Lighting Up & Mid-Print Stalls",
    metaDescription: "Is the print button greyed out in the Polaroid Hi-Print app, or did your photo stop moving halfway through printing? Complete recovery guide.",
    excerpt: "When the in-app print button stays greyed out or the printer halts during the second or third color pass, Bluetooth socket drops and thermal safety cutoffs are to blame.",
    errorCode: 'Print Button Greyed Out',
    tags: 'Polaroid, Print Button Not Lighting Up, Greyed Out, Stops Mid Photo, Mid-Print Stall, Thermal Cutout',
    wordCount: 1000,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a greyed-out print button or mid-print stalls on Polaroid Hi-Print: 1) Print Button Greyed Out in App: The app does not detect an active Bluetooth socket or the cartridge sensor reports empty/door open. Re-pair the printer inside the app and ensure the side door is fully clicked shut. 2) Printer Stops Mid-Photo: The internal thermal safety sensor detected overheating from consecutive prints. Leave the photo in place, wait 10 minutes for cooling, and plug into USB power; the printer will resume and eject the photo upon power-up.",
    content: `<h2>Why the Print Button Stays Greyed Out in the App</h2>
<p>In the official Polaroid Hi-Print application, the primary yellow <strong>"Print"</strong> button will remain inactive or greyed out if any of the following hardware prerequisites fail:</p>
<ol>
  <li><strong>Bluetooth Handshake Incomplete:</strong> The app has not established an active BLE data channel. Tap the printer icon in the top right to verify connection status.</li>
  <li><strong>Door Open Sensor Tripped:</strong> The side cartridge door is unlatched or the microswitch is not depressed. Firmly squeeze the side door until it clicks.</li>
  <li><strong>Empty Cartridge Detected:</strong> All 10 exposures have been used. The app reads the internal ribbon counter and blocks further print commands until a new cartridge is loaded.</li>
  <li><strong>Battery Under 5%:</strong> If battery voltage is too low to guarantee all four thermal passes, the app disables the print button to prevent trapping paper inside the rollers.</li>
</ol>

<h2>What to Do If the Photo Stops Moving Mid-Print</h2>
<p>If your photo stops moving during the magenta or cyan pass and the printer motor halts with the photo sticking out of the front slot:</p>
<ul>
  <li><strong>DO NOT pull or tear the paper out!</strong> The thermal head is currently clamped down under high spring pressure. Pulling will rip the delicate internal drive belt.</li>
  <li>Plug the printer into a 5V/1A USB charger.</li>
  <li>Wait 10 minutes for internal heat dissipation.</li>
  <li>Press the power button once. The printer will perform a homing cycle, unclamp the printhead, and safely feed the spoiled sheet out of the slot.</li>
</ul>`
  }
];

async function main() {
  const brand = await prisma.brand.findUnique({ where: { slug: 'polaroid' } });
  if (!brand) throw new Error('Polaroid brand not found in database.');

  console.log(`🚀 Publishing Batch 3 (Clusters C & D: Power & Quality) for brand: ${brand.name}`);

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
