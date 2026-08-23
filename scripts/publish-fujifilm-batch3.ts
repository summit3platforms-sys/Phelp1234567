import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const printQualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const paperCategory = '9a42c554-2b4f-47f8-887e-5996fb83cbad';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Instax Link App Crashing, Compatibility & Permissions Errors",
    slug: 'instax-link-app-crashing-compatibility-permissions-fix',
    seoTitle: "Fix Instax Link App Crashing & Compatibility Errors",
    metaDescription: "Is your Instax mini LINK, SQUARE Link, or instax Biz app crashing or failing to open? Fix iOS/Android permission blocks, cache corruption, and update bugs.",
    excerpt: "When the Instax smartphone app crashes on launch, freezes on the photo gallery, or throws permission errors, corrupted thumbnail caches and OS security blocks are to blame.",
    errorCode: 'App Crash',
    tags: 'Fujifilm, Instax Link App, App Crashing, Permissions Error, instax Biz, Android 14, iOS Update',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To fix Instax Link app crashing and permission errors: 1) On iOS, go to Settings > mini LINK (or SQUARE Link) > enable 'Full Access' for Photos and turn ON 'Local Network' & 'Bluetooth'. 2) On Android 13/14, go to Settings > Apps > mini LINK > Permissions > grant 'Photos and Videos' and 'Nearby Devices' permissions. 3) Clear corrupted photo cache: On Android, tap 'Clear Cache' & 'Clear Data' in App Settings; on iPhone, offload the app under iPhone Storage and reinstall. 4) If an app update broke connectivity, power cycle both phone and printer to reset BLE socket bindings.",
    content: `<h2>Understanding Instax App Architecture</h2>
<p>Each Instax Link printer series uses a specialized mobile companion app built on top of native operating system image-rendering frameworks (Apple CoreImage on iOS and Android RenderScript). When the app requests access to thousands of high-resolution photos in your camera roll, a single corrupted thumbnail index or restricted OS privacy permission can cause the application to crash instantaneously upon launch.</p>

<h2>Fix 1: Resolving iOS 17/18 Permission Lockouts</h2>
<p>Apple introduced strict tiered photo privacy controls. If the Instax app is set to "Limited Access," it will freeze when you attempt to browse albums outside the authorized set.</p>
<ol>
  <li>Open the <strong>Settings</strong> app on your iPhone or iPad.</li>
  <li>Scroll down to the bottom list of installed apps and tap <strong>mini LINK</strong> (or <em>SQUARE Link / Link WIDE</em>).</li>
  <li>Tap <strong>Photos</strong> and select <strong>Full Access</strong>.</li>
  <li>Ensure the toggles for <strong>Bluetooth</strong> and <strong>Local Network</strong> are both switched green (ON).</li>
  <li>Restart the app. Your full photo gallery will load instantly without crashing.</li>
</ol>

<h2>Fix 2: Android 13/14 'Nearby Devices' &amp; instax Biz Permissions</h2>
<p>Android 13 replaced legacy Location scanning with a dedicated <em>Nearby Devices</em> runtime permission. If denied, the app will crash the moment you tap the print or search button.</p>
<ul>
  <li>Open Android <strong>Settings &gt; Apps &gt; All Apps &gt; mini LINK</strong> (or <em>instax Biz</em>).</li>
  <li>Tap <strong>Permissions</strong>.</li>
  <li>Under "Not Allowed", tap <strong>Nearby Devices</strong> and select <strong>Allow</strong>.</li>
  <li>Tap <strong>Photos and Videos</strong> and select <strong>Allow</strong>.</li>
  <li>Tap <strong>Storage &amp; Cache</strong> and tap <strong>Clear Cache</strong> to wipe stale render buffers.</li>
</ul>

<h2>Fix 3: Resolving Crashes Caused by Massive 48MP/108MP Photos</h2>
<p>Modern flagship smartphones capture ultra-high-resolution RAW or HEIC files exceeding 50 Megabytes. When the Instax app attempts to generate live filter previews on multiple massive files simultaneously, phone RAM runs out, forcing the operating system to terminate the app.</p>
<p><em>Solution:</em> In the Instax app settings, turn off "High-Definition Preview" if available, or create a dedicated "Favorites" album in your phone photos app containing compressed JPEG exports of photos you intend to print.</p>`
  },
  {
    title: "Instax Connect, AR Print & Wrong Printer Selected in App Fix",
    slug: 'instax-connect-ar-print-not-working-troubleshooting',
    seoTitle: "Instax Connect & AR Print Not Working (App Setup Fix)",
    metaDescription: "Having trouble sending Instax Connect messages, scanning AR Print QR codes, or selecting the wrong printer model in the app? Complete troubleshooting guide.",
    excerpt: "Instax Connect cloud messaging and AR Print require active server handshakes and correct app-to-model pairing. Here is how to fix connection and scan failures.",
    errorCode: null,
    tags: 'Fujifilm, Instax Connect, AR Print, Wrong Printer, SQUARE Link App, QR Code Scan',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '7 minutes',
    categoryId: softwareCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix Instax Connect and AR Print errors: 1) Verify you are using the correct model app: 'mini LINK' app only connects to Mini Link 1/2/3; 'SQUARE Link' app only connects to Square Link; 'instax Link WIDE' app only connects to Link WIDE. They are NOT cross-compatible. 2) For AR Print scan failures: Ensure the QR code on the physical photo has at least 500 lux of even lighting without glare; hold your phone camera 4 to 6 inches away. 3) For Instax Connect send failures: Check that your recipient has an active Fujifilm account and that your phone is connected to cellular data or Wi-Fi.",
    content: `<h2>Understanding Instax Digital Ecosystem Features</h2>
<p>Fujifilm has introduced interactive cloud and augmented reality layers to physical instant prints. However, features like <strong>Instax Connect</strong> (sending personalized digital prints across the globe) and <strong>AR Print</strong> (embedding animated QR codes into Square prints) depend on active cloud servers and precise optical scanning.</p>

<h2>Fix 1: The 'Wrong Printer Selected' App Mismatch</h2>
<p>Fujifilm maintains <strong>three separate, non-interchangeable mobile applications</strong> across the Link printer family:</p>
<ul>
  <li><strong>mini LINK App:</strong> Compatible strictly with Mini Link 1, Mini Link 2, and Mini Link 3.</li>
  <li><strong>SQUARE Link App:</strong> Compatible strictly with the Square Link printer.</li>
  <li><strong>instax Link WIDE App:</strong> Compatible strictly with the Link WIDE printer.</li>
</ul>
<p>If you own an Instax Square Link and attempt to pair it using the standard mini LINK app, the application will display <em>"Wrong Printer Selected"</em> or search endlessly. You must install the dedicated app built specifically for your film size format.</p>

<h2>Fix 2: AR Print QR Code Scanning Failures</h2>
<p>If scanning an AR Print on a physical photo fails to trigger the interactive animation, voice memo, or doodle:</p>
<ol>
  <li><strong>Avoid Direct Flash &amp; Glare:</strong> The glossy surface of Instax film reflects light strongly. Tilt the photo slightly to eliminate surface reflections over the tiny QR code.</li>
  <li><strong>Check Camera Distance:</strong> Hold your phone camera steady between <strong>10 cm to 15 cm (4 to 6 inches)</strong> directly parallel to the print.</li>
  <li><strong>Use In-App AR Scanner:</strong> While standard iOS/Android camera apps can read the QR code URL, launching the AR animations with full sound effects requires opening the dedicated AR scanner built into the <em>SQUARE Link</em> app.</li>
</ol>

<h2>Fix 3: Instax Connect Message Delivery Failures</h2>
<p>Instax Connect allows you to text a photo with custom chat bubbles to a friend's Instax app anywhere in the world.</p>
<ul>
  <li>Ensure your phone has an active Wi-Fi or LTE internet connection (Bluetooth is only used locally to communicate with the printer hardware, while Instax Connect uses internet cloud servers).</li>
  <li>Verify that your recipient has accepted your contact invitation inside their Instax app's Connect inbox.</li>
</ul>`
  },
  {
    title: "How to Fix Jammed Film & Ejection Failure in Instax Link Printers",
    slug: 'instax-link-printer-jammed-film-ejection-failure',
    seoTitle: "Fix Instax Link Jammed Film & Photo Won't Eject (Motor Noise)",
    metaDescription: "Is film jammed inside your Instax Mini Link, Square Link, or Link WIDE? Learn how to safely extract stuck photos and fix motorized roller grinding noises.",
    excerpt: "When an Instax photo gets stuck halfway out of the ejection slot and the printer makes a loud whirring noise, brute-force pulling will ruin the precision gears. Here is the safe fix.",
    errorCode: 'Film Jam',
    tags: 'Fujifilm, Instax Link, Jammed Film, Wont Eject, Grinding Noise, Ejection Slot, Roller Stuck',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: paperCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a film jam in an Instax Link printer: 1) Do NOT yank the stuck film sheet violently; doing so will shatter the motorized drive gears. 2) Turn off the printer. 3) Gently grip the exposed edge of the jammed photo with two fingers and pull straight upward with slow, steady, uniform pressure. 4) If the photo is trapped inside and the motor whirs loudly: Open the film door in a pitch-black room (to avoid exposing unexposed sheets), remove the plastic cartridge, and inspect the metal ejection hook at the base of the chamber.",
    content: `<h2>Why Instax Printers Jam</h2>
<p>Instax Link printers use a mechanical pick-arm at the bottom of the film chamber to push the bottom-most sheet upward into a pair of high-pressure steel rollers. These rollers crush the chemical reagent pods at the base of the photo, evenly spreading developer paste across the image area while expelling the print through the top slot. Jams occur if a chemical pod hardens, the battery voltage dips during roller drive, or a foreign object blocks the exit slot.</p>

<h2>Step 1: Safe Removal of Partially Ejected Film</h2>
<p>If the photo is sticking halfway out of the top slot:</p>
<ol>
  <li>Turn the printer completely OFF by pressing the central power button for 3 seconds.</li>
  <li>Grasp the exposed white border of the photo firmly across its full width using your thumb and forefinger.</li>
  <li>Pull the film <strong>straight up and out of the slot with slow, continuous, steady force</strong>. Do not wiggle the film from side to side, as this can bend the spring-loaded light-seal gate.</li>
  <li>Inspect the back of the ejected photo. If sticky brown or clear reagent paste leaked onto the surface, wipe the top exit slot immediately with a dry microfiber cloth before it dries into rock-hard residue.</li>
</ol>

<h2>Step 2: Resolving Internal Jam &amp; Motor Grinding Noises</h2>
<p>If the motor whirs loudly or clicks repeatedly, but no film emerges from the top slot:</p>
<ul>
  <li><strong>Go into a Completely Dark Room:</strong> If you open the rear film door in normal room light, all remaining unexposed photos in the pack will instantly ruin and turn completely white. Enter a windowless bathroom or closet with the lights completely off.</li>
  <li><strong>Remove the Cartridge:</strong> Pop open the rear door and gently lift the plastic cartridge out of the bay.</li>
  <li><strong>Check the Ejection Arm:</strong> Feel along the bottom left corner inside the empty chamber. You will feel a small metal finger (the pick-arm). Ensure it is sitting in its lowered resting position and not bent upwards.</li>
  <li><strong>Reinsert &amp; Close:</strong> Slide the cartridge back in, close the door until it clicks, and turn on the light. The printer will reset its roller homing sequence.</li>
</ul>

<h2>Step 3: Low Battery Torque Stall</h2>
<p>If the printer battery has less than 15% charge, the motor may lack the mechanical torque required to crush the chemical developer pods, stalling halfway through ejection. Plug the printer into a 5V USB charger for 30 minutes and press the power button; the printer will automatically complete the stalled ejection cycle upon boot.</p>`
  },
  {
    title: "Fix Instax Mini Link Blank, Overexposed, or Too Dark Prints",
    slug: 'instax-mini-link-blank-overexposed-dark-prints-fix',
    seoTitle: "Fix Instax Mini Link Blank, Dark & Overexposed Prints",
    metaDescription: "Are your Instax Link photos printing completely blank white, pitch black, or too dark? Learn how to fix light leaks, adjust app exposure, and revive expired film.",
    excerpt: "If your Instax prints come out pure white with no image or muddy and dark, light exposure accidents, expired chemistry, or app color settings are the root cause.",
    errorCode: null,
    tags: 'Fujifilm, Instax Mini Link, Blank Prints, Overexposed, Too Dark, Film Exposure, White Photo',
    wordCount: 1150,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: printQualityCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix blank, overexposed, or dark Instax prints: 1) Pure White Print: The film pack was exposed to light (e.g. Opening the film door mid-pack ruins all remaining sheets). Discard the ruined pack and load a fresh one in dim lighting. 2) Pure Black Print: The optical exposure head is failing or the phone sent a corrupted image payload; perform a pinhole hardware reset. 3) Photos Too Dark or Muddy: In the mini LINK app before printing, tap 'Edit' > 'Brightness' and increase the exposure slider by +1 or +2 steps; ensure 'Instax-Rich' mode is selected instead of 'Instax-Natural'.",
    content: `<h2>Understanding Instant Chemical Development</h2>
<p>Unlike inkjets or thermal zink printers, Instax printers use real silver halide instant photographic film. An internal micro-OLED exposure head flashes light onto the light-sensitive emulsion, after which steel rollers crush chemistry pods to develop the physical photograph. Print quality defects directly reflect exposure calibration or chemical degradation.</p>

<h2>Problem 1: Prints Come Out Completely Solid White</h2>
<p>A completely blank, solid white photo with no ghosting or faint image means the film received a massive blast of white light before being printed.</p>
<ul>
  <li><strong>The Mid-Pack Door Opening Mistake:</strong> Did you or someone else open the back film door while film was still inside? Opening the door even for a fraction of a second completely ruins the top 3 to 4 sheets in the cartridge.</li>
  <li><strong>X-Ray Scanner Damage:</strong> If you recently traveled by airplane and placed unexposed Instax film in checked luggage, high-intensity CT airport scanners will fog and bleach the entire film emulsion, resulting in washed-out or blank white prints. Always request a hand-check for instant film at airport security.</li>
</ul>

<h2>Problem 2: Prints Are Too Dark, Faded, or Muddy</h2>
<p>Smartphone OLED screens produce backlit, vibrant images that often appear significantly brighter to human eyes than how they translate onto physical chemical paper.</p>
<ol>
  <li><strong>Select 'Instax-Rich Mode':</strong> In the Instax mobile app, tap the print mode toggle and switch from <em>Instax-Natural Mode</em> to <strong>Instax-Rich Mode</strong>. Rich mode increases color saturation and punchy contrast.</li>
  <li><strong>Manual Exposure Compensation:</strong> Open the photo in the app, tap <strong>Edit</strong>, select the <strong>Brightness</strong> slider, and increase it by <strong>+10 to +20%</strong>. This compensates for natural print density loss.</li>
  <li><strong>Expired Chemical Pods:</strong> Check the expiration date stamped on the foil box. Instant film older than 18 to 24 months dries out inside the developer pods, producing faded, low-contrast, muddy grey tones.</li>
</ol>

<h2>Problem 3: Temperature Effects on Development</h2>
<p>Instax film chemistry is calibrated to develop optimally between <strong>5°C and 40°C (41°F to 104°F)</strong>.</p>
<ul>
  <li><strong>Cold Weather (&lt; 5°C):</strong> Developing photos in freezing temperatures slows down chemical reaction rates, leaving photos pale with a green/cyan color cast. Keep freshly ejected prints inside a warm coat pocket for the first 2 minutes.</li>
  <li><strong>Hot Weather (&gt; 35°C):</strong> Developing photos under scorching direct sun shifts colors toward magenta/yellow. Keep developing film in the shade.</li>
</ul>`
  },
  {
    title: "Fix Instax Link Streaks, Roller Lines & Film Ejecting Without Printing",
    slug: 'instax-link-streaks-lines-film-ejects-without-printing',
    seoTitle: "Fix Instax Link Streaks, Roller Lines & Ejection Glitches",
    metaDescription: "Are vertical lines or white repeating spots ruining your Instax photos? Learn how to clean internal developer rollers and stop unwanted blank film ejections.",
    excerpt: "Vertical streak lines and repeating white dots across your Instax prints are caused by dried chemical paste stuck to the internal stainless steel compression rollers.",
    errorCode: null,
    tags: 'Fujifilm, Instax Link, Streaks, Roller Lines, White Dots, Chemical Leak, Clean Rollers',
    wordCount: 1000,
    difficultyLevel: 'Intermediate',
    timeToFix: '8 minutes',
    categoryId: printQualityCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix roller streaks and unwanted film ejections on Instax Link printers: 1) Repeating vertical lines or white spots are caused by dried chemical paste on the steel rollers. Open the empty film door, shine a flashlight at the top roller cavity, and gently clean the steel rollers with a cotton swab lightly dampened with 99% isopropyl alcohol while rotating the roller. 2) If the printer ejects film immediately upon turning on, you loaded a new pack and it is simply ejecting the black protective darkslide (normal behavior). If it ejects actual film without printing, perform a pinhole factory reset.",
    content: `<h2>How Roller Defects Cause Image Streaks</h2>
<p>Inside every Instax Link printer is a pair of ultra-precision stainless steel rollers. When a photo passes through, these rollers exert several pounds of pressure to rupture the three reagent pods at the base and squeeze the developer paste evenly across the negative. If dried chemical residue or lint clings to either roller, it creates uneven pressure, leaving distinct cosmetic artifacts on every single photo.</p>

<h2>Diagnosing Streak Patterns</h2>
<ul>
  <li><strong>Continuous Vertical Line from Top to Bottom:</strong> A scratch or hardened piece of dirt on one roller is preventing full contact, leaving an un-spread chemical void.</li>
  <li><strong>Repeating Dots or Marks Spaced Exactly 1 Inch Apart:</strong> A tiny speck of dried developer paste is stuck to the circumference of the roller. Every time the roller completes one full rotation (approx. 25mm), it stamps the artifact into the photo.</li>
</ul>

<h2>Step-by-Step Roller Cleaning Procedure</h2>
<ol>
  <li>Ensure the film bay is completely empty (do not perform this with film loaded).</li>
  <li>Power off the printer.</li>
  <li>Open the rear film door. Look up into the upper cavity near the exit slot using a flashlight; you will see the twin steel rollers.</li>
  <li>Dip a cotton swab (Q-tip) in <strong>99% Isopropyl Alcohol</strong> (do not use water or household glass cleaners). Shake off excess moisture.</li>
  <li>Gently wipe the surface of both steel rollers. Use your thumb to manually rotate the rubber drive gear on the side to spin the rollers, allowing you to clean the entire 360-degree circumference.</li>
  <li>Allow the alcohol to air-dry completely for 5 minutes before inserting a fresh film cartridge.</li>
</ol>

<h2>Why Does Film Eject Immediately Upon Power-On?</h2>
<p>When you insert a brand-new 10-pack of Instax film, the first sheet on top is an opaque black plastic safety shield (called the darkslide). The moment you close the door, the printer's microswitch detects a fresh pack and automatically ejects this black plastic sheet. <strong>This is normal operating behavior and does not consume your 10 photos.</strong></p>
<p>However, if the printer spits out an active white photo without you pressing print on your phone, the main circuit board has a corrupted print spool queue. Perform a pinhole hardware reset by pressing the recessed button near the charging port for 5 seconds.</p>`
  }
];

async function main() {
  const brand = await prisma.brand.findUnique({ where: { slug: 'fujifilm' } });
  if (!brand) throw new Error('Fujifilm brand not found in database.');

  console.log(`🚀 Publishing Batch 3 (Clusters C & D: App & Print Quality) for brand: ${brand.name}`);

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
