import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const kodakBrandId = 'c5730c9d-dbad-4368-ad1c-9a44ecf890bc';
const printingProblemsCategory = '0e7ca2ba-24ae-4bf9-9ca7-072b36154911';
const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';
const errorCodesCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Kodak Mini 3 Retro Stops Printing Halfway: 4PASS Cycle Fix",
    slug: 'kodak-mini-3-retro-stops-printing-halfway',
    seoTitle: "Fix Kodak Mini 3 Retro Stops Printing Halfway Through Photo",
    metaDescription: "Does your Kodak Mini 3 Retro stop mid-print after the yellow pass? A hardware tech explains 4PASS cycle sync errors, roller jams, and humidity-based paper warps.",
    excerpt: "The Kodak Mini 3 Retro frequently stops printing after the first or second color pass, ejecting a partially colored photo. Learn how to fix 4PASS cycle synchronization.",
    errorCode: '4PASS Sync Failure',
    tags: 'Kodak, Mini 3 Retro, Stops Halfway, 4PASS, Half Print, Partial Photo',
    wordCount: 1060,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: printingProblemsCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredImage: null,
    featuredImageAlt: 'A partially printed photo from a Kodak Mini 3 Retro showing only the yellow color pass completed',
    featuredImageCaption: 'Diagnosing a 4PASS cycle failure on a Kodak Mini 3 Retro printer',
    featuredSnippet: "To fix a Kodak Mini 3 Retro that stops printing halfway: 1) Remove the cartridge and manually tighten the ribbon spools by rotating the white gear counter-clockwise. 2) Clean the rubber feed rollers with a dry lint-free cloth. 3) Ensure the paper is stored in a cool, dry environment to prevent humidity warping. 4) Update the firmware via the Kodak Instant Printer app.",
    content: `<p>One of the most frustrating issues with the Kodak Mini 3 Retro instant photo printer is the <strong>mid-print failure</strong>: the printer begins processing a photo, completes the first color pass (usually yellow), and then stops, ejects the paper, or throws an error light. Because the Mini 3 Retro uses a <strong>4PASS dye-sublimation</strong> process — printing Yellow, Magenta, Cyan, and a clear Overcoat layer in four separate mechanical passes — the paper must cycle back and forth through the printer four times. Any mechanical resistance or timing error during these passes will cause the printer to abort the job. Let's diagnose the root causes and resolve them.</p>

<h2>Understanding the 4PASS Print Cycle</h2>
<p>Each photo printed on the Mini 3 Retro undergoes the following sequence:</p>
<ol>
  <li><strong>Pass 1 — Yellow:</strong> The paper feeds forward. The thermal printhead heats the yellow panel of the ink ribbon, transferring yellow dye onto the paper. The paper is then pulled back into the printer.</li>
  <li><strong>Pass 2 — Magenta:</strong> The ribbon advances to the magenta panel. The paper feeds forward again for the magenta layer. It retracts once more.</li>
  <li><strong>Pass 3 — Cyan:</strong> Same cycle with the cyan panel.</li>
  <li><strong>Pass 4 — Overcoat (Laminate):</strong> A transparent protective laminate layer is applied. The paper is ejected from the front of the printer.</li>
</ol>
<p>If the printer fails at any pass, you will see a partially-colored photo (most commonly yellow-only, since that is the first pass).</p>

<h2>Cause 1: Ribbon Spool Slack</h2>
<p>The color cartridge contains the ink ribbon wound between two spools. If the ribbon is loose, the printer cannot advance to the next color panel accurately:</p>
<ol>
  <li>Remove the cartridge from the printer.</li>
  <li>Hold the cartridge with the label facing you. Locate the two spool gears (usually white plastic) visible on the side.</li>
  <li>Using your thumb, turn the take-up spool <strong>counter-clockwise</strong> until the ribbon film is taut against the frame with no visible loops or slack.</li>
  <li>Reinsert the cartridge and try printing again.</li>
</ol>

<h2>Cause 2: Feed Roller Contamination</h2>
<p>The internal rubber rollers that grip the photo paper during forward and reverse feeding can become slick from paper dust and fingerprint oils:</p>
<ol>
  <li>Remove the paper tray and cartridge.</li>
  <li>Look inside the paper feed slot. Use a flashlight to locate the small grey rubber rollers.</li>
  <li>Wipe each roller with a dry, lint-free cloth or a cotton swab lightly dampened with distilled water.</li>
  <li>Manually rotate the roller gears while wiping to clean the entire circumference.</li>
  <li>Allow the rollers to dry fully before reloading paper.</li>
</ol>

<h2>Cause 3: Paper Warping from Humidity</h2>
<p>Dye-sublimation photo paper is extremely sensitive to moisture. In humid environments (above 60% relative humidity), the paper absorbs water vapor and develops micro-curls at the edges. These curls create mechanical resistance during the reverse-feed pass, causing the printer motor to stall:</p>
<ol>
  <li>Remove the paper stack from the tray.</li>
  <li>Inspect the edges for visible curling or waviness.</li>
  <li>If the paper is warped, discard those sheets and open a fresh, sealed pack.</li>
  <li>Store unused paper in its sealed foil bag or in a resealable plastic bag with a <strong>silica gel packet</strong> to absorb ambient moisture.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Do Not Force Jammed Paper:</strong> If the photo paper is stuck inside the printer mid-pass, do not pull it out. Turn the printer off and back on — the motor will attempt to auto-eject the jammed sheet. Pulling paper while the ribbon is in contact can tear the ribbon and damage the thermal printhead.
</div>

<h2>Cause 4: Firmware Timing Desync</h2>
<p>If the above hardware checks are clean, the printer's internal motor timing may be out of calibration:</p>
<ol>
  <li>Open the <strong>Kodak Photo Printer</strong> app on your smartphone.</li>
  <li>Connect to the printer via Bluetooth.</li>
  <li>Check for available <strong>firmware updates</strong> in the app settings.</li>
  <li>If an update is available, install it with the printer plugged into power and your phone within 2 feet of the device.</li>
  <li>After the update completes, perform a pinhole reset to clear the motor calibration cache, then try printing again.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Why does my Mini 3 Retro only print yellow?', answer: 'Yellow is the first pass of the 4PASS cycle. If the printer stops after Pass 1, the roller grip or ribbon tension is failing before the reverse-feed for Magenta.', order: 1 },
      { question: 'Can I reuse a photo that only printed one color?', answer: 'No. Once a sheet has been through a color pass, it cannot be re-fed for the same color. The ink has already been transferred.', order: 2 },
      { question: 'Does printing in a cold room cause mid-print failures?', answer: 'Yes. Extremely cold temperatures (below 15C/59F) can cause the thermal printhead to underperform, leading to weak color transfer and sensor timing errors.', order: 3 }
    ])
  },
  {
    title: "Kodak Portable Printer Overheating? Thermal Protection Guide",
    slug: 'kodak-portable-printer-overheating-fix',
    seoTitle: "Kodak Portable Printer Overheating: Thermal Protection Fix",
    metaDescription: "Is your Kodak Mini or Dock Plus overheating after a few prints? A technician explains thermal protection, safe printing intervals, and heat management.",
    excerpt: "After printing 5-10 photos in rapid succession, Kodak portable printers enter thermal lockout mode. Learn the safe printing cadence and environmental requirements.",
    errorCode: 'Thermal Protection',
    tags: 'Kodak, Overheating, Thermal Protection, Portable Printer, Dock Plus, Mini Retro',
    wordCount: 1020,
    difficultyLevel: 'Beginner',
    timeToFix: '15 minutes (cooldown)',
    categoryId: errorCodesCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredImage: null,
    featuredImageAlt: 'A Kodak portable printer with a yellow warning LED glowing indicating thermal protection mode',
    featuredImageCaption: 'A Kodak portable printer in thermal protection cooldown mode',
    featuredSnippet: "When a Kodak portable printer overheats: 1) The LED turns solid yellow indicating thermal protection mode. 2) Leave the printer powered on and idle for 10-15 minutes. Do not turn it off, as the internal fan needs power. 3) Print in batches of 5 photos with 3-minute intervals between batches. 4) Operate the printer in rooms below 30C (86F).",
    content: `<p>Kodak portable printers — including the Dock Plus, Mini 2 Retro, Mini 3 Retro, and Mini Shot series — use a <strong>dye-sublimation thermal printhead</strong> that reaches temperatures above 150°C (302°F) during each print pass. Because these devices are enclosed in compact, lightweight plastic chassis with limited heat dissipation capacity, printing more than 5-10 photos in rapid succession can trigger the built-in <strong>thermal protection circuit</strong>. When this happens, the printer halts all operations, the status LED turns solid yellow, and the device refuses to accept new print jobs until the internal temperature drops below a safe threshold. Let's understand the thermal management system and learn how to optimize your printing workflow.</p>

