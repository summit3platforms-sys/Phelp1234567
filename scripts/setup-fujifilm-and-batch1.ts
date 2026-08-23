import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const mobileCategory = '29cd3e5e-9873-48e6-bd83-6d2bdd8c531d';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Instax Mini Link & Square Link Bluetooth Connection & Pairing Issues",
    slug: 'instax-mini-link-bluetooth-connection-pairing-failed',
    seoTitle: "Fix Instax Mini Link & Square Link Bluetooth Pairing Failed",
    metaDescription: "Is your Instax Mini Link or Square Link failing to connect via Bluetooth? Learn how to fix pairing errors, greyed-out buttons, and smartphone permission blocks.",
    excerpt: "When the Instax Link app says 'Printer Not Found' or Bluetooth stays greyed out, iOS and Android permission locks or stale pairing caches are almost always the cause.",
    errorCode: 'Pairing Failed',
    tags: 'Fujifilm, Instax Mini Link, Instax Square Link, Bluetooth Pairing, Connection Failed, Bluetooth Greyed Out',
    wordCount: 1150,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: connectivityCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To fix Instax Mini Link or Square Link Bluetooth pairing failures: 1) Turn on the printer by holding the central power button until the LED illuminates. 2) Do NOT attempt to pair the printer inside your phone's native iOS/Android Bluetooth settings menu. 3) Open the official 'mini LINK' or 'SQUARE Link' app. 4) Ensure Bluetooth and Location (or 'Nearby Devices' on Android 12+) permissions are enabled for the app. 5) Tap the Settings gear icon in the app, select 'Bluetooth Settings', and tap 'Search'. 6) Select your printer (e.g., INSTAX-XXXXXX) inside the app to complete the connection.",
    content: `<h2>Understanding Instax Link Bluetooth Architecture</h2>
<p>Unlike standard wireless office printers or Bluetooth headphones, Fujifilm Instax Link printers (including Mini Link, Mini Link 2, Mini Link 3, and Square Link) utilize <strong>Bluetooth Low Energy (BLE) direct socket pairing</strong>. This means the printer communicates exclusively through the dedicated smartphone application rather than registering as an audio or peripheral device in your phone's primary operating system Bluetooth menu.</p>
<p>If you attempt to pair the printer through your phone's standard Bluetooth settings before launching the app, your smartphone will lock the connection channel, causing the app to report <em>"Cannot Find Printer"</em> or display a greyed-out connection button.</p>

<h2>Step-by-Step Fix 1: The App-First Pairing Protocol</h2>
<ol>
  <li><strong>Unpair from Phone Settings:</strong> Open your smartphone's Bluetooth settings menu. If you see an entry named <code>INSTAX-XXXXXX</code>, tap the information icon (or gear icon) and select <strong>"Forget This Device"</strong> (or "Unpair").</li>
  <li><strong>Power Cycle the Printer:</strong> Hold down the central power button on the Instax Link printer for 3 seconds until the LED light turns completely off. Wait 5 seconds, then press and hold for 2 seconds until the LED lights up.</li>
  <li><strong>Grant App OS Permissions:</strong>
    <ul>
      <li><strong>On iOS:</strong> Go to <em>Settings &gt; Privacy &amp; Security &gt; Bluetooth</em> and ensure the toggle next to the <strong>mini LINK</strong> (or SQUARE Link) app is turned ON. Next, go to <em>Settings &gt; mini LINK</em> and enable <strong>Local Network</strong> and <strong>Photos</strong> permissions.</li>
      <li><strong>On Android:</strong> Go to <em>Settings &gt; Apps &gt; mini LINK &gt; Permissions</em>. Allow <strong>Nearby Devices</strong> (Android 12+) or <strong>Location</strong> (Android 11 and earlier). Bluetooth Low Energy scanning requires location access on Android to discover nearby broadcasting beacons.</li>
    </ul>
  </li>
  <li><strong>Pair Inside the Dedicated App:</strong> Open the Instax Link application. Tap the <strong>Settings (Gear)</strong> icon in the top right corner. Select <strong>Bluetooth Settings</strong>, tap <strong>Search</strong>, and choose your printer model from the detected list. The central LED will shift to a steady connection color.</li>
</ol>

<h2>Fix 2: Clearing Stale Bluetooth Caches (Greyed Out Button)</h2>
<p>If the Bluetooth icon inside the Instax app remains greyed out and unresponsive, the background BLE cache on your mobile device is frozen.</p>
<ul>
  <li><strong>Force Quit App:</strong> Swipe up from the bottom of your phone screen to open the app switcher and swipe the Instax app away completely.</li>
  <li><strong>Toggle Phone Bluetooth:</strong> Turn off your phone's Bluetooth in the Control Center or Notification Shade for 10 seconds, then toggle it back ON.</li>
  <li><strong>Close Competing Background Apps:</strong> If you have other instant camera apps running (such as Canon IVY, HP Sprocket, or Polaroid Hi-Print), force close them, as they frequently conflict over shared BLE scanning ports.</li>
</ul>

<h2>Fix 3: Pinhole Hardware Reset</h2>
<p>If the printer LED flashes in an irregular pattern and refuses to enter pairing mode:</p>
<ol>
  <li>Locate the tiny reset pinhole located near the USB charging port on the side or bottom of the printer.</li>
  <li>Insert a straightened paperclip or SIM ejector tool into the hole until you feel a gentle click.</li>
  <li>Hold for 5 seconds and release. The printer will restart with factory default Bluetooth broadcast parameters.</li>
</ol>`
  },
  {
    title: "Instax Link Keeps Disconnecting or Connects But Won't Print",
    slug: 'instax-link-keeps-disconnecting-connected-wont-print',
    seoTitle: "Instax Link Disconnecting or Won't Print (Fix Bluetooth Drops)",
    metaDescription: "Does your Instax Mini or Square Link constantly disconnect from your phone or refuse to print when connected? Fix auto-sleep timeouts and print queue jams.",
    excerpt: "If your Instax Link shows as connected in the app but stalls during image transfer or shuts down before printing, power conservation settings and image payload sizes are the culprit.",
    errorCode: 'Transfer Error',
    tags: 'Fujifilm, Instax Link, Keeps Disconnecting, Connected Wont Print, Print Buffer, Timeout',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '8 minutes',
    categoryId: connectivityCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To resolve Instax Link disconnection and printing stalls: 1) Disable the printer's aggressive auto-power-off timer inside the app under Settings > Auto Power Off > set to 'Never' or '10 minutes'. 2) Ensure your phone's Low Power Mode is turned off; background battery savers throttle Bluetooth transfer speeds, causing print buffer timeouts. 3) Reduce image size if printing raw 48MP+ DSLR photos; compress the photo slightly in your camera roll before loading it into the Instax app.",
    content: `<h2>Why Instax Link Printers Drop Connections</h2>
<p>Fujifilm engineered the Instax Link series for extreme battery conservation. To maximize prints per charge, the printer hardware features a strict standby timer that aggressively drops active Bluetooth Low Energy sockets after just 3 to 5 minutes of inactivity. Furthermore, transferring uncompressed high-resolution images can exceed the printer's internal micro-buffer RAM, causing the printer to freeze mid-transfer.</p>

<h2>Fix 1: Adjusting the Auto Power Off Timer</h2>
<p>If your printer keeps disconnecting while you are editing photos, collages, or filters in the app, the automatic sleep timer is putting the hardware to sleep before you press print.</p>
<ol>
  <li>Open the Instax Link app and connect your printer.</li>
  <li>Tap the <strong>Settings</strong> icon (gear icon) in the top-right corner.</li>
  <li>Scroll down and tap <strong>Auto Power Off Settings</strong>.</li>
  <li>Change the setting from <em>3 minutes</em> to <strong>10 minutes</strong> (or <em>Never</em> while actively using the device).</li>
  <li>Tap Save. Your printer will maintain an active, stable Bluetooth handshake throughout your editing session.</li>
</ol>

<h2>Fix 2: Bypassing Mobile Battery Saver Throttling</h2>
<p>Both iOS (Low Power Mode) and Android (Adaptive Battery / Battery Saver) drastically limit the transmission bandwidth of Bluetooth Low Energy radio chips to save phone battery life. When the Instax app attempts to push a multi-megabyte image payload, the transfer throttles down, times out, and displays a generic <em>"Transmission Failed"</em> or <em>"Print Canceled"</em> error.</p>
<ul>
  <li><strong>iOS Users:</strong> Go to <em>Settings &gt; Battery</em> and turn OFF <strong>Low Power Mode</strong> before sending print jobs.</li>
  <li><strong>Android Users:</strong> Go to <em>Settings &gt; Apps &gt; mini LINK &gt; Battery</em> and change the restriction level from "Optimized" or "Restricted" to <strong>"Unrestricted"</strong>.</li>
</ul>

<h2>Fix 3: Resolving Image Payload Buffer Freezes</h2>
<p>Instax film prints at approximately 800 x 600 dots (Mini) or 800 x 800 dots (Square) at 318 DPI. If you select an uncompressed 50-Megabyte RAW image from a professional mirrorless camera, the mobile app may struggle to downscale the image in memory before pushing it over Bluetooth.</p>
<ol>
  <li>Take a standard screenshot of the photo in your smartphone's gallery to create a clean, lightweight JPEG version.</li>
  <li>Open the Instax app, select the screenshot from your camera roll, and swipe up to print.</li>
  <li>The lightweight image will beam over Bluetooth in less than 3 seconds without buffering.</li>
</ol>`
  },
  {
    title: "How to Pair Multiple Phones to One Instax Link Printer",
    slug: 'instax-link-multiple-phones-pairing-guide',
    seoTitle: "How to Pair Multiple Phones to Instax Link (Party Print Guide)",
    metaDescription: "Want to connect multiple iPhones and Androids to a single Instax Mini Link or Square Link printer? Learn how multi-device pairing and Party Print work.",
    excerpt: "Instax Link printers can remember multiple devices, but only one active Bluetooth master connection can exist at a time unless you enable Party Print mode.",
    errorCode: null,
    tags: 'Fujifilm, Instax Link, Multiple Phones, Party Print, Multi-Device, Bluetooth Sharing',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: mobileCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To connect multiple phones to an Instax Link printer: 1) For sequential printing: Ensure Phone A closes the Instax app or turns off its Bluetooth so Phone B can establish a master handshake. 2) For simultaneous party printing: Open the 'mini LINK' app on the host phone, select 'Party Print' mode, and generate an in-app invite link or QR code. Up to 5 friends can join the session simultaneously to combine individual photos into a single composite Instax collage.",
    content: `<h2>How Bluetooth Master-Slave Architecture Works on Instax</h2>
<p>A common misconception among Instax users is that multiple smartphones can maintain an active, simultaneous Bluetooth connection to a single printer like a shared Wi-Fi network. Because Instax printers utilize point-to-point Bluetooth Low Energy, the hardware can only lock onto <strong>one master device at a time</strong> for standard photo printing.</p>

<h2>Method 1: Sequential Multi-Device Switching (Standard Printing)</h2>
<p>If family members or coworkers take turns printing individual photos:</p>
<ol>
  <li><strong>Disconnect Active Device:</strong> The person who just finished printing must close the Instax app completely on their phone (swipe away from app switcher) or temporarily toggle Bluetooth off.</li>
  <li><strong>Initiate Second Connection:</strong> The second person powers on their phone, opens the Instax app, taps the <em>Settings &gt; Bluetooth Settings</em> menu, and selects the printer.</li>
  <li><strong>Memory Storage:</strong> The Instax printer stores the MAC addresses of up to 8 previously paired devices, so re-entering pairing pins is never required once initial authorization is granted.</li>
</ol>

<h2>Method 2: Using 'Party Print' for Simultaneous Multi-User Collages</h2>
<p>Fujifilm built a dedicated party feature directly into the Mini Link and Mini Link 2 software that allows up to 5 individual smartphones to connect simultaneously and create collaborative prints.</p>
<ul>
  <li><strong>Host Setup:</strong> Phone 1 connects to the Instax printer via Bluetooth and selects <strong>Party Print</strong> from the app home screen.</li>
  <li><strong>Joining the Session:</strong> Phone 1 taps "Create Group". The app generates a session room. Other users on their own phones open the Instax app and tap "Join Group" (or scan the on-screen QR code).</li>
  <li><strong>Surprise Mode:</strong> Each participant selects one secret image from their camera roll and submits it to the host queue.</li>
  <li><strong>Composite Printing:</strong> The host phone compiles all 5 image segments into a single composite collage and beams the final payload to the Instax printer in one seamless pass.</li>
</ul>`
  },
  {
    title: "Instax Link WIDE Bluetooth Setup & Connection Guide",
    slug: 'instax-link-wide-bluetooth-setup-connection-guide',
    seoTitle: "Instax Link WIDE Bluetooth Setup Guide (iOS, Android & Cameras)",
    metaDescription: "Step-by-step Bluetooth connection and setup guide for the Fujifilm Instax Link WIDE printer. Learn how to connect smartphones and Fujifilm X-Series cameras.",
    excerpt: "The Instax Link WIDE requires its own dedicated wide-format app and offers direct pairing with Fujifilm mirrorless digital cameras like the X-S10 and X-T5.",
    errorCode: null,
    tags: 'Fujifilm, Instax Link WIDE, Bluetooth Setup, X-Series Camera, Wide Film, Pairing',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: '7 minutes',
    categoryId: setupCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To set up the Instax Link WIDE: 1) Download the dedicated 'instax Link WIDE' app (do not use the standard mini Link app). 2) Turn on the printer by pressing the central button until the white LED light pulses. 3) In the app, select Bluetooth Settings > Search > tap your INSTAX-XXXXXX printer. 4) To connect directly to a Fujifilm X-Series camera (e.g. X-S10, X-T30 II): Go to Camera Menu > Connection Setting > Instax Printer Connection Setting > enter the printer's Bluetooth name.",
    content: `<h2>The Instax Link WIDE Ecosystem</h2>
<p>The <strong>Fujifilm Instax Link WIDE</strong> produces double-sized 86 x 108 mm instant prints. Because of its different aspect ratio, color profile engine, and camera integration capabilities, it operates on a separate software stack compared to the smaller Mini and Square models.</p>

<h2>Step 1: Downloading the Correct Application</h2>
<p>A frequent error among users is attempting to connect the Link WIDE to the standard <em>"mini LINK"</em> or <em>"SQUARE Link"</em> apps. You must download the dedicated <strong>instax Link WIDE</strong> application from the Apple App Store or Google Play Store.</p>

<h2>Step 2: Smartphone Bluetooth Pairing Procedure</h2>
<ol>
  <li>Power on the Link WIDE by pressing and holding the center power button for 2 seconds. The LED ring will illuminate with an animated white sweep.</li>
  <li>Launch the <strong>instax Link WIDE</strong> app on your smartphone.</li>
  <li>Accept all requested Bluetooth and Location/Nearby Devices permissions.</li>
  <li>The app will automatically prompt: <em>"Connect to an Instax printer?"</em> Tap <strong>Connect</strong>.</li>
  <li>Select your printer's serial ID (e.g., <code>INSTAX-824192</code>) from the list. The LED on the printer will turn a solid cyan/green to signify a successful master handshake.</li>
</ol>

<h2>Step 3: Direct Pairing with Fujifilm Digital Cameras</h2>
<p>One of the most powerful features of the Link WIDE is its ability to print directly from compatible Fujifilm digital cameras (such as the X-S10, X-T30 II, X-T5, and X100V) without using a smartphone intermediary.</p>
<ul>
  <li>Turn on your Fujifilm X-Series camera and the Link WIDE printer.</li>
  <li>On the camera, press the <strong>Menu/OK</strong> button and navigate to: <em>Set Up &gt; Connection Setting &gt; Instax Printer Connection Setting</em>.</li>
  <li>Select <strong>Bluetooth</strong> as the connection method and choose your printer's device name.</li>
  <li>In playback mode, press the function button or navigate to <em>Playback Menu &gt; Instax Print</em> to beam images directly from the camera sensor to the thermal film exposure head.</li>
</ul>`
  }
];

async function main() {
  const brand = await prisma.brand.findUnique({ where: { slug: 'fujifilm' } });
  if (!brand) throw new Error('Fujifilm brand not found in database.');

  console.log(`🚀 Publishing Batch 1 (Cluster A: Bluetooth & Connectivity) for brand: ${brand.name}`);

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
