import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const maintenanceCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Instax Mini Link vs Mini Link 2 vs Square Link: Which Should You Buy?",
    slug: 'instax-mini-link-vs-mini-link-2-vs-square-link-comparison',
    seoTitle: "Instax Mini Link vs Mini Link 2 vs Square Link Comparison",
    metaDescription: "Comparing Fujifilm Instax Mini Link, Mini Link 2, and Square Link. Learn about film size differences, instaxAiR features, battery life, and which model to choose.",
    excerpt: "With three distinct generations and film formats, choosing between the credit-card-sized Mini Link and the 1:1 Instagram-style Square Link comes down to creative features and film costs.",
    errorCode: null,
    tags: 'Fujifilm, Instax Mini Link, Mini Link 2, Square Link, Comparison, Buying Guide, instaxAiR',
    wordCount: 1200,
    difficultyLevel: 'Beginner',
    timeToFix: 'N/A',
    categoryId: setupCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "Instax Mini Link vs Square Link comparison: 1) Film Format: Mini Link uses 62x46mm vertical prints (credit card size, ~$0.75/print); Square Link uses 62x62mm square prints (1:1 ratio, ~$1.00/print). 2) Creative Features: Mini Link 2 introduces 'instaxAiR' motion-drawing using the printer's top LED sensor; Square Link introduces 'AR Print' with QR codes unlocking 3D animations and audio notes. 3) Connectivity: All models use Bluetooth Low Energy with dedicated apps. If budget and film affordability matter most, choose Mini Link 2. If larger canvas and modern AR features appeal to you, choose Square Link.",
    content: `<h2>The Fujifilm Smartphone Printer Lineup Explained</h2>
<p>Fujifilm has evolved the Instax Link family into the industry standard for portable smartphone instant printing. However, understanding the functional and cost differences between the original Mini Link, the motion-sensing Mini Link 2, and the larger Square Link is essential before purchasing film or upgrading hardware.</p>

<h2>1. Film Format &amp; Print Dimensions</h2>
<ul>
  <li><strong>Instax Mini Link / Mini Link 2:</strong> Uses standard Instax Mini film. Outer dimensions are 86 x 54 mm (3.4 x 2.1 inches) with an image area of 62 x 46 mm (2.4 x 1.8 inches). This matches the exact size of a wallet credit card.</li>
  <li><strong>Instax Square Link:</strong> Uses Instax Square film. Outer dimensions are 86 x 72 mm with a 62 x 62 mm square image area. It provides 1.5x more visual real estate compared to the Mini format, making it ideal for group portraits, landscape shots, and Instagram aesthetic layouts.</li>
</ul>

<h2>2. Hardware &amp; Creative Feature Breakdown</h2>
<table style="width:100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: left;">
      <th style="padding: 0.75rem;">Feature</th>
      <th style="padding: 0.75rem;">Mini Link (Gen 1)</th>
      <th style="padding: 0.75rem;">Mini Link 2</th>
      <th style="padding: 0.75rem;">Square Link</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Film Type</td>
      <td style="padding: 0.75rem;">Instax Mini</td>
      <td style="padding: 0.75rem;">Instax Mini</td>
      <td style="padding: 0.75rem;">Instax Square</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Special Feature</td>
      <td style="padding: 0.75rem;">Motion Zoom/Tilt</td>
      <td style="padding: 0.75rem;">instaxAiR (AR Draw)</td>
      <td style="padding: 0.75rem;">AR Print &amp; Instax Connect</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Charging Port</td>
      <td style="padding: 0.75rem;">Micro-USB</td>
      <td style="padding: 0.75rem;">Micro-USB</td>
      <td style="padding: 0.75rem;">USB-C</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Battery Life</td>
      <td style="padding: 0.75rem;">~100 prints</td>
      <td style="padding: 0.75rem;">~100 prints</td>
      <td style="padding: 0.75rem;">~100 prints</td>
    </tr>
  </tbody>
</table>

<h2>3. What is instaxAiR? (Mini Link 2 Exclusive)</h2>
<p>The standout upgrade on the Mini Link 2 is the lateral LED sensor mounted beside the ejection slot. By pressing the top feature button and waving the printer in the air, users can physically draw bubbles, glitter, neon trails, or spray paint effects onto their smartphone screen in real-time, creating personalized augmented reality graphics before exposing the film.</p>

<h2>4. What is AR Print &amp; Instax Connect? (Square Link Exclusive)</h2>
<p>The Square Link emphasizes digital-physical hybrid storytelling. When using <strong>AR Print</strong>, the app embeds a tiny, high-density QR code in the corner of your photo. When friends scan the physical print with any smartphone camera, the photo comes alive with animated stickers, voice voice-memos, or interactive web links.</p>

<h2>5. Discontinued First-Gen Mini Link Alternatives</h2>
<p>If you own the original 2019 Mini Link 1, it remains fully supported in the mini LINK app. However, if looking for a replacement, upgrading to the Mini Link 2 or the latest USB-C equipped Mini Link 3 provides faster Bluetooth 5.1 transfer rates and improved color saturation rendering.</p>`
  },
  {
    title: "Fix Instax Mini Link 3 Not Printing & Battery Drain Issues",
    slug: 'instax-mini-link-3-not-printing-battery-drain-fix',
    seoTitle: "Fix Instax Mini Link 3 Not Printing & Fast Battery Drain",
    metaDescription: "Is your new Instax Mini Link 3 refusing to print or losing battery overnight? Learn how to fix USB-C charging handshake faults and firmware sleep mode errors.",
    excerpt: "The Instax Mini Link 3 brings USB-C charging and Click to Collage features, but third-party fast chargers and background BLE polling can trigger rapid battery drain.",
    errorCode: 'ERR-03',
    tags: 'Fujifilm, Instax Mini Link 3, Not Printing, Battery Drain, USB-C, Click to Collage, Firmware',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: errorCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix Instax Mini Link 3 printing failures and battery drain: 1) Always use a standard 5V/1A or 5V/2A USB-A to USB-C charging brick; high-wattage 65W+ USB-PD laptop chargers will trigger the internal battery protection circuit and refuse to charge. 2) Update the printer firmware inside the mini LINK app (Settings > Version Information > Firmware Update) to patch the BLE background polling bug that drains battery in standby. 3) Perform a hardware reset using the pinhole button next to the USB-C port.",
    content: `<h2>Understanding Mini Link 3 Hardware Enhancements</h2>
<p>Released with upgraded textured casing, vertical LED progress bars, and a modern USB-C charging port, the <strong>Instax Mini Link 3</strong> represents a major hardware revision. However, new power delivery controllers and revised Bluetooth Low Energy sleep profiles can cause unexpected printing pauses and power drain if configured incorrectly.</p>

<h2>Fix 1: The USB-PD Fast Charging Lockout</h2>
<p>Unlike older micro-USB models, the Mini Link 3 features a USB-C port. However, it lacks an active Power Delivery (PD) negotiation chip. If you connect it to a high-wattage MacBook, iPad, or fast-charging smartphone charger (such as 45W, 65W, or 100W USB-C to USB-C cables), the printer's thermal fuse will disconnect power to protect the lithium-ion cell, resulting in <strong>zero charging and a rapid battery shutdown</strong>.</p>
<ol>
  <li>Unplug all high-wattage USB-C fast chargers.</li>
  <li>Use a standard <strong>USB-A to USB-C cable</strong> connected to a 5V/1A or 5V/2A wall plug (or a computer USB port).</li>
  <li>The LED will illuminate solid red to confirm legitimate charging. Leave it connected for 90 minutes.</li>
</ol>

<h2>Fix 2: Resolving the Standby Bluetooth Drain Bug</h2>
<p>Early firmware builds of the Mini Link 3 have a known bug where the printer continues advertising its BLE beacon at full power even when the main power button is switched off, draining the battery in less than 48 hours while sitting in a bag.</p>
<ul>
  <li>Power on the printer and connect it to the <strong>mini LINK</strong> app.</li>
  <li>Tap the <strong>Settings</strong> icon &gt; <strong>Version Information</strong>.</li>
  <li>If an update is available, ensure the printer has at least 50% battery, keep your phone within 1 foot, and tap <strong>Firmware Update</strong>.</li>
  <li>The firmware patch permanently fixes the background polling loop.</li>
</ul>

<h2>Fix 3: 'Click to Collage' Printing Lockup</h2>
<p>The Mini Link 3 introduces a Photobooth-style "Click to Collage" mode that captures 6 consecutive frames. If your smartphone runs low on RAM during video-frame slicing, the print queue will stall.</p>
<ol>
  <li>Force-close all open background applications on your smartphone.</li>
  <li>Open the mini LINK app and navigate to <em>Settings &gt; Print History</em>.</li>
  <li>Clear any pending stuck print jobs, reboot both phone and printer, and re-attempt the print.</li>
</ol>`
  },
  {
    title: "Instax Mini Link Setup Guide: Film Loading, Charging & First Print",
    slug: 'instax-mini-link-setup-guide-film-loading',
    seoTitle: "Instax Mini Link Setup Guide (Film Loading & First Print)",
    metaDescription: "Complete unboxing and setup guide for the Fujifilm Instax Mini Link. Learn how to align the yellow film door mark, charge the battery, and print your first photo.",
    excerpt: "Setting up your new Instax Mini Link or received one as a gift? Follow our foolproof guide to install your first film cartridge without exposing the film to light.",
    errorCode: null,
    tags: 'Fujifilm, Instax Mini Link, Setup Guide, Film Loading, Yellow Mark, Black Slide, First Print',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: setupCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To set up and load film into an Instax Mini Link: 1) Charge the printer for 90 minutes using the included USB cable until the LED turns green or shuts off. 2) Slide the film door latch on the back of the printer to open the film compartment. 3) Take a fresh pack of Instax Mini film out of its foil pouch (do NOT press the center of the cartridge). 4) Match the small YELLOW mark on the cartridge with the yellow line inside the printer door. 5) Close the door. The printer will automatically whir and eject the black protective plastic safety slide.",
    content: `<h2>Unboxing &amp; Hardware Overview</h2>
<p>The Fujifilm Instax Mini Link is an ultra-compact portable printer that turns smartphone digital photos into real, chemical instant film prints. Whether you just unboxed your printer or received it as a holiday gift, setting it up correctly prevents ruined film packs and calibration errors.</p>

<h2>Step 1: Initial Battery Conditioning</h2>
<p>Instax Link printers ship with their lithium-ion battery in a 30% storage charge state. Before installing film, plug the printer into a standard 5V USB charger for at least 80 to 90 minutes. The central power button LED will glow solid red while charging and turn off or turn solid green when 100% full.</p>

<h2>Step 2: Correct Film Loading (The Yellow Mark Rule)</h2>
<p><strong>Crucial Warning:</strong> Instant film is extremely sensitive to ambient light. Never open the black foil packaging until you are immediately ready to place the plastic cartridge into the machine.</p>
<ol>
  <li>Turn the printer over to expose the back door.</li>
  <li>Slide the lock lever sideways to pop open the rear film bay.</li>
  <li>Tear open the foil pouch and gently hold the plastic film pack by its edges. <strong>Do not press your fingers against the center holes or chemical pods.</strong></li>
  <li>Look at the top of the cartridge; you will see a bright <strong>yellow stripe</strong>. Look inside the printer compartment; you will see a matching yellow line.</li>
  <li>Align the two yellow marks and gently drop the cartridge into the bay. It should sit completely flat without forcing it.</li>
  <li>Close the door firmly until it clicks shut.</li>
  <li>The motorized rollers will instantly activate and automatically eject the black plastic protective cover (the darkslide) through the top slot. Discard this plastic sheet. Your printer is now loaded with 10 active exposures!</li>
</ol>

<h2>Step 3: First Print via the Smartphone App</h2>
<ul>
  <li>Download the <strong>mini LINK</strong> app from the iOS App Store or Google Play Store.</li>
  <li>Hold the printer's power button for 2 seconds until the LED logo lights up.</li>
  <li>Open the app, accept permissions, and select <strong>Simple Print</strong>.</li>
  <li>Pick any favorite photo from your camera roll, adjust cropping or filters, and <strong>swipe upward on your phone screen</strong>.</li>
  <li>The photo will physically beam to the printer and eject in approximately 12 seconds. Allow 90 seconds for full chemical development away from direct sunlight.</li>
</ul>`
  },
  {
    title: "Instax Square Link & Link WIDE Error Codes & Troubleshooting",
    slug: 'instax-square-link-wide-errors-film-loading-guide',
    seoTitle: "Instax Square Link & Link WIDE Error Codes & Fixes",
    metaDescription: "Troubleshooting guide for Instax Square Link and Link WIDE printers. Learn how to decode blinking red LED lights, resolve film door jams, and fix format errors.",
    excerpt: "When your Square Link or Link WIDE flashes rapid red lights and refuses to expose film, door latch microswitches and misaligned wide packs are the primary causes.",
    errorCode: 'Blinking Red',
    tags: 'Fujifilm, Instax Square Link, Link WIDE, Error Codes, Blinking Red, Film Door, Jammed',
    wordCount: 1000,
    difficultyLevel: 'Intermediate',
    timeToFix: '8 minutes',
    categoryId: errorCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To resolve flashing red errors on Instax Square Link and Link WIDE printers: 1) A slow blinking red light indicates battery under 10%—charge immediately. 2) A rapid flashing red light indicates a film door interlock fault or mechanical jam. Verify the back door is fully clicked shut; if the micro-switch does not engage, the printer locks all motors. 3) If the darkslide refuses to eject on a Link WIDE, ensure you loaded genuine Instax WIDE film (not Square or Mini) and that the cartridge was inserted with the yellow mark pointing upwards.",
    content: `<h2>Square Link &amp; Link WIDE Error Decoding</h2>
<p>The larger format Instax Square Link and Link WIDE printers use high-torque dual roller assemblies and sophisticated safety microswitches. When a fault occurs, the central LED indicator communicates the exact hardware state through color and flash intervals.</p>

<h2>LED Diagnostic Code Matrix</h2>
<table style="width:100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: left;">
      <th style="padding: 0.75rem;">LED Pattern</th>
      <th style="padding: 0.75rem;">Meaning</th>
      <th style="padding: 0.75rem;">Required Fix</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #dc2626;">Rapid Blinking Red</td>
      <td style="padding: 0.75rem;">Film Door Open or Jammed Rollers</td>
      <td style="padding: 0.75rem;">Firmly push door until latch clicks; clear film slot</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #ea580c;">Slow Pulsing Orange</td>
      <td style="padding: 0.75rem;">Thermal Cutout (Overheated)</td>
      <td style="padding: 0.75rem;">Allow printer to rest for 15 minutes in cool area</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #dc2626;">Pulsing Red / Low Battery</td>
      <td style="padding: 0.75rem;">Battery Below 10%</td>
      <td style="padding: 0.75rem;">Connect USB-C charging cable</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #2563eb;">Rapid Blinking Blue</td>
      <td style="padding: 0.75rem;">Bluetooth Firmware Update Active</td>
      <td style="padding: 0.75rem;">Do not turn off; keep phone nearby</td>
    </tr>
  </tbody>
</table>

<h2>Resolving Link WIDE Film Door Lockout</h2>
<p>Due to the wide width of Instax WIDE film (108mm), the back door has two distinct locking tabs on the left and right edges. If you press the door shut in the center, the right latch may fail to fully seat. The internal door interlock sensor will remain open, triggering a persistent rapid red blinking light and preventing prints.</p>
<p>Press firmly on both outer corners of the rear door until you hear two distinct mechanical clicks.</p>`
  },
  {
    title: "Instax Mini Link 2 Flashing LED Light Meanings & Diagnostic Guide",
    slug: 'instax-mini-link-2-flashing-light-meanings-diagnostic-guide',
    seoTitle: "Instax Mini Link 2 Flashing Lights Guide (LED Decoded)",
    metaDescription: "What do the flashing colors mean on your Instax Mini Link 2? Decode solid cyan, pulsing yellow, flashing red, rainbow sweeps, and charging LED status lights.",
    excerpt: "The central LED on the Instax Mini Link 2 acts as a full diagnostic display. Learn what each color, pulse rate, and rainbow pattern means for your printer.",
    errorCode: null,
    tags: 'Fujifilm, Instax Mini Link 2, Flashing Light, LED Meanings, Diagnostic Guide, Rainbow LED',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '3 minutes',
    categoryId: maintenanceCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "Instax Mini Link 2 LED light color meanings: 1) Solid White/Cyan: Printer is on and connected via Bluetooth. 2) Rainbow Sweep: Printer is actively exposing and ejecting an instant photo. 3) Pulsing Orange: instaxAiR motion drawing mode is active (the lateral LED sensor is broadcasting). 4) Solid Red while plugged in: Battery is charging. 5) Rapid Flashing Red: Hardware error, empty film cartridge, or door unlatched. 6) Pulsing Purple/Pink: Match Test mode active in the mini LINK app.",
    content: `<h2>The Multi-Color Instax LED Indicator</h2>
<p>Fujifilm equipped the central power button of the Instax Mini Link 2 with an RGB spectrum LED ring that communicates connection health, battery status, creative modes, and hardware errors at a glance.</p>

<h2>Complete Color &amp; Pattern Reference Chart</h2>
<ul>
  <li><strong>Solid White:</strong> Standby mode. The printer is powered on and waiting for a Bluetooth connection from a paired smartphone.</li>
  <li><strong>Solid Cyan / Aqua:</strong> Connected mode. The printer has successfully established a Bluetooth Low Energy socket with the mini LINK app.</li>
  <li><strong>Rotating Rainbow Sweep:</strong> Print transmission in progress. The mobile app is streaming image scanlines to the exposure head, and the mechanical rollers are actively driving the film sheet through the developer pods.</li>
  <li><strong>Pulsing Warm Orange / Yellow:</strong> instaxAiR mode enabled. The top-side motion tracking sensor is active, allowing you to draw in the air while pointing the printer at your smartphone camera.</li>
  <li><strong>Pulsing Magenta / Purple:</strong> "Match Test" or "Party Print" mode engaged. Indicates multiple participants or interactive quiz features are running in the app.</li>
  <li><strong>Solid Red (When Plugged into USB):</strong> Normal charging status. The internal lithium-ion battery is absorbing current.</li>
  <li><strong>LED Turns Completely Off (When Plugged In):</strong> Battery is 100% fully charged.</li>
  <li><strong>Rapid Flashing Red:</strong> Critical error state. The printer is out of film, the rear door is ajar, or a film sheet is jammed inside the ejection rollers.</li>
</ul>`
  }
];

async function main() {
  const brand = await prisma.brand.findUnique({ where: { slug: 'fujifilm' } });
  if (!brand) throw new Error('Fujifilm brand not found in database.');

  console.log(`🚀 Publishing Batch 2 (Cluster B: Model-Specific & Diagnostics) for brand: ${brand.name}`);

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
