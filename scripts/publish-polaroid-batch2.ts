import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const mobileCategory = '29cd3e5e-9873-48e6-bd83-6d2bdd8c531d';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Polaroid Hi-Print Bluetooth Won't Connect & Pairing Failed",
    slug: 'polaroid-hi-print-wont-connect-bluetooth-pairing-failed',
    seoTitle: "Fix Polaroid Hi-Print Bluetooth Won't Connect & Pairing Failed",
    metaDescription: "Is your Polaroid Hi-Print failing to connect via Bluetooth or showing 'Printer Not Found' in the app? Learn how to forget and re-pair Bluetooth and fix iOS/Android bugs.",
    excerpt: "Polaroid Hi-Print uses Bluetooth Low Energy socket pairing exclusively through its mobile app. If your phone's native settings grab the connection, the app will fail to pair.",
    errorCode: 'Bluetooth Pairing Failed',
    tags: 'Polaroid, Polaroid Hi-Print, Bluetooth Wont Connect, Pairing Failed, Printer Not Found, Forget Device, BLE Pairing',
    wordCount: 1150,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: connectivityCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To fix Polaroid Hi-Print Bluetooth pairing failures: 1) Go to your phone's native Bluetooth settings; if you see 'Polaroid Hi-Print', tap 'Forget This Device' / 'Unpair'. 2) Turn the printer ON (the heart/rainbow LED should glow steady white). 3) Open the official 'Polaroid Hi-Print' app (do not pair in phone settings). 4) Ensure Bluetooth, Location (Android), and Local Network/Photos (iOS) permissions are set to Allowed. 5) In the app, tap the printer icon in the top right > select your printer to establish a direct BLE handshake.",
    content: `<h2>Understanding Polaroid Hi-Print Bluetooth Architecture</h2>
<p>The <strong>Polaroid Hi-Print 2x3 Pocket Printer</strong> connects to smartphones and tablets via <strong>Bluetooth 2.1 + EDR &amp; Bluetooth Low Energy (BLE)</strong>. Like many modern smart peripherals, the Hi-Print is designed to communicate strictly inside its companion app rather than registering as a classic Bluetooth audio or accessory device. If your phone's operating system establishes a lock on the hardware before the Polaroid app launches, the application will search endlessly and report <em>"Printer Not Found"</em>.</p>

<h2>Step-by-Step Fix 1: The 'Forget and Re-Pair' Protocol</h2>
<ol>
  <li><strong>Unpair in Phone Settings:</strong> Open your smartphone's primary <em>Settings &gt; Bluetooth</em> menu. Look for any entry named <code>Polaroid Hi-Print-XXXX</code> or <code>Hi-Print</code>. Tap the "i" info icon (or gear icon) and select <strong>"Forget This Device"</strong> (or "Unpair").</li>
  <li><strong>Power Cycle the Printer:</strong> Press and hold the power button on the Hi-Print for 3 seconds until the LED turns off. Wait 5 seconds, then hold for 2 seconds until the LED illuminates white.</li>
  <li><strong>Re-Pair Strictly Inside the App:</strong>
    <ul>
      <li>Launch the official <strong>Polaroid Hi-Print</strong> app.</li>
      <li>Tap the small printer icon in the top right corner of the screen.</li>
      <li>Tap <strong>"Find Printer"</strong>.</li>
      <li>Select your detected Hi-Print unit from the device drawer. The printer will chime and the LED will switch from white to solid blue or steady green.</li>
    </ul>
  </li>
</ol>

<h2>Fix 2: Resolving iOS 17/18 &amp; Android 14 Permission Blocks</h2>
<p>Modern mobile operating systems isolate Bluetooth scanning behind granular security toggles:</p>
<ul>
  <li><strong>iPhone &amp; iPad Users:</strong> Open <em>Settings &gt; Privacy &amp; Security &gt; Bluetooth</em>. Ensure the toggle next to <strong>Polaroid Hi-Print</strong> is enabled (green). Next, go to <em>Settings &gt; Polaroid Hi-Print</em> and enable <strong>Local Network</strong> and <strong>Full Access for Photos</strong>.</li>
  <li><strong>Android Users:</strong> Open <em>Settings &gt; Apps &gt; Polaroid Hi-Print &gt; Permissions</em>. You must grant permission for <strong>Nearby Devices</strong> (Android 12+) or <strong>Location</strong> (Android 11 and earlier). Bluetooth beacon discovery requires location subsystem access on Android.</li>
</ul>

<h2>Fix 3: Pinhole BLE Radio Reset</h2>
<p>If the printer LED flashes in an irregular purple/amber rhythm and refuses to enter discoverable mode, the onboard Bluetooth controller is locked:</p>
<ol>
  <li>Locate the tiny pinhole reset switch beside the charging port.</li>
  <li>Insert a SIM ejector tool and hold for <strong>5 seconds</strong> until the LED blinks rapidly.</li>
  <li>Release and restart the printer; the Bluetooth broadcast beacon will be restored to factory parameters.</li>
</ol>`
  },
  {
    title: "Polaroid Hi-Print Pairs But Won't Print & Keeps Disconnecting",
    slug: 'polaroid-hi-print-pairs-wont-print-keeps-disconnecting',
    seoTitle: "Polaroid Hi-Print Pairs But Won't Print (Fix Disconnects)",
    metaDescription: "Does your Polaroid Hi-Print say connected in the app but stalls when printing, or drops connection every few minutes? Fix auto-sleep and buffer timeouts.",
    excerpt: "If your Polaroid Hi-Print drops its Bluetooth connection during photo editing or freezes on 'Sending image to printer', phone power saving and buffer sizes are the cause.",
    errorCode: 'Transfer Timeout',
    tags: 'Polaroid, Pairs But Wont Print, Keeps Disconnecting, No Computer Needed, Battery Saver, BLE Drop',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '6 minutes',
    categoryId: connectivityCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix a Polaroid Hi-Print that connects but won't print or keeps dropping connection: 1) Disable Low Power Mode on your smartphone; iOS and Android battery savers throttle BLE bandwidth, causing multi-megabyte image transfers to time out. 2) The printer has an aggressive 3-minute auto-sleep timer; keep the printer awake by tapping the power button once if editing photos for several minutes before printing. 3) Note on computer connectivity: The Polaroid Hi-Print is strictly mobile-only (iOS and Android); it cannot print from Windows or Mac computers via USB.",
    content: `<h2>Why Polaroid Hi-Print Connections Drop</h2>
<p>Because the Polaroid Hi-Print is an ultra-compact portable device running on an internal lithium battery, its firmware enforces an aggressive <strong>auto-power-down policy after 3 to 5 minutes of inactivity</strong> to prevent battery drain. If you spend several minutes cropping, adding stickers, and applying text filters inside the app, the printer hardware may silently enter standby mode before you tap the final print button.</p>

<h2>Fix 1: Bypassing Mobile OS Battery Throttling</h2>
<p>When you tap "Print", the Polaroid app compresses the photo into a 4-channel CMYK color raster map and streams the payload over Bluetooth. If your smartphone is in power-saver mode, the OS chokes background data pipelines:</p>
<ol>
  <li><strong>On iPhone:</strong> Open Control Center or go to <em>Settings &gt; Battery</em> and turn OFF <strong>Low Power Mode</strong>.</li>
  <li><strong>On Android:</strong> Open <em>Settings &gt; Apps &gt; Polaroid Hi-Print &gt; Battery</em>. Change the restriction from <em>"Optimized"</em> to <strong>"Unrestricted"</strong>.</li>
  <li>Reopen the Polaroid app and resend the photo. The print job will beam across in under 4 seconds.</li>
</ol>

<h2>Fix 2: Clearing Stalled Mobile Print Spoolers</h2>
<p>If the app displays an animated progress bar that reaches 99% and freezes indefinitely:</p>
<ul>
  <li>Force quit the Polaroid Hi-Print app (swipe it away completely from the multi-tasking app switcher).</li>
  <li>Toggle your phone's Bluetooth off in Control Center for 10 seconds, then toggle it back on.</li>
  <li>Power cycle the Hi-Print printer.</li>
  <li>Reopen the app; it will clear the corrupted temporary raster buffer and allow you to print cleanly.</li>
</ul>

<h2>Can You Print to Polaroid Hi-Print from a Mac or Windows PC?</h2>
<p>A common point of confusion among buyers is whether the USB port on the Hi-Print allows printing from desktop computers. <strong>The Polaroid Hi-Print does not support desktop operating systems.</strong> The USB port is strictly for charging the internal lithium battery. There are no Windows or macOS desktop drivers; all photo creation and printing must be executed through the official iOS or Android smartphone application.</p>`
  },
  {
    title: "Fix Polaroid Hi-Print App Crashing, Permissions & Update Errors",
    slug: 'polaroid-hi-print-app-crashing-permissions-update-fix',
    seoTitle: "Fix Polaroid Hi-Print App Crashing & Permissions (iOS/Android)",
    metaDescription: "Is the Polaroid Hi-Print companion app crashing on launch, freezing on your photo gallery, or throwing permission errors? Complete software troubleshooting guide.",
    excerpt: "When the Polaroid Hi-Print app crashes when selecting photos or after an OS software update, corrupted thumbnail caches and restrictive media permissions are the cause.",
    errorCode: 'App Crash',
    tags: 'Polaroid, App Crashing, Permissions Error, App Update, iOS 18, Android 14, Thumbnail Cache',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix Polaroid Hi-Print app crashing and permission errors: 1) On iOS: Go to Settings > Polaroid Hi-Print > Photos > select 'Full Access' (Limited Access causes crashes when loading large iCloud libraries). Turn ON Bluetooth and Local Network. 2) On Android: Go to Settings > Apps > Polaroid Hi-Print > Permissions > grant 'Photos and Videos' and 'Nearby Devices'. 3) Clear Corrupted Cache: On Android, tap Storage > Clear Cache & Clear Data. On iPhone, offload the app under iPhone Storage and reinstall from the App Store.",
    content: `<h2>Why the Polaroid Hi-Print App Crashes</h2>
<p>The Polaroid Hi-Print mobile application interfaces directly with native operating system image processing engines. When the app attempts to index thousands of cloud-synced photos, high-efficiency HEIC files, or 48MP/108MP RAW captures, low phone memory or restricted OS permissions will trigger an immediate application termination.</p>

<h2>Fix 1: Resolving iOS Photo Library Permission Locks</h2>
<p>If the app crashes the instant you tap "All Photos" or try to open an album:</p>
<ol>
  <li>Open the <strong>Settings</strong> app on your iPhone or iPad.</li>
  <li>Scroll down to the bottom list of installed applications and tap <strong>Polaroid Hi-Print</strong>.</li>
  <li>Tap <strong>Photos</strong>.</li>
  <li>Select <strong>Full Access</strong> (if set to "Limited Access" or "Selected Photos", browsing unselected folders forces an unhandled exception).</li>
  <li>Ensure <strong>Local Network</strong> and <strong>Bluetooth</strong> are toggled green.</li>
</ol>

<h2>Fix 2: Resolving Android 'Nearby Devices' Permissions</h2>
<p>On Android 12, 13, and 14, Bluetooth Low Energy discovery requires a dedicated runtime permission:</p>
<ul>
  <li>Go to <em>Settings &gt; Apps &gt; See all apps &gt; Polaroid Hi-Print</em>.</li>
  <li>Tap <strong>Permissions</strong>.</li>
  <li>Ensure <strong>Nearby Devices</strong> is set to <em>Allow</em>.</li>
  <li>Ensure <strong>Photos and Videos</strong> (or <em>Storage</em>) is set to <em>Allow</em>.</li>
  <li>Tap <strong>Storage &amp; Cache &gt; Clear Cache</strong> to flush stale temporary render files.</li>
</ul>

<h2>Fix 3: What to Do If an App Update Broke Printing</h2>
<p>If printing stopped working immediately following an automatic app update:</p>
<ol>
  <li>Delete the Polaroid Hi-Print app from your phone.</li>
  <li>Restart your smartphone (clearing background Bluetooth socket locks).</li>
  <li>Download a fresh copy of the Polaroid Hi-Print app from the App Store or Google Play Store.</li>
  <li>Log back into your account, accept permissions, and re-pair with the printer.</li>
</ol>`
  },
  {
    title: "How to Connect Multiple Phones to a Polaroid Hi-Print Printer",
    slug: 'polaroid-hi-print-multiple-phones-pairing-guide',
    seoTitle: "How to Pair Multiple Phones to Polaroid Hi-Print (Guide)",
    metaDescription: "Want to connect multiple iPhones and Android devices to a single Polaroid Hi-Print? Learn how multi-device pairing works and how to switch active users seamlessly.",
    excerpt: "The Polaroid Hi-Print can remember multiple paired smartphones, but point-to-point Bluetooth Low Energy allows only one active phone to print at a time.",
    errorCode: null,
    tags: 'Polaroid, Multiple Phones, Multi-Device Pairing, Party Printing, Bluetooth Sharing, Family Setup',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '4 minutes',
    categoryId: mobileCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To pair multiple phones to one Polaroid Hi-Print: 1) Initial Setup: Pair each phone individually using the Polaroid Hi-Print app while other phones are out of range or have Bluetooth disabled. The printer stores up to 8 paired device IDs in memory. 2) Sequential Printing: To switch users, Phone A must close the Polaroid app or toggle Bluetooth off so the printer releases its BLE socket. Phone B can then open the Polaroid app and connect immediately.",
    content: `<h2>Understanding Multi-Device Bluetooth Architecture</h2>
<p>Unlike office Wi-Fi printers that sit on a shared local network, the <strong>Polaroid Hi-Print</strong> uses direct <strong>point-to-point Bluetooth Low Energy (BLE)</strong>. This means the printer can only maintain an active data connection with <strong>one smartphone at any given second</strong>.</p>

<h2>Step-by-Step Multi-Device Pairing Guide</h2>
<ol>
  <li><strong>Pair Phone 1:</strong> Turn on the Hi-Print, open the Polaroid Hi-Print app on Phone 1, and pair successfully. Print a test photo.</li>
  <li><strong>Disconnect Phone 1:</strong> Close the Polaroid Hi-Print app completely on Phone 1 (swipe it away in the multitasking switcher) or temporarily toggle Bluetooth OFF.</li>
  <li><strong>Pair Phone 2:</strong> Open the Polaroid Hi-Print app on Phone 2, tap the printer icon, and tap "Find Printer". Select the Hi-Print to complete authorization.</li>
  <li>The Hi-Print internal EEPROM memory will save the unique MAC addresses of both phones.</li>
</ol>

<h2>Smooth Switching Between Friends and Family</h2>
<p>At parties, gatherings, or family events where multiple people want to print custom 2x3 stickers from their own camera rolls:</p>
<ul>
  <li>Establish a simple rule: <em>"Close the app when your sticker finishes printing."</em></li>
  <li>As soon as the active user closes their Polaroid app, the printer LED returns to steady white (ready state), allowing the next person's app to grab the connection in under 2 seconds.</li>
</ul>`
  }
];

async function main() {
  const brand = await prisma.brand.findUnique({ where: { slug: 'polaroid' } });
  if (!brand) throw new Error('Polaroid brand not found in database.');

  console.log(`🚀 Publishing Batch 2 (Cluster B: Bluetooth & App Connectivity) for brand: ${brand.name}`);

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