<h2>How Thermal Protection Works</h2>
<p>Inside the printer, a thermistor (temperature sensor) is mounted directly on the printhead carrier assembly. This sensor continuously monitors the printhead surface temperature. The onboard controller enforces three thermal zones:</p>

<table class="diagnostic-table">
  <thead>
    <tr>
      <th>Temperature Zone</th>
      <th>Printhead Temp Range</th>
      <th>Printer Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Green (Normal)</strong></td>
      <td>Below 45°C (113°F)</td>
      <td>Full-speed printing. All functions operational.</td>
    </tr>
    <tr>
      <td><strong>Yellow (Warning)</strong></td>
      <td>45°C to 60°C (113°F to 140°F)</td>
      <td>Printer slows print speed. May add delays between passes. LED may pulse yellow.</td>
    </tr>
    <tr>
      <td><strong>Red (Lockout)</strong></td>
      <td>Above 60°C (140°F)</td>
      <td>Printing halts entirely. LED turns solid yellow/amber. Device enters cooldown mode. No jobs accepted until temperature drops to Green zone.</td>
    </tr>
  </tbody>
</table>

<h2>Step 1: Allow Passive Cooldown</h2>
<p>When the thermal protection activates:</p>
<ol>
  <li><strong>Do not turn the printer off.</strong> Some models have a small internal cooling fan that requires power to operate. Turning the device off stops the fan and extends cooldown time.</li>
  <li>Place the printer on a flat, hard surface (like a table or countertop). Avoid soft surfaces like beds, couches, or carpet, as these insulate the bottom chassis and trap heat.</li>
  <li>Ensure the printer's ventilation slots (usually on the bottom or sides) are not blocked by objects, cases, or fabric.</li>
  <li>Wait <strong>10 to 15 minutes</strong>. The LED will transition from solid yellow to blinking white or solid white when the printer is ready to resume.</li>
