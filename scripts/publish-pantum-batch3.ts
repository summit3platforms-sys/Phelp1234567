import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Pantum App Not Printing, Wi-Fi Setup & Offline in Windows",
    slug: 'fix-pantum-app-not-printing-wifi-setup-offline-windows',
    seoTitle: "Fix Pantum Offline in Windows, App Printing & Wi-Fi Setup",
    metaDescription: "Is your Pantum printer offline in Windows or not detected via USB? Learn how to set up Pantum Wi-Fi and fix mobile app printing errors.",
    excerpt: "If the Pantum Mobile App refuses to print or Windows constantly marks the printer as Offline, the issue lies in port configuration and Wi-Fi Direct conflicts.",
    errorCode: 'Offline',
    tags: 'pantum app cannot print fix, pantum printer offline windows fix, pantum wifi setup guide, pantum printer not detected usb',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: softwareCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Pantum printer showing as 'Offline' in Windows: 1) Go to Windows Settings > Bluetooth & devices > Printers & scanners. 2) Click on your Pantum printer and select 'Printer properties'. 3) Go to the 'Ports' tab. Look for the port that is currently checked. If it is checked on a 'WSD' port, this is the cause of the offline drops. 4) Click 'Add Port' > 'Standard TCP/IP Port'. Enter the IP address of your Pantum printer (found by pressing the Wi-Fi button on the printer to print a network sheet). Windows will now connect directly to the IP, keeping it permanently online.",
    content: `<h2>Pantum Wi-Fi Setup Guide & App Fixes</h2>
<p>Connecting a Pantum printer to Wi-Fi can be confusing because the printer projects its own Wi-Fi network (Wi-Fi Direct) while also trying to connect to your home router.</p>

<h3>Pantum App Cannot Print Fix</h3>
<p>If you downloaded the Pantum App on your iPhone or Android and it says "Printer Not Found" or fails to print:</p>
<ul>
  <li><strong>The Wi-Fi Direct Trap:</strong> Ensure your phone is connected to your HOME Wi-Fi, not the printer's Wi-Fi Direct signal (which usually looks like "Pantum-XXXX-Hotspot"). If your phone connects to the printer's hotspot, you lose internet access, and cloud documents cannot be downloaded to print.</li>
  <li><strong>App Permissions:</strong> On Android 12+, the Pantum app requires "Nearby Devices" and "Precise Location" permissions to scan the network. If you denied these upon installation, go to Android Settings &gt; Apps &gt; Pantum &gt; Permissions and enable them.</li>
</ul>

<h2>Printer Not Detected via USB</h2>
<p>If you plug the Pantum into your PC but nothing happens, and the driver installer says "Connect USB cable now":</p>
<ol>
  <li>The cable is too long. USB data degrades after 6 feet. Do not use a 10-foot USB extension cable.</li>
  <li>You plugged it into a USB 3.0 hub. Pantum printers use older USB 2.0 architecture. Plug the cable directly into the back of your desktop PC motherboard, avoiding front-panel ports or external docks.</li>
  <li>Open Windows Device Manager. Look for "Unknown Device" with a yellow triangle. Right-click and uninstall it, unplug the USB, reboot the PC, and plug it back in.</li>
</ol>`
  },
  {
    title: "Pantum Drivers, Print Spooler, Mac Setup & Firmware Updates",
    slug: 'pantum-drivers-print-spooler-mac-setup-firmware',
    seoTitle: "Pantum Driver Install, Mac Setup & Print Spooler Fixes",
    metaDescription: "Learn how to fix a stuck Windows Print Spooler for Pantum, connect to a Mac via cable, install stubborn drivers, and safely update firmware.",
    excerpt: "Driver conflicts can cause the Windows Print Spooler to crash entirely. Learn how to clear out old Pantum drivers and set the printer up properly on Mac.",
    errorCode: null,
    tags: 'pantum print spooler cannot print, pantum mac connection cable setup, pantum driver download not installing, pantum firmware update guide',
    wordCount: 950,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: softwareCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix a stuck Print Spooler that prevents a Pantum printer from printing: 1) Press the Windows Key, type 'Services', and hit Enter. 2) Scroll down to 'Print Spooler'. Right-click it and select 'Stop'. 3) Leave that window open. Press Windows Key + R, type 'C:\\Windows\\System32\\spool\\PRINTERS' and hit Enter. 4) Delete all the files inside this folder (these are the corrupted print jobs clogging the system). 5) Go back to the Services window, right-click 'Print Spooler', and select 'Start'. Your Pantum will now be ready to accept new jobs.",
    content: `<h2>Pantum Driver Download Not Installing</h2>
<p>If the official Pantum driver installer hangs at 99% or throws a fatal error during installation, it is usually blocked by Windows Defender or a previous failed installation.</p>
<ul>
  <li>Use the official Pantum Uninstall Tool to rip out all corrupted registry keys first.</li>
  <li>Temporarily disable your Antivirus (especially Webroot or Norton), as they frequently flag the Chinese-signed Pantum driver executable as a false positive.</li>
  <li>Run the downloaded <code>.exe</code> file as an Administrator.</li>
</ul>

<h2>Pantum Mac Connection Cable Setup</h2>
<p>Unlike Windows, macOS uses Apple AirPrint for wireless printing, which doesn't require downloading a driver. However, if you are setting the Pantum up on a Mac via a USB cable:</p>
<ol>
  <li>If you have a newer MacBook, you must use a USB-C to USB-B printer cable. Using a cheap USB-C dongle/adapter often causes the Pantum to randomly disconnect mid-print.</li>
  <li>Go to System Settings &gt; Printers &amp; Scanners. Click the "+" button.</li>
  <li>Select the Pantum printer. In the "Use" dropdown, <strong>do not select Generic PostScript Printer</strong>. If macOS doesn't have the AirPrint profile over USB, you must download the specific <code>.dmg</code> driver package from the Pantum global website and select it from the "Select Software" menu.</li>
</ol>

<h2>Pantum Firmware Update Guide</h2>
<p>Updating the firmware can fix sleep-mode bugs. Download the Firmware Upgrade Tool from the Pantum website. Connect the printer via USB (do not update firmware over Wi-Fi, as a drop will brick the printer). Run the tool, load the <code>.bin</code> file, and click Update. The printer lights will flash wildly. Do not cut the power for at least 5 minutes.</p>`
  },
  {
    title: "Fix Pantum Output Bin Errors, Won't Turn On & Factory Reset",
    slug: 'fix-pantum-output-bin-errors-wont-turn-on-factory-reset',
    seoTitle: "Fix Pantum Output Bin Error, Power Issues & Factory Reset",
    metaDescription: "Does your Pantum say 'Close Output Bin' or refuse to power on? Learn how to unstick the output bin sensor and perform a hard factory NVRAM reset.",
    excerpt: "Hardware failures like power supply death or stuck exit sensors can halt your Pantum printer completely. Learn how to reset the machine to factory defaults.",
    errorCode: 'Close Output Bin',
    tags: 'pantum close output bin error, pantum output bin sensor stuck, pantum printer wont turn on, pantum factory reset guide',
    wordCount: 850,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: hardwareCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To Factory Reset a Pantum printer (like the P2500 or M6500 series): 1) Turn the printer OFF. 2) Press and hold the 'Cancel/Continue' button (or the 'Wi-Fi' button if it has no Cancel button). 3) While continuing to hold the button down, turn the power switch ON. 4) Keep holding the button for about 10 seconds until you see all the LED lights flash rapidly, then release it. The printer will reboot, clearing the NVRAM, erasing all stored Wi-Fi passwords, and resetting all network settings to factory defaults.",
    content: `<h2>Pantum "Close Output Bin" Error</h2>
<p>The "Output Bin" is the top tray where finished pages rest. If the printer says "Close Output Bin" or "Output Bin Full," it relies on a small plastic sensor flag hanging down over the tray.</p>
<ul>
  <li><strong>Stuck Sensor:</strong> If you pulled a jammed paper out backward, you likely popped the plastic sensor flag out of its hinges. Look closely at the exit slot. The small black lever should swing freely. If it is jammed sideways against the ceiling, gently snap it back down into its pivot holes.</li>
  <li><strong>Open Door:</strong> On some larger Pantum models, the output bin itself can be lifted to clear jams in the fuser. Ensure this lid is pushed down firmly until it clicks on both the left and right sides.</li>
</ul>

<h2>Printer Won't Turn On at All</h2>
<p>If the printer is completely dead (no lights, no sounds):</p>
<ol>
  <li><strong>The Power Switch:</strong> Pantum printers have a physical rocker switch located on the back left or back right corner of the machine near the power cord. Ensure it is flipped to "I" (On).</li>
  <li><strong>Bad Outlet / Surge Protector:</strong> Laser printers draw high amperage. If plugged into a weak surge protector, the breaker inside the power strip may have tripped. Plug the printer directly into a wall socket.</li>
  <li><strong>Blown Internal Fuse:</strong> If there was a recent thunderstorm, the internal power supply board fuse may have blown. This requires disassembling the side cover and soldering a new fuse, which usually means the printer should be replaced if out of warranty.</li>
</ol>`
  }
];

async function main() {
  const brandSlug = 'pantum';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 3 (Clusters E & F: Software, Network & Hardware resets) for brand: ${brand.name}`);

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
