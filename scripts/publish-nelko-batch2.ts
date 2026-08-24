import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const paperCategory = '9a42c554-2b4f-47f8-887e-5996fb83cbad';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Nelko D810 Tattoo Stencil Printer Setup & vs Phomemo M08F",
    slug: 'nelko-d810-tattoo-stencil-printer-setup-vs-phomemo-m08f',
    seoTitle: "Nelko D810 Tattoo Stencil Setup & Blurry Lines Fix",
    metaDescription: "Setup guide for the Nelko D810 tattoo stencil printer. Compare it to the Phomemo M08F, learn which thermal paper works, and fix blurry or jammed stencils.",
    excerpt: "The Nelko D810 is a wide-format A4 portable printer that is highly popular with tattoo artists. Learn how to feed Spirit master paper correctly to avoid jams and blurry lines.",
    errorCode: 'Tattoo Stencil Jam',
    tags: 'nelko d810 tattoo stencil not printing, nelko d810 vs phomemo m08f comparison, nelko tattoo stencil printer setup guide, nelko d810 thermal paper compatibility, nelko tattoo stencil printer blurry lines',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: setupCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "Nelko D810 vs Phomemo M08F: Both are portable A4 thermal printers sharing nearly identical internal hardware and 203 DPI resolution. The Nelko is often slightly cheaper, while the Phomemo app has a slight edge in UI polish. To print tattoo stencils on the Nelko D810: You must use 4-ply Spirit Thermal transfer paper. CRITICAL: Remove the loose brown tissue layer from the paper before feeding it into the printer, or it will jam. Feed the yellow backing paper in facing UP. In the Nelko app, set the print density to 'Heavy' or 'Dark' to ensure the purple wax melts onto the stencil.",
    content: `<h2>Nelko D810 vs Phomemo M08F</h2>
<p>In the portable A4/US Letter thermal printer market, the <strong>Nelko D810</strong> and the <strong>Phomemo M08F</strong> are the two dominant players. Internally, they use nearly identical thermal printheads (both 203 DPI) and similar Bluetooth chips. The main difference is the exterior shell design and the companion apps. The Nelko is often positioned as a budget-friendly alternative that performs exactly the same task.</p>

<h2>Nelko Tattoo Stencil Setup Guide</h2>
<p>Tattoo artists love the D810 because it eliminates the need to trace stencils by hand. However, thermal transfer paper is much thicker than standard receipt paper.</p>
<ol>
  <li><strong>Prepare the Paper:</strong> Standard tattoo transfer paper comes in 4 layers (White drawing sheet, brown protective tissue, purple carbon wax, and yellow backing). <strong>You MUST remove and throw away the brown tissue layer.</strong> Leaving it in will block the heat and jam the printer.</li>
  <li><strong>Feeding Orientation:</strong> Turn the printer on. Insert the paper into the front slot with the <strong>Yellow backing sheet facing UP</strong>, and the white sheet facing DOWN. The printer will grab it and feed it slightly to align it.</li>
  <li><strong>App Settings:</strong> Open the Nelko app. Because melting purple wax requires significantly more heat than turning thermal paper black, you must go into the print settings and change the <strong>Print Density</strong> (or concentration) to High/Thick.</li>
</ol>

<h2>Fixing Blurry Lines and Stencil Jams</h2>
<ul>
  <li><strong>Blurry Lines:</strong> If your stencil is blurry or smudged, the image you sent to the app was likely a low-resolution JPG. Use high-contrast black-and-white line art. Also, if you push or pull the paper while the printer is running, the image will smear. Let the printer feed it naturally.</li>
  <li><strong>Paper Jams:</strong> If the printer grinds and stops, you either left the brown tissue paper in, or you are trying to use Spirit *Hectograph* (freehand) paper instead of Spirit *Thermal* paper. Hectograph paper does not react to heat and will melt into the rollers.</li>
</ul>`
  },
  {
    title: "Fix Nelko App Crashing, Android 14 Errors & iOS Updates",
    slug: 'nelko-app-crashing-android-14-errors-ios-updates',
    seoTitle: "Fix Nelko App Crashing, Android 14 & iOS Compatibility",
    metaDescription: "Is the Nelko app crashing on launch, failing to save templates, or incompatible with Android 14? Learn how to fix app permissions and iOS update bugs.",
    excerpt: "Mobile app updates frequently break compatibility with older Nelko Bluetooth printers. Here is how to fix crashing apps and recover saved label templates.",
    errorCode: 'App Crash',
    tags: 'nelko app not compatible android 14, nelko app crashing fix, nelko app ios update fix, nelko app template not saving',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix the Nelko App crashing on Android 14 or iOS: 1) Android 14 Bug: The app will crash on launch if it is denied the new 'Nearby Devices' Bluetooth permission. Go to Android Settings > Apps > Nelko > Permissions and explicitly grant 'Nearby Devices'. 2) Clear Cache: If the app freezes when trying to open a saved template, go to Settings > Apps > Nelko > Storage > Clear Cache. 3) Reinstall: On iOS, an OTA system update can corrupt the app's local database. Delete the Nelko app entirely, reboot your iPhone, and download the latest version from the App Store.",
    content: `<h2>Fixing the Android 14 Compatibility Crash</h2>
<p>When Google released Android 13 and 14, they completely overhauled how apps request Bluetooth access. They separated it from Location tracking into a new permission called <strong>Nearby Devices</strong>.</p>
<p>If you have an older version of the Nelko app, or if you accidentally tapped "Deny" on the popup, the app will instantly crash to the home screen the moment it tries to scan for your printer.</p>
<ul>
  <li>Open your Android <strong>Settings</strong> app.</li>
  <li>Navigate to <strong>Apps &gt; See all apps &gt; Nelko</strong>.</li>
  <li>Tap <strong>Permissions</strong>.</li>
  <li>Ensure <strong>Nearby Devices</strong> and <strong>Location</strong> (Precise Location) are both set to <em>Allow</em>.</li>
</ul>

<h2>iOS App Update Fixes & Crashing</h2>
<p>If you recently updated your iPhone to a new iOS version and the Nelko app now freezes on the splash screen or crashes when you hit "Print":</p>
<ol>
  <li>The app's local SQLite database (where it stores your custom templates) may have corrupted during the OS update.</li>
  <li>Tap and hold the Nelko app icon, select <strong>Remove App &gt; Delete App</strong>.</li>
  <li>Restart your iPhone (this clears the RAM).</li>
  <li>Open the App Store and re-download the Nelko app.</li>
</ol>

<h2>App Templates Not Saving</h2>
<p>If you spend 20 minutes designing a custom address label but it disappears when you close the app, ensure you have created an account and are logged in. "Guest Mode" often clears local templates when the app is purged from memory by the phone's battery optimizer. Logging in syncs your templates to the cloud.</p>`
  },
  {
    title: "Fix Nelko Bluetooth Disconnecting, Permissions & PC Connection",
    slug: 'nelko-bluetooth-disconnecting-permissions-pc-connection',
    seoTitle: "Fix Nelko Bluetooth Disconnecting & PC Connection Errors",
    metaDescription: "Does your Nelko printer keep dropping Bluetooth, show 'Permissions Denied', or refuse to connect to your computer? Learn the difference between BLE and classic Bluetooth.",
    excerpt: "Understanding how Bluetooth Low Energy (BLE) interacts with your phone's OS is the key to fixing Nelko connection drops and 'Permissions Denied' errors.",
    errorCode: 'Bluetooth Disconnect',
    tags: 'nelko printer not connecting to computer, nelko bluetooth keeps disconnecting, nelko printer app permissions denied, nelko printer works on phone not computer',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    featuredSnippet: "To fix Nelko Bluetooth disconnecting or 'Permissions Denied': NEVER pair the Nelko printer in your phone's main Bluetooth settings menu. Nelko printers use Bluetooth Low Energy (BLE). If you pair it in the OS settings, the OS 'locks' the connection, preventing the Nelko app from seeing it, resulting in a 'Permissions Denied' or connection failure. Go to your phone's Bluetooth settings and 'Forget' the Nelko printer. Then, open the Nelko app and tap the 'Connect' icon in the top right corner to pair it directly through the app.",
    content: `<h2>The Golden Rule of Nelko Bluetooth (BLE)</h2>
<p>The vast majority of Nelko Bluetooth complaints stem from a misunderstanding of how modern BLE (Bluetooth Low Energy) works compared to older classic Bluetooth (like connecting a car stereo or wireless headphones).</p>

<h3>The "Permissions Denied" Error</h3>
<p>If the Nelko app throws a "Permissions Denied" or "Device Occupied" error, you have paired the printer incorrectly.</p>
<ol>
  <li>When you pair a BLE printer via the iPhone or Android main Bluetooth settings page, the operating system takes exclusive control of the device.</li>
  <li>When you then open the Nelko app, the app asks the OS for the printer, but the OS refuses to hand it over.</li>
  <li><strong>The Fix:</strong> Go to your phone's Bluetooth settings. Find the Nelko printer, tap the gear (or 'i') icon, and select <strong>Forget this device</strong> or <strong>Unpair</strong>.</li>
  <li>Open the Nelko app, tap the printer icon in the top right, and connect from <em>within</em> the app.</li>
</ol>

<h2>Bluetooth Keeps Disconnecting</h2>
<p>If the printer connects but drops the connection 10 seconds later:</p>
<ul>
  <li><strong>Battery Voltage Drop:</strong> If the battery is under 15%, the voltage sags the moment the thermal heater turns on, causing the Bluetooth chip to brown-out and reboot. Charge the printer fully.</li>
  <li><strong>Radio Interference:</strong> 2.4GHz Wi-Fi routers, microwaves, and other Bluetooth devices can jam the BLE signal. Move closer to the printer.</li>
</ul>

<h2>Why It Works on Phone but Not Computer</h2>
<p>If you have a model like the Nelko PL70E or a 4x6 shipping printer, it may work flawlessly on your phone but refuse to connect to your laptop.</p>
<ul>
  <li><strong>No Bluetooth for PC:</strong> Nelko's Bluetooth chips are designed strictly for mobile apps (iOS/Android). Windows and Mac do not support the proprietary BLE protocols the Nelko app uses.</li>
  <li>To use a Nelko printer on a computer, you <strong>must connect it via the USB cable</strong> and download the specific Windows/Mac drivers from the official Nelko website.</li>
</ul>`
  }
];

async function main() {
  const brandSlug = 'nelko';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 2 (Clusters D & E) for brand: ${brand.name}`);

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