</ol>

<h2>Step 2: Optimize Your Printing Cadence</h2>
<p>To prevent thermal lockout from occurring in the first place, adopt a batch-printing strategy:</p>
<ul>
  <li>Print in batches of <strong>no more than 5 photos</strong> per session.</li>
  <li>After each batch, pause for <strong>3 to 5 minutes</strong> before sending the next group.</li>
  <li>If printing at an event (wedding, party), rotate between two printers if possible to allow each unit recovery time.</li>
</ul>

<h2>Step 3: Manage Environmental Temperature</h2>
<p>The ambient room temperature has a direct impact on how quickly the printer reaches thermal limits:</p>
<ul>
  <li>Operate the printer in rooms at or below <strong>30°C (86°F)</strong>.</li>
  <li>Avoid placing the printer in direct sunlight, near radiators, or on top of other heat-generating electronics (like laptops).</li>
  <li>In hot outdoor environments (summer events, beach parties), try to keep the printer in shade and consider placing it near a portable fan to improve airflow.</li>
</ul>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Battery Heat Stacking:</strong> When the printer is running on its internal lithium-ion battery (without the charger plugged in), the battery itself generates heat during discharge. This heat adds to the printhead thermal load. For extended printing sessions, always plug the printer into its USB-C or DC power adapter to bypass battery discharge heat.
</div>

