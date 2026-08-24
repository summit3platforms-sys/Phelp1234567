import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
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
    title: "Fix NIIMBOT RFID Chip Fault & Non-Universal Labels Error",
    slug: 'niimbot-rfid-chip-fault-non-universal-labels-error',
    seoTitle: "Fix NIIMBOT RFID Chip Fault & Non-Universal Labels",
    metaDescription: "Does your NIIMBOT printer show a 'Chip Fault', 'Non-Universal Labels', or 'Label Chip Not Identified' error? Learn how to fix RFID scanning issues and use third-party labels.",
    excerpt: "NIIMBOT printers rely on proprietary RFID chips embedded in their paper rolls. If the chip is missing or corrupted, the printer locks down to prevent printing.",
    errorCode: 'Chip Fault / Non-Universal',
    tags: 'niimbot chip fault error fix, niimbot non-universal labels error, niimbot third party labels not working, niimbot original vs generic labels difference, niimbot label chip not identified',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: paperCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix a NIIMBOT 'Chip Fault' or 'Non-Universal Labels' error: 1) The DRM Lock: Modern NIIMBOT printers (like the D11, B21, and B1) contain an RFID scanner. The paper roll contains an RFID chip sticker on the plastic core. If you use cheap generic third-party labels without this chip, the app will throw a 'Non-Universal Labels' error and refuse to print. 2) Chip Not Identified: If you are using genuine NIIMBOT paper but get a 'Chip Fault', take the roll out and wipe the inside of the paper bay with a dry cloth. Static electricity or dust can block the RFID scanner located on the side of the compartment.",
    content: `<h2>Understanding NIIMBOT RFID Technology (DRM)</h2>
<p>Unlike early thermal printers that accepted any paper roll that physically fit, NIIMBOT has implemented a strict RFID (Radio Frequency Identification) system. Every genuine NIIMBOT label roll has a tiny sticker containing a microchip attached to the plastic core.</p>

<h3>The "Non-Universal Labels" Error</h3>
<p>If you purchase generic, third-party thermal labels on Amazon to save money, they will not have this proprietary RFID chip.</p>
<ul>
  <li>When you close the lid, the printer scans for the chip. If it finds nothing, it flags the paper as "Non-Universal" (third-party).</li>
  <li>Depending on your specific printer's firmware version, the app may completely block you from printing, or it may print with an annoying watermark.</li>
  <li><strong>The Workaround:</strong> Some users carefully peel the RFID sticker off an empty, genuine NIIMBOT roll and tape it to the side of the printer's paper compartment to fool the scanner while using third-party paper.</li>
</ul>

<h3>The "Chip Fault" / "Chip Not Identified" Error</h3>
<p>If you are using genuine, branded NIIMBOT labels and still receive a chip error, the scanner cannot read the tag.</p>
<ol>
  <li><strong>Physical Alignment:</strong> The RFID reader is located on the side wall of the paper bay. If the roll is pushed too far to the other side (especially on wider models like the B21 or B3S with adjustable baffles), it is out of range. Adjust the paper guides so the roll sits closer to the sensor.</li>
  <li><strong>Static/Dust:</strong> Use a dry microfiber cloth to wipe the side wall of the paper compartment. Static charge can temporarily blind the near-field scanner.</li>
  <li><strong>Dead Chip:</strong> Rarely, a roll leaves the factory with a defective RFID tag. Test a second genuine roll. If the second roll works, the first roll's chip is dead.</li>
</ol>`
  },
  {
    title: "NIIMBOT Label Recognition Errors & Exceeded Chip Limits",
    slug: 'niimbot-label-recognition-errors-exceeded-chip-limits',
    seoTitle: "Fix NIIMBOT Exceeded Chip Limits & Foreign Object Error",
    metaDescription: "Is your NIIMBOT throwing a 'Label Quantity Exceeded' or 'Foreign Object Sensing Port' error? Learn how to fix RFID limits and label recognition failures.",
    excerpt: "NIIMBOT's RFID chips contain a strict print counter. If the chip counts 200 prints, it locks out. Learn how to fix label recognition and sensor port errors.",
    errorCode: 'Quantity Exceeded',
    tags: 'niimbot label quantity exceeded chip, niimbot rfid label not recognized, niimbot foreign object sensing port error, niimbot printer wont read label roll, niimbot label paper compatibility guide',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: paperCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a NIIMBOT 'Label Quantity Exceeded' error: NIIMBOT RFID chips act as a countdown timer. If the roll has 200 labels, the chip will only allow exactly 200 prints before permanently locking itself. You cannot reuse an old RFID sticker with a new roll of third-party paper, because the old chip's counter has reached zero. If you get a 'Foreign Object Sensing Port Error', the optical sensor that detects the gap between labels is blocked by lint, dust, or a torn piece of sticker backing. Use compressed air to blow out the bottom of the paper compartment.",
    content: `<h2>The "Label Quantity Exceeded" Lockout</h2>
<p>Because users found ways to bypass the "Non-Universal Labels" warning by taping an old RFID chip to the side of the printer, NIIMBOT updated their chip technology.</p>
<ul>
  <li>Modern NIIMBOT RFID tags are read/write. When you insert a new roll of 210 labels, the printer registers 210 prints available.</li>
  <li>Every time a label passes the printhead, the printer writes a -1 to the chip.</li>
  <li>Once the chip hits zero, you will receive the <strong>Label Quantity Exceeded</strong> error. The chip is now permanently dead. You cannot use it to spoof third-party labels. You must install a fresh, genuine NIIMBOT roll.</li>
</ul>

<h2>Fixing the "Foreign Object Sensing Port" Error</h2>
<p>While the RFID chip tells the printer <em>what</em> paper is loaded, a physical optical sensor tells the printer <em>where</em> the label is.</p>
<ol>
  <li>If you receive a "Foreign Object" or "Sensing Port" error, the printer's optical eye is blinded.</li>
  <li>Open the lid and remove the paper roll.</li>
  <li>Look down into the bottom of the feed path. You will see a small, recessed square (the infrared sensor).</li>
  <li>Often, a tiny scrap of waxy sticker backing tears off and covers this sensor, or paper dust cakes over the lens.</li>
  <li>Use a can of compressed air or a Q-tip to clean the sensor window.</li>
</ol>

<h2>Printer Won't Read the Label Roll at All</h2>
<p>If you insert a genuine roll and the app still says "No Paper" or doesn't auto-populate the label size template:</p>
<ul>
  <li>Ensure your phone has an active internet connection. The app reads the serial number from the RFID chip, pings the NIIMBOT cloud server, and downloads the exact template dimensions. If you are offline, it cannot pull the template.</li>
  <li>If you are offline, you must manually type the millimeter dimensions (e.g., 15x30mm) into the app to start designing.</li>
</ul>`
  },
  {
    title: "Fix NIIMBOT Bluetooth Connection Fails & Android GPS",
    slug: 'niimbot-bluetooth-connection-fails-android-gps',
    seoTitle: "Fix NIIMBOT Bluetooth Connection Fails & Android GPS Error",
    metaDescription: "Is your NIIMBOT failing to connect via Bluetooth, or does the app demand GPS location permissions? Learn how to clear Bluetooth system clashes and unpair the printer.",
    excerpt: "Modern Android phones require precise GPS location data to scan for Bluetooth Low Energy printers. Here is how to fix NIIMBOT connection crashes and system clashes.",
    errorCode: 'Bluetooth Failed',
    tags: 'niimbot wont connect bluetooth, niimbot app cant find printer, niimbot bluetooth requires gps android, niimbot bluetooth system clash error, niimbot unpair and repair printer',
    wordCount: 1000,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a NIIMBOT that won't connect to Bluetooth or can't be found by the app: 1) NEVER pair the printer using your phone's main Bluetooth Settings menu. If you did, go to Settings, find the NIIMBOT, and tap 'Forget this Device'. 2) Always pair the printer by opening the NIIMBOT App and tapping the 'Unconnected' icon in the top right. 3) For Android users: You MUST turn on your phone's GPS Location. Android categorizes Bluetooth Low Energy scanning under Location Services. If your GPS is off, or the app is denied Location permissions, it will never find the printer.",
    content: `<h2>The Golden Rule of NIIMBOT Bluetooth (BLE)</h2>
<p>The vast majority of NIIMBOT connectivity complaints stem from a misunderstanding of how Bluetooth Low Energy (BLE) interacts with the operating system.</p>

<h3>The "System Clash" Error</h3>
<p>If the NIIMBOT app throws a "Bluetooth System Clash" or says the device is occupied, you have paired it incorrectly.</p>
<ol>
  <li>When you pair a BLE printer via the iPhone or Android main Bluetooth settings page, the operating system takes exclusive control of the device.</li>
  <li>When you then open the NIIMBOT app, the app asks the OS for the printer, but the OS refuses to hand it over.</li>
  <li><strong>The Fix:</strong> Go to your phone's Bluetooth settings. Find the NIIMBOT printer, tap the gear (or 'i') icon, and select <strong>Forget this device</strong> or <strong>Unpair</strong>.</li>
  <li>Open the NIIMBOT app, tap the printer icon in the top right, and connect from <em>within</em> the app.</li>
</ol>

<h2>Why Does NIIMBOT Require Android GPS Location?</h2>
<p>Many Android users are alarmed when a simple label printing app demands access to their precise GPS location. This is not NIIMBOT spying on you; it is a hardcoded requirement of the Android Operating System (specifically Android 11, 12, and 13).</p>
<ul>
  <li>Google categorizes Bluetooth Low Energy (BLE) scanning under "Location Services" because BLE beacons can theoretically be used to track your location in a shopping mall.</li>
  <li>Therefore, if your phone's GPS is turned off, or if you deny the NIIMBOT app Location permissions, Android blocks the app from scanning for Bluetooth devices entirely.</li>
  <li><strong>The Fix:</strong> Pull down your notification shade and turn GPS/Location ON. Go to Settings &gt; Apps &gt; NIIMBOT &gt; Permissions, and ensure Location is set to "Allow only while using the app". (Note: Android 14 introduced the "Nearby Devices" permission to finally separate this).</li>
</ul>`
  },
  {
    title: "NIIMBOT App Crashing, Sync Errors & Permissions Fix",
    slug: 'niimbot-app-crashing-sync-errors-permissions-fix',
    seoTitle: "Fix NIIMBOT App Crashing, Sync Errors & Permissions Denied",
    metaDescription: "Is the NIIMBOT app crashing on launch, disconnecting mid-print, or failing to sync your saved label templates? Follow these quick software fixes.",
    excerpt: "If the NIIMBOT app crashes on iOS or Android, or if the printer disconnects halfway through a print job, corrupted app caches or low battery are the likely culprits.",
    errorCode: 'App Crash / Mid-Print Disconnect',
    tags: 'niimbot printer connects to wrong phone, niimbot app crashing fix, niimbot app permissions denied, niimbot printer disconnects mid print, niimbot app template not syncing',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix the NIIMBOT app crashing or the printer disconnecting mid-print: 1) App Crashing: On Android, go to Settings > Apps > NIIMBOT > Storage and click 'Clear Cache'. On iOS, a corrupted OS update can break the local database; delete the app entirely, restart your iPhone, and reinstall it from the App Store. 2) Disconnects Mid-Print: Thermal printing requires high voltage. If the battery is under 15%, the voltage sags during printing, causing the Bluetooth chip to crash and reboot. Charge the printer fully. 3) Wrong Phone: If the printer connects to your iPad instead of your iPhone, turn the iPad's Bluetooth off temporarily.",
    content: `<h2>Fixing Mid-Print Disconnects</h2>
<p>If the printer pairs successfully, but the moment you hit "Print", the app says "Printer Disconnected" and only half a label comes out, you are experiencing a hardware brown-out.</p>
<ul>
  <li>Thermal printers draw massive electrical current to heat the ceramic element.</li>
  <li>If the lithium-ion battery is low (under 15-20%), the sudden power draw from the heater causes the internal voltage to sag.</li>
  <li>The Bluetooth chip loses power for a millisecond, reboots, and severs the connection to your phone.</li>
  <li><strong>Solution:</strong> Plug the printer into a 5V/1A wall charger and leave it for an hour before trying again.</li>
</ul>

<h2>Connecting to the Wrong Phone</h2>
<p>If you use the NIIMBOT app on both an iPad (for designing) and an iPhone (for warehouse printing), the printer will connect to whichever device pings it first.</p>
<p>To fix "Device Occupied" errors, you must turn Bluetooth OFF on the iPad while you attempt to connect with the iPhone. Once the iPhone establishes the connection, you can turn the iPad's Bluetooth back on.</p>

<h2>App Crashing & Templates Not Syncing</h2>
<p>If you spend 20 minutes designing a custom address label but it disappears when you log in on another device, you are likely experiencing a cloud sync failure.</p>
<ol>
  <li><strong>Create an Account:</strong> If you use "Guest Mode", templates are stored locally on your phone's memory. If the app updates or crashes, they are wiped. You must create an account and log in.</li>
  <li><strong>Force Sync:</strong> Pull down on the "My Templates" screen to force a cloud refresh.</li>
  <li><strong>Permissions Denied Crash:</strong> On Android 14, if you deny the "Nearby Devices" permission on launch, the app will instantly crash to the desktop. Go to Settings &gt; Apps &gt; NIIMBOT &gt; Permissions and grant it manually.</li>
</ol>`
  }
];

async function main() {
  const brandSlug = 'niimbot';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  
  if (!brand) {
    brand = await prisma.brand.create({
      data: {
        name: 'NIIMBOT',
        slug: brandSlug,
        description: 'NIIMBOT manufactures smart, portable thermal label makers widely used for home organization and small businesses, featuring proprietary RFID label recognition.'
      }
    });
  }

  console.log(`🚀 Publishing Batch 1 (Clusters A & B: RFID & App/Bluetooth) for brand: ${brand.name}`);

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
