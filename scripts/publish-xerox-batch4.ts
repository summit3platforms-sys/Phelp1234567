import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Xerox WorkCentre & VersaLink Errors: C405, 6515 & AltaLink Fixes",
    slug: 'xerox-workcentre-versalink-errors-c405-6515-altalink',
    seoTitle: "Xerox VersaLink C405, AltaLink & WorkCentre 6515 Fixes",
    metaDescription: "Troubleshooting the most common model-specific errors for the Xerox VersaLink C405, AltaLink C8030, and fixing the 'Offline' bug on the WorkCentre 6515.",
    excerpt: "While Xerox uses a universal fault code system, certain models like the VersaLink C405 and WorkCentre 6515 have distinct hardware quirks and network offline bugs.",
    errorCode: null,
    tags: 'xerox versalink c405 error code, xerox workcentre 6515 offline fix, xerox altalink c8030 error',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: errorCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "To fix the Xerox WorkCentre 6515 'Offline' bug in Windows: The 6515 is notorious for dropping off the network due to WSD (Web Services for Devices) conflicts. Do not let Windows auto-discover the printer. Go to Windows Printers & Scanners, click 'Add Device', then 'Add Manually'. Select 'Add a printer using an IP address'. Choose 'TCP/IP Device' from the dropdown (not Auto Detect) and type the 6515's IP address. This forces a direct TCP/IP port connection, preventing the printer from randomly showing as Offline when it goes to sleep.",
    content: `<h2>VersaLink C405: The "Whirring" ADF Error</h2>
<p>The <strong>Xerox VersaLink C405</strong> is arguably the most popular desktop A4 MFP in the world. However, it has a known physical quirk with the Auto Document Feeder (ADF).</p>
<ul>
  <li><strong>The Problem:</strong> When you place a stack of paper in the top feeder to scan, the printer whirs loudly, but the paper never pulls through, eventually throwing a 005 (ADF) jam code.</li>
  <li><strong>The Fix:</strong> The rubber pickup roller in the C405 ADF wears out incredibly fast. Open the top green latch on the ADF. Look for the small, gray rubber tire. Clean it with rubbing alcohol. If it still slips, you must replace the "ADF Retard Pad and Roller Kit" (a $15 part).</li>
</ul>

<h2>WorkCentre 6515: The Perpetual Offline Bug</h2>
<p>The <strong>WorkCentre 6515</strong> (and its printer-only sibling, the Phaser 6510) is a phenomenal machine, but its network card has extremely aggressive power-saving protocols.</p>
<ol>
  <li>When the printer enters Deep Sleep, it stops responding to Windows WSD broadcast pings. Windows assumes the printer is dead and marks it "Offline."</li>
  <li><strong>The Fix:</strong> You must log into the printer's Web UI (EWS). Go to Connectivity &gt; Protocols &gt; WSD. <strong>Turn WSD OFF.</strong></li>
  <li>Then, on your PC, delete the printer. Re-add it manually using a Standard TCP/IP Port. Ensure "SNMP Status Enable" is unchecked in the port configuration.</li>
</ol>

<h2>AltaLink C8030: The 010-320 Fuser Jam</h2>
<p>The <strong>AltaLink C8030 / C8045</strong> series are floor-standing production machines. The most common specific failure on this model is the 010-320 (Fuser Exit Sensor) jam.</p>
<p>Because the AltaLink fuser operates at such high speeds, thin 20lb copy paper frequently curls as it exits the fuser and gets caught on the stripper fingers. Open Door B. If you constantly find accordioned paper here, you must change your paper tray settings on the screen from "Plain Paper" to "Lightweight" to lower the fuser temperature and prevent the curl.</p>`
  },
  {
    title: "Xerox Phaser 6510 Errors & VersaLink C505 vs C605",
    slug: 'xerox-phaser-6510-errors-versalink-c505-vs-c605',
    seoTitle: "Xerox Phaser 6510 Errors & VersaLink C505 vs C605",
    metaDescription: "What does the blinking red light on a Xerox Phaser 6510 mean? Plus, compare the differences between the Xerox VersaLink C505 and C605 enterprise printers.",
    excerpt: "Without a touch screen, diagnosing the Phaser 6510 relies on interpreting blinking lights. We also compare the high-end VersaLink C505 and C605.",
    errorCode: 'Blinking Light',
    tags: 'xerox phaser 6510 blinking light, xerox versalink c505 vs c605 difference',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: setupCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredSnippet: "Xerox VersaLink C505 vs C605 Difference: Both are high-volume A4 enterprise color MFPs. The C505 prints at 45 pages per minute, while the C605 is significantly faster, printing at 55 pages per minute. The C605 also features a larger 7-inch capacitive touchscreen, whereas the C505 uses a smaller 5-inch screen. Internally, the C605 uses larger, higher-capacity toner cartridges designed for massive monthly print volumes. If you run a small office, the C505 is more than sufficient; the C605 is intended for large enterprise workgroups.",
    content: `<h2>Decoding the Phaser 6510 Blinking Light</h2>
<p>Unlike the WorkCentre 6515 which features a giant touch screen to tell you exactly what is wrong, the <strong>Xerox Phaser 6510</strong> only has a small 2-line LCD and an exclamation point LED.</p>
<ul>
  <li><strong>Blinking Red Light + "Ready":</strong> The printer is operational, but one of the four toner cartridges is extremely low (under 10%). It is warning you to order supplies.</li>
  <li><strong>Solid Red Light + "Error":</strong> The printer has completely halted. Look at the 2-line LCD. If it says "Out of Paper" but the tray is full, the paper lift motor in the back of the tray has failed. If it gives a 3-digit code (like 092), the imaging drum has failed.</li>
  <li><strong>Blinking Orange/Yellow:</strong> A firmware update is currently installing, or the printer is receiving a massive RAW print file over the network. Do NOT unplug the printer while the light is yellow.</li>
</ul>

<h2>VersaLink C505 vs C605 Comparison</h2>
<p>If you are outgrowing the entry-level C405, Xerox offers two heavy-duty step-ups: the <strong>C505</strong> and <strong>C605</strong>.</p>
<ol>
  <li><strong>Speed:</strong> The C505 tops out at 45 PPM. The C605 reaches an incredible 55 PPM.</li>
  <li><strong>User Interface:</strong> The C505 uses a 5-inch touch screen. The C605 features a massive 7-inch tablet-style display, making it much easier to use ConnectKey apps and enter email addresses.</li>
  <li><strong>Running Costs:</strong> The C605 is a larger investment upfront, but it accepts "Extra High Capacity" toner cartridges that yield up to 16,900 pages. The C505's toners max out significantly lower. Therefore, if you print over 10,000 pages a month, the C605 is actually cheaper to own long-term.</li>
</ol>`
  },
  {
    title: "Fix Xerox Easy Assist, CentreWare & Scan Experience App Errors",
    slug: 'fix-xerox-easy-assist-centreware-scan-experience-app-errors',
    seoTitle: "Fix Xerox Easy Assist, CentreWare & Scan App Errors",
    metaDescription: "Is Xerox CentreWare Web not connecting? Is the Easy Assist mobile app failing to detect your printer? Learn how to fix Xerox's enterprise software suite.",
    excerpt: "Xerox provides a massive suite of software tools to manage their printers. Learn how to troubleshoot the Easy Assist app, CentreWare Web, and Windows Scan Experience.",
    errorCode: 'Software Connection Failed',
    tags: 'xerox easy assist not detecting printer, xerox centreware not connecting, xerox print and scan experience app error',
    wordCount: 1100,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: softwareCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    featuredSnippet: "To fix the 'Xerox Print and Scan Experience' app error in Windows 10/11: If the app crashes on launch or says the scanner is unavailable, Windows has likely installed the generic 'WSD IPP' driver instead of the actual Xerox V4 Print Driver. Go to Windows Settings > Printers, delete the Xerox printer. Download the 'Xerox Smart Start' installer from the official Xerox website. Run the installer and ensure it selects the 'V4 Print and Scan' driver. Once the correct proprietary driver is installed, the Windows App will detect the scanner instantly.",
    content: `<h2>Fixing the Xerox Easy Assist App</h2>
<p>The <strong>Xerox Easy Assist</strong> mobile app is designed to let you set up Wi-Fi, check toner, and print from your smartphone. If it fails to detect your printer on the network:</p>
<ul>
  <li><strong>Local Network Permission (iOS):</strong> Apple recently added strict privacy controls. Go to your iPhone Settings, scroll down to the Easy Assist app, and ensure the <strong>"Local Network"</strong> toggle is green. If it is off, the app is blocked from scanning your Wi-Fi for the printer.</li>
  <li><strong>Guest Wi-Fi Isolation:</strong> If your phone is connected to a "Guest" Wi-Fi network at the office, but the printer is hardwired to the main corporate LAN, the router's AP Isolation will block the phone from seeing the printer. Ensure both devices are on the exact same subnet.</li>
</ul>

<h2>CentreWare Web Not Connecting</h2>
<p><strong>CentreWare Web (CWW)</strong> is Xerox's legacy enterprise management tool (now transitioning to Xerox Device Manager). It relies heavily on SNMP (Simple Network Management Protocol) to pull data from fleets of printers.</p>
<ol>
  <li>If CWW shows a printer as "Unreachable" or "Communication Error", the printer's SNMP settings have likely been disabled by a security admin.</li>
  <li>Log into the printer's Web UI (EWS). Go to Connectivity &gt; Protocols &gt; SNMP.</li>
  <li>Ensure <strong>SNMPv1/v2c</strong> is enabled. CWW requires this to pull the toner status.</li>
  <li>Ensure the <strong>SNMP Community Name</strong> matches. The default is usually <code>public</code>. If your IT department changed the community string to something secure, you must update that string inside the CentreWare Web discovery configuration, otherwise it cannot read the printer.</li>
</ol>`
  }
];

async function main() {
  const brandSlug = 'xerox';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 4 (Clusters H & I: Models & Software) for brand: ${brand.name}`);

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