<h2>Step 4: Clean the Ventilation Path</h2>
<p>Over time, lint and dust accumulate in the ventilation slots, reducing airflow:</p>
<ol>
  <li>Power off the printer.</li>
  <li>Use a soft-bristle brush (like a clean toothbrush) to gently sweep dust out of the ventilation grilles on the bottom and sides of the chassis.</li>
  <li>Do <strong>not</strong> use compressed air cans, as the force can push dust deeper into the internal mechanisms or dislodge the ribbon film.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Is it normal for a Kodak portable printer to get hot?', answer: 'Yes. The thermal printhead reaches over 150°C during operation. Some warmth on the exterior is expected. The thermal protection system prevents damage.', order: 1 },
      { question: 'Can overheating damage the printer permanently?', answer: 'No. The thermal protection circuit shuts the printer down before any permanent damage occurs. The protection is a safety feature, not a fault.', order: 2 },
      { question: 'How many photos can I print before overheating?', answer: 'Typically 5-10 photos in rapid succession at room temperature. In hot environments or on battery power, the limit may drop to 3-5 photos.', order: 3 }
    ])
  },
  {
    title: "Kodak Instant Printer App Not Connecting: Android & iOS Fix",
    slug: 'kodak-instant-printer-app-not-connecting',
    seoTitle: "Fix Kodak Instant Printer App Not Connecting to Printer",
    metaDescription: "Is the Kodak Photo Printer app failing to find your printer? A technician explains BLE permissions, location services, and Bluetooth cache clearing.",
    excerpt: "The Kodak Instant Printer app relies on Bluetooth Low Energy and Location Services to discover nearby printers. Learn how to configure permissions for pairing.",
    errorCode: 'App Discovery Failure',
    tags: 'Kodak, App, Not Connecting, Bluetooth, BLE, Location Services, Android, iOS',
    wordCount: 1040,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: connectivityCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredImage: null,
    featuredImageAlt: 'A smartphone showing the Kodak Instant Printer app search screen with no printers found',
    featuredImageCaption: 'Troubleshooting Kodak app discovery failures on mobile devices',
    featuredSnippet: "To fix the Kodak app not finding your printer: 1) Enable Location Services on your phone (required for BLE scanning on Android). 2) Grant the Kodak app both Bluetooth and Location permissions. 3) Forget the printer in Bluetooth settings, then re-pair. 4) Clear the app cache or reinstall the app. 5) Ensure only one phone is paired at a time.",
    content: `<p>The <strong>Kodak Photo Printer</strong> app (also known as the Kodak Instant Printer app) is the primary interface for controlling portable Kodak printers like the Dock Plus, Mini 2 Retro, Mini 3 Retro, and Mini Shot. When the app fails to detect or connect to your printer, the issue is almost always related to <strong>missing operating system permissions</strong> rather than a hardware defect. Modern Android and iOS versions require apps to have both Bluetooth <em>and</em> Location permissions to scan for nearby Bluetooth Low Energy (BLE) devices. Let's walk through the configuration steps for each platform.</p>

<h2>Why Location Services Are Required for Bluetooth</h2>
<p>This is counterintuitive for many users: why does a printer app need my location? The answer is technical rather than privacy-related. Bluetooth Low Energy (BLE) scanning returns the unique MAC addresses of nearby devices, which can be used to triangulate a user's physical position. To prevent abuse of this capability, both Google (Android 6.0+) and Apple (iOS 13+) mandate that any app performing BLE scans must have active <strong>Location Services</strong> permission — even if the app has no interest in your actual location.</p>

<h2>Android Configuration</h2>
<ol>
  <li>Open <strong>Settings &gt; Location</strong> and ensure the main toggle is <strong>On</strong>.</li>
  <li>Navigate to <strong>Settings &gt; Apps &gt; Kodak Photo Printer</strong> (or Kodak Instant Printer).</li>
  <li>Tap <strong>Permissions</strong>.</li>
  <li>Ensure the following permissions are set to <strong>"Allow"</strong> or <strong>"Allow all the time"</strong>:
    <ul>
      <li>Location (must be "Allow all the time" or "Allow only while using the app")</li>
      <li>Nearby devices (Android 12+)</li>
      <li>Camera (for photo selection)</li>
      <li>Storage / Photos and videos</li>
    </ul>
  </li>
  <li>Go back to <strong>Settings &gt; Connected devices &gt; Bluetooth</strong>. If your Kodak printer appears in the <strong>Previously connected devices</strong> list, tap the gear icon next to it and select <strong>Forget</strong>.</li>
  <li>Open the Kodak app and tap <strong>Connect Printer</strong>. The app should now discover the device.</li>
</ol>

<h2>iOS Configuration (iPhone / iPad)</h2>
<ol>
  <li>Open <strong>Settings &gt; Privacy &amp; Security &gt; Location Services</strong>. Ensure the master toggle is <strong>On</strong>.</li>
  <li>Scroll down to the Kodak app entry and set Location access to <strong>"While Using the App"</strong>.</li>
  <li>Go to <strong>Settings &gt; Privacy &amp; Security &gt; Bluetooth</strong>. Ensure the Kodak app toggle is <strong>On</strong>.</li>
  <li>Navigate to <strong>Settings &gt; Bluetooth</strong>. If the Kodak printer appears under My Devices, tap the <strong>(i)</strong> icon and select <strong>Forget This Device</strong>.</li>
  <li>Open the Kodak app and allow it to scan for the printer.</li>
</ol>

<h2>Common Pitfalls</h2>

<table class="diagnostic-table">
  <thead>
    <tr>
      <th>Symptom</th>
      <th>Root Cause</th>
      <th>Fix</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>App says "No printers found"</td>
      <td>Location Services or Nearby Devices permission denied</td>
      <td>Grant both permissions and restart the app.</td>
    </tr>
    <tr>
      <td>App connects but prints fail</td>
      <td>Another phone is already paired to the printer</td>
      <td>Kodak printers support only one active BLE connection. Disconnect the other device first.</td>
    </tr>
    <tr>
      <td>App crashes on launch</td>
      <td>Corrupted app cache or outdated app version</td>
      <td>Clear the app cache (Android) or delete and reinstall the app (iOS).</td>
    </tr>
    <tr>
      <td>Printer shows in Bluetooth but not in app</td>
      <td>System-level pairing interferes with app-level BLE</td>
      <td>Forget the device in system Bluetooth settings and let the app handle pairing.</td>
    </tr>
  </tbody>
</table>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>One Printer, One Phone:</strong> Kodak portable printers only maintain one active Bluetooth connection at a time. If a friend's phone is already connected, your phone will not be able to discover or pair with the printer until the other device disconnects or moves out of range.
</div>`,
    faqs: JSON.stringify([
      { question: 'Why does the Kodak app need Location permission?', answer: 'Android and iOS require Location Services for any app that performs Bluetooth Low Energy (BLE) scans, as BLE can be used for position tracking.', order: 1 },
      { question: 'Can I print without the Kodak app?', answer: 'On some models, yes. Kodak Dock Plus supports direct printing from the Photos app on iPhones via AirPrint.', order: 2 },
      { question: 'Why does my printer connect and then immediately disconnect?', answer: 'This is often caused by low battery on the printer. Charge the printer above 20% before pairing.', order: 3 }
    ])
  },
  {
    title: "Kodak ESP vs Hero Printer Models: Complete Comparison Guide",
    slug: 'kodak-esp-hero-printer-models-comparison',
    seoTitle: "Kodak ESP vs Hero Printers: Model Comparison & Specs Guide",
    metaDescription: "What's the difference between Kodak ESP and Hero printers? A complete comparison of all legacy Kodak inkjet models, their specs, ink types, and feature sets.",
    excerpt: "Kodak manufactured two major desktop inkjet lines: the ESP series and the Hero series. This reference guide compares every model's specs, cartridge types, and capabilities.",
    errorCode: null,
    tags: 'Kodak, ESP, Hero, Comparison, Printer Models, Specs, Features, Guide',
    wordCount: 1080,
    difficultyLevel: 'Beginner',
    timeToFix: null,
    categoryId: setupCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredImage: null,
    featuredImageAlt: 'Side-by-side comparison of a Kodak ESP and Kodak Hero All-in-One printer',
    featuredImageCaption: 'Comparing the Kodak ESP and Hero inkjet printer lines',
    featuredSnippet: "Kodak ESP printers (ESP 3, 5, 7, 9, 3250, 5250, 7250, 9250) used Series 10 ink cartridges and were Kodak's first consumer inkjets. Kodak Hero printers (Hero 3.1, 5.1, 7.1, 9.1) used Series 30 cartridges with an updated printhead design, faster print speeds, and built-in Wi-Fi with cloud printing. The ESP C-Series (C110, C310, C315) also uses Series 30 cartridges.",
    content: `<p>Kodak's consumer printer division (active from approximately 2007 to 2013) manufactured two primary product lines: the <strong>ESP (Easy Share Printer)</strong> series and the <strong>Hero</strong> series. While both lines are All-in-One inkjet printers with print, copy, and scan capabilities, they differ significantly in hardware architecture, cartridge compatibility, connectivity options, and print speed. This reference guide provides a complete comparison of every major model released across both lines to help you identify your printer, find compatible supplies, and understand its capabilities.</p>

<h2>The ESP Series (Generation 1)</h2>
<p>The ESP line was Kodak's first entry into the consumer inkjet market. These printers used <strong>Series 10</strong> ink cartridges and were marketed on Kodak's "lowest cost per photo" positioning.</p>

<table class="diagnostic-table">
  <thead>
    <tr>
      <th>Model</th>
      <th>Cartridge</th>
      <th>Max Resolution</th>
      <th>Wi-Fi</th>
      <th>Duplex</th>
      <th>ADF</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><strong>ESP 3</strong></td><td>Series 10</td><td>4800 x 1200 dpi</td><td>No (USB only)</td><td>No</td><td>No</td></tr>
    <tr><td><strong>ESP 5</strong></td><td>Series 10</td><td>4800 x 1200 dpi</td><td>Yes (802.11b/g)</td><td>No</td><td>No</td></tr>
    <tr><td><strong>ESP 7</strong></td><td>Series 10</td><td>4800 x 1200 dpi</td><td>Yes (802.11b/g)</td><td>No</td><td>No</td></tr>
    <tr><td><strong>ESP 9</strong></td><td>Series 10</td><td>4800 x 1200 dpi</td><td>Yes (802.11b/g)</td><td>Yes</td><td>Yes (25-sheet)</td></tr>
    <tr><td><strong>ESP 3250</strong></td><td>Series 10</td><td>4800 x 1200 dpi</td><td>Yes (802.11b/g/n)</td><td>No</td><td>No</td></tr>
    <tr><td><strong>ESP 5210</strong></td><td>Series 10</td><td>4800 x 1200 dpi</td><td>Yes (802.11b/g/n)</td><td>No</td><td>No</td></tr>
    <tr><td><strong>ESP 5250</strong></td><td>Series 10</td><td>4800 x 1200 dpi</td><td>Yes (802.11b/g/n)</td><td>No</td><td>No</td></tr>
    <tr><td><strong>ESP 7250</strong></td><td>Series 10</td><td>4800 x 1200 dpi</td><td>Yes (802.11b/g/n)</td><td>Yes</td><td>No</td></tr>
    <tr><td><strong>ESP 9250</strong></td><td>Series 10</td><td>4800 x 1200 dpi</td><td>Yes (802.11b/g/n)</td><td>Yes</td><td>Yes (25-sheet)</td></tr>
    <tr><td><strong>ESP Office 6150</strong></td><td>Series 10</td><td>4800 x 1200 dpi</td><td>Yes (802.11b/g/n)</td><td>Yes</td><td>Yes (35-sheet)</td></tr>
  </tbody>
</table>

<h2>The ESP C-Series (Generation 1.5)</h2>
<p>The C-Series was a transitional line that <strong>switched to Series 30 cartridges</strong> while maintaining the ESP branding. These models use a redesigned printhead with improved ink delivery:</p>

<table class="diagnostic-table">
  <thead>
    <tr>
      <th>Model</th>
      <th>Cartridge</th>
      <th>Max Resolution</th>
      <th>Wi-Fi</th>
      <th>Duplex</th>
      <th>ADF</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><strong>ESP C110</strong></td><td>Series 30</td><td>4800 x 1200 dpi</td><td>Yes</td><td>No</td><td>No</td></tr>
    <tr><td><strong>ESP C115</strong></td><td>Series 30</td><td>4800 x 1200 dpi</td><td>Yes</td><td>No</td><td>No</td></tr>
    <tr><td><strong>ESP C310</strong></td><td>Series 30</td><td>4800 x 1200 dpi</td><td>Yes</td><td>No</td><td>No</td></tr>
    <tr><td><strong>ESP C315</strong></td><td>Series 30</td><td>4800 x 1200 dpi</td><td>Yes</td><td>No</td><td>No</td></tr>
    <tr><td><strong>ESP 1.2</strong></td><td>Series 30</td><td>4800 x 1200 dpi</td><td>No (USB only)</td><td>No</td><td>No</td></tr>
    <tr><td><strong>ESP 3.2</strong></td><td>Series 30</td><td>4800 x 1200 dpi</td><td>Yes</td><td>No</td><td>No</td></tr>
    <tr><td><strong>ESP Office 2150</strong></td><td>Series 30</td><td>4800 x 1200 dpi</td><td>Yes</td><td>Yes</td><td>Yes (35-sheet)</td></tr>
    <tr><td><strong>ESP Office 2170</strong></td><td>Series 30</td><td>4800 x 1200 dpi</td><td>Yes</td><td>Yes</td><td>Yes (35-sheet)</td></tr>
  </tbody>
</table>

<h2>The Hero Series (Generation 2)</h2>
<p>The Hero line was Kodak's premium consumer offering, featuring faster print engines, improved LCD touchscreens, and early cloud printing integration via <strong>Kodak Email Print</strong> and <strong>Google Cloud Print</strong>:</p>

<table class="diagnostic-table">
  <thead>
    <tr>
      <th>Model</th>
      <th>Cartridge</th>
      <th>Max Resolution</th>
      <th>Wi-Fi</th>
      <th>Duplex</th>
      <th>ADF</th>
      <th>Touchscreen</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><strong>Hero 3.1</strong></td><td>Series 30</td><td>4800 x 1200 dpi</td><td>Yes (802.11b/g/n)</td><td>No</td><td>No</td><td>2.4" Color LCD</td></tr>
    <tr><td><strong>Hero 5.1</strong></td><td>Series 30</td><td>4800 x 1200 dpi</td><td>Yes (802.11b/g/n)</td><td>Yes</td><td>No</td><td>2.4" Color LCD</td></tr>
    <tr><td><strong>Hero 7.1</strong></td><td>Series 30</td><td>4800 x 1200 dpi</td><td>Yes (802.11b/g/n)</td><td>Yes</td><td>Yes (25-sheet)</td><td>3.5" Touchscreen</td></tr>
    <tr><td><strong>Hero 9.1</strong></td><td>Series 30</td><td>4800 x 1200 dpi</td><td>Yes (802.11b/g/n)</td><td>Yes</td><td>Yes (35-sheet)</td><td>3.5" Touchscreen</td></tr>
  </tbody>
</table>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Supply Availability Note:</strong> Because Kodak exited the consumer printer market in 2013, genuine Series 10 cartridges are increasingly scarce. Series 30 cartridges remain more widely available through online retailers. Compatible third-party cartridges are available for both series but may trigger "Cartridge Not Recognized" errors on some models.
</div>`,
    faqs: JSON.stringify([
      { question: 'Can I use Series 10 cartridges in a Hero printer?', answer: 'No. All Hero models use Series 30 cartridges. The two series have different physical dimensions and chip protocols.', order: 1 },
      { question: 'Which Kodak model is best for office use?', answer: 'The ESP Office 6150 (Series 10) and ESP Office 2170 (Series 30) offer duplex printing, ADF scanning, and fax support — making them the most office-capable models.', order: 2 },
      { question: 'Are Kodak ESP and Hero printers still usable today?', answer: 'Yes, if you can source ink cartridges. Printing and scanning work on modern Windows and Mac via Gutenprint or WIA drivers, though official Kodak software support has ended.', order: 3 }
    ])
  },
  {
    title: "Kodak Printer Making Grinding or Clicking Noise: Gear Fixes",
    slug: 'kodak-printer-making-grinding-noise',
    seoTitle: "Kodak Printer Making Grinding or Clicking Noise: Fix Guide",
    metaDescription: "Is your Kodak printer making grinding, clicking, or knocking sounds? A hardware tech explains worn carriage gears, encoder strip slips, and foreign object removal.",
    excerpt: "Grinding, clicking, or knocking sounds from a Kodak printer indicate a mechanical obstruction in the paper path, worn carriage gears, or a dirty encoder strip.",
    errorCode: 'Mechanical Noise',
    tags: 'Kodak, Grinding Noise, Clicking Sound, Gears, Encoder Strip, Carriage Jam',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '20 minutes',
    categoryId: printingProblemsCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredImage: null,
    featuredImageAlt: 'Inside view of a Kodak ESP printer showing the printhead carriage and white plastic drive gears',
    featuredImageCaption: 'Inspecting the internal carriage gear mechanism of a Kodak ESP printer',
    featuredSnippet: "To fix grinding or clicking noises on a Kodak printer: 1) Power off and open the access door. Check for foreign objects (paper scraps, pens, clips) in the paper path. 2) Inspect the white plastic carriage gears for worn or stripped teeth. 3) Clean the encoder strip (thin transparent film behind the carriage) with a damp lint-free cloth. 4) Lubricate the carriage rail with a thin layer of white lithium grease.",
    content: `<p>When a Kodak ESP or Hero printer starts making unusual grinding, clicking, or repetitive knocking sounds during printing or power-on initialization, it almost always indicates a <strong>mechanical problem</strong> rather than an electrical or software fault. These sounds are produced by the physical components of the print engine — the carriage motor, paper feed gears, or encoder timing strip — encountering resistance or losing synchronization. Let's identify the source of the noise and fix it.</p>

<h2>Identifying the Sound Pattern</h2>
<p>The type of noise helps narrow down the fault location:</p>
<ul>
  <li><strong>Continuous Grinding:</strong> The printhead carriage is dragging against an obstruction on the guide rail, or the rail has dried out (lost lubrication).</li>
  <li><strong>Repetitive Clicking (Rhythmic):</strong> One or more plastic gear teeth are stripped or worn. The gear rotates past the missing tooth and clicks each revolution.</li>
  <li><strong>Single Loud Knock on Startup:</strong> The carriage is hitting the hard stop at the end of the rail during initialization. This is normal on some models but becomes louder if the carriage damper pad is worn or missing.</li>
  <li><strong>High-Pitched Whining:</strong> The main drive motor or stepper motor bearings are wearing out. This is uncommon but indicates an aging motor assembly.</li>
</ul>

<h2>Step 1: Remove Foreign Objects</h2>
<p>The most common cause of grinding noises is a foreign object trapped in the paper path or carriage area:</p>
<ol>
  <li>Turn the printer off and unplug it from power.</li>
  <li>Open the top access door to expose the printhead carriage.</li>
  <li>Gently push the carriage by hand from left to right. It should slide smoothly with minimal resistance. If it feels sticky or grinds, inspect the guide rail for obstructions.</li>
  <li>Check for common foreign objects: paper clips, staples, torn paper scraps, pen caps, or dried ink clumps that have fallen into the carriage rail.</li>
  <li>Open the rear access panel (if your model has one) and check for torn paper lodged in the duplex feed path.</li>
</ol>

<h2>Step 2: Clean and Lubricate the Carriage Rail</h2>
<p>The printhead carriage rides on a polished steel rail. Over years of use, the lubricant on this rail dries out, causing metal-on-metal grinding:</p>
<ol>
  <li>Dampen a lint-free cloth with a few drops of warm water and wipe the entire length of the steel rail to remove dried ink, dust, and old grease.</li>
  <li>Apply a thin film of <strong>white lithium grease</strong> (available at any hardware store) to the rail. Spread it evenly along the full length.</li>
  <li>Manually slide the carriage back and forth several times to distribute the grease.</li>
  <li><strong>Do not use WD-40 or machine oil</strong>, as these attract dust and will gum up the rail over time.</li>
</ol>

<h2>Step 3: Inspect Carriage Drive Gears</h2>
<p>The carriage is driven by a toothed rubber belt connected to a set of small white plastic gears. If one tooth is stripped:</p>
<ol>
  <li>With the access door open and the printer unplugged, look at the left side of the carriage assembly where the drive belt wraps around a small gear pulley.</li>
  <li>Slowly rotate the gear by hand and inspect each tooth under a bright light.</li>
  <li>If a tooth is visibly broken or worn flat, the gear assembly needs replacement. Replacement gear kits for Kodak ESP models can be found on eBay or iFixit.</li>
</ol>

<h2>Step 4: Clean the Encoder Strip</h2>
<p>The encoder strip is a thin, transparent plastic film running horizontally behind the carriage. It has microscopic lines printed on it that the carriage sensor reads to determine position. If this strip is dirty, the carriage may lose its position and grind against the frame stops:</p>
<ol>
  <li>Locate the encoder strip — it runs parallel to the carriage rail, slightly behind and above it.</li>
  <li>Dampen a soft cloth with distilled water (or a 50/50 mix of distilled water and isopropyl alcohol).</li>
  <li>Gently pinch the cloth around the strip and slide it from one end to the other. <strong>Do not apply pressure</strong>, as bending or creasing the strip will cause permanent position-tracking errors.</li>
  <li>Let it dry before powering the printer on.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>When Noise Is Normal:</strong> All inkjet printers make some mechanical noise during initialization (the carriage parks, the paper feed rollers cycle, and the ink pump primes the printhead). A brief 3-5 second grinding sound during startup is normal. Concern is warranted when the noise is new, louder than usual, or continuous.
</div>`,
    faqs: JSON.stringify([
      { question: 'Can I use cooking oil to lubricate the carriage rail?', answer: 'No. Cooking oils oxidize and become sticky over time. Use only white lithium grease or silicone-based lubricant designed for mechanical components.', order: 1 },
      { question: 'Why does my printer grind only when printing photos?', answer: 'Photo printing requires the carriage to make many more passes than text printing. If the rail is slightly dry, the increased friction during sustained movement produces audible grinding.', order: 2 },
      { question: 'Is a grinding noise a sign my printer is dying?', answer: 'Not necessarily. Most grinding noises are caused by dried lubrication or foreign objects — both of which are easy to fix. Motor bearing failure is rare.', order: 3 }
    ])
  }
];

async function main() {
  for (const article of articles) {
    try {
      await prisma.article.deleteMany({ where: { slug: article.slug } });
      console.log('Model cleanup complete for: ' + article.slug);
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
          faqs: article.faqs,
          status: 'published',
          publishedAt: new Date(),
          brandId: kodakBrandId,
          categoryId: article.categoryId,
          authorId: article.authorId,
          reviewerId: article.reviewerId,
          reviewedAt: new Date(),
          featuredImage: article.featuredImage,
          featuredImageAlt: article.featuredImageAlt,
          featuredImageCaption: article.featuredImageCaption,
        }
      });
      console.log('✅ Published: "' + created.title + '"');
    } catch (e: any) {
      console.log('⚠️ Error for "' + article.title + '": ' + e.message);
    }
  }

  const total = await prisma.article.count({ where: { brandId: kodakBrandId } });
  console.log('\nTotal Kodak articles now: ' + total);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
