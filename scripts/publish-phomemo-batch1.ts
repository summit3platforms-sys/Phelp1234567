import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const printQualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Phomemo Printer Won't Connect to Bluetooth & App Errors",
    slug: 'phomemo-printer-wont-connect-bluetooth-app-cant-find',
    seoTitle: "Fix Phomemo Bluetooth Won't Connect & App Can't Find Printer",
    metaDescription: "Is your Phomemo app failing to find your printer, or does Bluetooth keep disconnecting? Learn how to forget the device, reset Bluetooth, and connect successfully.",
    excerpt: "If the 'Print Master' or 'Phomemo' app cannot locate your mini printer, the phone's native Bluetooth menu is likely blocking the connection.",
    errorCode: 'Printer Not Found',
    tags: 'Phomemo, Wont Connect Bluetooth, App Cant Find Printer, Keeps Disconnecting, BLE, Print Master',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: connectivityCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a Phomemo printer that won't connect via Bluetooth: 1) Do NOT pair through your phone's Settings app. If you did, go to Settings > Bluetooth, find the Phomemo printer, and select 'Forget This Device'. 2) Turn the printer OFF, then back ON. 3) Open the official 'Phomemo' or 'Print Master' app. 4) Tap the tiny printer icon in the top right corner of the app screen. 5) Tap 'Search' and select the MAC address that appears. The printer must pair directly through the application's internal Bluetooth socket.",
    content: `<h2>Understanding Phomemo's Bluetooth Architecture</h2>
<p>Unlike wireless earbuds or car stereos that pair globally to your smartphone's operating system, Phomemo thermal printers (like the M02, T02, and M110) utilize <strong>Bluetooth Low Energy (BLE) point-to-point sockets</strong>. This means the printer is designed to communicate <strong>exclusively inside the Phomemo companion application</strong>.</p>

<h2>Fix 1: The 'Forget and Re-Pair' Protocol</h2>
<p>If you opened your iPhone or Android Bluetooth settings and tapped "Connect" to your Phomemo printer, you have locked the connection to the OS. The Phomemo app is now blocked from seeing the printer.</p>
<ol>
  <li>Open your phone's <strong>Settings &gt; Bluetooth</strong>.</li>
  <li>Locate the <code>Phomemo-XXXX</code> or <code>M110-XXXX</code> device.</li>
  <li>Tap the information (i) or gear icon and select <strong>Forget This Device</strong> (Unpair).</li>
  <li>Restart the Phomemo printer (hold the power button for 3 seconds).</li>
  <li>Open the <strong>Phomemo</strong> or <strong>Print Master</strong> app.</li>
  <li>Tap the printer connection icon in the top right corner to pair strictly through the app.</li>
</ol>

<h2>Fix 2: Resolving Frequent Bluetooth Disconnects</h2>
<p>If the printer connects successfully but drops the connection mid-edit or halfway through a print job:</p>
<ul>
  <li><strong>Battery Voltage Drops:</strong> A thermal printer draws significant amperage during printing. If the battery is below 20%, the voltage drop will instantly crash the Bluetooth radio. Charge the printer for 30 minutes.</li>
  <li><strong>Battery Saver Interference:</strong> Modern smartphones aggressively throttle background Bluetooth data to save power. Turn OFF "Low Power Mode" (iOS) or change the Phomemo app battery restriction to "Unrestricted" (Android).</li>
</ul>`
  },
  {
    title: "Phomemo Bluetooth Permissions, QR Code Pairing & Android 12 Fix",
    slug: 'phomemo-bluetooth-permissions-qr-code-pairing-android-12',
    seoTitle: "Phomemo Bluetooth Permissions, QR Code Pairing & Android Fix",
    metaDescription: "Are you getting permission denied errors on Android 12, or is your Phomemo pairing with the wrong device? Learn how to fix BLE permissions and use QR code pairing.",
    excerpt: "Strict Android 12+ location permissions often block Phomemo printer discovery. Learn how to approve 'Nearby Devices' and verify serial number mismatches.",
    errorCode: 'Permissions Denied',
    tags: 'Phomemo, Android 12 Bluetooth Permission Fix, QR Code Bluetooth Pairing, App Permissions Denied, Serial Number Mismatch, Wrong Device',
    wordCount: 1150,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix Phomemo permission denied errors on Android 12+: Google requires apps using Bluetooth Low Energy to have explicit permission to scan for hardware. 1) Go to your phone's Settings > Apps > Phomemo (or Print Master). 2) Tap 'Permissions'. 3) You MUST grant 'Nearby Devices'. 4) For Android 11 and older, you must grant 'Location' permission. If you have multiple printers in an office and keep connecting to the wrong one, double-press the printer's power button to print a diagnostic QR code, then use the app's scanner to pair exactly to that MAC address.",
    content: `<h2>Solving Android 12+ Permission Blocks</h2>
<p>Starting with Android 12, Google split Bluetooth scanning permissions away from GPS Location permissions to improve privacy. However, if the Phomemo app prompts you for permissions and you tap "Deny," the app will permanently fail to find any printers without warning.</p>

<h3>Step-by-Step Android Permission Fix:</h3>
<ol>
  <li>Open the <strong>Settings</strong> app on your Android smartphone.</li>
  <li>Navigate to <strong>Apps &gt; See all apps</strong>.</li>
  <li>Scroll down and select the <strong>Phomemo</strong> or <strong>Print Master</strong> app.</li>
  <li>Tap <strong>Permissions</strong>.</li>
  <li>Under "Not Allowed", find <strong>Nearby Devices</strong>. Tap it and select <strong>Allow</strong>.</li>
  <li><em>Note for older phones:</em> If you are on Android 10 or 11, Bluetooth beacon discovery is tied to the GPS subsystem. You must grant <strong>Location (While using the app)</strong> for the printer to appear.</li>
</ol>

<h2>Fixing Serial Number Mismatches & Wrong Device Pairing</h2>
<p>If you are in an office or classroom with multiple Phomemo printers (e.g., several M110s), the Bluetooth connection screen will show multiple identical names. Guessing the wrong one results in a "Serial Number Mismatch" or pairing failure.</p>

<h3>The QR Code Pairing Method</h3>
<p>Instead of guessing which MAC address belongs to your printer, use the built-in hardware diagnostic printout.</p>
<ol>
  <li>Ensure label paper is loaded into the printer.</li>
  <li><strong>Double-press the power button rapidly.</strong></li>
  <li>The printer will feed a small label containing the printer's exact firmware version, MAC address, and a <strong>QR Code</strong>.</li>
  <li>In the Phomemo app, go to the connection screen and tap the <strong>Scan icon [-]</strong> in the top right.</li>
  <li>Point your camera at the printed QR code. The app will bypass the discovery list and bind directly to that exact printer.</li>
</ol>`
  },
  {
    title: "Phomemo Printer Connected But Won't Print & App Crashing Fix",
    slug: 'phomemo-printer-connected-wont-print-app-crashing-fix',
    seoTitle: "Fix Phomemo Connected But Won't Print & App Crashing",
    metaDescription: "Does your Phomemo printer show as connected but refuses to print? Is the app crashing when you try to open photos? Learn how to clear print spools and caches.",
    excerpt: "If the Phomemo app crashes when opening your camera roll, or the printer connects but freezes on 'Sending Data', the phone's memory cache is corrupted.",
    errorCode: 'App Crash / Timeout',
    tags: 'Phomemo, Connected But Wont Print, App Crashing Fix, Print Master Crash, Print Timeout, Clear Cache',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '4 minutes',
    categoryId: softwareCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix a Phomemo app that crashes or a printer that connects but won't print: 1) App Crashing on iOS: If the app crashes when you tap 'Print Photo', iOS is blocking access. Go to iPhone Settings > Phomemo > Photos > select 'Full Access'. 2) Printer Connects but Won't Print (Android/iOS): The Bluetooth cache is stalled. Force-quit the Phomemo app, toggle your phone's Bluetooth OFF for 10 seconds, toggle it ON, restart the printer, and try again. 3) Clear App Cache (Android): Go to Settings > Apps > Phomemo > Storage > tap 'Clear Cache'.",
    content: `<h2>Why the App Crashes When Selecting Photos</h2>
<p>The most common cause of the Phomemo or Print Master app instantly force-closing is a media permission error. When you attempt to insert an image into a label, the app requests the smartphone's operating system to open the camera roll. If you previously selected "Limited Access" or "Deny", the OS forcefully terminates the app to protect your privacy.</p>

<h3>iOS Photo Permission Fix:</h3>
<ol>
  <li>Open the iPhone <strong>Settings</strong> app.</li>
  <li>Scroll all the way down to the alphabetical list of apps and tap <strong>Phomemo</strong>.</li>
  <li>Tap <strong>Photos</strong>.</li>
  <li>Change the setting from "Selected Photos" or "None" to <strong>Full Access</strong> (or <em>All Photos</em>).</li>
</ol>

<h2>Fixing the "Connected But Won't Print" Freeze</h2>
<p>If the printer icon turns green (connected) but tapping "Print" results in an endless loading circle or no physical response from the hardware:</p>
<ul>
  <li><strong>Stalled Bluetooth Spooler:</strong> The phone sent the data packet, but the Bluetooth socket locked up before acknowledging receipt. Force-quit the app (swipe up to remove it from multitasking), toggle Bluetooth off and on via Control Center, and reboot the printer.</li>
  <li><strong>Label Dimensions Mismatch:</strong> If you designed a 2-inch wide label in the app but physically loaded 0.5-inch tape, the printer's internal logic board will reject the job to prevent printing onto the bare rubber roller. Ensure the paper size selected in the app matches the physical roll perfectly.</li>
</ul>`
  },
  {
    title: "Fix Phomemo Printer Feeds But Prints Blank (Paper Orientation Guide)",
    slug: 'phomemo-printer-feeds-prints-blank-paper-orientation',
    seoTitle: "Fix Phomemo Feeds But Prints Blank (Paper Orientation)",
    metaDescription: "Is your Phomemo T02, M02, or M110 feeding paper normally but printing completely blank? You have loaded the thermal paper upside down. Learn the correct orientation.",
    excerpt: "Thermal printers require special chemically treated paper. If the paper feeds but no image appears, the non-reactive side of the paper is facing the printhead.",
    errorCode: 'Blank Print',
    tags: 'Phomemo, Paper Feeds But Blank, Paper Orientation, Which Side Up, Print Surface Wrong Way, Prints Nothing, T02 No Image',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '2 minutes',
    categoryId: printQualityCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Phomemo printer that feeds paper but prints completely blank: 1) The paper is loaded upside down. Thermal printers like the Phomemo T02, M02, and M110 do not use ink; they use heat to react with a chemical layer on ONE side of the paper. 2) Open the printer lid. 3) Remove the paper roll. 4) Flip the roll over so the paper unrolls from the TOP (like a waterfall). 5) The glossy/smooth side (the print surface) MUST face the black ceramic line on the underside of the printer lid. 6) Close the lid and reprint.",
    content: `<h2>The Mechanics of Inkless Thermal Printing</h2>
<p>Unlike standard desktop inkjet printers, Phomemo pocket printers contain absolutely zero ink, toner, or ribbon cartridges. They utilize <strong>Direct Thermal Technology</strong>. The printer contains a ceramic thermal element that rapidly heats up. The paper itself is coated with a micro-encapsulated chemical dye that turns black instantly when exposed to that heat.</p>
<p><strong>Because the chemical coating is only applied to ONE side of the paper, loading the roll upside down guarantees a 100% blank print.</strong></p>

<h2>The Scratch Test: Identifying the Print Surface</h2>
<p>If you are unsure which side of a Phomemo sticker roll is the correct print surface, use this foolproof test:</p>
<ol>
  <li>Tear off a tiny scrap of the label paper.</li>
  <li>Place it on a hard surface.</li>
  <li>Drag your fingernail quickly and firmly across both sides.</li>
  <li>The friction from your fingernail will generate enough microscopic heat to draw a dark black/grey line on the active chemical side. The side that turns dark is the side that must face the printhead.</li>
</ol>

<h2>Proper Loading Orientation by Model</h2>
<h3>Phomemo T02 &amp; M02 (Pocket Printers)</h3>
<ul>
  <li>Open the clamshell lid.</li>
  <li>Place the roll in the bay so the paper unrolls from the <strong>TOP</strong> of the roll, pulling forward over the front lip.</li>
  <li>The active print surface should face upwards towards the lid (where the thermal head is housed).</li>
</ul>

<h3>Phomemo M110 &amp; M221 (Label Makers)</h3>
<ul>
  <li>Open the top cover.</li>
  <li>Pull the paper guides apart and insert the roll.</li>
  <li>The labels must feed from the <strong>TOP</strong> of the roll. The sticker side (print surface) must face upwards, and the waxy backing paper must face downwards against the rubber roller.</li>
</ul>`
  },
  {
    title: "Phomemo Printhead Cleaning: Fix Faint Print Lines & Residue",
    slug: 'phomemo-printhead-cleaning-guide-faint-lines-residue',
    seoTitle: "Phomemo Printhead Cleaning: Fix Faint Lines & Residue",
    metaDescription: "Are you seeing faint print, white vertical lines, or sticky residue on your Phomemo printer? Learn how to safely clean the thermal printhead with isopropyl alcohol.",
    excerpt: "Over time, sticky residue from adhesive labels and paper dust builds up on the thermal printhead, causing faint printing and straight vertical white lines.",
    errorCode: null,
    tags: 'Phomemo, Printhead Cleaning Guide, Faint Print Lines Fix, Sticker Paper Residue, Maintenance',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: hardwareCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "To clean a Phomemo printhead and fix faint vertical lines: 1) Turn the printer OFF and open the paper lid. 2) Locate the printhead: It is a dark, thin ceramic line (usually encased in green or brown plastic) located on the underside of the lid or above the paper exit slot. 3) Moisten a cotton swab with 99% Isopropyl Alcohol. 4) Gently wipe the ceramic line back and forth 3-4 times to dissolve paper dust and sticky label residue. 5) Wait 2 minutes for the alcohol to evaporate completely before reloading paper and printing.",
    content: `<h2>Why Prints Become Faint or Streaky</h2>
<p>Direct thermal printers are highly sensitive to microscopic contamination. Because the Phomemo uses adhesive sticker paper, occasionally peeling a sticker too close to the exit slot can leave a micro-smudge of acrylic glue on the thermal printhead.</p>
<p>When the printhead fires, this glue acts as a thermal insulator. Heat cannot reach the paper, resulting in a <strong>continuous, sharp vertical white line</strong> running through your printed images.</p>

<h2>Step-by-Step Printhead Cleaning Guide</h2>
<p>Routine cleaning should be performed every time you finish a 3-pack of paper rolls to ensure maximum image contrast and longevity of the device.</p>
<ol>
  <li><strong>Power Down:</strong> Always turn the Phomemo printer completely off before cleaning to prevent short-circuiting the heated elements.</li>
  <li><strong>Access the Head:</strong> Open the printer's main compartment and remove the paper roll.</li>
  <li><strong>Locate the Element:</strong> Look for a thin, shiny black/brown glass line. On the T02 and M02, it is located on the underside of the top lid. On the M110, it is located just above the front exit rollers.</li>
  <li><strong>The Solvent:</strong> Use <strong>90%+ Isopropyl Alcohol (Rubbing Alcohol)</strong>. Do NOT use water, windex, or harsh household degreasers.</li>
  <li><strong>Wipe:</strong> Lightly dampen a cotton swab (Q-tip) or a microfiber cloth with the alcohol. Wipe firmly across the glass line from left to right multiple times.</li>
  <li><strong>Dry:</strong> Allow the alcohol to evaporate for 60 to 120 seconds.</li>
</ol>

<h2>Preventing Sticky Residue</h2>
<p>To prevent future glue buildup, always use the printer's integrated metal tear-bar. Pull the printed label firmly downwards at a 45-degree angle to tear it cleanly. Never pull the label straight out or upwards, as this drags the exposed adhesive backing against the printhead.</p>`
  }
];

async function main() {
  const brandSlug = 'phomemo';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  
  if (!brand) throw new Error('Brand not found. Make sure Phomemo exists in DB.');

  console.log(`🚀 Publishing Batch 1 (Clusters A & B: Connectivity & Paper) for brand: ${brand.name}`);

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
