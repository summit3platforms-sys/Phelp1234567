import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
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
    title: "Zebra ZD220 Not Printing & ZD888 Troubleshooting Guide",
    slug: 'zebra-zd220-not-printing-zd888-troubleshooting',
    seoTitle: "Zebra ZD220 Not Printing & ZD888 Troubleshooting Guide",
    metaDescription: "Is your Zebra ZD220 or ZD888 printer not printing, showing a red error light, or unresponsive? Learn how to fix USB connectivity, paper jams, and driver issues.",
    excerpt: "The Zebra ZD220 and ZD888 are value-tier desktop printers. When they refuse to print, the issue usually stems from a blinking red error light or a blocked USB port.",
    errorCode: 'Red Error Light',
    tags: 'Zebra, ZD220, ZD888, Not Printing, Troubleshooting, Red Light, USB Connection',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: errorCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To troubleshoot a Zebra ZD220 or ZD888 that is not printing: 1) Check the Status Indicator: If the single status LED is Solid Red, the media cover is open. If it is Blinking Red, the printer is out of media (labels/ribbon) or has failed to calibrate the gap. 2) Run Auto-Calibration: Hold the feed button until the status light flashes exactly two times, then release. The printer will feed and measure the blank labels. 3) Check Windows Spooler: If the light is solid green but the printer won't print, clear the Windows Print Queue and ensure the printer isn't in 'Offline' status in Control Panel.",
    content: `<h2>Understanding Zebra's Value Desktop Series</h2>
<p>The <strong>Zebra ZD220</strong> and its regional counterpart, the <strong>ZD888</strong>, are designed as reliable, entry-level 4-inch desktop printers. Unlike the higher-end ZD420/620 series which feature multiple diagnostic icons, the ZD220 and ZD888 rely on a <strong>single multi-color LED indicator</strong> to communicate all hardware statuses.</p>

<h2>Decoding the Single LED Indicator</h2>
<p>If your ZD220 is not printing, the first step is to look at the LED button on the top cover:</p>
<ul>
  <li><strong>Solid Green:</strong> The printer is ready. If it won't print, the issue is purely software/USB communication on your PC.</li>
  <li><strong>Solid Red:</strong> The printhead cover is open or not latched down completely. Push down firmly on both the left and right sides of the lid until you hear a loud click.</li>
  <li><strong>Blinking Red:</strong> The printer is out of labels, out of ribbon (if using the thermal transfer model), or experiencing a Media Out error due to failed calibration.</li>
</ul>

<h2>Fix 1: The 2-Flash Auto-Calibration Routine</h2>
<p>If the printer feeds 3 blank labels and then stops with a blinking red light, it has lost track of the label gaps.</p>
<ol>
  <li>Ensure labels (and ribbon) are loaded correctly and the lid is closed.</li>
  <li>Turn the printer <strong>ON</strong>.</li>
  <li>Press and hold the top <strong>Feed button</strong>.</li>
  <li>The LED will flash once, then flash twice. <strong>Release the button immediately after the double flash.</strong></li>
  <li>The printer will feed 2 to 4 labels, measuring the distance between gaps. The light will return to solid green.</li>
</ol>

<h2>Fix 2: Resolving USB Communication Locks</h2>
<p>If the light is solid green but jobs sit endlessly in the Windows print queue:</p>
<ul>
  <li><strong>Try a new USB port:</strong> Move the cable from a USB 3.0 (blue) hub to a USB 2.0 (black) port directly on the motherboard.</li>
  <li><strong>Restart the Spooler:</strong> Press <code>Win + R</code>, type <code>services.msc</code>, locate "Print Spooler", right-click and select <strong>Restart</strong>.</li>
</ul>`
  },
  {
    title: "Zebra ZD410 vs ZD420 vs GX420d Comparison",
    slug: 'zebra-zd410-vs-zd420-gx420d-comparison',
    seoTitle: "Zebra ZD410 vs ZD420 vs GX420d Comparison Guide",
    metaDescription: "Comparing the Zebra ZD410, ZD420, and the legacy GX420d? We break down print width, thermal transfer options, ribbon cartridges, and speed.",
    excerpt: "The ZD400 series replaces the legendary GX and GK desktop printers. Here is a comprehensive technical breakdown between the 2-inch ZD410 and 4-inch ZD420 models.",
    errorCode: null,
    tags: 'Zebra, ZD410, ZD420, GX420d, Comparison, Difference, Buying Guide, Print Width',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: 'N/A',
    categoryId: setupCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "Zebra Desktop Printer Comparison: 1) ZD410: An ultra-compact 2-inch Direct Thermal printer, perfect for pharmacies, wristbands, and small retail tags. Cannot use ribbons. 2) ZD420: A versatile 4-inch printer available in Direct Thermal or Thermal Transfer. The ZD420c variant uses a foolproof drop-in ribbon cartridge instead of standard ribbon rolls. 3) GX420d: The legendary, rugged 4-inch legacy predecessor to the ZD series. It is discontinued but still widely used. If replacing a GX420d, the direct upgrade path is the ZD421 (the successor to the ZD420).",
    content: `<h2>The Evolution of Zebra Desktop Printers</h2>
<p>For over a decade, the <strong>Zebra GX420d</strong> and <strong>GK420d</strong> were the undisputed workhorses of warehouse and shipping operations worldwide. Zebra eventually retired the G-Series, replacing them with the modern, IoT-connected <strong>ZD400 series</strong>.</p>

<h2>Zebra ZD410: The 2-Inch Specialist</h2>
<p>The <strong>ZD410</strong> is specifically designed for environments where desk space is at a premium and labels are narrow.</p>
<ul>
  <li><strong>Maximum Print Width:</strong> 2.2 inches (56mm).</li>
  <li><strong>Print Technology:</strong> Direct Thermal ONLY (no ink ribbon support).</li>
  <li><strong>Ideal Use Cases:</strong> Pharmacy prescription bottles, healthcare wristbands, retail price tags, and small ingredient labels.</li>
</ul>

<h2>Zebra ZD420 (and ZD421): The 4-Inch Standard</h2>
<p>The <strong>ZD420</strong> (and its direct successor, the <strong>ZD421</strong>) is the modern 4-inch standard for shipping and logistics.</p>
<ul>
  <li><strong>Maximum Print Width:</strong> 4.09 inches (104mm).</li>
  <li><strong>Print Technology:</strong> Available in Direct Thermal OR Thermal Transfer.</li>
  <li><strong>The Cartridge Variant (ZD420c):</strong> Zebra introduced a specific variant that accepts a proprietary drop-in ribbon cartridge. This eliminates the complicated process of threading standard ribbon rolls over tension spindles, making it foolproof for retail employees.</li>
</ul>

<h2>Legacy Comparison: GX420d vs ZD420</h2>
<table style="width:100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: left;">
      <th style="padding: 0.75rem;">Feature</th>
      <th style="padding: 0.75rem;">Zebra GX420d (Legacy)</th>
      <th style="padding: 0.75rem;">Zebra ZD420 / ZD421</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">User Interface</td>
      <td style="padding: 0.75rem;">Single Button, Single LED</td>
      <td style="padding: 0.75rem;">5 Status Icons (Status, Pause, Data, Supply, Network)</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Print Speed</td>
      <td style="padding: 0.75rem;">6 ips</td>
      <td style="padding: 0.75rem;">6 ips (203dpi) / 4 ips (300dpi)</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Connectivity Upgrades</td>
      <td style="padding: 0.75rem;">Factory installed only</td>
      <td style="padding: 0.75rem;">Modular field-installable slots (Serial/Ethernet)</td>
    </tr>
  </tbody>
</table>`
  },
  {
    title: "Fix Zebra ZD421 Cancel Button Not Working & ZD620 Error Light",
    slug: 'zebra-zd421-cancel-button-not-working-zd620-error-light',
    seoTitle: "Fix Zebra ZD421 Cancel Button Not Working & ZD620 Error",
    metaDescription: "Is your Zebra ZD421 cancel button unresponsive, or is your ZD620 showing a flashing red error icon? Learn how to clear print queues and decode the 5-icon display.",
    excerpt: "When the front panel buttons on modern ZD-series printers become unresponsive, the internal memory buffer is usually locked by a corrupted print job from Windows.",
    errorCode: 'Panel Unresponsive',
    tags: 'Zebra, ZD421, Cancel Button Not Working, ZD620, Error Light, Status Icons, Frozen Printer',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: hardwareCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix an unresponsive Zebra ZD421 Cancel button: 1) The 'Cancel' button only works if the printer is paused first. Press the Pause button (the printer will stop printing and the Pause icon will illuminate). 2) Press the Cancel button once to clear the current label, or hold the Cancel button for 3 seconds to clear the entire queued batch. 3) If the buttons are completely frozen, unplug the USB/Ethernet cable, turn the printer off, clear the Windows Print Queue on your PC, and turn the printer back on.",
    content: `<h2>Understanding ZD-Series Button Logic</h2>
<p>Unlike older single-button Zebra printers, the modern <strong>ZD421, ZD620, and ZD621</strong> feature a 3-button, 5-icon interface. A common point of frustration for users is pressing the Cancel (X) button while the printer is actively printing, only to find the printer completely ignores the command.</p>

<h2>Fix 1: The Pause-Then-Cancel Rule</h2>
<p>For safety and data integrity, Zebra firmware requires the print buffer to be halted before it accepts a cancellation command.</p>
<ol>
  <li>Press the <strong>Pause (||)</strong> button. The printer will finish the current label and stop. The Pause icon will turn solid yellow.</li>
  <li>To cancel just the next label in the queue, press the <strong>Cancel (X)</strong> button once.</li>
  <li>To purge the entire 500-label batch sitting in memory, <strong>press and hold the Cancel (X) button for 3 seconds</strong> until the Data icon flashes and turns off.</li>
  <li>Press the <strong>Pause (||)</strong> button again to return the printer to a ready state (Green).</li>
</ol>

<h2>Fix 2: Clearing a Hard Memory Lock</h2>
<p>If the printer receives a corrupted ZPL command or an impossibly large graphic file, the micro-controller can freeze, rendering the front panel buttons completely dead.</p>
<ul>
  <li>Unplug the power cord from the back of the printer for 10 seconds.</li>
  <li>On your PC, open <strong>Printers &amp; Scanners</strong>, select the Zebra printer, and click <strong>Open Queue</strong>. Cancel all stuck documents.</li>
  <li>Plug the printer back in. The buttons will resume normal function.</li>
</ul>

<h2>Decoding the ZD620 / ZD421 Error Icons</h2>
<p>The 5 status icons (Status, Pause, Data, Supplies, Network) provide granular diagnostics:</p>
<ul>
  <li><strong>Flashing Red "Supplies" Icon:</strong> The printer is out of media. If it's loaded, the printer is failing to see the gap (run auto-calibration).</li>
  <li><strong>Flashing Red "Status" &amp; "Supplies" Icons:</strong> The thermal ribbon is out, or you loaded ribbon but configured the printer for Direct Thermal mode.</li>
  <li><strong>Flashing Yellow "Network" Icon:</strong> The printer has lost its Wi-Fi connection or the Ethernet cable is unplugged.</li>
</ul>`
  },
  {
    title: "Zebra ZT230 Printhead Error & ZT410 Not Connecting Fix",
    slug: 'zebra-zt230-printhead-error-zt410-not-connecting-fix',
    seoTitle: "Zebra ZT230 Printhead Error & ZT410 Connection Fix",
    metaDescription: "Troubleshooting Zebra industrial printers. Fix 'Printhead Open' errors on the ZT230 and resolve Ethernet/Wi-Fi network connection drops on the ZT410.",
    excerpt: "Industrial ZT-series printers use mechanical microswitches to detect printhead closure. When these fail, or when static IPs drop, production lines halt.",
    errorCode: 'Printhead Open / Network Drop',
    tags: 'Zebra, ZT230, Printhead Error, ZT410, Not Connecting, Printhead Open, Industrial Printer, Ethernet',
    wordCount: 1150,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: hardwareCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix a Zebra ZT230 'Printhead Open' error and ZT410 network drops: 1) Printhead Error: Ensure the head latch is pushed completely down until it clicks. If the error persists, the mechanical micro-switch located near the latch hinge is bent or stuck; clean the latch area with compressed air. 2) ZT410 Not Connecting: If the printer drops off the network, the DHCP lease likely expired. Use the front LCD menu to assign a Static IP Address. Go to Network > IP Protocol > set to 'PERMANENT', then manually input the IP Address, Subnet, and Gateway. Restart the printer.",
    content: `<h2>Troubleshooting Zebra Industrial Hardware</h2>
<p>The <strong>Zebra ZT230</strong> and <strong>ZT410</strong> are rugged, metal-chassis industrial printers designed for high-volume 24/7 warehouse operations. When they fail, it usually involves heavy mechanical sensors or enterprise networking issues.</p>

<h2>Fix 1: The ZT230 "Printhead Open" Error</h2>
<p>If the printer's LCD screen reads <code>ERROR: PRINTHEAD OPEN</code> but you have firmly latched the printhead down, the safety interlock switch is failing to engage.</p>
<ol>
  <li><strong>Check Latch Engagement:</strong> The ZT230 requires significant downward pressure on the lever. You must feel a distinct, heavy "snap" locking it into place.</li>
  <li><strong>Clean the Sensor Actuator:</strong> Open the printhead. Look near the hinge mechanism on the right side. There is a small plastic tab that presses into a microswitch when closed. If paper dust or a torn label is crammed in this gap, the switch cannot close. Use tweezers or compressed air to clear the channel.</li>
  <li><strong>Check Printhead Cable:</strong> A loose data cable connecting the printhead to the logic board can falsely trigger open-circuit errors. Ensure the twin cable harnesses plugged into the top of the printhead are firmly seated.</li>
</ol>

<h2>Fix 2: ZT410 Ethernet & Wi-Fi Not Connecting</h2>
<p>If your ZT410 suddenly stops receiving print jobs and the network status icon is red or yellow, the IP address configuration is the likely culprit.</p>
<h3>Assigning a Static IP via the LCD:</h3>
<p>In enterprise environments, DHCP IP addresses change, causing the print server's port mapping to break. Setting a permanent Static IP is mandatory.</p>
<ul>
  <li>Press the <strong>Home</strong> button on the ZT410.</li>
  <li>Use the arrow keys to navigate to the <strong>Network</strong> menu and press OK.</li>
  <li>Scroll to <strong>IP Protocol</strong>. Change it from <code>ALL</code> or <code>DHCP</code> to <strong>PERMANENT</strong>.</li>
  <li>Scroll to <strong>IP Address</strong>. Enter your IT-assigned static IP (e.g., <code>192.168.1.50</code>).</li>
  <li>Scroll to <strong>Subnet Mask</strong> (usually <code>255.255.255.0</code>) and <strong>Gateway</strong> (e.g., <code>192.168.1.1</code>).</li>
  <li>Exit the menu and select <strong>Save Changes</strong>. Power cycle the printer. Update your Windows Server port to match the new static IP.</li>
</ul>`
  },
  {
    title: "Zebra ZQ520 Setup & GK420d Windows 11 Driver Guide",
    slug: 'zebra-zq520-setup-gk420d-driver-windows-11',
    seoTitle: "Zebra ZQ520 Setup & GK420d Windows 11 Driver Install",
    metaDescription: "Learn how to set up the Zebra ZQ520 mobile Bluetooth printer, and how to successfully install legacy Zebra GK420d printer drivers on Windows 11.",
    excerpt: "Connecting rugged mobile printers via Bluetooth and installing drivers for discontinued 15-year-old desktop printers on modern Windows 11 OS.",
    errorCode: null,
    tags: 'Zebra, ZQ520, Mobile Printer Setup, GK420d, Driver Windows 11, Bluetooth Pairing, CPCL',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: setupCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To install the Zebra GK420d on Windows 11: 1) Do not rely on Windows Plug-and-Play, as it often assigns the wrong generic driver. 2) Download 'Zebra Setup Utilities' (ZSU) from the official Zebra website. 3) Run ZSU as Administrator before plugging in the USB cable. 4) Click 'Install New Printer', select 'ZebraDesigner (ZDesigner)', scroll down and select 'ZDesigner GK420d', and point it to the USB port. For ZQ520 Mobile Setup: Pair via Bluetooth using the pairing PIN (default is usually 0000) and use Zebra PrintConnect app on Android to route print jobs.",
    content: `<h2>Setting Up the Zebra ZQ520 Mobile Printer</h2>
<p>The <strong>Zebra ZQ520</strong> is a rugged, military-grade mobile printer designed for forklift operators, delivery drivers, and field service workers. It prints via Bluetooth or Wi-Fi using the CPCL or ZPL languages.</p>

<h3>Bluetooth Pairing for Android/iOS:</h3>
<ol>
  <li>Power on the ZQ520. Ensure the Bluetooth icon on the LCD is active.</li>
  <li>On your mobile device, go to Settings &gt; Bluetooth.</li>
  <li>Select the printer. The broadcast name is usually the printer's serial number (e.g., <code>XXJ184...</code>).</li>
  <li>If prompted for a pairing PIN, enter <code>0000</code> or <code>1234</code>.</li>
  <li><strong>Important for Android:</strong> Download the <strong>Zebra PrintConnect</strong> app from the Google Play Store. This utility runs in the background and acts as a print spooler, allowing custom warehouse apps or Chrome to pass print jobs directly to the Bluetooth printer.</li>
</ol>

<h2>Installing the Legacy Zebra GK420d on Windows 11</h2>
<p>The <strong>Zebra GK420d</strong> was discontinued years ago, but millions remain in active service. When upgrading a PC to Windows 11, simply plugging in the USB cable often results in Windows installing an "Unspecified Device" or a generic text driver that fails to print barcodes.</p>

<h3>The Correct Windows 11 Installation Method:</h3>
<ol>
  <li><strong>Unplug the printer USB cable</strong> from the computer.</li>
  <li>Navigate to the Zebra Support website and download <strong>Zebra Setup Utilities (ZSU)</strong>.</li>
  <li>Right-click the downloaded executable and select <strong>Run as Administrator</strong>.</li>
  <li>Follow the prompts to pre-install the core ZDesigner driver repository into the Windows driver store.</li>
  <li>When the utility finishes, <strong>plug the USB cable into the PC and turn the printer ON</strong>.</li>
  <li>Windows 11 will detect the USB handshake, query the local driver store, and correctly assign the <code>ZDesigner GK420d</code> driver.</li>
  <li>Open Zebra Setup Utilities, select the GK420d, and click <strong>Print Configuration Label</strong> to verify successful communication.</li>
</ol>`
  }
];

async function main() {
  const brandSlug = 'zebra-technologies';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 3 (Cluster D: Model-specific) for brand: ${brand.name}`);

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
