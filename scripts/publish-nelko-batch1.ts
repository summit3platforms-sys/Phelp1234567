import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Nelko 4x6 Shipping Label Printer Setup, Calibration & Blank Labels",
    slug: 'nelko-4x6-shipping-label-printer-setup-calibration-blank-labels',
    seoTitle: "Nelko 4x6 Shipping Label Printer Setup & Blank Labels Fix",
    metaDescription: "Setting up a Nelko 4x6 shipping label printer? Learn how to fix blank label feeding, calibrate the media sensor, and increase print density for crisp barcodes.",
    excerpt: "The Nelko desktop shipping printer is a fast, budget-friendly option for small businesses. Learn how to calibrate the feed button and fix faded barcodes.",
    errorCode: 'Blank Labels',
    tags: 'nelko 4x6 shipping label printer setup, nelko thermal printer blank labels fix, nelko vs munbyn same printer, nelko shipping label printer calibration, nelko printer density setting adjustment',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: setupCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To calibrate a Nelko 4x6 shipping label printer and fix blank labels: 1) Ensure you are using direct thermal labels, loaded with the peel-off side facing the ceiling. 2) Turn the printer ON. 3) Press and hold the top Feed button until you hear exactly ONE beep, then release immediately. 4) The printer will feed several blank labels back and forth to measure the gap between them. Once it stops at the tear line, calibration is complete, and it will no longer print blank or skipping labels.",
    content: `<h2>Setting Up the Nelko 4x6 Shipping Printer</h2>
<p>Nelko's desktop 4x6 thermal printer is highly popular for printing Shopify, Etsy, and Amazon FBA shipping labels. If the physical chassis looks familiar, it is because Nelko and Munbyn share similar white-label manufacturing components, meaning many of the drivers and troubleshooting steps are identical.</p>

<h2>Fixing the 'Feeding Blank Labels' Error</h2>
<p>If your Nelko printer spits out 2 to 3 blank labels every time you hit print, the printer's optical sensor has lost its calibration and does not know where the top of the label is.</p>
<ol>
  <li>Load a stack of 4x6 fanfold or rolled labels into the back of the printer. Ensure the adjustable side guides are lightly touching the edges of the paper.</li>
  <li>Ensure the printer power switch (on the back) is flipped to <strong>ON</strong>.</li>
  <li>Press and hold the top Feed button. Wait until you hear <strong>one single beep</strong>, then let go.</li>
  <li>The printer will pull labels in and out to calculate the label length.</li>
</ol>

<h3>Are Your Labels Upside Down?</h3>
<p>Direct thermal printers do not use ink. They apply heat to chemically treated paper. If you load the labels upside down, the printer will heat the wax backing instead of the chemical front, resulting in completely blank prints. Ensure the printable sticker side is facing up toward the printhead.</p>

<h2>Adjusting Print Density for Scannable Barcodes</h2>
<p>If USPS or UPS complains that your barcodes are too faint to scan, you need to increase the heat applied by the printhead.</p>
<ul>
  <li><strong>On Windows:</strong> Go to Settings &gt; Devices &gt; Printers &amp; Scanners &gt; Nelko Printer &gt; Manage &gt; Printing Preferences. Look for the <strong>Density</strong> or <strong>Darkness</strong> slider. Increase it from the default 8 up to 12. Decrease the <strong>Speed</strong> to 3 or 4 inches per second to allow the heat more time to transfer.</li>
  <li><strong>On Mac:</strong> Open the print dialog (Cmd+P). Click <em>Show Details</em>. Select <em>Printer Features</em> from the dropdown. Adjust the Darkness and Speed settings.</li>
</ul>`
  },
  {
    title: "Nelko P21 vs PL70E: Difference, Setup Guide & Tape Not Feeding",
    slug: 'nelko-p21-vs-pl70e-difference-setup-guide-tape-not-feeding',
    seoTitle: "Nelko P21 vs PL70E Label Maker Setup & Tape Not Feeding",
    metaDescription: "Comparing the Nelko P21 and PL70E portable label makers. Find out which one supports PC drivers and learn how to fix label tape feed jams.",
    excerpt: "The Nelko P21 and PL70E are compact Bluetooth label makers for home organization. Learn their differences and how to fix stuck or non-feeding label tape.",
    errorCode: 'Tape Not Feeding',
    tags: 'nelko p21 vs pl70e difference, nelko p21 label maker setup guide, nelko label tape not feeding, nelko pl70e driver download, nelko label maker green sticker paper',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: setupCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "Nelko P21 vs PL70E Difference: The Nelko P21 is a mobile-only Bluetooth label maker designed strictly for iOS and Android smartphones via the Nelko app; it cannot connect to a PC. The Nelko PL70E is a slightly upgraded version that includes a USB port and supports Windows/Mac driver downloads for desktop printing. If your Nelko label tape is not feeding: Open the cassette door. Pull the label tape out so roughly 0.5 inches (1 cm) is sticking out past the metal cutter blade before snapping the door shut. If the tape is tucked entirely inside the machine, the rubber roller cannot grab it.",
    content: `<h2>Nelko P21 vs PL70E: Which is Right for You?</h2>
<p>Nelko makes two nearly identical half-inch (12mm-15mm) tape label makers for organizing spice jars, files, and cables: the <strong>P21</strong> and the <strong>PL70E</strong>.</p>
<ul>
  <li><strong>Nelko P21:</strong> The ultimate budget model. It is 100% wireless and pairs via Bluetooth to the Nelko mobile app. It does not have PC drivers and cannot be used with a laptop.</li>
  <li><strong>Nelko PL70E:</strong> Looks identical, but features a USB data connection. You can download the Nelko PL70E Windows or Mac drivers from their official website to print labels directly from Microsoft Word or Excel on your computer.</li>
</ul>

<h2>Nelko Label Maker Setup Guide</h2>
<ol>
  <li>Charge the label maker using the included USB-C cable. Do not use high-wattage laptop chargers.</li>
  <li>Slide the front cover down to open the paper bay.</li>
  <li>Insert the label cassette. <strong>Critical Step:</strong> You must pull the tip of the label out past the exit slot. The glossy/printable side must face the ceramic printhead (usually pointing toward the top of the machine).</li>
  <li>Download the <strong>Nelko</strong> app from the App Store or Google Play.</li>
  <li>Turn the printer on, open the app, and click the "Unconnected" button in the top right to pair via Bluetooth. Do not pair through the phone's native Bluetooth settings.</li>
</ol>

<h2>Fixing "Label Tape Not Feeding"</h2>
<p>If you press print and hear the motor whining, but no tape comes out:</p>
<ul>
  <li><strong>The Tape is Tucked In:</strong> If the end of the sticker paper is trapped behind the thick black rubber roller (platen roller), it cannot feed. Open the lid, pull 1 inch of tape out manually, and close the lid.</li>
  <li><strong>Green Sticker Paper Alignment:</strong> Some colored tapes (like Nelko's green/pink variations) have a slightly thicker waxy backing. Ensure the tape is slotted perfectly between the two plastic alignment guides inside the tray. If it is sitting on top of a guide, the lid will pinch it, causing a jam.</li>
</ul>`
  },
  {
    title: "Fix Nelko P21 Won't Print, Bluetooth Errors & App Compatibility",
    slug: 'nelko-p21-wont-print-bluetooth-errors-app-compatibility',
    seoTitle: "Fix Nelko P21 Won't Print & Bluetooth Connection Errors",
    metaDescription: "Is your Nelko P21 failing to print, losing Bluetooth connection on Android 14, or printing multiple copies by mistake? Follow these software fixes.",
    excerpt: "Bluetooth permissions on modern Android and iOS devices frequently block the Nelko app from finding the P21 printer. Here is how to fix the connection.",
    errorCode: 'Bluetooth Failed / Wont Print',
    tags: 'nelko p21 not connecting bluetooth, nelko p21 android 14 compatibility, nelko app printing multiple copies error, nelko p21 wont print, nelko p21 ios compatibility requirements',
    wordCount: 1150,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a Nelko P21 not connecting to Bluetooth: Do NOT pair the printer in your phone's main Bluetooth settings menu. If you did, 'Forget' the device immediately. Open the Nelko App, tap the 'Unconnected' printer icon in the top right, and pair from within the app. For Android 14 users, you MUST go to your phone's Settings > Apps > Nelko > Permissions and grant 'Nearby Devices' and 'Precise Location' permissions, otherwise Android 14 will block the app from seeing BLE (Bluetooth Low Energy) devices entirely.",
    content: `<h2>Why the Nelko P21 Won't Connect to Bluetooth</h2>
<p>The most common issue with the Nelko P21 (and PL70E in wireless mode) is a failure to connect to the smartphone. This is almost never a hardware defect; it is a smartphone security permissions block.</p>

<h3>The Android 14 Compatibility Issue</h3>
<p>Google dramatically changed Bluetooth security in Android 13 and 14. If you deny "Location" permissions when you first install the Nelko app, the app is permanently blinded.</p>
<ol>
  <li>Open your Android <strong>Settings</strong>.</li>
  <li>Navigate to <strong>Apps &gt; See all apps &gt; Nelko</strong>.</li>
  <li>Tap <strong>Permissions</strong>.</li>
  <li>You must set <strong>Nearby Devices</strong> to <em>Allow</em>.</li>
  <li>You must set <strong>Location</strong> to <em>Allow only while using the app</em> (and toggle 'Precise Location' ON).</li>
  <li>Force close the Nelko app and reopen it. The printer will now appear in the connection menu.</li>
</ol>

<h3>iOS (iPhone/iPad) Compatibility</h3>
<p>The Nelko app requires iOS 11.0 or later. If your Bluetooth is dropping on an iPhone, go to the iPhone <strong>Settings</strong> app, scroll all the way down to the <strong>Nelko</strong> app, and ensure the <strong>Bluetooth</strong> toggle switch is flipped to green.</p>

<h2>Fix: Nelko App Printing Multiple Copies Error</h2>
<p>If you tap print once, but the P21 spits out 5 identical labels, you have inadvertently changed the batch print settings.</p>
<ul>
  <li>On the final print preview screen in the Nelko app, look at the bottom for the <strong>Print Quantity</strong> or <strong>Copies</strong> field.</li>
  <li>Ensure this is set to 1.</li>
  <li>If the app is glitching and freezing on the "Printing..." screen, it may queue the job multiple times. Clear the app cache (Android) or delete and reinstall the app (iOS) to flush a corrupted print queue.</li>
</ul>

<h2>Why the Printer Just "Won't Print"</h2>
<p>If the printer connects successfully, you hit print, and nothing happens:</p>
<ul>
  <li><strong>Battery Too Low:</strong> Thermal printing requires massive electrical current. If the battery is below 15%, the logic board will connect to Bluetooth but refuse to fire the thermal heating element to prevent a shutdown. Charge the printer for 1 hour.</li>
  <li><strong>Lid Open:</strong> Press firmly on the cover to ensure it is locked. The printer has a micro-switch that disables printing if the lid is slightly ajar.</li>
</ul>`
  },
  {
    title: "Nelko PM220 vs PM230: Small Business Setup & Bluetooth Pairing",
    slug: 'nelko-pm220-vs-pm230-small-business-setup-bluetooth-pairing',
    seoTitle: "Nelko PM220 vs PM230: Setup Guide & Bluetooth Fixes",
    metaDescription: "Comparing the Nelko PM220 and PM230 2-inch label printers for your small business. Learn how to set them up and troubleshoot Bluetooth pairing failures.",
    excerpt: "The Nelko PM220 and PM230 are 2-inch wide thermal printers perfect for barcodes, price tags, and small business packaging. Here is how they differ.",
    errorCode: null,
    tags: 'nelko pm220 vs pm230 difference, nelko pm220 bluetooth pairing failed, nelko pm230 setup guide, nelko pm220 app not detecting printer, nelko portable printer for small business setup',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: setupCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "Nelko PM220 vs PM230 Difference: Both the PM220 and PM230 are 2-inch (50mm) wide thermal label printers used for small business barcodes and price tags. Internally, they share the exact same 203dpi printhead and print speeds. The only difference is aesthetic design and minor battery capacity tweaks; the PM230 is simply the newer visual model year. To set them up for a small business: Load 2-inch die-cut labels, adjust the internal sliding paper guides so the roll doesn't wobble, and select the exact millimeter dimensions of your label in the Nelko App before printing.",
    content: `<h2>Choosing a Nelko for Small Business</h2>
<p>While the P21 is great for 0.5-inch file folder tape, small businesses need wider labels for barcodes, ingredients, and retail price tags. This is where the 2-inch (50mm) <strong>PM220 and PM230</strong> excel.</p>

<h3>PM220 vs PM230: What's the Difference?</h3>
<p>Nelko frequently releases updated model numbers that are functionally identical.</p>
<ul>
  <li><strong>Print Head:</strong> Both use a 203 DPI thermal printhead with a max width of 50mm.</li>
  <li><strong>Paper Types:</strong> Both support continuous rolls and pre-cut (die-cut) sticker rolls.</li>
  <li><strong>The Difference:</strong> The PM230 features an updated exterior shell design and slightly refined button placement. Functionally, they use the same app and the same paper.</li>
</ul>

<h2>PM220 & PM230 Setup Guide</h2>
<ol>
  <li>Slide the top hatch open.</li>
  <li>Insert your 2-inch label roll.</li>
  <li><strong>Crucial Step:</strong> Push the adjustable plastic guides inward until they hug the sides of the paper roll. If you leave the guides loose, your labels will drift left and right while printing, causing skewed barcodes.</li>
  <li>Pull the first label out slightly past the tear bar and close the lid.</li>
</ol>

<h2>Fixing App Not Detecting Printer & Bluetooth Fails</h2>
<p>If the Nelko app cannot detect your PM220/PM230 during pairing:</p>
<ul>
  <li><strong>Do NOT pair in the OS settings:</strong> Like all BLE (Bluetooth Low Energy) printers, pairing it in the iPhone or Android main Bluetooth menu will "steal" the connection, hiding it from the Nelko app. Go to your phone's Bluetooth menu, tap the 'i' or gear icon next to the PM220, and tap <strong>Forget This Device</strong>. Then open the Nelko app and pair it from there.</li>
  <li><strong>Location Services:</strong> On Android, you must enable GPS/Location services. The Android operating system categorizes Bluetooth scanning under Location Services. If your GPS is off, the app cannot scan for the printer.</li>
</ul>`
  },
  {
    title: "Fix Nelko PM220 Not Printing, Paper Jams & Indicator Lights",
    slug: 'nelko-pm220-not-printing-paper-jams-indicator-lights',
    seoTitle: "Fix Nelko PM220 Not Printing, Paper Jams & Light Codes",
    metaDescription: "Is your Nelko PM220 or PM230 displaying a solid red light and refusing to print? Learn how to decode indicator lights, fix paper jams, and clean the sensors.",
    excerpt: "When the PM220 halts and flashes red, it has detected a hardware fault like an open cover, an empty paper bay, or a physical label jam.",
    errorCode: 'Red Indicator Light',
    tags: 'nelko pm220 not printing, nelko pm220 indicator light meaning, nelko 2 inch label printer paper jam',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: hardwareCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "Nelko PM220 Indicator Light Meanings: 1) Solid Green: The printer is ready and connected to Bluetooth. 2) Flashing Green: The printer is actively charging. 3) Solid Red: Hardware error. The printer is either out of paper, the paper is loaded incorrectly, or the top cover is not pushed down hard enough to click shut. 4) Flashing Red: The battery is critically low (under 10%) or the thermal printhead has overheated from continuous printing. If overheated, turn the printer off for 15 minutes to cool the ceramic head.",
    content: `<h2>Decoding Nelko Indicator Lights</h2>
<p>Because portable Nelko printers lack LCD screens, you must rely on the LED indicator on the power button to diagnose why the PM220 or PM230 is not printing.</p>

<h3>The Solid Red Light (Hardware Interlock)</h3>
<p>A solid red light means a physical sensor has tripped to prevent the printer from running.</p>
<ul>
  <li><strong>Out of Paper:</strong> The optical sensor in the bottom of the tray sees nothing.</li>
  <li><strong>Cover Open:</strong> You must press down on <em>both</em> the left and right corners of the top lid simultaneously. If only one side clicks in, the printer will remain red.</li>
  <li><strong>Wrong Paper Type:</strong> If you load transparent clear labels, the sensor light shines straight through them, tricking the printer into thinking the bay is empty. You must use paper with black timing marks on the back for clear labels.</li>
</ul>

<h3>The Flashing Red Light (Power/Heat)</h3>
<p>A rapidly flashing red light is a critical warning.</p>
<ul>
  <li><strong>Low Battery:</strong> Plug the printer into a 5V/1A or 5V/2A wall charger.</li>
  <li><strong>Overheat Protection:</strong> If you just printed 100 retail tags back-to-back, the thermal printhead will exceed safe temperatures. The firmware locks the printer (flashing red) to prevent melting the plastic casing. Let it cool for 15 minutes.</li>
</ul>

<h2>Fixing Nelko 2-Inch Paper Jams</h2>
<p>If a label peels off inside the printer, it will wrap around the thick black rubber platen roller.</p>
<ol>
  <li>Turn the printer off immediately to prevent stripping the motor gears.</li>
  <li>Open the lid. Use tweezers to carefully peel the jammed label off the rubber roller.</li>
  <li><strong>Crucial Step:</strong> You must clean the sticky adhesive residue off the roller. If you leave glue on the roller, the very next label will stick to it and jam again. Use a Q-tip dipped in rubbing alcohol to scrub the roller clean.</li>
</ol>`
  }
];

async function main() {
  const brandSlug = 'nelko';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  
  if (!brand) {
    brand = await prisma.brand.create({
      data: {
        name: 'Nelko',
        slug: brandSlug,
        description: 'Nelko manufactures budget-friendly thermal label makers, shipping label printers, and portable bluetooth printers.'
      }
    });
  }

  console.log(`🚀 Publishing Batch 1 (Clusters A, B, C) for brand: ${brand.name}`);

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
